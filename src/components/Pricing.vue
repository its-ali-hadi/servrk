<script setup>
import { ref, onMounted } from 'vue'
import api from '../api.js'
import { Check } from 'lucide-vue-next'

const tiers = ref([])
const loading = ref(true)

const fetchPackages = async () => {
  try {
    const res = await api.get('/packages')
    tiers.value = res.data.map(pkg => ({
      ...pkg,
      features: pkg.details.split('\n'),
      recommended: pkg.is_popular === 1
    }))
  } catch (error) {
    console.error('Error fetching packages:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPackages)
</script>

<template>
  <section id="pricing" class="pricing-section">
    <div class="container text-center mb-5">
      <span class="badge">باقات الأسعار</span>
      <h2 class="section-title">استثمار يدوم... <span class="gradient-text">بدون اشتراك شهري</span></h2>
      <p class="pricing-intro">اشتري لمرة واحدة، واحصل على دعم فني وتقني مدى الحياة.</p>
    </div>

    <div v-if="loading" class="container text-center">
      <p>جاري تحميل الباقات...</p>
    </div>

    <div v-else class="container pricing-grid">
      <div v-for="(t, i) in tiers" :key="t.id" 
           class="glass pricing-card hover-lift" 
           :class="{ recommended: t.recommended }" 
           data-aos="fade-up" :data-aos-delay="i * 200">
        
        <div v-if="t.recommended" class="badge-recommended">الأكثر طلباً</div>
        
        <div class="card-header">
          <h3>{{ t.name }}</h3>
        </div>
        
        <div class="price-container">
          <div class="price">
            <span class="currency font-en">$</span>
            <span class="amount font-en">{{ t.price }}</span>
          </div>
          <span class="once">دفع لمرة واحدة مدى الحياة</span>
        </div>

        <ul class="tier-features">
          <li v-for="(f, fi) in t.features" :key="fi">
            <Check :size="20" class="check-icon" />
            <span>{{ f }}</span>
          </li>
        </ul>

        <div class="card-footer">
          <a href="#contact" class="btn btn-block" :class="t.recommended ? 'btn-primary' : 'btn-outline'">
            ابدأ رحلتك الآن
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  position: relative;
  padding: 150px 0;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: stretch;
}

.pricing-card {
  padding: 4rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.recommended {
  border: 2px solid var(--primary);
  background: rgba(255, 140, 0, 0.02);
  box-shadow: 0 20px 50px rgba(255, 140, 0, 0.1);
  transform: scale(1.05);
}

.recommended:hover {
  transform: scale(1.07) translateY(-10px);
}

.badge-recommended {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient-main);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 800;
  color: white;
  box-shadow: 0 5px 15px var(--primary-glow);
}

.card-header h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.price-container {
  margin: 2rem 0;
}

.price {
  margin-bottom: 0.5rem;
}

.currency { font-size: 2rem; font-weight: 700; color: var(--primary); vertical-align: top; margin-right: 5px; }
.amount { font-size: 5rem; font-weight: 900; line-height: 1; }
.once { font-size: 0.9rem; color: var(--text-muted); opacity: 0.8; }

.tier-features {
  list-style: none;
  margin-bottom: 2.5rem;
  text-align: right;
  flex: 1;
}

.tier-features li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
  font-weight: 500;
}

.check-icon {
  color: var(--primary);
  background: rgba(255, 140, 0, 0.1);
  border-radius: 50%;
  padding: 3px;
  flex-shrink: 0;
}

.btn-block { width: 100%; justify-content: center; }

@media (max-width: 1024px) {
  .pricing-grid { grid-template-columns: 1fr; gap: 4rem; }
  .recommended { transform: scale(1); }
  .recommended:hover { transform: translateY(-10px); }
}
</style>
