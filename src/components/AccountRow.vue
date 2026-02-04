<template>
  <div class="account-row" :class="{ 'has-error': hasError }">
    <div class="field">
      <input
        v-model="localAccount.label"
        type="text"
        placeholder="Значение"
        class="field-input"
        :maxlength="50"
        @blur="handleBlur"
      />
    </div>
    
    <div class="field">
      <select
        v-model="localAccount.type"
        class="field-select"
        @change="handleTypeChange"
      >
        <option value="LDAP">LDAP</option>
        <option value="local">Локальная</option>
      </select>
    </div>
    
    <div class="field" :class="{ 'double-width': localAccount.type === 'LDAP' }">
      <input
        v-model="localAccount.login"
        type="text"
        placeholder="Логин"
        class="field-input"
        :maxlength="100"
        @blur="handleBlur"
      />
      <div v-if="loginError" class="field-error">
        {{ loginError }}
      </div>
    </div>
  
    <div v-if="localAccount.type === 'local'" class="field">
      <input
        v-model="localAccount.password"
        type="password"
        placeholder="Пароль"
        class="field-input"
        :maxlength="100"
        @blur="handleBlur"
      />
      <div v-if="passwordError" class="field-error">
        {{ passwordError }}
      </div>
    </div>
    
    <div class="delete-cell">
      <el-button
        type="danger"
        :icon="Delete"
        circle
        size="small"
        @click="handleDelete"
        class="delete-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { Account } from '@/types/account'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  'update': [id: string, updates: Partial<Account>]
  'delete': [id: string]
}>()

const localAccount = ref<Account>({ ...props.account })

const loginError = computed(() => !localAccount.value.login.trim() ? 'Обязательное поле' : '')

const passwordError = computed(() => {
  if (localAccount.value.type === 'local') {
    if (!localAccount.value.password || !localAccount.value.password.trim()) {
      return !localAccount.value.password || !localAccount.value.password.trim() ? 'Обязательное поле' : ''
    }
  }
})

const hasError = computed(() => !!(loginError.value || passwordError.value))

const handleBlur = () => {
  if (hasError.value) return;
  emit('update', localAccount.value.id, {
    label: localAccount.value.label,
    type: localAccount.value.type,
    login: localAccount.value.login,
    password: localAccount.value.password
  })
}

const handleTypeChange = () => {
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null
  } else if (localAccount.value.password === null) {
    localAccount.value.password = ''
  }
  handleBlur()
}

const handleDelete = () => emit('delete', localAccount.value.id)

</script>

<style scoped lang="scss">
.account-row {
  @include grid-columns(1fr 1fr 1fr 1fr auto, 10px);
  padding: 10px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  align-items: center;
}

.account-row.has-error {
  border-color: $border-error;
  background-color: $background-error;
}

.field {
  position: relative;
}

.field.double-width {
  grid-column: span 2;
}

.field-input,
.field-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid $empty-border-color;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.field-input:focus,
.field-select:focus {
  outline: none;
  border-color: $hint-border-color;
}

.field-error {
  position: absolute;
  top: 80%;
  left: 0;
  font-size: 10px;
  color: $text-error;
  margin-top: 4px;
}

.delete-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.delete-icon {
  width: 32px;
  height: 32px;
}
</style>