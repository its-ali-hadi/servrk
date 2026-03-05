<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { Mail, Phone, User, Send, MessageSquare, Instagram, Facebook } from 'lucide-vue-next'

const settings = ref({
  phone: '',
  whatsapp: '',
  email: '',
  instagram: '',
  facebook: '',
  tiktok: ''
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const API_URL = 'http://localhost:3031/api'

const fetchSettings = async () => {
  try {
    const res = await axios.get(`${API_URL}/settings`)
    settings.value = res.data
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

const handleSubmit = async () => {
  try {
    await axios.post(`${API_URL}/messages`, form)
    alert('تم استلام رسالتك بنجاح! سنتواصل معك قريباً.')
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (error) {
    alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.')
  }
}

onMounted(fetchSettings)
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-header text-center" data-aos="fade-up">
        <span class="badge">تواصل معنا</span>
        <h2 class="section-title gradient-text">هل لديك أي استفسار؟</h2>
        <p class="section-subtitle">فريقنا جاهز لمساعدتك في أي وقت. أرسل لنا رسالة أو تواصل معنا مباشرة عبر المنصات الاجتماعية.</p>
      </div>

      <div class="contact-content-grid">
        <!-- Contact Form Side -->
        <div class="contact-form-card glass" data-aos="fade-left">
          <form @submit.prevent="handleSubmit">
            <div class="form-group grid-2-form">
              <div class="input-wrapper">
                <label>الاسم الكامل</label>
                <div class="input-inner">
                  <User :size="18" class="input-icon" />
                  <input type="text" v-model="form.name" placeholder="أدخل اسمك هنا" required />
                </div>
              </div>
              <div class="input-wrapper">
                <label>رقم الجوال</label>
                <div class="input-inner">
                  <Phone :size="18" class="input-icon" />
                  <input type="tel" v-model="form.phone" placeholder="0XXXXXXXXXX" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <label>البريد الإلكتروني</label>
                <div class="input-inner">
                  <Mail :size="18" class="input-icon" />
                  <input type="email" v-model="form.email" placeholder="example@gmail.com" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <label>كيف يمكننا مساعدتك؟</label>
                <div class="input-inner textarea-inner">
                  <MessageSquare :size="18" class="input-icon textarea-icon" />
                  <textarea v-model="form.message" rows="4" placeholder="اكتب رسالتك هنا..." required></textarea>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-submit">
              <span>إرسال الرسالة</span>
              <Send :size="18" />
            </button>
          </form>
        </div>

        <!-- Social & Direct Contact Side -->
        <div class="contact-info-side" data-aos="fade-right">
          <div class="social-cards-container">
            <h3 class="mb-4">تواصل مباشر</h3>
            
            <!-- Prominent WhatsApp Card -->
            <a :href="'https://wa.me/' + settings.whatsapp" target="_blank" class="whatsapp-card glass-premium hover-lift">
              <div class="wa-icon-wrapper">
                <svg viewBox="0 0 24 24" class="wa-svg" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.658 1.43 5.63 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div class="wa-text">
                <h4>واتساب مباشر</h4>
                <p>تحدث معنا الآن للحصول على استشارة فورية</p>
              </div>
              <div class="wa-badge">متاح الآن</div>
            </a>

            <div class="social-mini-grid">
              <a :href="settings.instagram" target="_blank" class="social-mini-card glass hover-lift instagram">
                <Instagram :size="24" />
                <span>انستقرام</span>
              </a>
              <a :href="settings.facebook" target="_blank" class="social-mini-card glass hover-lift facebook">
                <Facebook :size="24" />
                <span>فيسبوك</span>
              </a>
              <a :href="settings.tiktok" target="_blank" class="social-mini-card glass hover-lift tiktok">
                <svg viewBox="0 0 24 24" class="icon-svg" fill="currentColor">
                  <path d="M12.525.02c1.31-.032 2.612-.019 3.91-.019.22 2.27 1.155 4.39 2.89 5.86.046.29.133.565.176.862-1.352-.026-2.704-.019-4.053-.01v10.518c.008 1.464-.53 3.016-1.69 3.985-1.574 1.34-3.95 1.565-5.698.544-2.126-1.258-2.67-4.225-1.07-6.108 1.144-1.39 3.123-1.928 4.792-1.325.02 1.353.052 2.705.074 4.056-.91-.497-2.185-.383-2.9 0.413-1.066 1.145-.25 3.155 1.25 3.323 1.053.116 2.18-.54 2.316-1.636.035-4.48.016-8.96.015-13.44.02-.998.014-2 .01-3.003h1.006z"/>
                </svg>
                <span>تيك توك</span>
              </a>
            </div>
          </div>

          <div class="contact-meta-info glass mt-4">
             <div class="meta-item">
               <div class="meta-icon"><Mail :size="20"/></div>
               <div class="meta-text">
                 <span>البريد الإلكتروني</span>
                 <strong><a style="text-decoration: none; color: white; cursor: pointer;" :href="'mailto:' + settings.email">{{ settings.email }}</a></strong>
               </div>
             </div>
             <div class="meta-item">
               <div class="meta-icon"><Phone :size="20"/></div>
               <div class="meta-text">
                 <span>دعم العملاء</span>
                 <strong><a style="text-decoration: none; color: white; cursor: pointer;" :href="'tel:' + settings.phone">{{ settings.phone }}</a></strong>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  background: radial-gradient(circle at bottom left, rgba(255, 140, 0, 0.05), transparent 40%);
}

.contact-header {
  margin-bottom: 5rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.contact-content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
}

.contact-form-card {
  padding: 3rem;
}

.grid-2-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-wrapper label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.95rem;
}

.input-inner {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 1.2rem;
  color: var(--primary);
  opacity: 0.7;
}

.input-inner input, 
.input-inner textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 3.2rem 1rem 1.2rem;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s;
}

.input-inner textarea {
  padding-right: 3.2rem;
  resize: none;
}

.input-inner input:focus, 
.input-inner textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.1);
}

.textarea-inner {
  align-items: flex-start;
}

.textarea-icon {
  top: 1.2rem;
}

.btn-submit {
  width: 100%;
  height: 60px;
  justify-content: center;
  margin-top: 1rem;
}

/* Contact Info Side */
.whatsapp-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  text-decoration: none;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(37, 211, 102, 0.05) 100%);
  border: 1px solid rgba(37, 211, 102, 0.3);
}

.wa-icon-wrapper {
  width: 54px;
  height: 54px;
  background: #25d366;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
}

.wa-svg { width: 30px; }

.wa-text h4 { font-size: 1.2rem; margin-bottom: 0.2rem; }
.wa-text p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

.wa-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(37, 211, 102, 0.2);
  color: #25d366;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  border: 1px solid rgba(37, 211, 102, 0.3);
}

.social-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.social-mini-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 0.8rem;
  text-decoration: none;
  color: var(--text-muted);
}

.social-mini-card span { font-size: 0.85rem; font-weight: 600; }
.social-mini-card:hover { color: var(--primary); }

.instagram:hover { color: #E1306C; }
.facebook:hover { color: #1877F2; }
.tiktok:hover { color: #fff; }

.icon-svg { width: 24px; height: 24px; }

.glass-premium {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
}

.meta-info-card {
  padding: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  border-bottom: 1px solid var(--border);
}

.meta-item:last-child {
  border-bottom: none;
}

.meta-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 140, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.meta-text span {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.meta-text strong {
  font-size: 1rem;
  color: var(--text-main);
}

.mt-4 { margin-top: 1.5rem; }
.mb-4 { margin-bottom: 1.5rem; }

@media (max-width: 1024px) {
  .contact-content-grid { grid-template-columns: 1fr; }
  .contact-form-card { padding: 2rem; }
}

@media (max-width: 640px) {
  .grid-2-form { grid-template-columns: 1fr; }
  .social-mini-grid { grid-template-columns: repeat(3, 1fr); }
  .social-mini-card span { display: none; }
}
</style>
