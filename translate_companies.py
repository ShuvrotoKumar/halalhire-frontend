import json

base_dir = "/home/betopia/projects/halalhire/public/locales"

translations = {
    "home2": {"en": "HOME", "de": "STARTSEITE", "tr": "ANASAYFA", "ar": "الرئيسية"},
    "companies2": {"en": "COMPANIES", "de": "UNTERNEHMEN", "tr": "ŞİRKETLER", "ar": "الشركات"},
    "exploreEthicalCompanies": {"en": "Explore Ethical Companies", "de": "Entdecken Sie Ethische Unternehmen", "tr": "Etik Şirketleri Keşfedin", "ar": "اكتشف الشركات الأخلاقية"},
    "discoverOrganisationsCommittedToHalalEthicalAndSociallyResponsibleEmploymentAcrossTheGlobe": {"en": "Discover organisations committed to halal, ethical, and socially responsible employment across the globe.", "de": "Entdecken Sie Organisationen, die sich weltweit für halal-konforme, ethische und sozial verantwortliche Beschäftigung einsetzen.", "tr": "Dünya çapında helal, etik ve sosyal açıdan sorumlu istihdam taahhüdünde bulunan organizasyonları keşfedin.", "ar": "اكتشف المؤسسات الملتزمة بالتوظيف الحلال والأخلاقي والمسؤول اجتماعيًا في جميع أنحاء العالم."},
    "searchCompanies": {"en": "Search companies....", "de": "Unternehmen suchen....", "tr": "Şirket ara....", "ar": "ابحث عن الشركات...."},
    "industry": {"en": "Industry", "de": "Branche", "tr": "Sektör", "ar": "الصناعة"},
    "location": {"en": "Location", "de": "Standort", "tr": "Konum", "ar": "الموقع"},
    "proceed": {"en": "Proceed", "de": "Weiter", "tr": "İlerle", "ar": "متابعة"},

    "wahedInvest": {"en": "Wahed Invest", "de": "Wahed Invest", "tr": "Wahed Invest", "ar": "Wahed Invest"},
    "wealthManagement": {"en": "Wealth Management", "de": "Vermögensverwaltung", "tr": "Servet Yönetimi", "ar": "إدارة الثروات"},
    "halalCertified": {"en": "HALAL CERTIFIED", "de": "HALAL ZERTIFIZIERT", "tr": "HELAL SERTİFİKALI", "ar": "معتمد كحلال"},
    "remoteFriendly": {"en": "REMOTE FRIENDLY", "de": "REMOTE-FREUNDLICH", "tr": "UZAKTAN ÇALIŞMAYA UYGUN", "ar": "صديق للعمل عن بُعد"},
    "automatedEthicalInvestingForEveryoneSimpleFairAndHalal": {"en": "Automated ethical investing for everyone. Simple, fair, and halal.", "de": "Automatisiertes ethisches Investieren für alle. Einfach, fair und halal.", "tr": "Herkes için otomatik etik yatırım. Basit, adil ve helal.", "ar": "استثمار أخلاقي آلي للجميع. بسيط وعادل وحلال."},
    "shariapaul": {"en": "ShariaPaul", "de": "ShariaPaul", "tr": "ShariaPaul", "ar": "شريعة بول"},
    "legalServices": {"en": "Legal Services", "de": "Rechtsdienstleistungen", "tr": "Hukuk Hizmetleri", "ar": "خدمات قانونية"},
    "global": {"en": "GLOBAL", "de": "GLOBAL", "tr": "KÜRESEL", "ar": "عالمي"},
    "specializedLegalAdvisoryForShariacompliantContractsAndLitigation": {"en": "Specialized legal advisory for Sharia-compliant contracts and litigation.", "de": "Spezialisierte Rechtsberatung für Scharia-konforme Verträge und Rechtsstreitigkeiten.", "tr": "Şeriata uygun sözleşmeler ve davalar için uzman hukuki danışmanlık.", "ar": "استشارات قانونية متخصصة للعقود والنزاعات المتوافقة مع الشريعة."},
    "halalFoodie": {"en": "Halal Foodie", "de": "Halal Foodie", "tr": "Halal Foodie", "ar": "حلال فودي"},
    "foodBeverage": {"en": "Food & Beverage", "de": "Essen & Trinken", "tr": "Yiyecek ve İçecek", "ar": "المأكولات والمشروبات"},
    "torontosMostTrustedSourceForVerifiedHalalRestaurantsAndReviews": {"en": "Toronto's most trusted source for verified halal restaurants and reviews.", "de": "Torontos vertrauenswürdigste Quelle für verifizierte Halal-Restaurants und Bewertungen.", "tr": "Toronto'nun doğrulanmış helal restoranlar ve yorumlar için en güvenilir kaynağı.", "ar": "المصدر الأكثر موثوقية في تورنتو للمطاعم الحلال المعتمدة والتقييمات."},
    "browseAllCompanies": {"en": "Browse All Companies", "de": "Alle Unternehmen durchsuchen", "tr": "Tüm Şirketlere Göz At", "ar": "تصفح جميع الشركات"},
    "showing112Of248Companies": {"en": "Showing 1-12 of 248 companies", "de": "Zeige 1-12 von 248 Unternehmen", "tr": "248 şirketten 1-12 arası gösteriliyor", "ar": "عرض 1-12 من أصل 248 شركة"},

    "prayerRoom2": {"en": "PRAYER ROOM", "de": "GEBETSRAUM", "tr": "İBADET ODASI", "ar": "غرفة الصلاة"},
    "halalFood2": {"en": "HALAL FOOD", "de": "HALAL ESSEN", "tr": "HELAL GIDA", "ar": "طعام حلال"},
    "nurseryRoom2": {"en": "NURSERY ROOM", "de": "STILLZIMMER", "tr": "BEBEK BAKIM ODASI", "ar": "غرفة حضانة"},
    "motherFriendly2": {"en": "MOTHER FRIENDLY", "de": "MUTTERFREUNDLICH", "tr": "ANNE DOSTU", "ar": "صديق للأم"},
    "openrolesOpenRoles": {"en": "{{openRoles}} OPEN ROLES", "de": "{{openRoles}} OFFENE STELLEN", "tr": "{{openRoles}} AÇIK POZİSYON", "ar": "{{openRoles}} وظيفة شاغرة"},
    "staffcountStaff": {"en": "{{staffCount}} STAFF", "de": "{{staffCount}} MITARBEITER", "tr": "{{staffCount}} PERSONEL", "ar": "{{staffCount}} موظف"},
    "viewProfile": {"en": "View Profile", "de": "Profil ansehen", "tr": "Profili Görüntüle", "ar": "عرض الملف الشخصي"},
    "seeJobs": {"en": "See Jobs", "de": "Jobs ansehen", "tr": "İşleri Gör", "ar": "رؤية الوظائف"},

    "islamicFinance": {"en": "Islamic Finance", "de": "Islamisches Finanzwesen", "tr": "İslami Finans", "ar": "التمويل الإسلامي"},
    "halalFoodBev": {"en": "Halal Food & Bev", "de": "Halal Food & Bev", "tr": "Helal Gıda ve İçecek", "ar": "مأكولات ومشروبات حلال"},
    "technology": {"en": "Technology", "de": "Technologie", "tr": "Teknoloji", "ar": "التكنولوجيا"},
    "healthcare": {"en": "Healthcare", "de": "Gesundheitswesen", "tr": "Sağlık Hizmetleri", "ar": "الرعاية الصحية"},
    "education": {"en": "Education", "de": "Bildung", "tr": "Eğitim", "ar": "التعليم"},
    "logistics": {"en": "Logistics", "de": "Logistik", "tr": "Lojistik", "ar": "اللوجستيات"},
    "manufacturing": {"en": "Manufacturing", "de": "Fertigung", "tr": "Üretim", "ar": "التصنيع"},
    "ngos": {"en": "NGOs", "de": "NGOs", "tr": "STK'lar", "ar": "المنظمات غير الحكومية"},
    "lookingForJobs": {"en": "Looking for Jobs?", "de": "Auf der Suche nach Jobs?", "tr": "İş mi Arıyorsunuz?", "ar": "هل تبحث عن عمل؟"},
    "findHalalVerifiedCareerOpportunitiesWorldwideThatAlignWithYourValues": {"en": "Find halal verified career opportunities worldwide that align with your values.", "de": "Finden Sie weltweit Halal-verifizierte Karrieremöglichkeiten, die mit Ihren Werten übereinstimmen.", "tr": "Değerlerinize uyan, dünya çapında helal onaylı kariyer fırsatlarını bulun.", "ar": "ابحث عن فرص عمل معتمدة كحلال في جميع أنحاء العالم تتوافق مع قيمك."},
    "browseJobs": {"en": "Browse Jobs", "de": "Jobs durchsuchen", "tr": "İşlere Göz At", "ar": "تصفح الوظائف"},
    "industryFilters": {"en": "Industry Filters", "de": "Branchenfilter", "tr": "Sektör Filtreleri", "ar": "فلاتر القطاعات"},

    "alRajhiBank": {"en": "Al Rajhi Bank", "de": "Al Rajhi Bank", "tr": "Al Rajhi Bank", "ar": "مصرف الراجحي"},
    "travelHospitality": {"en": "TRAVEL & HOSPITALITY", "de": "REISEN & GASTGEWERBE", "tr": "SEYAHAT & KONAKLAMA", "ar": "السفر والضيافة"},
    "theWorldsLeadingSearchAndBookingWebsiteForHalalconsciousTravellersWorldwide": {"en": "The world's leading search and booking website for halal-conscious travellers worldwide.", "de": "Die weltweit führende Such- und Buchungswebsite für halal-bewusste Reisende weltweit.", "tr": "Helal bilincine sahip gezginler için dünyanın önde gelen arama ve rezervasyon web sitesi.", "ar": "الموقع الرائد عالميًا للبحث والحجز للمسافرين المهتمين بالحلال."},
    "zoya": {"en": "Zoya", "de": "Zoya", "tr": "Zoya", "ar": "زويا"},
    "fintech": {"en": "FINTECH", "de": "FINTECH", "tr": "FİNTEK", "ar": "التكنولوجيا المالية"},
    "empoweringMuslimsToBuildWealthWithConfidenceThroughShariahcompliantStockScreening": {"en": "Empowering Muslims to build wealth with confidence through Shariah-compliant stock screening.", "de": "Wir befähigen Muslime, mit Zuversicht durch Scharia-konformes Aktien-Screening Vermögen aufzubauen.", "tr": "Müslümanların Şeriata uygun hisse senedi taraması yoluyla güvenle servet oluşturmalarını sağlamak.", "ar": "تمكين المسلمين من بناء الثروة بثقة من خلال فحص الأسهم المتوافقة مع الشريعة الإسلامية."},
    "featuredHalalEmployers": {"en": "Featured Halal Employers", "de": "Hervorgehobene Halal-Arbeitgeber", "tr": "Öne Çıkan Helal İşverenler", "ar": "أصحاب العمل الحلال المميزون"},
    "viewAll": {"en": "View All", "de": "Alle ansehen", "tr": "Tümünü Gör", "ar": "عرض الكل"},

    "key2": {"en": "...", "de": "...", "tr": "...", "ar": "..."}
}

for lang in ["en", "de", "tr", "ar"]:
    path = f"{base_dir}/{lang}/translation.json"
    with open(path, "r", encoding='utf-8') as f:
        data = json.load(f)
    
    for key, vals in translations.items():
        data[key] = vals[lang]
        
    with open(path, "w", encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

print("Translations for companies page updated.")
