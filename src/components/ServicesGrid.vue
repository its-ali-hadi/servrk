<script setup>
import { Camera, FileText, Film, Zap, Globe, Shield } from 'lucide-vue-next'

const services = [
  {
    title: 'Immich - مكتبة صورك الذكية',
    desc: 'احفظ صورك بجودة أصلية، تنظيم تلقائي بالذكاء الاصطناعي، بحث بالوجوه والأماكن، ومشاركة عائلية آمنة.',
    icon: Camera,
    color: '#ff4b82',
    img: '/immich.png'
  },
  {
    title: 'Jellyfin - سينما في منزلك',
    desc: 'حول مكتبة أفلامك ومسلسلاتك إلى تجربة Netflix خاصة بك. شغلها على التلفزيون، الجوال، أو التابلت بجودة عالية وبدون إعلانات.',
    icon: Film,
    color: '#00a4dc',
    img: '/jellyfin.png'
  },
  {
    title: 'Nextcloud - ملفاتك في كل مكان',
    desc: 'بديل Google Drive و Dropbox. ارفع ملفاتك، أنشئ مجلدات مشتركة، ووصل بين أجهزة الماك والويندوز والموبايل بسهولة تامة.',
    icon: FileText,
    color: '#0082c9',
    img: '/nextcloud.png'
  }
]
</script>

<template>
  <section id="services" class="services-section">
    <div class="container text-center mb-5">
      <span class="badge">خدماتنا الرئيسية</span>
      <h2 class="section-title">كل خدماتك السحابية... <span class="gradient-text">تحت سقف منزلك</span></h2>
    </div>

    <div class="container services-grid">
      <div v-for="(s, i) in services" :key="i" class="glass service-card hover-lift" data-aos="fade-up" :data-aos-delay="i * 200">
        <div class="card-image">
          <img :src="s.img" :alt="s.title">
          <div class="overlay-gradient"></div>
          <div class="icon-floating" :style="{ background: 'linear-gradient(135deg, ' + s.color + ', #000)' }">
            <component :is="s.icon" :size="26" color="white" />
          </div>
        </div>
        <div class="card-body">
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div class="learn-more">
            <span>اكتشف المزيد</span>
            <Zap :size="16" />
          </div>
        </div>
      </div>
    </div>

    <div class="container container-features">
      <div class="feature-row glass" data-aos="zoom-in" data-aos-offset="200">
        <div class="feature-item" data-aos="fade-up" data-aos-delay="100">
          <div class="icon-circle"><Zap class="icon-p" /></div>
          <h4>سرعة الـ Local</h4>
          <p>نقل الملفات يتم بسرعة الشبكة المحلية الفائقة (أسرع بـ 10 أضعاف من الرفع للأونلاين).</p>
        </div>
        <div class="feature-item" data-aos="fade-up" data-aos-delay="200">
          <div class="icon-circle"><Globe class="icon-p" /></div>
          <h4>وصول من أي مكان</h4>
          <p>بفضل تقنية VPN آمنة، يمكنك الوصول لملفاتك وأفلامك حتى لو كنت في الطرف الآخر من العالم.</p>
        </div>
        <div class="feature-item" data-aos="fade-up" data-aos-delay="300">
          <div class="icon-circle"><Shield class="icon-p" /></div>
          <h4>خصوصية 100%</h4>
          <p>بياناتك لا تخرج من منزلك. لا أحد يراها ولا أحد يبيعها.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 3.5rem;
  margin-bottom: 4rem;
  font-weight: 800;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 8rem;
}

.service-card {
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-image {
  height: 250px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.service-card:hover .card-image img {
  transform: scale(1.1);
}

.overlay-gradient {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom, transparent 0%, rgba(5,6,15,0.8) 100%);
}

.icon-floating {
  position: absolute;
  bottom: -25px;
  left: 20px;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
  z-index: 2;
}

.card-body {
  padding: 3rem 1.5rem 2rem;
}

.card-body h3 {
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
}

.card-body p {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.learn-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: opacity 0.3s;
  cursor: pointer;
}

.service-card:hover .learn-more {
  opacity: 1;
}

.feature-row {
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 5rem 3rem;
  border-radius: 40px;
}

.feature-item {
  text-align: center;
  flex: 1;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background: rgba(255, 140, 0, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  border: 1px solid rgba(255, 140, 0, 0.1);
  transition: transform 0.4s;
}

.feature-item:hover .icon-circle {
  transform: rotateY(180deg) scale(1.1);
  background: rgba(255, 140, 0, 0.1);
}

.icon-p {
  color: var(--primary);
  width: 35px;
  height: 35px;
}

@media (max-width: 1024px) {
  .services-grid { grid-template-columns: 1fr; }
  .feature-row { flex-direction: column; gap: 4rem; }
}
</style>
