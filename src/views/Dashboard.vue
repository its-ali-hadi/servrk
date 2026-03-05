<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api.js'
import { 
  MessageSquare, 
  Package, 
  Plus, 
  Trash2, 
  Edit3,
  LogOut,
  Clock,
  User,
  Phone,
  Mail,
  XCircle,
  Settings,
  Save,
  Instagram,
  Facebook,
  Share2,
  CheckCircle,
  Eye
} from 'lucide-vue-next'

const router = useRouter()
const activeTab = ref('messages')
const messages = ref([])
const packages = ref([])
const showPackageModal = ref(false)
const modalMode = ref('add') // 'add' or 'edit'
const editingPackageId = ref(null)

const settings = ref({
  phone: '',
  whatsapp: '',
  email: '',
  instagram: '',
  facebook: '',
  tiktok: '',
  passcode: ''
})

const packageForm = reactive({
  name: '',
  price: '',
  details: '',
  is_popular: false
})

const fetchData = async () => {
  try {
    const [msgRes, pkgRes, settingsRes] = await Promise.all([
      api.get('/messages'),
      api.get('/packages'),
      api.get('/settings')
    ])
    messages.value = msgRes.data
    packages.value = pkgRes.data
    settings.value = settingsRes.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const openAddModal = () => {
  modalMode.value = 'add'
  packageForm.name = ''
  packageForm.price = ''
  packageForm.details = ''
  packageForm.is_popular = false
  showPackageModal.value = true
}

const openEditModal = (pkg) => {
  modalMode.value = 'edit'
  editingPackageId.value = pkg.id
  packageForm.name = pkg.name
  packageForm.price = pkg.price
  packageForm.details = pkg.details
  packageForm.is_popular = pkg.is_popular === 1
  showPackageModal.value = true
}

const handlePackageSubmit = async () => {
  try {
    if (modalMode.value === 'add') {
      await api.post('/packages', packageForm)
    } else {
      await api.put(`/packages/${editingPackageId.value}`, packageForm)
    }
    showPackageModal.value = false
    fetchData()
  } catch (error) {
    alert('حدث خطأ أثناء معالجة العملية')
  }
}

const deletePackage = async (id) => {
  if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
    try {
      await api.delete(`/packages/${id}`)
      fetchData()
    } catch (error) {
      alert('حدث خطأ أثناء الحذف')
    }
  }
}

const markAsRead = async (id) => {
  try {
    await api.put(`/messages/${id}/read`)
    fetchData()
  } catch (error) {
    console.error('Error marking as read:', error)
  }
}

const updateSettings = async () => {
  try {
    await api.post('/settings', settings.value)
    alert('تم حفظ الإعدادات بنجاح')
  } catch (error) {
    alert('حدث خطأ أثناء حفظ الإعدادات')
  }
}

const handleLogout = () => {
  localStorage.removeItem('servrk_auth')
  router.push('/login')
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('ar-EG', options)
}

onMounted(fetchData)
</script>

<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar glass">
      <div class="sidebar-header">
        <h2 class="gradient-text font-en">SERVRK</h2>
        <p>لوحة التحكم</p>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          :class="['nav-item', { active: activeTab === 'messages' }]"
          @click="activeTab = 'messages'"
        >
          <MessageSquare :size="20" />
          <span>الرسائل الواردة</span>
          <span class="badge-count" v-if="messages.filter(m => !m.is_read).length">
            {{ messages.filter(m => !m.is_read).length }}
          </span>
        </button>
        
        <button 
          :class="['nav-item', { active: activeTab === 'packages' }]"
          @click="activeTab = 'packages'"
        >
          <Package :size="20" />
          <span>إدارة الباقات</span>
        </button>

        <button 
          :class="['nav-item', { active: activeTab === 'settings' }]"
          @click="activeTab = 'settings'"
        >
          <Settings :size="20" />
          <span>إعدادات التواصل</span>
        </button>
      </nav>
      
      <div class="sidebar-footer">
        <button @click="handleLogout" class="nav-item logout">
          <LogOut :size="20" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <header class="content-header">
        <h1>
          {{ 
            activeTab === 'messages' ? 'الرسائل الواردة' : 
            activeTab === 'packages' ? 'إدارة الباقات والعروض' : 
            'إعدادات التواصل والنظام'
          }}
        </h1>
        <button v-if="activeTab === 'packages'" class="btn btn-primary btn-sm" @click="openAddModal">
          <Plus :size="18" />
          <span>إضافة باقة جديدة</span>
        </button>
        <button v-if="activeTab === 'settings'" class="btn btn-primary btn-sm" @click="updateSettings">
          <Save :size="18" />
          <span>حفظ التغييرات</span>
        </button>
      </header>

      <!-- Messages View -->
      <section v-if="activeTab === 'messages'" class="messages-view">
        <div v-if="messages.length === 0" class="empty-state glass">
          <MessageSquare :size="48" />
          <p>لا توجد رسائل حالية</p>
        </div>
        
        <div class="messages-grid">
          <div v-for="msg in messages" :key="msg.id" 
               :class="['message-card glass hover-lift', { 'is-read': msg.is_read }]">
            <div class="msg-status-ribbon" v-if="!msg.is_read">جديد</div>
            <div class="msg-header">
              <div class="user-info">
                <div class="avatar"><User :size="20" /></div>
                <div>
                  <h3>{{ msg.name }}</h3>
                  <span class="date"><Clock :size="14" /> {{ formatDate(msg.created_at) }}</span>
                </div>
              </div>
              <button v-if="!msg.is_read" class="btn-mark-read" @click="markAsRead(msg.id)" title="تميز كمقروء">
                <CheckCircle :size="18" />
                <span>تميز كمقروء</span>
              </button>
            </div>
            
            <div class="msg-body">
              <p>{{ msg.message }}</p>
            </div>
            
            <div class="msg-footer">
              <div class="meta">
                <Mail :size="14" /> {{ msg.email }}
              </div>
              <div class="meta">
                <Phone :size="14" /> {{ msg.phone }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Packages View -->
      <section v-if="activeTab === 'packages'" class="packages-view">
        <div class="packages-table-container glass">
          <table class="packages-table">
            <thead>
              <tr>
                <th>اسم الباقة</th>
                <th>السعر</th>
                <th>المميزات</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pkg in packages" :key="pkg.id">
                <td><strong>{{ pkg.name }}</strong></td>
                <td><span class="price-tag">{{ pkg.price }}$</span></td>
                <td>
                  <ul class="details-mini">
                    <li v-for="(line, i) in pkg.details.split('\n')" :key="i">
                      {{ line }}
                    </li>
                  </ul>
                </td>
                <td>
                  <span :class="['status-badge', pkg.is_popular ? 'popular' : 'standard']">
                    {{ pkg.is_popular ? 'الأكثر طلباً' : 'عادية' }}
                  </span>
                </td>
                <td>
                  <div class="actions-flex">
                    <button class="btn-action edit" @click="openEditModal(pkg)" title="تعديل">
                      <Edit3 :size="18" />
                    </button>
                    <button class="btn-action delete" @click="deletePackage(pkg.id)" title="حذف">
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Settings View -->
      <section v-if="activeTab === 'settings'" class="settings-view">
        <div class="settings-grid">
          <div class="settings-card glass">
            <h3 class="mb-4"><Phone :size="20" class="text-primary"/> معلومات الاتصال</h3>
            <div class="form-group">
              <label>رقم الهاتف المعروض</label>
              <input v-model="settings.phone" type="text" placeholder="+964..." />
            </div>
            <div class="form-group">
              <label>رقم الواتساب (بدون + او اصفار)</label>
              <input v-model="settings.whatsapp" type="text" placeholder="9647700000000" />
            </div>
            <div class="form-group">
              <label>البريد الإلكتروني الرسمي</label>
              <input v-model="settings.email" type="email" placeholder="info@servrk.com" />
            </div>
          </div>

          <div class="settings-card glass">
            <h3 class="mb-4"><Share2 :size="20" class="text-primary"/> روابط التواصل الاجتماعي</h3>
            <div class="form-group">
              <label><Instagram :size="18" /> انستقرام</label>
              <input v-model="settings.instagram" type="text" placeholder="https://instagram.com/..." />
            </div>
            <div class="form-group">
              <label><Facebook :size="18" /> فيسبوك</label>
              <input v-model="settings.facebook" type="text" placeholder="https://facebook.com/..." />
            </div>
            <div class="form-group">
              <label>تيك توك</label>
              <input v-model="settings.tiktok" type="text" placeholder="https://tiktok.com/@..." />
            </div>
          </div>

          <div class="settings-card glass">
            <h3 class="mb-4"><Eye :size="20" class="text-primary"/> أمان لوحة التحكم</h3>
            <div class="form-group">
              <label>رمز الدخول الجديد</label>
              <input v-model="settings.passcode" type="password" placeholder="أدخل الرمز هنا" />
              <small class="text-muted">هذا الرمز يستخدم لتسجيل الدخول للوحة التحكم</small>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Package Modal (Add/Edit) -->
    <div v-if="showPackageModal" class="modal-overlay">
      <div class="modal-content glass">
        <div class="modal-header">
          <h2>{{ modalMode === 'add' ? 'إضافة باقة جديدة' : 'تعديل باقة' }}</h2>
          <button @click="showPackageModal = false"><XCircle :size="24" /></button>
        </div>
        <form @submit.prevent="handlePackageSubmit" class="modal-form">
          <div class="form-group">
            <label>اسم الباقة</label>
            <input v-model="packageForm.name" type="text" placeholder="مثلاً: باقة العائلة" required />
          </div>
          
          <div class="form-group">
            <label>السعر (بالدولار)</label>
            <input v-model="packageForm.price" type="text" placeholder="199" required />
          </div>
          
          <div class="form-group">
            <label>تفاصيل الباقة (كل سطر يعتبر نقطة)</label>
            <textarea v-model="packageForm.details" rows="5" placeholder="مساحة 5 تيرا&#10;دعم فني" required></textarea>
          </div>
          
          <div class="form-group checkbox">
            <input v-model="packageForm.is_popular" type="checkbox" id="is_popular" />
            <label for="is_popular">تمييز كـ "الأكثر طلباً"</label>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="showPackageModal = false">إلغاء</button>
            <button type="submit" class="btn btn-primary">
              {{ modalMode === 'add' ? 'حفظ الباقة' : 'تحديث الباقة' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: var(--bg-dark);
  color: white;
  direction: rtl;
}

/* Sidebar */
.sidebar {
  width: 280px;
  border-radius: 0;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header { margin-bottom: 3rem; text-align: center; }
.sidebar-header h2 { font-size: 1.8rem; margin-bottom: 0.2rem; }
.sidebar-header p { color: var(--text-muted); font-size: 0.9rem; }

.sidebar-nav { flex: 1; }

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 0.5rem;
  text-decoration: none;
}

.nav-item:hover, .nav-item.active { background: rgba(255, 140, 0, 0.1); color: var(--primary); }
.badge-count { margin-right: auto; background: var(--primary); color: white; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.8rem; }
.logout { margin-top: auto; color: #ff4444; }

/* Main Content */
.content { flex: 1; padding: 3rem; background: radial-gradient(circle at top right, rgba(255, 140, 0, 0.05), transparent 40%); }
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
.content-header h1 { font-size: 2rem; }

/* Messages Grid */
.messages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 2rem; }
.message-card { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; position: relative; overflow: hidden; }
.message-card.is-read { opacity: 0.6; }

.msg-status-ribbon {
  position: absolute;
  top: 10px;
  left: -30px;
  background: var(--primary);
  color: white;
  padding: 5px 35px;
  font-size: 0.7rem;
  font-weight: 800;
  transform: rotate(-45deg);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.user-info { display: flex; gap: 1rem; align-items: center; }
.avatar { width: 45px; height: 45px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }
.user-info h3 { font-size: 1.15rem; margin: 0; }
.date { font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; }

.btn-mark-read {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
  border: 1px solid rgba(37, 211, 102, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.3s;
}
.btn-mark-read:hover { background: #25d366; color: white; }

.msg-body p { color: var(--text-main); line-height: 1.7; font-size: 0.95rem; }
.msg-footer { display: flex; flex-wrap: wrap; gap: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
.meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); }

/* Packages Table */
.packages-table-container { overflow: hidden; padding: 1rem; }
.packages-table { width: 100%; border-collapse: collapse; text-align: right; }
.packages-table th { padding: 1.5rem; border-bottom: 1px solid var(--border); color: var(--text-muted); font-weight: 600; }
.packages-table td { padding: 1.5rem; border-bottom: 1px solid var(--border); }
.price-tag { background: rgba(255, 140, 0, 0.1); color: var(--primary); padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 800; }
.details-mini { list-style: none; font-size: 0.85rem; color: var(--text-muted); }
.details-mini li::before { content: '•'; color: var(--primary); margin-left: 0.5rem; }
.status-badge { padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
.status-badge.popular { background: #25d36622; color: #25d366; }
.status-badge.standard { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }

.actions-flex { display: flex; gap: 0.8rem; }
.btn-action { border: none; padding: 0.6rem; border-radius: 8px; cursor: pointer; transition: 0.3s; }
.btn-action.edit { background: rgba(255, 140, 0, 0.1); color: var(--primary); }
.btn-action.edit:hover { background: var(--primary); color: white; }
.btn-action.delete { background: rgba(255, 68, 68, 0.1); color: #ff4444; }
.btn-action.delete:hover { background: #ff4444; color: white; }

/* Settings View */
.settings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem; }
.settings-card { padding: 2.5rem; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 2rem; }
.modal-content { width: 100%; max-width: 600px; padding: 3rem; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.modal-header button { background: none; border: none; color: var(--text-muted); cursor: pointer; }
.modal-form .form-group { margin-bottom: 1.5rem; }
.modal-form label, .settings-card label { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.8rem; font-weight: 600; }
.modal-form input, .modal-form textarea, .settings-card input { width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); padding: 1rem; color: white; border-radius: 12px; font-family: inherit; }
.checkbox { display: flex; align-items: center; gap: 1rem; }
.checkbox input { width: auto; }
.modal-actions { display: flex; gap: 1.5rem; margin-top: 2rem; }
.modal-actions .btn { flex: 1; justify-content: center; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 5rem; color: var(--text-muted); }
.text-primary { color: var(--primary); }
.text-muted { color: var(--text-muted); font-size: 0.8rem; display: block; margin-top: 0.4rem; }
</style>
