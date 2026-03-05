<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-vue-next'

const passcode = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3031/api/login', { passcode: passcode.value })
    if (res.data.success) {
      localStorage.setItem('servrk_auth', res.data.token)
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = 'رمز الدخول غير صحيح'
    passcode.value = ''
  }
}
</script>

<template>
  <div class="login-container">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="login-card glass hover-lift">
      <div class="login-header">
        <div class="icon-circle">
          <ShieldCheck :size="32" />
        </div>
        <h2 class="gradient-text font-en">SERVRK</h2>
        <p>منطقة التحكم الخاصة</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>أدخل رمز الدخول</label>
          <div class="input-inner">
            <Lock :size="20" class="input-icon" />
            <input 
              v-model="passcode" 
              type="password" 
              placeholder="رمز الدخول" 
              required 
            />
          </div>
          <p v-if="error" class="error-msg">{{ error }}</p>
        </div>

        <button type="submit" class="btn btn-primary btn-login">
          <span>دخول</span>
          <ArrowRight :size="20" />
        </button>
      </form>
      
      <div class="login-footer">
        <router-link to="/">العودة للموقع الرئيسي</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  position: relative;
  overflow: hidden;
  direction: rtl;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 3rem;
  text-align: center;
  z-index: 10;
}

.icon-circle {
  width: 70px;
  height: 70px;
  background: rgba(255, 140, 0, 0.1);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: 1px solid rgba(255, 140, 0, 0.2);
}

.login-header h2 { font-size: 2rem; margin-bottom: 0.5rem; }
.login-header p { color: var(--text-muted); margin-bottom: 2.5rem; }

.login-form { text-align: right; }

.form-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
}

.input-inner {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 1rem;
  color: var(--primary);
  opacity: 0.7;
}

.input-inner input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 3rem 1rem 1rem;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  transition: 0.3s;
}

.input-inner input:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.08);
}

.btn-login {
  width: 100%;
  margin-top: 2rem;
  justify-content: center;
  height: 55px;
}

.error-msg {
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.8rem;
  text-align: center;
}

.login-footer {
  margin-top: 2rem;
}

.login-footer a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
}

.login-footer a:hover { color: var(--primary); }
</style>
