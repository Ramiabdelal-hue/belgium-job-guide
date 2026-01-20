
const translations = {
  ar: {
    title: "اللغات في بلجيكا 🇧🇪",
    back: "عودة",
    home: "الرئيسية",
    note_title: "تنويه:",
    note_text: "هذه الصفحة بمثابة دليل عام عن اللغات في بلجيكا وليست جهة رسمية.",
    languages_title: "اللغات الرسمية واستخدامها",
    languages_list: "الهولندية: اللغة الرئيسية في فلاندرز وشمال بلجيكا.\nالفرنسية: اللغة الرسمية في والونيا وجنوب بلجيكا.\nالألمانية: اللغة الرسمية في منطقة صغيرة شرق بلجيكا.\nالإنجليزية: تُستخدم بشكل واسع في بروكسل والشركات الدولية.",
    levels_title: "مستويات اللغة (A1 → C2)",
    level_a1: "A1: مستوى مبتدئ جداً\n1.1 الاستماع: فهم عبارات بسيطة مثل التحية والأسئلة اليومية.\n1.2 التحدث: تقديم نفسك وإجابات قصيرة على الأسئلة البسيطة.\n1.3 القراءة: التعرف على الكلمات والعبارات اليومية.\n1.4 الكتابة: كتابة جمل قصيرة وبسيطة.",
    level_a2: "A2: مستوى أساسي\n2.1 الاستماع: فهم التعليمات البسيطة والمحادثات القصيرة.\n2.2 التحدث: وصف العائلة، البيئة اليومية، العمل البسيط.\n2.3 القراءة: قراءة نصوص قصيرة بسيطة.\n2.4 الكتابة: كتابة رسائل قصيرة، ملاحظات يومية.",
    level_b1: "B1: مستوى متوسط\n3.1 الاستماع: فهم المواضيع المألوفة في العمل أو الدراسة.\n3.2 التحدث: التعبير عن الأفكار والآراء الأساسية.\n3.3 القراءة: فهم المقالات والتقارير البسيطة.\n3.4 الكتابة: كتابة رسائل، وصف الأحداث والتجارب.",
    level_b2: "B2: مستوى متقدم\n4.1 الاستماع: فهم تفاصيل المحادثات والمناقشات المعقدة.\n4.2 التحدث: المشاركة في مناقشات موسعة بطلاقة.\n4.3 القراءة: قراءة نصوص متقدمة وتقارير متخصصة.\n4.4 الكتابة: كتابة مقالات وتقارير واضحة ومنظمة.",
    level_c1: "C1: مستوى متقن\n5.1 الاستماع: فهم المحاضرات والمناقشات الطويلة والمتخصصة.\n5.2 التحدث: التعبير بطلاقة ودقة عالية في مواضيع معقدة.\n5.3 القراءة: فهم النصوص الأكاديمية والتقنية المتقدمة.\n5.4 الكتابة: كتابة نصوص معقدة بأسلوب منسق ومتقن.",
    level_c2: "C2: مستوى متقن جداً\n6.1 الاستماع: فهم أي نوع من المحادثات أو المحاضرات بسهولة.\n6.2 التحدث: التحدث بطلاقة وبدون أخطاء تقريباً.\n6.3 القراءة: فهم أي نص، بما في ذلك النصوص الأدبية والعلمية.\n6.4 الكتابة: كتابة نصوص عالية الجودة مشابهة لمستوى الناطقين الأصليين.",
    resources_title: "المصادر والمراجع",
    resources_list: "Belgium.be – التعليم واللغات\nCIAL – دورات اللغة الفرنسية\nVDAB – تعلم الهولندية\nGoethe Institute – تعلم الألمانية"
  },
  nl: {
    title: "Talen in België 🇧🇪",
    back: "Terug",
    home: "Home",
    note_title: "Opmerking:",
    note_text: "Deze pagina is alleen een algemene gids over talen in België en geen officiële instantie.",
    languages_title: "Officiële talen en gebruik",
    languages_list: "Nederlands: Hoofdtalig in Vlaanderen en Noord-België.\nFrans: Officiële taal in Wallonië en Zuid-België.\nDuits: Officiële taal in een klein gebied in Oost-België.\nEngels: Veel gebruikt in Brussel en internationale bedrijven.",
    levels_title: "Taalniveaus (A1 → C2)",
    level_a1: "A1: Zeer beginner\n1.1 Luisteren: Begrijp eenvoudige zinnen zoals begroetingen.\n1.2 Spreken: Jezelf voorstellen en korte antwoorden geven.\n1.3 Lezen: Herkennen van eenvoudige woorden en zinnen.\n1.4 Schrijven: Korte zinnen schrijven.",
    level_a2: "A2: Basisniveau\n2.1 Luisteren: Eenvoudige instructies en korte gesprekken begrijpen.\n2.2 Spreken: Familie, dagelijkse omgeving en eenvoudig werk beschrijven.\n2.3 Lezen: Korte teksten lezen.\n2.4 Schrijven: Korte berichten en dagelijkse notities schrijven.",
    level_b1: "B1: Gemiddeld niveau\n3.1 Luisteren: Bekende onderwerpen in werk of studie begrijpen.\n3.2 Spreken: Ideeën en basisopinies uitdrukken.\n3.3 Lezen: Artikelen en eenvoudige rapporten begrijpen.\n3.4 Schrijven: Berichten schrijven, gebeurtenissen beschrijven.",
    level_b2: "B2: Gevorderd niveau\n4.1 Luisteren: Details van complexe gesprekken begrijpen.\n4.2 Spreken: Deelname aan uitgebreide discussies.\n4.3 Lezen: Gevorderde teksten en gespecialiseerde rapporten.\n4.4 Schrijven: Artikelen en rapporten schrijven.",
    level_c1: "C1: Bekwaam niveau\n5.1 Luisteren: Colleges en lange discussies begrijpen.\n5.2 Spreken: Vlot en nauwkeurig communiceren over complexe onderwerpen.\n5.3 Lezen: Geavanceerde academische en technische teksten begrijpen.\n5.4 Schrijven: Georganiseerde en duidelijke teksten schrijven.",
    level_c2: "C2: Zeer bekwaam\n6.1 Luisteren: Elk type gesprek of college begrijpen.\n6.2 Spreken: Vrij en bijna foutloos spreken.\n6.3 Lezen: Alle teksten begrijpen, inclusief literaire en wetenschappelijke.\n6.4 Schrijven: Teksten van hoge kwaliteit schrijven zoals moedertaalsprekers.",
    resources_title: "Bronnen en referenties",
    resources_list: "Belgium.be – Onderwijs en talen\nCIAL – Franse taalcursussen\nVDAB – Nederlands leren\nGoethe Institute – Duits leren"
  },
  fr: {
    title: "Langues en Belgique 🇧🇪",
    back: "Retour",
    home: "Accueil",
    note_title: "Remarque :",
    note_text: "Cette page est un guide général sur les langues en Belgique et n’est pas une autorité officielle.",
    languages_title: "Langues officielles et utilisation",
    languages_list: "Néerlandais: Langue principale en Flandre et dans le nord de la Belgique.\nFrançais: Langue officielle en Wallonie et dans le sud.\nAllemand: Langue officielle dans une petite région à l'est.\nAnglais: Utilisé largement à Bruxelles et dans les entreprises internationales.",
    levels_title: "Niveaux de langue (A1 → C2)",
    level_a1: "A1: Niveau très débutant\n1.1 Écoute: Comprendre des phrases simples comme les salutations.\n1.2 Parler: Se présenter et donner de courtes réponses.\n1.3 Lecture: Reconnaître les mots et phrases simples.\n1.4 Écriture: Écrire de courtes phrases.",
    level_a2: "A2: Niveau de base\n2.1 Écoute: Comprendre des instructions simples et conversations courtes.\n2.2 Parler: Décrire famille, environnement quotidien et travail simple.\n2.3 Lecture: Lire de courts textes simples.\n2.4 Écriture: Écrire de courts messages et notes quotidiennes.",
    level_b1: "B1: Niveau intermédiaire\n3.1 Écoute: Comprendre des sujets familiers du travail ou de l’étude.\n3.2 Parler: Exprimer des idées et opinions de base.\n3.3 Lecture: Comprendre des articles et rapports simples.\n3.4 Écriture: Rédiger des messages, décrire des événements et expériences.",
    level_b2: "B2: Niveau avancé\n4.1 Écoute: Comprendre les détails des conversations complexes.\n4.2 Parler: Participer à des discussions étendues avec fluidité.\n4.3 Lecture: Lire des textes avancés et rapports spécialisés.\n4.4 Écriture: Rédiger des articles et rapports clairs et organisés.",
    level_c1: "C1: Niveau compétent\n5.1 Écoute: Comprendre des conférences et discussions longues.\n5.2 Parler: Communiquer avec aisance et précision sur des sujets complexes.\n5.3 Lecture: Comprendre les textes académiques et techniques avancés.\n5.4 Écriture: Rédiger des textes complexes de manière organisée.",
    level_c2: "C2: Niveau très compétent\n6.1 Écoute: Comprendre tous types de conversations ou conférences.\n6.2 Parler: Parler couramment et presque sans erreurs.\n6.3 Lecture: Comprendre tous les textes, y compris littéraires et scientifiques.\n6.4 Écriture: Rédiger des textes de haute qualité comme un natif.",
    resources_title: "Sources et références",
    resources_list: "Belgium.be – Éducation et langues\nCIAL – Cours de français\nVDAB – Apprendre le néerlandais\nGoethe Institute – Apprendre l’allemand"
  }
};

function changeLanguage(lang,btn){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    if(translations[lang][key]){
      // إذا كانت النصوص متعددة الأسطر، نفصلها لعنصر <div> أو <li>
      if(el.tagName==="UL" || el.tagName==="OL"){
        el.innerHTML = translations[lang][key].split("\n").map(item=>`<li>${item}</li>`).join("");
      } else if(el.classList.contains("level") || el.classList.contains("sub-level")){
        el.innerHTML = translations[lang][key].replace(/\n/g,"<br>");
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
  document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}
document.addEventListener("DOMContentLoaded", function () {
  const nlBtn = document.querySelector(".lang-btn.active");
  changeLanguage("nl", nlBtn);
});

