<template>
  <div class="account-list">
    <div class="header">
      <h1 class="title">Учетные записи</h1>
      <el-button
        type="primary"
        :icon="Plus"
        circle
        @click="addAccount"
        size="large"
      />
    </div>
    
    <div class="hint">
      <div class="hint-icon">
        <el-icon><QuestionFilled /></el-icon>
      </div>
      <div class="hint-text">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </div>
    </div>
    
    <div class="table-header">
      <p>Метки</p>
      <p>Тип записи</p>
      <p>Логин</p>
      <p>Пароль</p>
    </div>
    
    <div>
      <AccountRow
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
    
    <div v-if="accounts.length === 0" class="empty-state">
      <el-empty description="Нет учетных записей">
        <el-button type="primary" :icon="Plus" @click="addAccount">
          Добавить первую запись
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import AccountRow from './AccountRow.vue'
import { useAccountStore } from '@/stores/accountStore'

const accountStore = useAccountStore()

const accounts = accountStore.accounts

const addAccount = () => {
  accountStore.addAccount()
}

const handleUpdate = (id: string, updates: any) => {
  accountStore.updateAccount(id, updates)
}

const handleDelete = (id: string) => {
  accountStore.removeAccount(id)
}
</script>

<style scoped lang="scss">
.account-list {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  @include set-font(24px, 600);
  color: $title-color;
  margin: 0;
}

.hint {
  display: flex;
  align-items: center;
  background-color: $hint-background-color;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-left: 4px solid $hint-border-color;
  &-icon {
    margin-right: 12px;
    margin-top: 5px;
    color: $hint-border-color;
  }
  &-text {
    color: $hint-text-color;
    font-size: 14px;
    line-height: 1.5;
  }
}

.table-header {
  @include grid-columns(1fr 1fr 1fr 1fr auto, 10px);
  @include set-font(14px, 600);
  padding: 12px;
  background-color: $list-header-color;
  border-radius: 4px;
  margin-bottom: 8px;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  border: 2px dashed $empty-border-color;
  border-radius: 8px;
  background-color: $empty-background-color;
}
</style>