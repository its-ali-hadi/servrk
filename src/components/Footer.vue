<script setup>
import { ref, onMounted } from 'vue'
import api from '../api.js'
import { Mail, Phone, Instagram, Facebook } from 'lucide-vue-next'

const settings = ref({
  phone: '',
  email: '',
  instagram: '',
  facebook: '',
  tiktok: ''
})

const fetchSettings = async () => {
  try {
    const res = await api.get('/settings')
    settings.value = res.data
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

onMounted(fetchSettings)
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <h3 class="gradient-text font-en">SERVRK</h3>
        <p>نحن نحول منزلك إلى مساحة ذكية وآمنة. متخصصون في حلول التخزين السحابي الخاص والسيرفرات المنزلية للأفراد والشركات.</p>
        <div class="social-links">
          <a :href="settings.instagram" target="_blank"><Instagram /></a>
          <a :href="settings.facebook" target="_blank"><Facebook /></a>
          <a :href="settings.tiktok" target="_blank">
            <svg viewBox="0 0 24 24" style="width: 20px; fill: currentColor;">
              <path d="M12.525.02c1.31-.032 2.612-.019 3.91-.019.22 2.27 1.155 4.39 2.89 5.86.046.29.133.565.176.862-1.352-.026-2.704-.019-4.053-.01v10.518c.008 1.464-.53 3.016-1.69 3.985-1.574 1.34-3.95 1.565-5.698.544-2.126-1.258-2.67-4.225-1.07-6.108 1.144-1.39 3.123-1.928 4.792-1.325.02 1.353.052 2.705.074 4.056-.91-.497-2.185-.383-2.9 0.413-1.066 1.145-.25 3.155 1.25 3.323 1.053.116 2.18-.54 2.316-1.636.035-4.48.016-8.96.015-13.44.02-.998.014-2 .01-3.003h1.006z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <h4>روابط سريعة</h4>
        <ul>
          <li><a href="#about">ما هو السيرفر المنزلي؟</a></li>
          <li><a href="#services">الخدمات المتاحة</a></li>
          <li><a href="#pricing">الباقات والأسعار</a></li>
          <li><a href="#contact">طلب خدمة</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h4>تواصل معنا</h4>
        <div class="contact-item">
          <Phone :size="18" />
          <span>{{ settings.phone }}</span>
        </div>
        <div class="contact-item">
          <Mail :size="18" />
          <span>{{ settings.email }}</span>
        </div>
        <p class="mt-4">العراق - بغداد</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container bottom-flex">
        <p>&copy; 2024 SERVRK - جميع الحقوق محفوظة</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 80px 0 0;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--border);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 5rem;
  margin-bottom: 5rem;
}

.footer-info h3 { font-size: 2rem; margin-bottom: 1.5rem; }
.footer-info p { color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem; }

.social-links { display: flex; gap: 1.5rem; }
.social-links a { color: var(--text-muted); transition: color 0.3s; }
.social-links a:hover { color: var(--primary); }

.footer-links h4, .footer-contact h4 { margin-bottom: 2rem; font-size: 1.2rem; }
.footer-links ul { list-style: none; }
.footer-links ul li { margin-bottom: 1rem; }
.footer-links ul li a { text-decoration: none; color: var(--text-muted); transition: color 0.3s; }
.footer-links ul li a:hover { color: var(--primary); padding-right: 5px; }

.contact-item { display: flex; align-items: center; gap: 1rem; color: var(--text-muted); margin-bottom: 1.2rem; }

.footer-bottom { border-top: 1px solid var(--border); padding: 2rem 0; }
.bottom-flex { display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.9rem; }

.mt-4 { margin-top: 2rem; }

@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
