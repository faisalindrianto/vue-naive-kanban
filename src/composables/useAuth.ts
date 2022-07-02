import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const useAuth = () => {
  const email = ref('')
  const password = ref('')
  const loadingAuth = ref(false)
  const authError = ref('')

  const { setAuthenticated, setUnauthenticated } = useAuthStore()

  const router = useRouter()
  const message = useMessage()

  const login = () => {
    authError.value = ''
    if (email.value && password.value) {
      loadingAuth.value = true
      axios.post('/auth/login', {
        email: email.value,
        password: password.value
      }).then(response => {
        console.log(response)
        loadingAuth.value = false
        localStorage.setItem('token', 'AUTH_TOKEN')
        setAuthenticated()
        message.success('Berhasil login!')
        router.push('/')
      }).catch(err => {
        console.log(err)
        loadingAuth.value = false
        message.warning('Email atau password salah!')
        authError.value = 'Email atau password tidak valid'
      })
    }
  }
  
  const logout = () => {
    setUnauthenticated()
    localStorage.removeItem('token')
    message.success('Berhasil logout!')
    router.push('/login')
  }

  return {
    email,
    password,
    loadingAuth,
    authError,

    login,
    logout,
  }
}

export default useAuth
