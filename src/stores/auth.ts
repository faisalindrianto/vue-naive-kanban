import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    setAuthenticated() {
      this.isAuthenticated = true
    },
    setUnauthenticated() {
      this.isAuthenticated = false
    }
  }
})