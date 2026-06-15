import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import coupleAsset from "@/assets/couple.png.asset.json";
import songAsset from "@/assets/song.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madina & Sardor — Nikoh taklifnomasi" },
      { name: "description", content: "Hayotimizdagi eng baxtli kunga sizni taklif qilamiz." },
      { property: "og:title", content: "Madina & Sardor — Nikoh taklifnomasi" },
      { property: "og:description", content: "20 sentyabr 2026" },
      { property: "og:image", content: coupleAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-09-20T18:00:00+05:00");

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, WEDDING_DATE.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function Petals() {
  const petals = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 1.7) % 12;
        const dur = 14 + (i % 7) * 2;
        const size = 6 + (i % 5) * 2;
        return (
          <span
            key={i}
            className="petal absolute rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: "radial-gradient(circle, oklch(0.92 0.05 80) 0%, oklch(0.78 0.11 70 / 0.6) 60%, transparent 100%)",
              animationDelay: `-${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
      className="fixed right-5 top-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/40 bg-card/80 text-[var(--gold)] shadow-lg backdrop-blur transition hover:scale-105"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      {playing && (
        <span className="absolute inset-0 rounded-full border border-[var(--gold)]/60 shimmer" />
      )}
    </button>
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={`relative ${className} ${visible ? "fade-up" : "opacity-0"}`}>
      {children}
    </section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-[var(--gold)]">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--gold)]" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--gold)]" />
    </div>
  );
}

function Invitation() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  // Try autoplay on first user interaction
  useEffect(() => {
    const handler = () => {
      const a = audioRef.current;
      if (a && a.paused) {
        a.play().then(() => setPlaying(true)).catch(() => {});
      }
      window.removeEventListener("click", handler);
      window.removeEventListener("scroll", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <audio ref={audioRef} src={songAsset.url} loop preload="auto" />
      <MusicToggle playing={playing} onToggle={togglePlay} />
      <Petals />

      {/* HERO */}
      <section className="relative flex h-screen min-h-[640px] items-center justify-center text-center">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="relative z-20 px-6 fade-up">
          <p className="mb-6 text-sm tracking-[0.5em] text-[oklch(0.95_0.04_80)]/90">
            NIKOH TAKLIFNOMASI
          </p>
          <h1 className="font-display text-6xl italic text-white drop-shadow-lg md:text-8xl">
            Madina <span className="text-[var(--gold)]">&</span> Sardor
          </h1>
          <div className="mx-auto mt-8 max-w-xs">
            <Ornament />
          </div>
          <p className="mt-6 text-lg tracking-widest text-white/90 md:text-xl">
            20 · SENTYABR · 2026
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
            Biz hayotimizning eng go'zal kunini sevimli insonlarimiz bilan birga
            nishonlamoqchimiz. Sizni shu baxtli onga taklif qilamiz.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-xs tracking-widest">PASTGA SURING</span>
              <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="animate-bounce">
                <path d="M10 4 V26 M4 20 L10 26 L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.4em] text-[var(--gold)]">SANAGACHA QOLDI</p>
          <h2 className="mt-3 text-4xl italic md:text-5xl">Bizning kunimizgacha</h2>
          <div className="mt-10 grid grid-cols-4 gap-3 md:gap-6">
            {[
              { v: days, l: "kun" },
              { v: hours, l: "soat" },
              { v: minutes, l: "daqiqa" },
              { v: seconds, l: "soniya" },
            ].map((it) => (
              <div
                key={it.l}
                className="rounded-lg border border-[var(--gold)]/30 bg-card/60 p-4 backdrop-blur md:p-6"
              >
                <div className="font-display text-4xl text-[var(--gold)] md:text-6xl">
                  {String(it.v).padStart(2, "0")}
                </div>
                <div className="mt-2 text-xs tracking-widest text-muted-foreground md:text-sm">
                  {it.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section className="bg-secondary/40 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Ornament />
          <h2 className="mt-6 text-4xl italic md:text-5xl">Bizning hikoyamiz</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Tanishuv",
                d: "Ilk uchrashuvimiz oddiy kun edi, lekin u kun hayotimizni o'zgartirdi.",
                date: "Bahor, 2023",
              },
              {
                t: "Sevgi",
                d: "Birga o'tkazgan har bir lahza bizni yanada yaqinlashtirdi.",
                date: "Yoz, 2024",
              },
              {
                t: "Taklif",
                d: "Quyosh botayotgan paytda u 'Ha' degan yagona javobni eshitdi.",
                date: "Bahor, 2026",
              },
            ].map((s) => (
              <div key={s.t} className="rounded-lg border border-border bg-card p-8">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/50 text-[var(--gold)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl italic">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <p className="mt-4 text-xs tracking-widest text-[var(--gold)]">{s.date}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VENUE */}
      <Section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Ornament />
          <h2 className="mt-6 text-4xl italic md:text-5xl">To'y joyi</h2>
          <div className="mt-10 rounded-lg border border-[var(--gold)]/30 bg-card/70 p-10 backdrop-blur">
            <h3 className="text-3xl italic text-[var(--gold)]">"Atlas" to'yxonasi</h3>
            <p className="mt-4 text-muted-foreground">
              Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi 12
            </p>
            <div className="my-6 mx-auto h-px w-24 bg-[var(--gold)]/40" />
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">SANA</p>
                <p className="mt-2 text-lg">20 Sentyabr 2026</p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">VAQT</p>
                <p className="mt-2 text-lg">18:00</p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-muted-foreground">DRESS CODE</p>
                <p className="mt-2 text-lg">Bayramona</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL — uploaded photo */}
      <Section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Ornament />
          <h2 className="mt-6 text-4xl italic md:text-5xl">Sizni kutamiz</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Bu kun biz uchun umrbod esda qoladigan eng aziz lahzalardan biri
            bo'ladi. Iliq qadamingiz bilan baxtimizni baham ko'ring.
          </p>

          <div className="relative mx-auto mt-12 w-full max-w-xl">
            <div className="absolute -inset-3 rounded-[2rem] border border-[var(--gold)]/40" />
            <div className="absolute -inset-1 rounded-[1.8rem] border border-[var(--gold)]/60" />
            <img
              src={coupleAsset.url}
              alt="Kelin va kuyov"
              className="relative h-auto w-full rounded-[1.5rem] object-cover shadow-2xl"
            />
          </div>

          <div className="mt-12">
            <Ornament />
            <p className="mt-8 font-display text-3xl italic text-[var(--gold)]">
              Madina & Sardor
            </p>
            <p className="mt-2 text-sm tracking-widest text-muted-foreground">
              MUHABBAT BILAN
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border/60 py-8 text-center text-xs tracking-widest text-muted-foreground">
        20 · 09 · 2026
      </footer>
    </main>
  );
}
