const translations = {
  th: {
    'x5b338n': 'และนี่คือ...',
    'j76n33k':  'คำขวัญ',
    'k9035ee':  'ข้อตกลง',
  },
  en: {
    'x5b338n': 'This is...',
    'j76n33k':  'Motto',
    'k9035ee':  'Conditions',
  },
  fr: {
    'x5b338n': 'Voici c&apos;est...',
    'j76n33k':  'Devise',
    'k9035ee':  'Conditions',
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
  safeTranslate('j76n33k', t.j76n33k);
    safeTranslate('k9035ee', t.k9035ee);
  
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    const labels = { fr: 'FR', th: 'TH', en: 'EN' };
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
