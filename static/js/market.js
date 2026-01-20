/**
 * نظام إدارة المتاجر والخريطة - Belgium Guide
 */

// 1. تعريف العناصر الأساسية
const searchName = document.getElementById("searchName");
const searchCity = document.getElementById("searchCity");
const cards = document.querySelectorAll(".store-card");
const backText = document.getElementById("backText");

// 2. إعدادات الخريطة (Leaflet)
// سنقوم بتعريف الخريطة ومجموعة العلامات (Markers)
let map;
let markersLayer = L.layerGroup();

function initMap() {
    // إحداثيات مركزية لبلجيكا
    map = L.map('map').setView([50.8503, 4.3517], 8);

    // إضافة طبقة الخريطة (استخدام نمط يتناسب مع التصميم المظلم)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markersLayer.addTo(map);
    
    // تشغيل دالة إضافة العلامات للمتاجر
    updateMapMarkers();
}

// 3. دالة إضافة العلامات (Markers) بناءً على الكروت الموجودة
function updateMapMarkers() {
    // مسح العلامات القديمة قبل الإضافة الجديدة (مفيد عند الفلترة)
    markersLayer.clearLayers();

    cards.forEach(card => {
        // نتحقق مما إذا كان الكارت ظاهراً (غير مخفي بالفلترة)
        if (card.style.display !== "none") {
            const lat = parseFloat(card.dataset.lat);
            const lng = parseFloat(card.dataset.lng);
            const name = card.querySelector("h3").innerText;
            const url = card.getAttribute("href");

            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]);
                
                // تصميم النافذة المنبثقة عند النقر على النقطة
                marker.bindPopup(`
                    <div style="color: #000; font-family: 'Cairo', sans-serif; text-align: center;">
                        <strong>${name}</strong><br>
                        <a href="${url}" style="color: #00a3ff; text-decoration: none; font-size: 12px;">التفاصيل / Details</a>
                    </div>
                `);
                
                markersLayer.addLayer(marker);

                // ميزة إضافية: عند مرور الفأرة فوق الكارت، الخريطة تتحرك للمتجر
                card.addEventListener('mouseenter', () => {
                    map.flyTo([lat, lng], 12, { duration: 1 });
                    marker.openPopup();
                });
            }
        }
    });
}

// 4. نظام اللغات (Translations)
const translations = {
    nl: { name: "Zoek op naam...", city: "Stad...", back: "Home" },
    ar: { name: "ابحث عن الاسم...", city: "المدينة...", back: "الرئيسية" },
    fr: { name: "Rechercher...", city: "Ville...", back: "Accueil" }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    searchName.placeholder = translations[lang].name;
    searchCity.placeholder = translations[lang].city;
    if (backText) backText.innerText = translations[lang].back;
    
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    
    localStorage.setItem("lang", lang);

    // تحديث شكل الأزرار النشطة
    document.querySelectorAll('.langs button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
}

// 1. الفلترة التلقائية عند الكتابة
function autoFilter() {
    const n = document.getElementById("searchName").value.toLowerCase();
    const c = document.getElementById("searchCity").value.toLowerCase();
    
    document.querySelectorAll(".store-card").forEach(card => {
        const match = card.dataset.name.includes(n) && card.dataset.city.includes(c);
        card.style.display = match ? "flex" : "none";
    });
    if (typeof updateMarkers === "function") updateMarkers(); // تحديث الخريطة
}

// 2. ربط الأحداث بمجرد الكتابة (حذف زر البحث)
document.getElementById("searchName").addEventListener("input", autoFilter);
document.getElementById("searchCity").addEventListener("input", autoFilter);

// 3. تحديث اللغات لتشمل 3 أزرار
function setLanguage(lang) {
    const translations = {
        nl: { name: "Zoek op naam...", city: "Stad..." },
        ar: { name: "ابحث عن الاسم...", city: "المدينة..." },
        fr: { name: "Rechercher...", city: "Ville..." }
    };
    document.getElementById("searchName").placeholder = translations[lang].name;
    document.getElementById("searchCity").placeholder = translations[lang].city;
    document.documentElement.dir = (lang === "ar") ? "ltr" : "ltr";
    
    localStorage.setItem("lang", lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
}

// 6. عرض النجوم (Stars Rating)
function renderStars() {
    cards.forEach(card => {
        const rating = parseFloat(card.dataset.rating) || 0;
        const starContainer = card.querySelector(".stars");
        const numContainer = card.querySelector(".rating-num");
        
        if (starContainer) {
            starContainer.innerHTML = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
        }
        if (numContainer) {
            numContainer.innerText = `(${rating.toFixed(1)})`;
        }
    });
}

// 7. عداد المشاهدات الوهمي (تفاعل لحظي)
cards.forEach(card => {
    card.addEventListener('click', function() {
        const viewSpan = this.querySelector('.views-badge span:first-child');
        if (viewSpan) {
            let count = parseInt(viewSpan.innerText.replace(/\D/g, '')) || 0;
            viewSpan.innerText = `👁️ ${count + 1} views`;
        }
    });
});

// 8. تشغيل الأكواد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // تحديد اللغة المحفوظة أو الافتراضية
    setLanguage(localStorage.getItem("lang") || "nl");
    
    // رسم النجوم
    renderStars();
    
    // تشغيل الخريطة
    initMap();

    // ربط أحداث البحث
    searchName.addEventListener("input", filterStores);
    searchCity.addEventListener("input", filterStores);
});

// معالجة العودة للخلف في المتصفح لإعادة التحميل
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});