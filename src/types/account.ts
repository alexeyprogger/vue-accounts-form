export interface Account {
  id: string
  label: string
  labels: Array<{ text: string }>
  type: 'LDAP' | 'local'
  login: string
  password: string | null
}