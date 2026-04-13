import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { useLanguage } from "@/context/LanguageContext";

const blogPostsEn = [
  {
    id: "stability-before-strength",
    title: "Why Stability Comes Before Strength",
    excerpt: "Most athletes chase strength. But uncontrolled strength turns into injury. The body distributes force within milliseconds — if that distribution fails, the chain breaks.",
    image: "/images/hero-1.jpg",
    date: "April 10, 2026",
    category: "System",
    content: `Performance is often confused with strength. But the real foundation of athletic output is stability — the capacity to maintain control under load. When an athlete jumps, changes direction, or stops suddenly, force must be distributed through the entire kinetic chain. If that distribution fails at any link, compensation begins. Compensation saves performance short-term. It destroys tissue long-term.

The REFORGE system addresses this by building from the base: foot-ankle stability, then unilateral balance, then load alignment, and finally speed control. This isn't glamorous work. But it's the work that prevents the next injury and builds the foundation for real, lasting performance gains.`,
  },
  {
    id: "injury-is-not-the-end",
    title: "Your Injury Is Not the End — It's Data",
    excerpt: "The body doesn't just recover. It adapts. Under the right system, what once limited you becomes your advantage.",
    image: "/images/hero-2.jpg",
    date: "April 3, 2026",
    category: "Mentality",
    content: `Most athletes see injury as a setback. A pause. Something to survive before returning to normal. But injury is information. It reveals exactly where the system failed — where load accumulated, where control was lost, where the chain broke.

REFORGE treats every injury as a map. Not a sentence. When we analyze your injury history, we're not looking at what went wrong — we're looking at what your body is telling us about its structural priorities. The athletes who come back strongest are the ones who stop fighting their injuries and start listening to them.`,
  },
  {
    id: "athlete-mentality",
    title: "The Difference Between Training and Competing",
    excerpt: "Training is preparation. Competition is execution under pressure. Most athletes train their bodies but never train the gap between the two.",
    image: "/images/hero-3.jpg",
    date: "March 27, 2026",
    category: "Performance",
    content: `There's a moment every competitive athlete knows — the gap between what you can do in training and what you actually do under pressure. That gap isn't physical. It's systemic. It's the result of training without context, building capacity without building the control systems that activate under stress.

REFORGE doesn't separate physical and mental preparation. Your training structure, your recovery protocols, your daily discipline — they all feed the same system. When the system is organized, the gap closes. When it's not, no amount of motivation will save you in the fourth quarter.`,
  },
  {
    id: "load-distribution",
    title: "Load Distribution: Where Your Pain Really Comes From",
    excerpt: "The problem is rarely where the pain is. The problem is the loss of control at the start of the chain.",
    image: "/images/hero-4.jpg",
    date: "March 20, 2026",
    category: "System",
    content: `When running, jumping, or stopping, the body transfers load across a chain: Foot → Ankle → Knee → Hip → Core. If one link doesn't do its job, another takes over. The body is smart — but this solution is temporary. Short-term compensation becomes long-term structural damage.

The question isn't "where does it hurt?" — it's "where is the load accumulating?" Most rehabilitation focuses on the site of pain. REFORGE focuses on the source of dysfunction. Fix the distribution, and the pain resolves itself. Chase the pain, and it simply migrates.`,
  },
];

const blogPostsTr = [
  {
    id: "stability-before-strength",
    title: "Stabilite Neden Gucten Once Gelir",
    excerpt: "Cogu sporcu guc pesinde kosar. Ama kontrolsuz guc sakatliga donusur. Vucut mili saniyeler icinde kuvet dagitir — bu dagilim basarisiz olursa, zincir kirilir.",
    image: "/images/hero-1.jpg",
    date: "10 Nisan 2026",
    category: "Sistem",
    content: `Performans cogu zaman gucle karistirilir. Ancak atletik ciktinin gercek temeli stabilitedir — yuk altinda kontrolu koruma kapasitesi. Bir sporcu zipladiginda, yon degistirdiginde veya aniden durdugunda, kuvvet tum kinetik zincir boyunca dagitilmalidir. Bu dagilim herhangi bir halkada basarisiz olursa, telafi baslar. Telafi kisa vadede performansi kurtarir. Uzun vadede dokuyu tahrip eder.

REFORGE sistemi bunu tabandan insa ederek ele alir: ayak-ayak bilegi stabilitesi, sonra tek tarafli denge, sonra yuk hizalamasi ve son olarak hiz kontrolu. Bu gosterisli bir calisma degil. Ama bir sonraki sakatliyi onleyen ve gercek, kalici performans kazanimlari icin temel olusturan calismadir.`,
  },
  {
    id: "injury-is-not-the-end",
    title: "Sakatligin Son Degil — Veri",
    excerpt: "Vucut sadece iyilesmez. Uyum saglar. Dogru sistem altinda, sizi bir zamanlar sinirlayanlar avantajiniz olur.",
    image: "/images/hero-2.jpg",
    date: "3 Nisan 2026",
    category: "Zihniyet",
    content: `Cogu sporcu sakatliği bir gerileme olarak gorur. Bir duraklama. Normale donmeden once hayatta kalinacak bir sey. Ancak sakatlik bilgidir. Sistemin tam olarak nerede basarisiz oldugunu ortaya cikarir — yukun nerede biriktigini, kontrolun nerede kaybedildigini, zincirin nerede kirildigi.

REFORGE her sakatliği bir harita olarak ele alir. Bir mahkumiyet degil. Sakatlik gecmisinizi analiz ettigimizde, neyin yanlis gittigine bakmiyoruz — vucudunuzun yapisal oncelikleri hakkinda bize ne soyledigine bakiyoruz. En guclu geri donen sporcular, sakatliklarla savusmayi birakip onlari dinlemeye baslayanlardir.`,
  },
  {
    id: "athlete-mentality",
    title: "Antrenman ile Yarisma Arasindaki Fark",
    excerpt: "Antrenman hazirlik. Yarisma baski altinda uygulama. Cogu sporcu bedenlerini antrenman yapar ama ikisi arasindaki bosluğu asla antrenman yapmaz.",
    image: "/images/hero-3.jpg",
    date: "27 Mart 2026",
    category: "Performans",
    content: `Her rekabetci sporcunun bildigi bir an var — antrenmanda yapabildiginiz ile baski altinda gercekten yaptiginiz arasindaki bosluk. Bu bosluk fiziksel degil. Sistemik. Baglam olmadan antrenman yapmanin, stres altinda aktive olan kontrol sistemlerini insa etmeden kapasite insa etmenin sonucu.

REFORGE fiziksel ve zihinsel hazirliği ayirmaz. Antrenman yapiniz, iyilesme protokolleriniz, gunluk disiplininiz — hepsi ayni sistemi besler. Sistem organize edildiginde, bosluk kapanir. Degilken, hicbir motivasyon sizi dorduncu ceyrekte kurtarmaz.`,
  },
  {
    id: "load-distribution",
    title: "Yuk Dagilimi: Ağrinizin Gercekten Nereden Geldiği",
    excerpt: "Sorun nadiren agrinin oldugu yerde. Sorun zincirin basinda kontrolun kaybi.",
    image: "/images/hero-4.jpg",
    date: "20 Mart 2026",
    category: "Sistem",
    content: `Kosu, ziplama veya durma sirasinda, vucut yuku bir zincir boyunca aktarir: Ayak → Ayak Bilegi → Diz → Kalca → Cekirdek. Bir halka isini yapmazsa, digeri devralir. Vucut zekidir — ancak bu cozum gecicidir. Kisa vadeli telafi uzun vadeli yapisal hasara donusur.

Soru "nerede agriyor?" degil — "yuk nerede birikiyor?" Cogu rehabilitasyon agri bolgesine odaklanir. REFORGE disfonksiyonun kaynagina odaklanir. Dagilimi duzelt ve agri kendini cozer. Agrinin pesinden kos ve sadece goc eder.`,
  },
];

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  
  const blogPosts = language === "en" ? blogPostsEn : blogPostsTr;
  const activePost = blogPosts.find((p) => p.id === selectedPost);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel showControls={false}>
        <div className="text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6"
          >
            {t("blog.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("blog.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl mx-auto"
          >
            {t("blog.description")}
          </motion.p>
        </div>
      </HeroCarousel>

      {activePost ? (
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="font-heading text-xs tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors mb-8 inline-block"
            >
              ← {t("blog.back")}
            </button>
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <img src={activePost.image} alt={activePost.title} className="w-full aspect-video object-cover mb-8" />
              <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-primary">{activePost.category}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase mt-2">{activePost.title}</h2>
              <p className="font-body text-muted-foreground text-sm mt-2">{activePost.date}</p>
              <div className="mt-8 font-body text-foreground/80 leading-relaxed space-y-4">
                {activePost.content.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.article>
          </div>
        </section>
      ) : (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedPost(post.id)}
                  className="border border-border hover:border-primary/40 transition-all cursor-pointer group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-primary">{post.category}</span>
                      <span className="font-body text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground uppercase group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm mt-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;
