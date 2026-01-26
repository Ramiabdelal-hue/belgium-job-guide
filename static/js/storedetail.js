    // ================== TRANSLATIONS ==================
const translations = {
    nl: { 
        back: "← Terug",
        route: "Route",
        hours: "Openingstijden:",
        closed: "Gesloten",
        findUs: "Waar kunt u ons vinden?",
        popularTitle: "🌟 Waar staan we om bekend?",
        web: "Website",
        aanbiedingen: "Lijst met artikelen en aanbiedingen 🔥",
        days: ["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"]
    },
    ar: { 
        back: "← رجوع",
        route: "الاتجاهات",
        hours: "أوقات العمل:",
        closed: "مغلق",
        aanbiedingen: "قائمة المنتجات والعروض 🔥",
        findUs: "أين تجدنا؟",
        popularTitle: "🌟 ما هو أكثر شيء يشتهر به المحل؟",
        web: "الموقع الإلكتروني",
        days: ["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"]
    },
    fr: { 
        back: "← Retour",
        route: "Itinéraire",
        hours: "Heures d'ouverture:",
        closed: "Fermé",
        aanbiedingen: "Liste des articles et des offres 🔥",
        findUs: "Où nous trouver ?",
        popularTitle: "🌟 Pour quoi sommes-nous connus ?",
        web: "Site Web",
        days: ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
    }
};

// ================== SET LANGUAGE ==================
function setLanguage(lang) {
    if (!translations[lang]) return;

    const map = {
        'txt-back': translations[lang].back,
        'txt-hours-title': translations[lang].hours,
        'txt-popular-title': translations[lang].popularTitle,
        'aanbiedingen-box': translations[lang].aanbiedingen // ترجمات صندوق العروض
    };

    for (const id in map) {
        const el = document.getElementById(id) || document.querySelector(`.${id}`);
        if (el) el.innerText = map[id];
    }

    updateHoursGrid(lang);
}

// ================== UPDATE HOURS ==================
function updateHoursGrid(lang) {
    const container = document.getElementById('hours-container');
    const hoursData = window.storeHoursData || {};
    if (!container) return;

    container.innerHTML = '';
    const daysEn = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    daysEn.forEach((dayEn, index) => {
        const times = hoursData[dayEn] || hoursData[dayEn.toLowerCase()];
        const dayName = translations[lang].days[index];

        let timeStr = translations[lang].closed;
        if (times && times.open && times.close) {
            timeStr = `${times.open} - ${times.close}`;
        }

        container.innerHTML += `
            <div class="weekly-row" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
                <span style="font-weight:600;">${dayName}</span>
                <span>${timeStr}</span>
            </div>`;
    });
}

// ================== LIGHTBOX ==================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
}

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
    // اللغة الافتراضية
    setLanguage('nl');

    // ربط أزرار اللغة
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
});

// إغلاق النافذة عند الضغط على زر Escape في الكيبورد
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});
