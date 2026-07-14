const translations = {
  th: {
    'x5b338n': 'และนี่คือ...',
    'hero-desc':  'เริ่มต้นสร้างเว็บสวยๆ ด้วย HTML และ CSS',
    'hero-btn':   'เริ่มต้นเลย',
    'nav-home':   'หน้าแรก',
    'nav-about':  'เกี่ยวกับ',
    'nav-contact':'ติดต่อ',
    // เพิ่มคีย์เหล่านี้ให้ตรงกับด้านล่างหากต้องการใช้งานจริง
    'description': 'รายละเอียด...',
    'member': 'สมาชิก',
    'merchant': 'ร้านค้า',
  },
  en: {
    'x5b338n': 'This is...',
    'hero-desc':  'Start building beautiful websites with HTML and CSS',
    'hero-btn':   'Get Started',
    'nav-home':   'Home',
    'nav-about':  'About',
    'nav-contact':'Contact',
  },
  fr: {
    'x5b338n': 'Voici c&apos;est...',
    'hero-desc':  'Commencez à créer de beaux sites Web avec HTML et CSS',
    'hero-btn':   'Commencer',
    'nav-home':   'Accueil',
    'nav-about':  'À propos',
    'nav-contact':'Contact',
  }
};

function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  
  const t = translations[lang];
  if (!t) return;
    
  const safeTranslate = (id, text) => {
    const element = document.getElementById(id);
    // ตรวจสอบเพิ่มเติมว่ามีข้อความส่งมาจริงเพื่อไม่ให้หน้าเว็บกลายเป็นค่าว่าง (undefined)
    if (element && text) { 
      element.innerHTML = text;
    }
  };
  
  // เรียกใช้งานตามคีย์ที่มีอยู่ในวัตถุ translations ด้านบน
  safeTranslate('x5b338n', t.x5b338n);
  safeTranslate('description', t.description);
  safeTranslate('member', t.member);
  safeTranslate('member-title', t.member);
  safeTranslate('merchant', t.merchant);
  safeTranslate('merch-des', t.merchdes);
  safeTranslate('titlelink', t.titlelink);
  safeTranslate('foot', t.foot);
  safeTranslate('merchInfo1', t.merchInfo1);
  safeTranslate('merchInfo2', t.merchInfo2);
  safeTranslate('visitmerch', t.visitmerch);
  
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    const labels = { fr: '🇫🇷 FR', th: '🇹🇭 TH', en: '🇬🇧 EN' };
    langBtn.innerHTML = `🌐 ${labels[lang] || lang.toUpperCase()} ▾`;
  }

  // ปิดเมนูหลังจากเลือกภาษาเสร็จทันที
  const langMenu = document.getElementById('lang-menu');
  if (langMenu) {
    langMenu.style.display = 'none';
  }
}

function toggleLangMenu() {
  const menu = document.getElementById("lang-menu");
  if (!menu) return;
  
  // ตรวจสอบค่าสไตล์จริงที่แสดงผลอยู่ปัจจุบัน (computed style) ป้องกันปัญหาเช็คเงื่อนไขไม่ติดในครั้งแรก
  const currentDisplay = window.getComputedStyle(menu).display;
  menu.style.display = (currentDisplay === "flex") ? "none" : "flex";
}

// 💡 ยุบรวมการดักจับคลิกข้างนอกเหลือเพียงชุดเดียว ปลอดภัยและทำงานแม่นยำกว่า
window.addEventListener('click', function(e) {
  const switcher = document.querySelector('.lang-switcher');
  const menu = document.getElementById('lang-menu');
  if (switcher && menu && !switcher.contains(e.target)) {
    menu.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'fr';
  setLang(savedLang);

  const navbar = document.querySelector('.navbar');
  // เช็คก่อนว่ามีคลาส .navbar อยู่บนหน้าเว็บจริงไหมเพื่อป้องกัน Error บน Console
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});

// ผูกฟังก์ชันไว้กับ Window เผื่อเรียกใช้ผ่าน onclick ใน HTML ดั้งเดิม
window.setLang = setLang;
window.toggleLangMenu = toggleLangMenu;
