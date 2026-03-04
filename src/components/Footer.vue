<script setup>
import { Mail, Phone, Instagram, Twitter, Github } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <h3 class="gradient-text font-en">SERVRK</h3>
        <p>نحن نحول منزلك إلى مساحة ذكية وآمنة. متخصصون في حلول التخزين السحابي الخاص والسيرفرات المنزلية للأفراد والشركات.</p>
        <div class="social-links">
          <a href="#"><Instagram /></a>
          <a href="#"><Twitter /></a>
          <a href="#"><Github /></a>
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

      <div class="footer-contact" id="contact">
        <h4>تواصل معنا</h4>
        <div class="contact-item">
          <Phone :size="18" />
          <span>+966 5XX XXX XXX</span>
        </div>
        <div class="contact-item">
          <Mail :size="18" />
          <span>hello@servrk.com</span>
        </div>
        <p class="mt-4">المملكة العربية السعودية <br>الرياض - المنطقة الإدارية</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container bottom-flex">
        <p>&copy; 2024 SERVRK - جميع الحقوق محفوظة</p>
        <p>صنع بحب لخدمة التقنية العربية</p>
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
