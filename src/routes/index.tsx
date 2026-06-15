import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coupleAsset from "@/assets/couple.png.asset.json";
import songAsset from "@/assets/song.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xasan & Dilfuza — To'y taklifnomasi" },
      { name: "description", content: "28-iyun 2026-yil, 18:00, Jasmin To'yxonasi. Sizni to'y marosimimizga taklif qilamiz." },
      { property: "og:title", content: "Xasan & Dilfuza" },
      { property: "og:description", content: "28.06.2026 — Jasmin To'yxonasi" },
      { property: "og:image", content: coupleAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=Amiri:wght@400;700&display=swap",
      },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-06-28T18:00:00+05:00");

type Lang = "uz" | "ru" | "en";

const T: Record<Lang, Record<string, string>> = {
  uz: {
    invitation: "SIZ TAKLIFNOMA OLDINGIZ",
    quote: "Va U ularning qalblarini birlashtirdi",
    quoteRef: "Anfol surasi, 63",
    unlock: "OCHISH",
    dear: "Aziz mehmonlarimiz!",
    invite: "Sizni to'y marosimimizga taklif qilamiz",
    date: "SANA",
    countdown: "TO'YGACHA QOLDI",
    days: "kun", hours: "soat", minutes: "daqiqa", seconds: "soniya",
    startAt: "BOSHLANISHI 18:00",
    schedule: "DASTUR",
    guests: "MEHMONLARNI KUTIB OLISH",
    ceremony: "NIKOH MAROSIMI",
    banquet: "BAYRAM ZIYOFATI",
    end: "OQSHOM YAKUNI",
    venue: "TO'Y JOYI",
    venueName: "Jasmin To'yxonasi",
    venueDesc: "Sevgi va nafosat uchrashgan joyda",
    welcome: "Sizni ko'rishdan baxtiyor bo'lamiz!",
    yandexMap: "Yandex xaritada",
    googleMap: "Google xaritada",
    closing: "SIZNING ISHTIROKINGIZ",
    closingDesc: "biz uchun eng qimmatli sovg'a!",
    months: "Yanvar Fevral Mart Aprel May Iyun Iyul Avgust Sentyabr Oktyabr Noyabr Dekabr",
    weekdays: "Du Se Ch Pa Ju Sh Ya",
  },
  ru: {
    invitation: "ВЫ ПОЛУЧИЛИ ПРИГЛАШЕНИЕ",
    quote: "И Он сплотил их сердца",
    quoteRef: "Аль-Анфаль, 63",
    unlock: "ОТКРЫТЬ",
    dear: "Дорогие наши!",
    invite: "Мы рады пригласить вас на нашу свадьбу",
    date: "ДАТА",
    countdown: "ДО СВАДЬБЫ ОСТАЛОСЬ",
    days: "дней", hours: "часов", minutes: "минут", seconds: "секунд",
    startAt: "НАЧАЛО В 18:00",
    schedule: "РАСПИСАНИЕ",
    guests: "ВСТРЕЧА ГОСТЕЙ",
    ceremony: "ЦЕРЕМОНИЯ",
    banquet: "БАНКЕТ",
    end: "ОКОНЧАНИЕ ВЕЧЕРА",
    venue: "МЕСТО ПРОВЕДЕНИЯ",
    venueName: "Ресторан «Jasmin»",
    venueDesc: "Где встречаются любовь и элегантность",
    welcome: "Будем рады видеть вас!",
    yandexMap: "Яндекс карта",
    googleMap: "Google карта",
    closing: "ВАШЕ ПРИСУТСТВИЕ",
    closingDesc: "лучший подарок для нас!",
    months: "Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь",
    weekdays: "Пн Вт Ср Чт Пт Сб Вс",
  },
  en: {
    invitation: "YOU HAVE RECEIVED AN INVITATION",
    quote: "And He united their hearts",
    quoteRef: "Al-Anfal, 63",
    unlock: "UNLOCK",
    dear: "Dear our loved ones!",
    invite: "We are delighted to invite you to our wedding",
    date: "DATE",
    countdown: "TIME REMAINING UNTIL THE WEDDING",
    days: "days", hours: "hours", minutes: "minutes", seconds: "seconds",
    startAt: "START AT 18:00",
    schedule: "SCHEDULE",
    guests: "GUEST ARRIVAL",
    ceremony: "CEREMONY",
    banquet: "BANQUET",
    end: "END OF THE EVENING",
    venue: "VENUE",
    venueName: "Jasmin Restaurant",
    venueDesc: "Where love meets elegance",
    welcome: "We will be happy to see you!",
    yandexMap: "Yandex maps",
    googleMap: "Google maps",
    closing: "YOUR PRESENCE",
    closingDesc: "is the most important gift for us!",
    months: "January February March April May June July August September October November December",
    weekdays: "Mon Tue Wed Thu Fri Sat Sun",
  },
};

const YANDEX_URL = "https://yandex.uz/maps/-/CPxBJPy8";
const GOOGLE_URL = "https://maps.app.goo.gl/oTsbvGbt2q9EDPiJ6";

function useCountdown(enabled: boolean) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [enabled]);
  if (now === null) return null;
  const diff = Math.max(0, WEDDING_DATE.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Petals() {
  const petals = Array.from({ length: 16 });
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 1.7) % 12;
        const dur = 16 + (i % 7) * 2;
        const size = 5 + (i % 5) * 2;
        return (
          <span
            key={i}
            className="petal absolute rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: "radial-gradient(circle, oklch(0.92 0.12 80) 0%, oklch(0.78 0.11 70 / 0.4) 60%, transparent 100%)",
              animationDelay: `-${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Ornament({ symbol = "✦" }: { symbol?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[var(--gold)]">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--gold)]/60" />
      <span className="text-sm tracking-widest">{symbol}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--gold)]/60" />
    </div>
  );
}

function Heart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-[var(--gold)]/70">
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={`relative ${className}`}>
      <div className={visible ? "fade-up" : "opacity-0"}>{children}</div>
    </section>
  );
}

function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="music"
      className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)]/40 bg-card/70 text-[var(--gold)] shadow-lg backdrop-blur transition hover:scale-105"
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      )}
      {playing && <span className="absolute inset-0 rounded-full border border-[var(--gold)]/50 shimmer" />}
    </button>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: Lang[] = ["uz", "ru", "en"];
  return (
    <div className="fixed left-4 top-4 z-50 flex gap-1.5">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`h-9 w-11 rounded-full border text-xs tracking-wider backdrop-blur transition ${
            lang === l
              ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
              : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function CalendarJun2026({ weekdays, monthName }: { weekdays: string; monthName: string }) {
  // June 2026: 1st is Monday. 30 days.
  const wd = weekdays.split(/\s+/);
  const days: (number | null)[] = [];
  // June 1, 2026 = Monday => offset 0
  for (let i = 0; i < 30; i++) days.push(i + 1);
  return (
    <div className="mx-auto max-w-xs rounded-2xl border border-[var(--gold)]/25 bg-card/40 p-5 backdrop-blur">
      <p className="text-center text-sm tracking-[0.4em] text-[var(--gold)]">
        {monthName.toUpperCase()} 2026
      </p>
      <div className="my-4 h-px bg-[var(--gold)]/20" />
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-wider text-muted-foreground">
        {wd.map((d) => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((d) => (
          <div
            key={d}
            className={`grid h-8 w-8 mx-auto place-items-center rounded-full ${
              d === 28
                ? "bg-[var(--gold)] text-[var(--primary-foreground)] font-semibold shadow-[0_0_20px_oklch(0.82_0.13_80/0.5)]"
                : "text-foreground/80"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function Invitation() {
  const [lang, setLang] = useState<Lang>("uz");
  const t = T[lang];
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const countdown = useCountdown(unlocked);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const unlock = () => {
    setUnlocked(true);
    const a = audioRef.current;
    if (a) a.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const monthName = t.months.split(" ")[5]; // June

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <audio ref={audioRef} src={songAsset.url} loop preload="auto" />
      <LangSwitch lang={lang} setLang={setLang} />
      <MusicToggle playing={playing} onToggle={togglePlay} />
      <Petals />

      {/* HERO / UNLOCK */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-24 text-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.25 0.04 70 / 0.6), transparent 60%), radial-gradient(ellipse at bottom, oklch(0.2 0.03 80 / 0.5), transparent 60%)",
          }}
        />
        <div className="relative z-20 mx-auto max-w-xl">
          <Ornament symbol="—" />
          <p className="mt-4 text-[11px] tracking-[0.4em] text-muted-foreground">
            {t.invitation}
          </p>
          <h1 className="mt-10 font-display text-5xl leading-tight text-foreground md:text-7xl">
            Xasan <span className="gold-text italic">&</span> Dilfuza
          </h1>
          <div className="mt-8 flex items-center justify-center gap-4 text-[var(--gold)]">
            <span className="h-px w-10 bg-[var(--gold)]/50" />
            <p className="text-sm tracking-[0.5em]">28 · 06 · 2026</p>
            <span className="h-px w-10 bg-[var(--gold)]/50" />
          </div>
          <p className="mt-10 font-arabic text-3xl text-[var(--gold)] md:text-4xl" style={{ fontFamily: 'Amiri, serif' }}>
            وَأَلَّفَ بَيْنَ قُلُوبِهِمْ
          </p>
          <p className="mt-4 italic text-foreground/80">"{t.quote}"</p>
          <p className="mt-1 text-xs tracking-wider text-muted-foreground">{t.quoteRef}</p>
          <div className="mt-6"><Heart /></div>

          {!unlocked && (
            <button
              onClick={unlock}
              className="group relative mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/50 bg-card/40 py-3 pl-3 pr-6 backdrop-blur transition hover:border-[var(--gold)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gold)] text-[var(--primary-foreground)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0"/></svg>
              </span>
              <span className="text-sm tracking-[0.3em] text-foreground">{t.unlock}</span>
              <span className="text-[var(--gold)] transition group-hover:translate-x-1">→</span>
            </button>
          )}
        </div>
      </section>

      {unlocked && (
        <div id="content">
          {/* DEAR / INVITE */}
          <Section className="px-6 py-20">
            <div className="mx-auto max-w-xl text-center">
              <Ornament symbol="♡" />
              <p className="mt-6 font-display text-3xl italic text-[var(--gold)] md:text-4xl">{t.dear}</p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">{t.invite}</p>
            </div>
          </Section>

          {/* PHOTO */}
          <Section className="px-6 pb-10">
            <div className="mx-auto max-w-md">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] border border-[var(--gold)]/30" />
                <div className="absolute -inset-1 rounded-[1.7rem] border border-[var(--gold)]/50" />
                <img
                  src={coupleAsset.url}
                  alt="Xasan & Dilfuza"
                  className="relative h-auto w-full rounded-[1.5rem] object-cover shadow-2xl"
                />
              </div>
            </div>
          </Section>

          {/* DATE / CALENDAR */}
          <Section className="px-6 py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-[11px] tracking-[0.5em] text-[var(--gold)]">{t.date}</p>
              <p className="mt-3 font-display text-5xl tracking-wider text-foreground md:text-6xl">
                28<span className="text-[var(--gold)]">.</span>06<span className="text-[var(--gold)]">.</span>2026
              </p>
              <div className="mt-8"><Heart /></div>
              <div className="mt-10">
                <CalendarJun2026 weekdays={t.weekdays} monthName={monthName} />
              </div>
              <p className="mt-6 text-xs tracking-[0.4em] text-muted-foreground">{t.startAt}</p>
            </div>
          </Section>

          {/* COUNTDOWN */}
          <Section className="px-6 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <Ornament symbol="✧" />
              <p className="mt-5 text-[11px] tracking-[0.4em] text-[var(--gold)]">{t.countdown}</p>
              <div className="mt-8 grid grid-cols-4 gap-2 md:gap-5">
                {[
                  { v: countdown?.days, l: t.days },
                  { v: countdown?.hours, l: t.hours },
                  { v: countdown?.minutes, l: t.minutes },
                  { v: countdown?.seconds, l: t.seconds },
                ].map((it, i) => (
                  <div key={i} className="rounded-2xl border border-[var(--gold)]/25 bg-card/50 p-3 backdrop-blur md:p-5">
                    <div className="gold-text font-display text-3xl md:text-5xl" suppressHydrationWarning>
                      {it.v === undefined ? "—" : String(it.v).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] tracking-widest text-muted-foreground md:text-xs">{it.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* SCHEDULE */}
          <Section className="px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Ornament symbol="✦" />
              <h2 className="mt-5 text-4xl italic md:text-5xl">{t.schedule}</h2>
              <div className="mt-12 space-y-5">
                {[
                  { time: "18:00", label: t.guests, icon: "🥂" },
                  { time: "19:00", label: t.ceremony, icon: "💍" },
                  { time: "20:00", label: t.banquet, icon: "🍽️" },
                  { time: "23:00", label: t.end, icon: "✨" },
                ].map((row, i) => (
                  <div key={i} className="relative flex items-center gap-5 rounded-2xl border border-[var(--gold)]/20 bg-card/40 p-5 text-left backdrop-blur">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--gold)]/40 text-2xl">
                      {row.icon}
                    </div>
                    <div className="flex-1">
                      <div className="gold-text font-display text-2xl md:text-3xl">{row.time}</div>
                      <div className="mt-1 text-xs tracking-[0.3em] text-muted-foreground">{row.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* VENUE */}
          <Section className="px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] tracking-[0.5em] text-[var(--gold)]">✦ {t.venue} ✦</p>
              <h2 className="mt-4 text-4xl italic md:text-5xl">{t.venue}</h2>
              <p className="mt-3 text-sm italic text-muted-foreground">{t.venueDesc}</p>
              <div className="mt-8"><Heart /></div>

              <div className="mt-10 rounded-3xl border border-[var(--gold)]/25 bg-card/50 p-8 backdrop-blur">
                <h3 className="font-display text-3xl italic text-[var(--gold)] md:text-4xl">
                  {t.venueName}
                </h3>
                <p className="mt-4 text-foreground/80">Toshkent shahri, Jasmin To'yxonasi</p>
                <p className="mt-6 italic text-muted-foreground">{t.welcome}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={YANDEX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 px-6 py-3 text-sm tracking-wider text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
                    {t.yandexMap}
                  </a>
                  <a
                    href={GOOGLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 px-6 py-3 text-sm tracking-wider text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
                    {t.googleMap}
                  </a>
                </div>
              </div>
            </div>
          </Section>

          {/* CLOSING */}
          <Section className="px-6 py-24">
            <div className="mx-auto max-w-xl text-center">
              <Ornament symbol="♡" />
              <p className="mt-6 text-[11px] tracking-[0.5em] text-[var(--gold)]">{t.closing}</p>
              <p className="mt-4 font-display text-3xl italic text-foreground md:text-4xl">
                {t.closingDesc}
              </p>
              <div className="mt-10"><Heart /></div>
              <p className="mt-8 gold-text font-display text-4xl italic md:text-5xl">
                Xasan & Dilfuza
              </p>
              <p className="mt-3 text-xs tracking-[0.4em] text-muted-foreground">28 · 06 · 2026</p>
            </div>
          </Section>

          <footer className="border-t border-border/60 py-8 text-center text-xs tracking-widest text-muted-foreground">
            ♡ Xasan & Dilfuza · 2026 ♡
          </footer>
        </div>
      )}
    </main>
  );
}
