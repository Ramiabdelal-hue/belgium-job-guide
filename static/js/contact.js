
const translations = {
    nl: {
        dir: 'ltr',
        title: "Als u vragen heeft of een winkel of dienst wilt toevoegen of website maken, neem dan contact met ons op A.U.B",
        name: "🏷️ Naam",
        email: "📧 E-mail",
        message: "📝 Bericht",
        placeholder_name: "Jouw naam...",
        placeholder_message: "Hoe kunnen we helpen?",
        btn: "Verstuur bericht 🚀"
    },
    ar: {
        dir: 'ltr',
        title: "إذا كانت لديكم أي أسئلة أو ترغبون في إضافة متجر أو خدمة أو إنشاء موقع ويب، فيرجى التواصل معنا.",
        name: "🏷️ الاسم",
        email: "📧 البريد الإلكتروني",
        message: "📝 الرسالة",
        placeholder_name: "اسمك الكريم...",
        placeholder_message: "كيف يمكننا مساعدتك؟",
        btn: "إرسال الرسالة 🚀"
    },
    fr: {
        dir: 'ltr',
        title: "Si vous avez des questions ou souhaitez ajouter un magasin ou un service ou créer un site web, veuillez nous contacter.",
        name: "🏷️ Nom",
        email: "📧 E-mail",
        message: "📝 Message",
        placeholder_name: "Votre nom...",
        placeholder_message: "Comment pouvons-nous vous aider?",
        btn: "Envoyer le message 🚀"
    }
};

function setLanguage(lang) {
    const t = translations[lang];
    
    // تغيير اتجاه الصفحة
    document.body.dir = t.dir;
    
    // تحديث النصوص
    document.getElementById("form-title").textContent = t.title;
    document.getElementById("label-name").textContent = t.name;
    document.getElementById("label-email").textContent = t.email;
    document.getElementById("label-message").textContent = t.message;
    
    // تحديث التلميحات (Placeholders)
    document.getElementById("input-name").placeholder = t.placeholder_name;
    document.getElementById("input-message").placeholder = t.placeholder_message;
    
    // تحديث نص الزر
    document.getElementById("btn-submit").textContent = t.btn;
    
    // تحديث لغة نموذج الإرسال لـ Formspree
    document.getElementById("form-lang").value = lang;
}

// تعيين اللغة الافتراضية عند التحميل
setLanguage('nl');
