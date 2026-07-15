const translations = {
  th: {
    'x5b338n': 'และนี่คือ...',
    'j76n33k': 'คำขวัญ',
    'k9035ee': 'ข้อตกลง',
    'a350377': 'เรื่องเล่า',
    'f40o8o1': 'คนที่เขียนโค้ดได้นิดหน่อย <br>แต่ก็ชอบเอาเวลาไปทุ่มกับภาษามากกว่า :/',
    'ability-title': 'ความสามารถ',
    'ability-card-title-1': 'การพัฒนาเว็บ',
    'ability-card-detail-1': 'สร้างเว็บไซต์ที่สะอาด ใช้งานได้จริง และทันสมัย',
    'ability-card-title-2': 'รองรับทุกหน้าจอ',
    'ability-card-detail-2': 'การออกแบบที่สวยงามบนหน้าจอทุกขนาด',
    'ability-card-title-3': 'ระบบหลายภาษา',
    'ability-card-detail-3': 'รองรับการแปลภาษาเพื่อผู้ใช้ทั่วโลก',
    'ability-card-title-4': 'ความรวดเร็ว',
    'ability-card-detail-4': 'เพิ่มประสิทธิภาพการโหลดที่เร็วเป็นพิเศษ',
    'ability-card-title-5': 'ความสวยงาม',
    'ability-card-detail-5': 'การออกแบบที่สดใสและการเปลี่ยนผ่านที่ราบรื่น',
  },
  en: {
    'x5b338n': 'This is...',
    'j76n33k': 'Motto',
    'k9035ee': 'Conditions',
    'a350377': 'Journals',
    'f40o8o1': 'One who is able to do coding, <br>but he always spends time on languages more than that :/',
    'ability-title': 'Abilities',
    'ability-card-title-1': 'Development',
    'ability-card-detail-1': 'Building clean, functional, and modern websites.',
    'ability-card-title-2': 'Responsive',
    'ability-card-detail-2': 'Designs that look stunning on any screen size.',
    'ability-card-title-3': 'Localization',
    'ability-card-detail-3': 'Multi-language support for global reach.',
    'ability-card-title-4': 'Speed',
    'ability-card-detail-4': 'Optimized performance for lightning fast load times.',
    'ability-card-title-5': 'Aesthetics',
    'ability-card-detail-5': 'Vibrant designs and sleek transitions.',
  },
  fr: {
    'x5b338n': 'Voici c&apos;est...',
    'j76n33k':  'Devise',
    'k9035ee':  'Conditions',
    'a350377':  'Journaux',
    'f40o8o1': 'Celui qui peut faire un peu de codage. <br>Mais il passe toujours du temps sur les langues. :/',
    'ability-title': 'Capacités',
    'ability-card-title-1': 'Développement',
    'ability-card-detail-1': 'Création de sites Web propres, fonctionnels et modernes.',
    'ability-card-title-2': 'Adaptatif',
    'ability-card-detail-2': 'Des designs superbes sur toutes les tailles d&apos;écran.',
    'ability-card-title-3': 'Localisation',
    'ability-card-detail-3': 'Support multilingue pour une portée mondiale.',
    'ability-card-title-4': 'Vitesse',
    'ability-card-detail-4': 'Performances optimisées pour un chargement ultra-rapide.',
    'ability-card-title-5': 'Esthétique',
    'ability-card-detail-5': 'Designs vibrants et transitions fluides.',
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
  safeTranslate('a350377', t.a350377);

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
