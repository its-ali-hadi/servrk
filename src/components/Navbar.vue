<template>
  <nav class="glass navbar-main">
    <div class="container nav-content">
      <div class="logo">
        <span class="gradient-text font-en uppercase">SERVRK</span>
        <span class="logo-sub">سيرفرك للخدمات التقنية</span>
      </div>
      <ul class="nav-links">
        <li><a href="#about">ما هو السيرفر؟</a></li>
        <li><a href="#services">خدماتنا</a></li>
        <li><a href="#pricing">الباقات</a></li>
        <li><a href="#contact" class="btn btn-primary btn-sm">تواصل معنا</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar-main {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1100px;
  z-index: 1000;
  padding: 0.8rem 2rem;
  border-radius: 100px !important;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-sub {
  font-size: 0.7rem;
  opacity: 0.6;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

.btn-sm {
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
}
</style>
