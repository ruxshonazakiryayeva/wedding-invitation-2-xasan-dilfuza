import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coupleUrl from "@/assets/couple.png";
import songUrl from "@/assets/song.m4a";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sherzod & Kumush — To'y taklifnomasi" },
      { name: "description", content: "29-oktabr 2026-yil, 18:00, Jasmin To'yxonasi. Sizni to'y marosimimizga taklif qilamiz." },
      { property: "og:title", content: "Sherzod & Kumush — To'y taklifnomasi" },
      { property: "og:description", content: "29-oktabr 2026-yil, 18:00, Jasmin To'yxonasi. Sizni to'y marosimimizga taklif qilamiz." },
      { property: "og:image", content: coupleUrl },
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

const WEDDING_DATE = new Date("2026-10-29T18:00:00+05:00");
const RSVP_STORAGE_KEY = "wedding-rsvp-sherzod-kumush";
const ADMIN_PASSWORD = "1317";
const WI_URL = "https://webinvite-six.vercel.app/";

type Lang = "uz" | "ru" | "en";

type RsvpEntry = {
  id: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
  createdAt: string;
};

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
    rsvp: "TAKLIFNI TASDIQLASH",
    rsvpDesc: "Iltimos, kelishingizni oldindan bildiring",
    yourName: "Ismingiz",
    attending: "Kelasizmi?",
    yes: "Ha, albatta",
    no: "Afsuski, yo'q",
    guestsCount: "Mehmonlar soni",
    submit: "YUBORISH",
    submitted: "Rahmat! Javobingiz qabul qilindi ♡",
    adminTitle: "Admin panel",
    passwordLabel: "Parol",
    enter: "KIRISH",
    wrongPassword: "Noto'g'ri parol",
    close: "Yopish",
    noSubmissions: "Hozircha javoblar yo'q",
    totalGuests: "Jami mehmonlar",
    totalResponses: "Javoblar",
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
    rsvp: "ПОДТВЕРДИТЕ ПРИСУТСТВИЕ",
    rsvpDesc: "Пожалуйста, сообщите заранее",
    yourName: "Ваше имя",
    attending: "Придёте?",
    yes: "Да, обязательно",
    no: "К сожалению, нет",
    guestsCount: "Количество гостей",
    submit: "ОТПРАВИТЬ",
    submitted: "Спасибо! Ваш ответ принят ♡",
    adminTitle: "Админ-панель",
    passwordLabel: "Пароль",
    enter: "ВОЙТИ",
    wrongPassword: "Неверный пароль",
    close: "Закрыть",
    noSubmissions: "Пока нет ответов",
    totalGuests: "Всего гостей",
    totalResponses: "Ответов",
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
    rsvp: "CONFIRM YOUR PRESENCE",
    rsvpDesc: "Please let us know in advance",
    yourName: "Your name",
    attending: "Will you attend?",
    yes: "Yes, of course",
    no: "Unfortunately, no",
    guestsCount: "Number of guests",
    submit: "SUBMIT",
    submitted: "Thank you! Your response has been received ♡",
    adminTitle: "Admin panel",
    passwordLabel: "Password",
    enter: "ENTER",
    wrongPassword: "Wrong password",
    close: "Close",
    noSubmissions: "No responses yet",
    totalGuests: "Total guests",
    totalResponses: "Responses",
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

function loadRsvps(): RsvpEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RSVP_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RsvpEntry[]) : [];
  } catch {
    return [];
  }
}

function saveRsvps(list: RsvpEntry[]) {
  window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list));
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

function CalendarOct2026({ weekdays, monthName }: { weekdays: string; monthName: string }) {
  // October 2026: 1st is Thursday. 31 days. Weekdays start Monday, so offset = 3.
  const wd = weekdays.split(/\s+/);
  const OFFSET = 3;
  const cells: (number | null)[] = [];
  for (let i = 0; i < OFFSET; i++) cells.push(null);
  for (let i = 1; i <= 31; i++) cells.push(i);
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
        {cells.map((d, i) => (
          <div
            key={i}
            className={`grid h-8 w-8 mx-auto place-items-center rounded-full ${
              d === 29
                ? "bg-[var(--gold)] text-[var(--primary-foreground)] font-semibold shadow-[0_0_20px_oklch(0.82_0.13_80/0.5)]"
                : d
                ? "text-foreground/80"
                : ""
            }`}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function RsvpForm({ t, onSubmit }: { t: Record<string, string>; onSubmit: (e: RsvpEntry) => void }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [count, setCount] = useState(1);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const entry: RsvpEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      attending,
      guests: Math.max(1, Math.min(20, Number(count) || 1)),
      createdAt: new Date().toISOString(),
    };
    onSubmit(entry);
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-[var(--gold)]/30 bg-card/50 p-8 text-center backdrop-blur">
        <Heart />
        <p className="mt-4 font-display text-2xl italic text-[var(--gold)] md:text-3xl">{t.submitted}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-[var(--gold)]/25 bg-card/50 p-6 backdrop-blur md:p-8 text-left space-y-5">
      <div>
        <label className="mb-2 block text-[11px] tracking-[0.3em] text-[var(--gold)]">{t.yourName}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={80}
          className="w-full rounded-xl border border-[var(--gold)]/30 bg-background/60 px-4 py-3 text-foreground outline-none focus:border-[var(--gold)]"
        />
      </div>
      <div>
        <label className="mb-2 block text-[11px] tracking-[0.3em] text-[var(--gold)]">{t.attending}</label>
        <div className="grid grid-cols-2 gap-2">
          {(["yes", "no"] as const).map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setAttending(v)}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                attending === v
                  ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "yes" ? t.yes : t.no}
            </button>
          ))}
        </div>
      </div>
      {attending === "yes" && (
        <div>
          <label className="mb-2 block text-[11px] tracking-[0.3em] text-[var(--gold)]">{t.guestsCount}</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--gold)]/30 bg-background/60 px-4 py-3 text-foreground outline-none focus:border-[var(--gold)]"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--gold)] py-3 text-sm tracking-[0.3em] text-[var(--primary-foreground)] shadow-lg transition hover:scale-[1.02]"
      >
        {t.submit}
      </button>
    </form>
  );
}

function AdminPanel({ t, onClose }: { t: Record<string, string>; onClose: () => void }) {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  useEffect(() => setEntries(loadRsvps()), []);
  const totalGuests = entries.filter((e) => e.attending === "yes").reduce((a, b) => a + b.guests, 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--gold)]/40 bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--gold)]/20 p-5">
          <h3 className="font-display text-2xl italic text-[var(--gold)]">{t.adminTitle}</h3>
          <button onClick={onClose} className="rounded-full border border-border px-4 py-1.5 text-xs tracking-wider text-muted-foreground hover:text-foreground">
            {t.close}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 border-b border-[var(--gold)]/20 p-5 text-center">
          <div>
            <div className="gold-text font-display text-3xl">{entries.length}</div>
            <div className="text-[10px] tracking-widest text-muted-foreground">{t.totalResponses}</div>
          </div>
          <div>
            <div className="gold-text font-display text-3xl">{totalGuests}</div>
            <div className="text-[10px] tracking-widest text-muted-foreground">{t.totalGuests}</div>
          </div>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-5">
          {entries.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{t.noSubmissions}</p>
          ) : (
            <ul className="space-y-3">
              {entries.slice().reverse().map((e) => (
                <li key={e.id} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-lg text-foreground">{e.name}</div>
                      <div className="mt-0.5 text-[11px] tracking-wider text-muted-foreground">
                        {new Date(e.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded-full px-3 py-1 text-[10px] tracking-widest ${
                        e.attending === "yes"
                          ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {e.attending === "yes" ? t.yes : t.no}
                      </span>
                      {e.attending === "yes" && (
                        <div className="mt-1 text-xs text-muted-foreground">× {e.guests}</div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminGate({ t, onClose, onSuccess }: { t: Record<string, string>; onClose: () => void; onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.trim() === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setErr(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-[var(--gold)]/40 bg-card p-6 shadow-2xl">
        <h3 className="text-center font-display text-2xl italic text-[var(--gold)]">{t.adminTitle}</h3>
        <label className="mt-6 block text-[11px] tracking-[0.3em] text-[var(--gold)]">{t.passwordLabel}</label>
        <input
          type="password"
          value={pwd}
          onChange={(e) => { setPwd(e.target.value); setErr(false); }}
          autoFocus
          className="mt-2 w-full rounded-xl border border-[var(--gold)]/30 bg-background/60 px-4 py-3 text-foreground outline-none focus:border-[var(--gold)]"
        />
        {err && <p className="mt-2 text-xs text-red-400">{t.wrongPassword}</p>}
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border py-3 text-xs tracking-wider text-muted-foreground hover:text-foreground">
            {t.close}
          </button>
          <button type="submit" className="flex-1 rounded-full bg-[var(--gold)] py-3 text-xs tracking-[0.3em] text-[var(--primary-foreground)]">
            {t.enter}
          </button>
        </div>
      </form>
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
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [adminStage, setAdminStage] = useState<"closed" | "gate" | "open">("closed");

  useEffect(() => { setRsvps(loadRsvps()); }, []);

  const addRsvp = (entry: RsvpEntry) => {
    const next = [...rsvps, entry];
    setRsvps(next);
    saveRsvps(next);
  };

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

  const monthName = t.months.split(" ")[9]; // October

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <audio ref={audioRef} src={songUrl} loop preload="auto" />
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
            Sherzod <span className="gold-text italic">&</span> Kumush
          </h1>
          <div className="mt-8 flex items-center justify-center gap-4 text-[var(--gold)]">
            <span className="h-px w-10 bg-[var(--gold)]/50" />
            <p className="text-sm tracking-[0.5em]">29 · 10 · 2026</p>
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
                  src={coupleUrl}
                  alt="Sherzod & Kumush"
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
                29<span className="text-[var(--gold)]">.</span>10<span className="text-[var(--gold)]">.</span>2026
              </p>
              <div className="mt-8"><Heart /></div>
              <div className="mt-10">
                <CalendarOct2026 weekdays={t.weekdays} monthName={monthName} />
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

          {/* RSVP */}
          <Section className="px-6 py-20">
            <div className="mx-auto max-w-lg text-center">
              <Ornament symbol="✉" />
              <p className="mt-5 text-[11px] tracking-[0.4em] text-[var(--gold)]">{t.rsvp}</p>
              <p className="mt-3 text-sm italic text-muted-foreground">{t.rsvpDesc}</p>
              <div className="mt-8">
                <RsvpForm t={t} onSubmit={addRsvp} />
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
                Sherzod & Kumush
              </p>
              <p className="mt-3 text-xs tracking-[0.4em] text-muted-foreground">29 · 10 · 2026</p>
            </div>
          </Section>

          <footer className="relative border-t border-border/60 py-10 text-center text-xs tracking-widest text-muted-foreground">
            <p>♡ Sherzod & Kumush · 2026 ♡</p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onClick={() => setAdminStage("gate")}
                aria-label="Admin"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--gold)]/40 bg-card/70 text-[var(--gold)]/70 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                title="Admin"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="8" cy="15" r="4"/>
                  <path d="m10.85 12.15 8.15-8.15"/>
                  <path d="m18 5 3 3"/>
                  <path d="m15 8 3 3"/>
                </svg>
              </button>
              <a
                href={WI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-gradient-to-br from-[var(--gold)] to-[oklch(0.72_0.14_70)] px-7 font-display text-base font-semibold tracking-[0.35em] text-[var(--primary-foreground)] shadow-[0_8px_30px_oklch(0.82_0.13_80/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_oklch(0.82_0.13_80/0.6)] hover:scale-105"
              >
                <span className="pulse-soft absolute inset-0 rounded-full border border-[var(--gold)]/60" />
                <span className="relative">WI</span>
              </a>
            </div>
          </footer>
        </div>
      )}

      {adminStage === "gate" && (
        <AdminGate t={t} onClose={() => setAdminStage("closed")} onSuccess={() => setAdminStage("open")} />
      )}
      {adminStage === "open" && (
        <AdminPanel t={t} onClose={() => setAdminStage("closed")} />
      )}
    </main>
  );
}
