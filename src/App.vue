<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import ServicesGrid from './components/ServicesGrid.vue'
import Pricing from './components/Pricing.vue'
import LiveDemo from './components/LiveDemo.vue'
import Footer from './components/Footer.vue'
import { Rocket, ShieldCheck, Zap, HeadphonesIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="app-wrapper">
    <!-- Animated Background Blobs -->
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>

    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <Hero />

    <!-- Quick Perks -->
    <section class="perks-section" data-aos="fade-up">
      <div class="container perks-grid">
        <div class="perk-box" data-aos="fade-up" data-aos-delay="100">
          <Rocket :size="30" class="perk-icon" />
          <div class="perk-text">
            <h5>سرعة فائقة</h5>
            <p>نقل ملفاتك بين الأجهزة يتم فوراً داخل منزلك بدون بطء الإنترنت.</p>
          </div>
        </div>
        <div class="perk-box" data-aos="fade-up" data-aos-delay="300">
          <ShieldCheck :size="30" class="perk-icon" />
          <div class="perk-text">
            <h5>أمان تام</h5>
            <p>كل بياناتك مشفرة ومحفوظة في بيتك فقط، بعيداً عن أعين الغرباء.</p>
          </div>
        </div>
        <div class="perk-box" data-aos="fade-up" data-aos-delay="500">
          <HeadphonesIcon :size="30" class="perk-icon" />
          <div class="perk-text">
            <h5>دعم فني 24/7</h5>
            <p>نحن معك دائماً في أي وقت احتجت فيه للمساعدة التقنية أو التحديث.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Explanation Section -->
    <section id="about" class="explanation-section" data-aos="zoom-in-up">
      <div class="container grid-2">
        <div class="explanation-image">
          <div class="glass glass-img">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800" alt="Home Server Infrastructure" />
            <div class="experience-card glass float-up">
              <span class="font-en">+5</span>
              <span>سنوات خبرة</span>
            </div>
          </div>
        </div>
        <div class="explanation-content">
          <span class="badge">لماذا السيرفر المنزلي؟</span>
          <h2 class="mb-4">قل وداعاً لاشتراكات التخزين والخصوصية المنقوصة.</h2>
          <p>السيرفر المنزلي هو ببساطة كمبيوتر صغير وقوي يتم تثبيته في منزلك، يعمل كمركز لتجمع كل حياتك الرقمية.</p>
          
          <div class="feature-checklist">
            <div class="check-item">
              <Zap :size="20" class="text-primary" />
              <span>اربط موبايلك والتابلت والجهاز الماك بملفاتك من كل مكان.</span>
            </div>
            <div class="check-item">
              <Zap :size="20" class="text-primary" />
              <span>مساحة تخزينية ضخمة جداً (2 تيرا إلى 20 تيرا) وتصل لأبنائك وعائلتك.</span>
            </div>
            <div class="check-item">
              <Zap :size="20" class="text-primary" />
              <span>لا مزيد من الخوف من ضياع الصور أو اختراق الحسابات السحابية.</span>
            </div>
          </div>

          <p class="mt-4" data-aos="fade-up" data-aos-delay="400">نحن نهتم بالجانب التقني بالكامل؛ التثبيت، الضبط، الحماية، والتحديثات. أنت فقط استمتع بالمميزات.</p>
          <a href="#services" class="btn btn-outline mt-4" data-aos="fade-up" data-aos-delay="600">استكشف الخدمات المتاحة</a>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <ServicesGrid data-aos="fade-up" />

    <!-- Live Demo Section -->
    <LiveDemo data-aos="fade-in" />

    <!-- Pricing Section -->
    <Pricing data-aos="fade-up" />

    <!-- Final CTA -->
    <section class="cta-final text-center" data-aos="zoom-out-up">
      <div class="container">
        <div class="glass cta-box">
          <h2 class="section-title">مستعد لبدء تجربتك الرقمية الجديدة؟</h2>
          <p>تحدث مع خبرائنا اليوم لنساعدك في اختيار الباقة المناسبة لمنزلك أو شركتك.</p>
          <div class="cta-btns mt-4">
            <a href="https://wa.me/XXXXXXXXXX" target="_blank" class="btn btn-primary btn-lg">تواصل معنا عبر واتساب</a>
            <a href="#about" class="btn btn-outline btn-lg">اقرأ المزيد</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  overflow-x: hidden;
}

.perks-section {
  padding: 60px 0;
  background: rgba(0, 229, 255, 0.02);
  border-bottom: 1px solid var(--border);
}

.perks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.perk-box {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.perk-icon { color: var(--primary); }
.perk-text h5 { margin-bottom: 0.3rem; font-size: 1.1rem; }
.perk-text p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0; }

.explanation-section {
  background: radial-gradient(circle at center right, rgba(112, 0, 255, 0.03), transparent 30%);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 6rem;
}

.explanation-image {
  position: relative;
}

.glass-img {
  padding: 1rem;
  border-radius: 40px;
}

.glass-img img {
  width: 100%;
  border-radius: 30px;
  filter: brightness(0.8);
}

.experience-card {
  position: absolute;
  bottom: 2rem;
  right: -2rem;
  padding: 1.5rem 2.5rem;
  text-align: center;
}

.experience-card span:first-child {
  font-size: 2.2rem;
  font-weight: 800;
  display: block;
  color: var(--primary);
}

.feature-checklist {
  margin: 2.5rem 0;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.cta-final {
  padding: 120px 0;
}

.cta-box {
  padding: 6rem 4rem;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(112, 0, 255, 0.05) 100%);
}

.cta-btns {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.btn-lg {
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
}

.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1.5rem; }
.text-primary { color: var(--primary); }
.text-center { text-align: center; }

@media (max-width: 1024px) {
  .perks-grid, .grid-2 { grid-template-columns: 1fr; gap: 4rem; }
  .cta-btns { flex-direction: column; }
}
</style>
