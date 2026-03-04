<script setup>
import { ExternalLink, Key, User, ShieldCheck, MousePointerClick } from 'lucide-vue-next'
import { ref } from 'vue'

const activeScreen = ref('immich')

const demos = {
  immich: {
    title: 'Immich - مكتبة الصور',
    img: '/immich_ui.png',
    url: 'https://demo.immich.app', 
    user: 'demo@immich.app',
    pass: 'demo'
  },
  nextcloud: {
    title: 'Nextcloud - السحابة الخاصة',
    img: '/nextcloud_ui.png',
    url: 'https://demo1.nextcloud.com',
    user: 'demo',
    pass: 'demo'
  }
}
</script>

<template>
  <section id="demo" class="demo-section">
    <div class="container grid-2">
      <!-- Mobile Mockup -->
      <div class="mockup-container" data-aos="fade-left">
        <div class="phone-frame">
          <div class="phone-speaker"></div>
          <div class="phone-screen">
            <!-- Mobile Status Bar -->
            <div class="status-bar">
              <span class="time font-en">12:42</span>
              <div class="status-icons">
                <div class="signal"></div>
                <div class="wifi"></div>
                <div class="battery"></div>
              </div>
            </div>

            <!-- Clickable Demo Image -->
            <a :href="demos[activeScreen].url" target="_blank" class="screen-link">
              <transition name="fade-screen" mode="out-in">
                <img :key="activeScreen" :src="demos[activeScreen].img" :alt="activeScreen" class="demo-img">
              </transition>
              <div class="tap-hint">
                <MousePointerClick :size="20" />
                <span>اضغط للتجربة</span>
              </div>
            </a>

            <!-- Home Indicator -->
            <div class="home-indicator"></div>
          </div>
          <div class="phone-button"></div>
        </div>
        <div class="mockup-glow"></div>
      </div>

      <!-- Content & Demo Buttons -->
      <div class="demo-content" data-aos="fade-right">
        <span class="badge">تجربة حية</span>
        <h2 class="mb-4">ادخل وشوف بنفسك.. <br><span class="gradient-text">السرعة والسهولة</span></h2>
        <p class="mb-5">لا نكتفي بالكلام، اضغط على شاشة الجوال لتجربة النسخة الرسمية لكل خدمة والتعرف على واجهة المستخدم الحقيقية.</p>
<br>
        <div class="demo-switcher">
          <button 
            @click="activeScreen = 'immich'" 
            :class="{ active: activeScreen === 'immich' }"
            class="switch-btn glass"
          >
            واجهة Immich
          </button>
          <button 
            @click="activeScreen = 'nextcloud'" 
            :class="{ active: activeScreen === 'nextcloud' }"
            class="switch-btn glass"
          >
            واجهة Nextcloud
          </button>
        </div>

        <div class="glass demo-card">
          <div class="card-header">
            <h3>{{ demos[activeScreen].title }}</h3>
          </div>
          <div class="credentials">
            <div class="cred-item">
              <User :size="18" class="icon" />
              <div class="text">
                <label>اسم المستخدم</label>
                <span>{{ demos[activeScreen].user }}</span>
              </div>
            </div>
            <div class="cred-item">
              <Key :size="18" class="icon" />
              <div class="text">
                <label>كلمة المرور</label>
                <span>{{ demos[activeScreen].pass }}</span>
              </div>
            </div>
          </div>
          <div class="card-extra">
            <ShieldCheck :size="16" />
            <span>بيانات تجريبية آمنة للتصفح فقط</span>
          </div>
          <a :href="demos[activeScreen].url" target="_blank" class="btn btn-primary btn-block mt-4">
            دخول للتجربة الكاملة
            <ExternalLink :size="18" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-section {
  background: radial-gradient(circle at bottom right, rgba(112, 0, 255, 0.05), transparent 40%);
  position: relative;
  z-index: 10;
}

.grid-2 {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 8rem;
}

/* Phone Mockup Styling */
.mockup-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.phone-frame {
  width: 280px;
  height: 580px;
  background: #111;
  border-radius: 40px;
  padding: 12px;
  border: 4px solid #333;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(255,255,255,0.1);
  position: relative;
  z-index: 2;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.screen-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;
}

.demo-img {
  width: 100%;
  height: 100%;
  margin-top: 15%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.screen-link:hover .demo-img {
  transform: scale(1.05);
}

.tap-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.screen-link:hover .tap-hint {
  opacity: 1;
}

.tap-hint span {
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
}

/* Transitions */
.fade-screen-enter-active,
.fade-screen-leave-active {
  transition: opacity 0.4s ease;
}

.fade-screen-enter-from,
.fade-screen-leave-to {
  opacity: 0;
}

/* Mobile Status Bar Styles */
.status-bar {
  height: 35px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.time { font-size: 0.8rem; font-weight: 700; color: white; }
.status-icons { display: flex; gap: 6px; align-items: center; }
.signal, .wifi, .battery { height: 10px; background: white; border-radius: 2px; opacity: 0.8; }
.signal { width: 15px; clip-path: polygon(0% 100%, 25% 100%, 25% 75%, 25% 100%, 50% 100%, 50% 50%, 50% 100%, 75% 100%, 75% 25%, 75% 100%, 100% 100%, 100% 0%, 100% 100%); }
.wifi { width: 12px; clip-path: polygon(50% 100%, 0% 50%, 20% 30%, 50% 60%, 80% 30%, 100% 50%); }
.battery { width: 22px; height: 11px; border: 1px solid rgba(255,255,255,1); position: relative; }
.battery::after { content: ''; position: absolute; right: -3px; top: 2px; width: 2px; height: 5px; background: white; }
.battery::before { content: ''; position: absolute; left: 1px; top: 1px; width: 80%; height: 7px; background: white; }

/* Home Indicator Styling */
.home-indicator {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  z-index: 100;
}

.screen-loader {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #05060f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.phone-speaker {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 6px;
  background: #222;
  border-radius: 10px;
  z-index: 3;
}

.phone-button {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #333;
  border-radius: 10px;
}

.mockup-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  height: 120%;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  z-index: 1;
  opacity: 0.4;
}

/* Demo Content Styling */
.demo-switcher {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.switch-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  color: var(--text-muted);
  font-weight: 700;
  border: 1px solid var(--border);
  transition: all 0.3s;
  cursor: pointer;
}

.switch-btn.active {
  color: var(--primary);
  border-color: var(--primary);
  background: rgba(255, 140, 0, 0.05);
}

.demo-card {
  padding: 2.5rem;
  border-radius: 30px;
}

.credentials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.cred-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cred-item .icon {
  color: var(--primary);
  background: rgba(255, 140, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
  width: 40px;
  height: 40px;
}

.cred-item label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.cred-item span {
  font-weight: 700;
  font-size: 1.1rem;
}

.card-extra {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 2rem;
  opacity: 0.6;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

@media (max-width: 1024px) {
  .grid-2 { grid-template-columns: 1fr; text-align: center; gap: 4rem; }
  .demo-switcher { justify-content: center; }
  .credentials { grid-template-columns: 1fr; }
  .mockup-container { order: 2; }
}
</style>
