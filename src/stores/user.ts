import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Eduardo',
    isAdmin: true,
  }),
  actions: {
    /**
     * Attempt to login a user
     */
    async login(user: string, password: string) {
      const userData = await apiLogin(user, password)

      this.$patch({
        name: user,
        ...userData,
      })
    },
    logout() {
      this.$patch({
        name: '',
        isAdmin: false
      })

      // we could do other stuff like redirecting the user
    },
  },
})

/**
 * Simulate a login
 */
function apiLogin(a: string, p: string) {
  if (a.indexOf('vue') !== -1) {
    return Promise.resolve({ isAdmin: true })
  } else if (p === 'ed') { 
    return Promise.resolve({ isAdmin: false })
  }
  return Promise.reject(new Error('invalid credentials'))
}
