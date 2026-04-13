import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "tr";

interface Translations {
  [key: string]: {
    en: string;
    tr: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.system": { en: "System", tr: "Sistem" },
  "nav.coaching": { en: "Coaching", tr: "Koçluk" },
  "nav.products": { en: "Products", tr: "Ürünler" },
  "nav.blog": { en: "Blog", tr: "Blog" },
  "nav.about": { en: "About", tr: "Hakkımızda" },
  "nav.apply": { en: "Apply", tr: "Başvur" },
  "nav.account": { en: "Account", tr: "Hesap" },

  // Hero
  "hero.subtitle": { en: "Athlete Management System", tr: "Sporcu Yönetim Sistemi" },
  "hero.title1": { en: "Still Built Like", tr: "Hala Bir" },
  "hero.title2": { en: "An Athlete", tr: "Sporcu Gibi" },
  "hero.description": {
    en: "A performance and injury return system built for competitive athletes who refuse to step away from competition.",
    tr: "Rekabetten uzaklaşmayı reddeden yarışmacı sporcular için oluşturulmuş performans ve sakatlıktan dönüş sistemi."
  },
  "hero.cta": { en: "Start Your Reforge", tr: "Dönüşümünü Başlat" },
  "hero.cta2": { en: "The System", tr: "Sistem" },

  // Problem Statement
  "problem.title1": { en: "You train. You compete.", tr: "Antrenman yapıyorsun. Yarışıyorsun." },
  "problem.title2": { en: "But you're not performing at your real level.", tr: "Ama gerçek seviyende performans gösteremiyorsun." },
  "problem.subtitle": { en: "This isn't a motivation problem. This is a system problem.", tr: "Bu bir motivasyon sorunu değil. Bu bir sistem sorunu." },

  // Pillars
  "pillars.title": { en: "The Reforge System", tr: "Reforge Sistemi" },
  "pillars.performance.title": { en: "Performance", tr: "Performans" },
  "pillars.performance.desc": { en: "Athletic performance development for competitive sports.", tr: "Rekabetçi sporlar için atletik performans geliştirme." },
  "pillars.rebuild.title": { en: "Rebuild", tr: "Yeniden İnşa" },
  "pillars.rebuild.desc": { en: "Structured recovery and rebuilding after injuries.", tr: "Sakatlıklar sonrası yapılandırılmış iyileşme ve yeniden inşa." },
  "pillars.return.title": { en: "Return", tr: "Dönüş" },
  "pillars.return.desc": { en: "Return to competitive sport — stronger than before.", tr: "Rekabetçi spora dönüş — öncekinden daha güçlü." },
  "pillars.mentality.title": { en: "Mentality", tr: "Zihniyet" },
  "pillars.mentality.desc": { en: "Build the discipline and mindset required to compete.", tr: "Yarışmak için gereken disiplini ve zihniyeti oluştur." },

  // System Preview
  "system.subtitle": { en: "RF Forge Methodology", tr: "RF Forge Metodolojisi" },
  "system.title1": { en: "We Don't Fix Injuries.", tr: "Sakatlıkları Düzeltmiyoruz." },
  "system.title2": { en: "We Reorganize the System.", tr: "Sistemi Yeniden Düzenliyoruz." },
  "system.p1": { en: "You don't need more exercises. You need structure. You don't need more motivation. You need direction.", tr: "Daha fazla egzersize ihtiyacın yok. Yapıya ihtiyacın var. Daha fazla motivasyona ihtiyacın yok. Yöne ihtiyacın var." },
  "system.p2": { en: "Your weakness is not the problem. It's unorganized. Reforge turns it into an advantage.", tr: "Zayıflığın sorun değil. Düzensiz. Reforge onu bir avantaja dönüştürür." },
  "system.learnMore": { en: "Learn More", tr: "Daha Fazla Bilgi" },

  // Filter Section
  "filter.subtitle": { en: "Not For Everyone", tr: "Herkes İçin Değil" },
  "filter.title1": { en: "Your Injury Becomes", tr: "Sakatlığın" },
  "filter.title2": { en: "Your Advantage", tr: "Avantajına Dönüşür" },
  "filter.desc": { en: "This is not an open program. We work with a limited number of athletes. If you're not serious, this won't work.", tr: "Bu açık bir program değil. Sınırlı sayıda sporcu ile çalışıyoruz. Ciddi değilsen, bu işe yaramaz." },

  // Footer
  "footer.tagline": { en: "Athlete management system for competitive athletes. Injury → Advantage.", tr: "Rekabetçi sporcular için sporcu yönetim sistemi. Sakatlık → Avantaj." },
  "footer.motto": { en: "Stronger where you once broke.", tr: "Bir zamanlar kırıldığın yerde daha güçlü." },
  "footer.navigate": { en: "Navigate", tr: "Gezinti" },
  "footer.contact": { en: "Contact", tr: "İletişim" },
  "footer.location": { en: "Location", tr: "Konum" },
  "footer.copyright": { en: "All rights reserved.", tr: "Tüm hakları saklıdır." },

  // Newsletter
  "newsletter.title": { en: "SIGN UP FOR REFORGE NEWS", tr: "REFORGE HABERLERİNE KAYDOL" },
  "newsletter.subtitle": { en: "Stay updated with training insights and athletic performance tips.", tr: "Antrenman bilgileri ve atletik performans ipuçları ile güncel kalın." },
  "newsletter.placeholder": { en: "Enter your email address", tr: "E-posta adresinizi girin" },
  "newsletter.consent": { en: "I agree to receive marketing emails from REFORGE", tr: "REFORGE'dan pazarlama e-postaları almayı kabul ediyorum" },
  "newsletter.button": { en: "Subscribe", tr: "Abone Ol" },
  "newsletter.success": { en: "Thank you for subscribing!", tr: "Abone olduğunuz için teşekkürler!" },

  // Cookie Banner
  "cookie.message": { en: "We use cookies to personalize content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.", tr: "İçeriği ve reklamları kişiselleştirmek, sosyal medya özellikleri sağlamak ve trafiğimizi analiz etmek için çerezler kullanıyoruz. Ayrıca sitemizi kullanımınız hakkındaki bilgileri sosyal medya, reklam ve analiz ortaklarımızla paylaşıyoruz." },
  "cookie.learnMore": { en: "Learn more.", tr: "Daha fazla bilgi." },
  "cookie.accept": { en: "Accept", tr: "Kabul Et" },
  "cookie.decline": { en: "Decline", tr: "Reddet" },

  // About Page
  "about.subtitle": { en: "Our Story", tr: "Hikayemiz" },
  "about.title": { en: "About Reforge", tr: "Reforge Hakkında" },
  "about.intro": { en: "REFORGE was built from the ground up by athletes who understand what it means to compete at the highest level — and what it takes to come back from injury.", tr: "REFORGE, en üst düzeyde rekabet etmenin ne anlama geldiğini ve sakatlıktan dönmek için ne gerektiğini anlayan sporcular tarafından sıfırdan kuruldu." },
  "about.mission.title": { en: "Our Mission", tr: "Misyonumuz" },
  "about.mission.desc": { en: "To transform how competitive athletes approach performance, injury recovery, and long-term athletic development through a systematic, evidence-based methodology.", tr: "Rekabetçi sporcuların performansa, sakatlık iyileşmesine ve uzun vadeli atletik gelişime yaklaşımını sistematik, kanıta dayalı bir metodoloji aracılığıyla dönüştürmek." },
  "about.vision.title": { en: "Our Vision", tr: "Vizyonumuz" },
  "about.vision.desc": { en: "A world where injury is not the end of an athletic career, but a catalyst for becoming stronger and more resilient than ever before.", tr: "Sakatlığın bir atletik kariyerin sonu olmadığı, aksine her zamankinden daha güçlü ve dayanıklı olmanın katalizörü olduğu bir dünya." },
  "about.values.title": { en: "Our Values", tr: "Değerlerimiz" },
  "about.values.discipline": { en: "Discipline", tr: "Disiplin" },
  "about.values.discipline.desc": { en: "Consistency beats intensity. We build habits that last.", tr: "Tutarlılık yoğunluğu yener. Kalıcı alışkanlıklar oluşturuyoruz." },
  "about.values.structure": { en: "Structure", tr: "Yapı" },
  "about.values.structure.desc": { en: "Every action has purpose. Nothing is random.", tr: "Her eylemin bir amacı var. Hiçbir şey rastgele değil." },
  "about.values.honesty": { en: "Honesty", tr: "Dürüstlük" },
  "about.values.honesty.desc": { en: "We tell you what you need to hear, not what you want to hear.", tr: "Duymak istediğini değil, duyması gerekeni söylüyoruz." },
  "about.values.excellence": { en: "Excellence", tr: "Mükemmellik" },
  "about.values.excellence.desc": { en: "Good enough is never good enough. We pursue mastery.", tr: "Yeterince iyi asla yeterli değildir. Ustalığı takip ediyoruz." },
  "about.team.title": { en: "The Team", tr: "Ekip" },
  "about.team.desc": { en: "Our team consists of former competitive athletes, sports scientists, and performance specialists who have dedicated their careers to helping athletes reach their full potential.", tr: "Ekibimiz, kariyerlerini sporculara tam potansiyellerine ulaşmalarında yardımcı olmaya adamış eski rekabetçi sporcular, spor bilimciler ve performans uzmanlarından oluşmaktadır." },

  // Blog Page
  "blog.subtitle": { en: "Insights", tr: "Görüşler" },
  "blog.title": { en: "Blog", tr: "Blog" },
  "blog.description": { en: "Thoughts on performance, recovery, and the athlete mentality.", tr: "Performans, iyileşme ve sporcu zihniyeti hakkında düşünceler." },
  "blog.back": { en: "Back to all posts", tr: "Tüm yazılara dön" },

  // System Page
  "systemPage.subtitle": { en: "RF Forge Protocol", tr: "RF Forge Protokolü" },
  "systemPage.title": { en: "The System", tr: "Sistem" },
  "systemPage.description": { en: "Performance isn't just about strength. It's about control under load. REFORGE is built on the principle: stability first, capacity second.", tr: "Performans sadece güçle ilgili değildir. Yük altında kontrolle ilgilidir. REFORGE şu prensip üzerine kurulmuştur: önce stabilite, sonra kapasite." },
  "systemPage.stability.title": { en: "Why Stability is the Foundation", tr: "Stabilite Neden Temeli Oluşturur" },
  "systemPage.load.title": { en: "Load Distribution", tr: "Yük Dağılımı" },
  "systemPage.approach.title": { en: "The REFORGE Approach", tr: "REFORGE Yaklaşımı" },
  "systemPage.apply": { en: "Apply Now", tr: "Şimdi Başvur" },

  // Coaching Page
  "coaching.subtitle": { en: "Athlete Management", tr: "Sporcu Yönetimi" },
  "coaching.title": { en: "Coaching", tr: "Koçluk" },
  "coaching.description": { en: "This isn't personal training. This is athlete management — your entire athletic life, systematically guided. Limited to 10-12 athletes at any time.", tr: "Bu kişisel antrenörlük değil. Bu sporcu yönetimi — tüm atletik yaşamınız, sistematik olarak yönlendirilir. Her zaman 10-12 sporcu ile sınırlı." },
  "coaching.advisor.title": { en: "Not a PT. An Athlete Advisor.", tr: "PT Değil. Sporcu Danışmanı." },
  "coaching.advisor.p1": { en: "You're not buying sessions. You're not buying a program. You're buying a system.", tr: "Seans satın almıyorsunuz. Program satın almıyorsunuz. Sistem satın alıyorsunuz." },
  "coaching.advisor.p2": { en: "What you get:", tr: "Ne alacaksınız:" },
  "coaching.packages": { en: "Packages", tr: "Paketler" },
  "coaching.popular": { en: "Most Popular", tr: "En Popüler" },
  "coaching.howItStarts": { en: "How It Starts", tr: "Nasıl Başlıyor" },

  // Apply Page
  "apply.subtitle": { en: "Limited Capacity", tr: "Sınırlı Kapasite" },
  "apply.title": { en: "Apply", tr: "Başvur" },
  "apply.description": { en: "This is not an open program. We work with a limited number of athletes. Not everyone gets accepted.", tr: "Bu açık bir program değil. Sınırlı sayıda sporcu ile çalışıyoruz. Herkes kabul edilmez." },
  "apply.received": { en: "Application Received", tr: "Başvuru Alındı" },
  "apply.touch": { en: "We'll Be in Touch.", tr: "Sizinle İletişime Geçeceğiz." },
  "apply.receivedDesc": { en: "Your application has been received. If your profile fits the Reforge system, you will be contacted shortly.", tr: "Başvurunuz alındı. Profiliniz Reforge sistemine uyuyorsa, kısa süre içinde sizinle iletişime geçilecektir." },

  // Products Page
  "products.subtitle": { en: "Recovery Equipment", tr: "İyileşme Ekipmanları" },
  "products.title": { en: "Products", tr: "Ürünler" },
  "products.description": { en: "Professional-grade equipment used by elite athletes worldwide.", tr: "Dünya çapında elit sporcuların kullandığı profesyonel ekipmanlar." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
