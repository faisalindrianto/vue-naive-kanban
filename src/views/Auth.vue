<script setup lang="ts">
  import useAuth from '@/composables/useAuth'
  
  const {
    email, password, loadingAuth, login, authError,
  } = useAuth()
</script>

<template>
  <div class="h-screen flex login">
    <n-card class="m-auto flex flex-col items-center">
      <h1 class="text-center">Silahkan login terlebih dahulu</h1>
      <n-divider />
      <n-input v-model:value="email" class="mb-4" type="text" placeholder="Email" />
      <n-input v-model:value="password" class="mb-4" type="password" placeholder="Password" />
      <n-button :loading="loadingAuth" block @click="login">
        Login
      </n-button>
      <h6 class="mt-2 text-center text-red-600">{{ authError }}</h6>
    </n-card>
  </div>
</template>

<style>
.login .n-card {
  max-width: 380px;
}
</style>
