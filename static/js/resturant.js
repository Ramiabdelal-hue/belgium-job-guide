
const searchName = document.getElementById("searchName");
const searchCity = document.getElementById("searchCity");
const cards = document.querySelectorAll(".store-card");
const backText = document.getElementById("backText");

// 1. نظام اللغات (محدث ليشمل نص زر الرجوع)
const translations = {
    nl: { name: "Zoek op naam...", city: "Stad...", back: "Home" },
    ar: { name: "ابحث عن الاسم...", city: "المدينة...", back: "الرئيسية" },
    fr: { name: "Rechercher...", city: "Ville...", back: "Accueil" }
};

function setLanguage(lang) {
    searchName.placeholder = translations[lang].name;
    searchCity.placeholder = translations[lang].city;
    backText.innerText = translations[lang].back;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
    
    document.querySelectorAll('.langs button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
}
setLanguage(localStorage.getItem("lang") || "nl");

function filterStores() {
    const n = searchName.value.toLowerCase();
    const c = searchCity.value.toLowerCase();
    cards.forEach(card => {
        const show = card.dataset.name.includes(n) && card.dataset.city.includes(c);
        card.style.display = show ? "flex" : "none";
    });
}
searchName.addEventListener("input", filterStores);
searchCity.addEventListener("input", filterStores);

cards.forEach(card => {
    const r = parseFloat(card.dataset.rating) || 0;
    card.querySelector(".stars").innerHTML = "★".repeat(Math.floor(r)) + "☆".repeat(5 - Math.floor(r));
    card.querySelector(".rating-num").innerText = `(${r.toFixed(1)})`;
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});

cards.forEach(card => {
    card.addEventListener('click', function() {
        const v = this.querySelector('.views-badge span:first-child');
        let num = parseInt(v.innerText.replace(/\D/g,'')) || 0;
        v.innerText = `👁️ ${num + 1} views`;
    });
});
