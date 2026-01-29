/* ================= TRANSLATIONS ================= */

const translations = {
    nl: {
        navM: "🏪 Halal winkels", navD: "⚕️ Docter", navR: "🍽️ Resto Halal", navK: "✂️ Kappers",
        navC: "🚗 Auto ", navN: "🇧🇪 Nieuwkomers", navO: "✨ Over ons",
        hT: "Welkom",
        hD: "Uw betrouwbare gids voor diensten en Halal Turks-Arabische winkels en  in België..",
        tM: "🏪 Winkels", mc1: "Supermarkten", mc2: "Slagerijen", mc3: "Halal Banketbakkers",
        tR: "🍽️ Halal Restaurants", rc1: "Arabisch", rc2: "Turks", rc3: "Andere",
        kB: "✂️ Kappers", kc1: "Arabische kappers", kc2: "Turks kappers",
        subC1: "Garage & Mechaniek", subC2: "Rijscholen", subC3: "Taxi",
        tDr: "⚕️ Medische Diensten", dr1: "Huisartsen", dr2: "Tandartsen",
        tN: "🇧🇪 Nieuwkomers", nc1: "Gemeente", nc2: "Verblijf", nc3: "Werk", nc4: "Taal", nc5: "Tips",
        ns1: "Immigratieadvocaten", ns2: "Vertaalbureaus", ns3: "Sociaal adviseurs",
        tick: "Welkom bij Dalel Belgium 🇧🇪 Ontworpen en ontwikkeld door Rami Abdelal",
        dir: "ltr",
        tO: "✨ Over ons binnenkort...",
        cta: "➕  Als u een winkel of dienst wilt toevoegen, klik dan hier A.U.B  ➕"
    },
    ar: {
        navM: "🏪 محلات الحلال", navD: "⚕️ دكتور", navR: "🍽️ مطاعم حلال", navK: "✂️ الحلاقين",
        navC: "🚗 السيارات", navN: "🇧🇪 دليل الجدد", navO: "✨ معلومات عنا",
        hT: "أهلاً وسهلاً",
        hD: "دليلكم الموثوق للخدمات والمحلات العربية الحلال والتركية في بلجيكا.",
        tM: "🏪 المحلات", mc1: "سوبر ماركت", mc2: "لحوم حلال", mc3: "محلات حلويات",
        tR: "🍽️ مطاعم حلال", rc1: "مطاعم عربية", rc2: "مطاعم تركية", rc3: "مطاعم متنوعة",
        kB: "✂️ الحلاقين", kc1: "حلاقين عرب", kc2: "حلاقين أتراك",
        subC1: "ميكانيك عام", subC2: "مدارس تعليم السياقة", subC3: "تاكسي",
        tDr: "⚕️ الخدمات الطبية", dr1: "طبيب عام", dr2: "طبيب أسنان",
        tN: "🇧🇪 دليل الجدد", nc1: "البلدية", nc2: "الإقامة", nc3: "البحث عن عمل", nc4: "تعلم اللغة", nc5: "نصائح مهمة",
        ns1: "محامو الهجرة", ns2: "مكاتب الترجمة", ns3: "مستشار اجتماعي",
        tick: "أهلاً بكم في دليل بلجيكا 🇧🇪 تصميم وتطوير رامي عبد العال",
        dir: "ltr",
        tO: "✨ خدمات قريباً...",
        cta: "➕  إذا كنت ترغب في إضافة متجر أو أي خدمة، يرجى النقر هنا  ➕"
    },
    fr: {
        navM: "🏪 Magasins", navD: "⚕️ Docteur", navR: "🍽️ Restaurants", navK: "✂️ Coiffeurs",
        navC: "🚗 Auto", navN: "🇧🇪 Nouveaux", navO: "✨ A propos de nous",
        hT: "Bienvenue",
        hD: "Votre guide fiable des boutiques et services halal et turco-arabes en Belgique.",
        tM: "🏪 Magasins", mc1: "Supermarchés", mc2: "Boucheries", mc3: "Pâtisseries Halal",
        tR: "🍽️ Restaurants", rc1: "Arabes", rc2: "Turcs", rc3: "Divers",
        kB: "✂️ Coiffeurs", kc1: "Coiffeurs Arabes", kc2: "Coiffeurs Turcs",
        subC1: "Garage & Mécanique", subC2: "École de conduite", subC3: "Taxi",
        tDr: "⚕️ Services Médicaux", dr1: "Médecin Généraliste", dr2: "Dentistes",
        tN: "🇧🇪 Nouveaux", nc1: "Commune", nc2: "Séjour", nc3: "Travail", nc4: "Langue", nc5: "Conseils",
        ns1: "Avocats d'immigration", ns2: "Bureaux de traduction", ns3: "Conseillers sociaux",
        tick: "Bienvenue chez Dalel Belgium 🇧🇪 Conçu et développé par Rami Abdelal",
        dir: "ltr",
        tO: "✨ Services bientôt...",
        cta: "➕  Si vous souhaitez ajouter une boutique ou un service, veuillez cliquer ici  ➕"
    }
};

/* ================= GENERAL FUNCTIONS ================= */

function toggleMenu() {
    const links = document.getElementById('menuLinks');
    if (links) links.classList.toggle('show');
}

function navAction(id) {
    showSection(id);
    if (window.innerWidth <= 992) toggleMenu();
}

function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
    const section = document.getElementById(id);
    if (section) section.classList.add('active-section');

    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-nav'));
    const activeNav = document.querySelector(`a[onclick*="${id}"]`);
    if (activeNav) activeNav.classList.add('active-nav');
}

/* ================= LANGUAGE SWITCH ================= */

function changeLang(lang) {
    const d = translations[lang];
    if (!d) return;

    document.body.dir = d.dir;

    updateText('nav-market', d.navM);
    updateText('nav-res', d.navR);
    updateText('nav-Dr', d.navD);
    updateText('nav-kappers', d.navK);
    updateText('nav-cars', d.navC);
    updateText('nav-newcomers', d.navN);
    updateText('nav-about', d.navO);

    updateText('hero-title', d.hT);
    updateText('hero-desc', d.hD);
    updateText('hero-cta', d.cta);
    updateText('tick-text', d.tick);

    updateText('title-market', d.tM);
    updateText('m-c1', d.mc1);
    updateText('m-c2', d.mc2);
    updateText('m-c3', d.mc3);

    updateText('title-res', d.tR);
    updateText('r-c1', d.rc1);
    updateText('r-c2', d.rc2);
    updateText('r-c3', d.rc3);

    updateText('title-kappers', d.kB);
    updateText('l-k1', d.kc1);
    updateText('l-k2', d.kc2);

    updateText('sub-c1', d.subC1);
    updateText('sub-c2', d.subC2);
    updateText('sub-c3-taxi', d.subC3);

    updateText('title-Dr', d.tDr);
    updateText('dr-c1', d.dr1);
    updateText('dr-c2', d.dr2);

    updateText('title-newcomers', d.tN);
    updateText('n-c1', d.nc1);
    updateText('n-c2', d.nc2);
    updateText('n-c3', d.nc3);
    updateText('n-c4', d.nc4);
    updateText('n-c5', d.nc5);

    updateText('n-s1', d.ns1);
    updateText('n-s2', d.ns2);
    updateText('n-s3', d.ns3);

    updateText('title-others', d.tO);

    updateVisitorLang(lang);

    document.querySelectorAll('.langs span').forEach(s => s.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
}

/* ================= VISITOR COUNTER ================= */

const visitorText = {
    nl: "Bezoekers",
    ar: "عدد الزوار",
    fr: "Visiteurs"
};

function updateVisitorLang(lang) {
    const label = document.getElementById("visitor-label");
    if (label && visitorText[lang]) {
        label.textContent = visitorText[lang];
    }
}

function loadVisitorCount() {
    fetch("/api/visitor-count")
        .then(res => res.json())
        .then(data => {
            const el = document.getElementById("visitorCount");
            if (el) el.textContent = data.count;
        })
        .catch(err => console.error(err));
}

/* ================= ON LOAD ================= */

document.addEventListener('DOMContentLoaded', () => {
    changeLang('nl');
    loadVisitorCount();
});
