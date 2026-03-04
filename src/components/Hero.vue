<script setup>
import { LayoutGrid, Cloud, Film, ShieldCheck } from 'lucide-vue-next'
</script>

<template>
  <section class="hero-section">
    <div class="container hero-grid">
      <div class="hero-content" data-aos="fade-left">
        <span class="badge">ثورة التخزين المنزلي</span>
        <h1>سيرفرك الخاص... <br><span class="gradient-text">خصوصيتك الكاملة</span></h1>
        <p>لا تشيل هم مساحة الجوال أو اشتراكات iCloud و Google Photos. امتلك سيرفرك المنزلي، واحفظ صورك، ملفاتك، وأفلامك كلها في مكان آمن، سريع، وبدون اشتراك شهري!</p>
        
        <div class="hero-btns">
          <a href="#pricing" class="btn btn-primary">ابدأ الآن</a>
          <a href="#about" class="btn btn-outline">كيف يعمل؟</a>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num font-en">100%</span>
            <span class="stat-label">خصوصية تامة</span>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <span class="stat-num font-en">0</span>
            <span class="stat-label">اشتراك شهري</span>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <span class="stat-num font-en">24/7</span>
            <span class="stat-label">دعم فني</span>
          </div>
        </div>
      </div>
      
      <div class="hero-image" data-aos="fade-left" data-aos-delay="400">
        <div class="image-wrapper float-3d">
          <img src="/home_server.png" alt="Home Server Premium" class="server-img">
          <div class="glass-overlay">
            <div class="floating-data">
              <span class="pulse"></span>
              <span>1.0 Gbps السرعة</span>
            </div>
          </div>
          <div class="glow-effect"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding-top: 220px;
  padding-bottom: 120px;
  position: relative;
  overflow: visible;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 6rem;
}

h1 {
  font-size: 4.5rem;
  line-height: 1.05;
  margin-bottom: 2.5rem;
  font-weight: 900;
}

p {
  font-size: 1.4rem;
  color: var(--text-muted);
  max-width: 650px;
  margin-bottom: 3.5rem;
  line-height: 1.8;
}

.hero-btns {
  display: flex;
  gap: 2rem;
  margin-bottom: 5rem;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.stat-num {
  font-size: 2rem;
  font-weight: 800;
  display: block;
  color: var(--primary);
  margin-bottom: 0.2rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-muted);
}

.divider {
  width: 1px;
  height: 50px;
  background: var(--border);
}

.image-wrapper {
  position: relative;
  perspective: 1000px;
}

.float-3d {
  animation: float-3d 6s ease-in-out infinite alternate;
}

@keyframes float-3d {
  0% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
  100% { transform: translateY(-20px) rotateX(5deg) rotateY(-5deg); }
}

.server-img {
  width: 100%;
  border-radius: 40px;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-overlay {
  position: absolute;
  bottom: 10%;
  right: -5%;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.floating-data {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  color: white;
}

.pulse {
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 60%);
  z-index: -1;
  opacity: 0.6;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  h1 { font-size: 3rem; margin-bottom: 2rem; }
  p { font-size: 1.1rem; margin: 0 auto 3rem; }
  .hero-btns { justify-content: center; gap: 1rem; }
  .hero-stats { justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
  .image-wrapper { max-width: 400px; margin: 0 auto; }
  .glass-overlay { right: 50%; transform: translateX(50%); bottom: -20px; white-space: nowrap; }
}

@media (max-width: 480px) {
  .hero-section { padding-top: 150px; }
  h1 { font-size: 2.4rem; }
  .hero-btns { flex-direction: column; width: 100%; }
  .btn { width: 100%; justify-content: center; }
  .hero-stats { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    justify-items: center;
  }
  .stat-num { font-size: 1.5rem; }
  .divider { display: none; }
}
</style>
