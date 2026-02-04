import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/account'
import { v4 as uuidv4 } from 'uuid'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  
  const loadAccounts = () => {
    const saved = localStorage.getItem('vue-accounts')
    if (saved) {
      try {
        accounts.value = JSON.parse(saved)
      } catch (err) {
        accounts.value = []
      }
    }
  }
  
  const saveAccounts = () => {
    localStorage.setItem('vue-accounts', JSON.stringify(accounts.value))
  }
  
  const createAccount = (): Account => ({
    id: uuidv4(),
    label: '',
    labels: [],
    type: 'LDAP',
    login: '',
    password: null
  })
  
  const addAccount = () => {
    accounts.value.push(createAccount())
    saveAccounts()
  }

  const updateAccount = (id: string, updates: Partial<Account>) => {
    const index = accounts.value.findIndex(acc => acc.id === id)
    if (index !== -1) {
      const existingAccount = accounts.value[index]
      
      const labels = updates.label !== undefined
        ? updates.label
            .split(';')
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(text => ({ text }))
        : existingAccount?.labels
      
      accounts.value[index] = {
        ...existingAccount,
        ...updates,
        labels
      } as Account
      
      if (accounts.value[index].type === 'LDAP') {
        accounts.value[index].password = null
      }
      saveAccounts()
    }
  }
  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex(acc => acc.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveAccounts()
    }
  }
  
  loadAccounts()
  
  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
    createAccount
  }
})