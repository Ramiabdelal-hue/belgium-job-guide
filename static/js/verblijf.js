
// دالة تغيير اللغة
function changeLanguage(lang) {
    // إزالة الصف النشط من جميع الأزرار
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    // إضافة الصف النشط للزر المختار
    event.target.classList.add('active');

    // إذا كنت تستخدم ملف JSON أو مصفوفة ترجمة مثل موقعك الأساسي:
    if(lang === 'ar') {
        document.body.dir = "rtl";
        document.getElementById('page-title').innerText = "الإقامة واللجوء في بلجيكا 🇧🇪";
        // أضف بقية العناصر هنا...
    } else {
        document.body.dir = "ltr";
        if(lang === 'nl') {
            document.getElementById('page-title').innerText = "Verblijf en Asiel in België 🇧🇪";
        } else if(lang === 'fr') {
            document.getElementById('page-title').innerText = "Séjour et Asile en Belgique 🇧🇪";
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
  const nlBtn = document.querySelector(".lang-btn.active");
  changeLanguage("nl", nlBtn);
});