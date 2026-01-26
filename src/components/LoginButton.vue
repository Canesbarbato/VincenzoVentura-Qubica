<template>
  <div v-if="isAuthenticated" class="login-container">
    <n-button type="error" @click="logout" size="small">
      <template #icon>
        <span>🚪</span>
      </template>
      Logout
    </n-button>
  </div>
  <div v-if="!isAuthenticated" class="login-container">
    <n-button type="primary" @click="showLoginModal = true" size="small">
      <template #icon>
        <span>🔐</span>
      </template>
      Login
    </n-button>
  </div>

  <!-- Login Modal -->
  <n-modal
    v-model:show="showLoginModal"
    title="Login"
    preset="dialog"
    size="small"
    :show-icon="false"
    @update:show="handleModalClose"
  >
    <div class="login-form">
      <n-space vertical size="medium">
        <n-form
          ref="formRef"
          :model="loginForm"
          size="small"
        >
          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="loginForm.username"
              placeholder="Enter username"
              :disabled="isLoading"
            />
          </n-form-item>

          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="loginForm.password"
              type="password"
              placeholder="Enter password"
              :disabled="isLoading"
            />
          </n-form-item>
        </n-form>

        <n-alert
          v-if="successMessage"
          type="success"
          closable
          @close="successMessage = ''"
          class="feedback-alert"
        >
          {{ successMessage }}
        </n-alert>

        <n-alert
          v-if="error"
          type="error"
          closable
          @close="error = ''"
          class="feedback-alert"
        >
          {{ error }}
        </n-alert>
        <n-space justify="end">
          <n-button
            @click="showLoginModal = false"
            :disabled="isLoading"
          >
            Cancel
          </n-button>
          <n-button
            type="primary"
            @click="handleLogin"
            :loading="isLoading"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </n-button>
        </n-space>
      </n-space>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { useAuthStore } from '@/app/stores/authentication'
import { storeToRefs } from 'pinia'


const authStore = useAuthStore()
const { login, logout } = authStore
const { isAuthenticated,error,isLoading } = storeToRefs(authStore)
const isLogged = ref(isAuthenticated)
const showLoginModal = ref(false)
const successMessage = ref('')
const dialog = useDialog()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
  const handleLogin = async () => {

       login(loginForm.username, loginForm.password).then(() => {
         successMessage.value = 'Login successful!'
         showLoginModal.value = false
       }).catch(() => {
         // Error is handled by the store's error ref
       })
 
  }

const loginForm = reactive({
  username: '',
  password: ''
})

console.log('isAuthenticated initial:', isAuthenticated.value)


// Watch for authentication state changes
watch(isAuthenticated, (newVal) => {
console.log('isAuthenticated initial:', newVal
)

      message.success('authenticated!')
  isLogged.value = newVal
})

// Watch for error changes and show message
watch(error, (newError) => {
  if (newError) {
    message.error(newError)
  }
})

function handleLogout() {
  dialog.warning({
    title: 'Confirm Logout',
    content: 'Are you sure you want to logout?',
    positiveText: 'Yes',
    negativeText: 'Cancel',
    draggable: true,
    onPositiveClick: () => {
      isLogged.value = false
      message.success('You have been logged out')
    },
    onNegativeClick: () => {
      message.info('Logout cancelled')
    }
  })
}

function handleModalClose(show: boolean) {
  if (!show) {
    // Reset form when modal is closed
    loginForm.username = ''
    loginForm.password = ''
    successMessage.value = ''
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
}

.login-form {
  padding: 1rem 0;
}

.feedback-alert {
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>