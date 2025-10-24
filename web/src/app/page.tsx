"use client";

import {
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { toPng } from "html-to-image";
import {
  Download,
  LayoutDashboard,
  MoveRight,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";

type PosterTheme = {
  id: string;
  name: string;
  gradient: string;
  ring: string;
  glow: string;
  accent: string;
  accentStrong: string;
  label: string;
};

type PosterCopy = {
  badge: string;
  headline: string;
  subheadline: string;
  hiring: string;
  salary: string;
  cta: string;
  footer: string;
};

type PosterLayoutId = "beam" | "grid" | "orbit";

type PosterLayout = {
  id: PosterLayoutId;
  name: string;
  description: string;
};

const palettes: PosterTheme[] = [
  {
    id: "aurora",
    name: "Aurora Pulse",
    gradient: "from-indigo-500 via-fuchsia-500 to-orange-400",
    ring: "ring-indigo-100/40",
    glow: "shadow-[0_40px_120px_rgba(99,102,241,0.45)]",
    accent: "bg-white/20",
    accentStrong: "bg-white text-slate-900",
    label: "text-white/70",
  },
  {
    id: "nebula",
    name: "Neon Nebula",
    gradient: "from-emerald-500 via-cyan-500 to-blue-500",
    ring: "ring-cyan-100/40",
    glow: "shadow-[0_44px_120px_rgba(16,185,129,0.4)]",
    accent: "bg-white/15",
    accentStrong: "bg-emerald-300 text-emerald-950",
    label: "text-white/75",
  },
  {
    id: "lumen",
    name: "Lumen Drift",
    gradient: "from-sky-500 via-purple-500 to-rose-400",
    ring: "ring-purple-100/45",
    glow: "shadow-[0_40px_120px_rgba(236,72,153,0.38)]",
    accent: "bg-white/18",
    accentStrong: "bg-white text-slate-900",
    label: "text-white/65",
  },
];

const layouts: PosterLayout[] = [
  {
    id: "beam",
    name: "Light Beam",
    description: "Spotlight headline with ribbon CTA",
  },
  {
    id: "grid",
    name: "Magnetic Grid",
    description: "Structured blocks with metric sidebar",
  },
  {
    id: "orbit",
    name: "Orbital Flow",
    description: "Circular motion and badge stack",
  },
];

const galleryPosters = [
  {
    id: "ai-match",
    themeId: "aurora" as const,
    layoutId: "beam" as const,
    copy: {
      badge: "AI-READY TALENT",
      headline: "Principal ML Researcher",
      subheadline: "Architect the matching engine powering 12M job seekers.",
      hiring: "Global · Remote-First",
      salary: "₹38-45 LPA + ESOPs",
      cta: "Fast-track 48h",
      footer: "AuroraHire.io",
    },
    benefits: [
      "Greenlit to ship auto-curated hiring pods",
      "Own the AutoGPT evaluation loop",
      "Mentor a squad of AI talent partners",
    ],
    metric: "92% placement confidence",
  },
  {
    id: "growth-pilot",
    themeId: "nebula" as const,
    layoutId: "grid" as const,
    copy: {
      badge: "PORTAL LAUNCH CREW",
      headline: "Growth Intelligence Lead",
      subheadline: "Model-demand signals for 60+ AI unicorns in one dashboard.",
      hiring: "Hybrid · Bengaluru",
      salary: "₹28-34 LPA + Growth bonus",
      cta: "Book chemistry call",
      footer: "agentic.jobs",
    },
    benefits: [
      "Predict hiring surges with vector analytics",
      "Deploy AI-led nurture journeys",
      "Codify playbooks with RevOps co-pilots",
    ],
    metric: "12x pipeline velocity",
  },
  {
    id: "ops-director",
    themeId: "lumen" as const,
    layoutId: "orbit" as const,
    copy: {
      badge: "AI OPS CORE",
      headline: "Director of Automation",
      subheadline: "Lead the human-in-the-loop backbone for AI hiring squads.",
      hiring: "Remote · GMT +5:30",
      salary: "₹32-40 LPA + Profit share",
      cta: "Start with a 30' jam",
      footer: "PulseTalent.ai",
    },
    benefits: [
      "Scale concierge onboarding across 80 markets",
      "Close feedback loops with swarm tooling",
      "Launch blueprint pods with operators",
    ],
    metric: "Launchpad score 94",
  },
];

export default function Home() {
  const [themeId, setThemeId] = useState<PosterTheme["id"]>(palettes[0].id);
  const [layoutId, setLayoutId] = useState<PosterLayoutId>(layouts[0].id);
  const [headline, setHeadline] = useState("AI Talent Partner");
  const [subheadline, setSubheadline] = useState(
    "Design adaptive hiring journeys that match human ambition with precision AI recommendations.",
  );
  const [hiring, setHiring] = useState("Remote · Global Pods");
  const [salary, setSalary] = useState("₹30-36 LPA + Equity");
  const [cta, setCta] = useState("Launch Interview Flow");
  const [badge, setBadge] = useState("AURORAHIRE PORTAL");
  const [footer, setFooter] = useState("aurorahire.jobs");
  const [benefitsInput, setBenefitsInput] = useState(
    [
      "AI concierge curates 1:1 interview squads",
      "Predictive matching pulses new opportunities",
      "Velocity rituals keep human + machine aligned",
    ].join("\n"),
  );
  const [metric, setMetric] = useState("Launch class of July · 87% match rate");

  const posterRef = useRef<HTMLDivElement | null>(null);

  const benefits = useMemo(
    () =>
      benefitsInput
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [benefitsInput],
  );

  const theme = useMemo(
    () => palettes.find((item) => item.id === themeId) ?? palettes[0],
    [themeId],
  );

  const copy: PosterCopy = {
    badge: badge.toUpperCase(),
    headline,
    subheadline,
    hiring,
    salary,
    cta,
    footer,
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    const node = posterRef.current;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#020617",
    });

    const link = document.createElement("a");
    link.download = `${copy.headline.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-poster.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1240px] flex-col gap-20 px-4 pb-24 pt-24 sm:px-8 lg:px-12">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-4xl bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/25 to-sky-500/20 blur-3xl" />

      <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> AI Hiring Poster Studio
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Craft magnetic posters for your AI-native job portal in minutes.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200/80">
              Blend motion gradients, precision copy, and launch-ready CTAs that speak to future-forward
              candidates. Each layout is tuned for social feeds, recruitment fairs, and inbox spotlight drops.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FeatureCard
              icon={<Wand2 className="h-5 w-5" />}
              title="Adaptive Layout Engine"
              description="Switch between poster storylines while your copy flows responsively."
            />
            <FeatureCard
              icon={<Palette className="h-5 w-5" />}
              title="Curated Neon Systems"
              description="Aurora palettes engineered for AI talent communities and tech events."
            />
            <FeatureCard
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Export for Any Channel"
              description="Download high-resolution PNGs optimised for print and stage screens."
            />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PosterVisual
            posterRef={posterRef}
            theme={theme}
            layoutId={layoutId}
            copy={copy}
            benefits={benefits}
            metric={metric}
            className="w-full max-w-[420px]"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-10 shadow-[0_30px_120px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-50">Campaign controls</h2>
            <p className="text-sm text-slate-300/70">
              Tune your copy, swap palettes, and pick the layout narrative that matches the role energy.
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            <Download className="h-4 w-4" /> Export poster
          </button>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Badge">
              <input
                value={badge}
                onChange={(event) => setBadge(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Headline">
              <input
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Storyline">
              <textarea
                value={subheadline}
                onChange={(event) => setSubheadline(event.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Experience highlight">
              <input
                value={metric}
                onChange={(event) => setMetric(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Hiring mode">
              <input
                value={hiring}
                onChange={(event) => setHiring(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Compensation">
              <input
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Call to action">
              <input
                value={cta}
                onChange={(event) => setCta(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
            <Field label="Footer tag">
              <input
                value={footer}
                onChange={(event) => setFooter(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
              />
            </Field>
          </div>
          <Field label="Impact pillars">
            <textarea
              value={benefitsInput}
              onChange={(event) => setBenefitsInput(event.target.value)}
              className="h-full min-h-[220px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-100 focus:outline-none"
            />
          </Field>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Field label="Select palette">
            <div className="flex flex-wrap gap-3">
              {palettes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setThemeId(item.id)}
                  className={cn(
                    "group relative flex min-w-[140px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left transition",
                    themeId === item.id ? "border-white/50" : "hover:border-white/25",
                  )}
                >
                  <span
                    className={cn(
                      "h-8 w-8 rounded-full bg-gradient-to-br",
                      item.gradient,
                      item.glow,
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-300/70">Gradient storytelling</p>
                  </div>
                  <span className="absolute inset-y-0 right-4 my-auto h-2 w-2 rounded-full bg-emerald-400 opacity-0 transition group-hover:opacity-60" />
                  {themeId === item.id && (
                    <span className="absolute inset-y-0 right-4 my-auto h-2 w-2 rounded-full bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Layout storytelling">
            <div className="grid gap-3 sm:grid-cols-3">
              {layouts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLayoutId(item.id)}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-left transition",
                    layoutId === item.id ? "border-white/50" : "hover:border-white/25",
                  )}
                >
                  <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-300/70">{item.description}</p>
                </button>
              ))}
            </div>
          </Field>
        </div>
      </section>

      <section className="space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-50">Poster gallery</h2>
            <p className="text-sm text-slate-300/70">
              Ready-made spreads to inspire your next drop. Remix any layout instantly above.
            </p>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {galleryPosters.map((poster) => (
            <div
              key={poster.id}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl"
            >
              <PosterVisual
                theme={palettes.find((item) => item.id === poster.themeId) ?? palettes[0]}
                layoutId={poster.layoutId}
                copy={poster.copy}
                benefits={poster.benefits}
                metric={poster.metric}
                className="mx-auto w-full max-w-[320px]"
              />
              <div>
                <p className="text-sm font-semibold text-slate-100">{poster.copy.headline}</p>
                <p className="mt-1 text-xs text-slate-300/70">{poster.copy.subheadline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

type PosterVisualProps = {
  theme: PosterTheme;
  layoutId: PosterLayoutId;
  copy: PosterCopy;
  benefits: string[];
  metric: string;
  className?: string;
  posterRef?: MutableRefObject<HTMLDivElement | null>;
};

function PosterVisual({
  theme,
  layoutId,
  copy,
  benefits,
  metric,
  className,
  posterRef,
}: PosterVisualProps) {
  const baseClasses = cn(
    "relative aspect-[3/4] overflow-hidden rounded-[32px] bg-slate-950",
    "ring-1 ring-inset",
    theme.ring,
    theme.glow,
    className,
  );

  if (layoutId === "grid") {
    return (
      <div ref={posterRef} className={baseClasses}>
        <div className={cn("absolute inset-0 bg-gradient-to-br", theme.gradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.26),_transparent_55%)]" />
        <div className="absolute inset-4 rounded-[28px] border border-white/10 bg-slate-900/45 backdrop-blur-lg" />
        <div className="relative z-10 flex h-full flex-col gap-3 p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-full bg-white/15 px-4 py-2 text-[10px] font-semibold tracking-[0.35em] text-white">
              {copy.badge}
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-emerald-200">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Pulse</p>
              <p className="text-sm font-semibold text-white">{metric}</p>
            </div>
          </div>
          <div className="grid flex-1 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Role Spotlight</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
                {copy.headline}
              </h2>
              <p className="mt-3 text-sm text-white/80">{copy.subheadline}</p>
            </div>
            <div className="grid gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3 text-sm text-white"
                >
                  <span className="flex-1 leading-snug">{benefit}</span>
                  <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-[11px] font-semibold text-white/90">
                    AI
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/12 px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{copy.hiring}</p>
              <p className="mt-1 text-lg font-semibold text-white">{copy.salary}</p>
            </div>
            <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900">
              {copy.cta}
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{copy.footer}</p>
        </div>
      </div>
    );
  }

  if (layoutId === "orbit") {
    return (
      <div ref={posterRef} className={baseClasses}>
        <div className={cn("absolute inset-0 bg-gradient-to-tr", theme.gradient)} />
        <div className="absolute -left-20 top-24 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute inset-12 rounded-[28px] border border-white/15 bg-slate-950/40 backdrop-blur-lg" />
        <div className="relative z-10 flex h-full flex-col justify-between p-9">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">{copy.badge}</span>
              <h2 className="text-3xl font-semibold leading-tight">{copy.headline}</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">{copy.hiring}</div>
              <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                {copy.cta}
              </div>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/80">{copy.subheadline}</p>

          <div className="grid gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/70"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-[11px] font-semibold text-white/90">
                  ☆
                </span>
                <span className="flex-1 text-left normal-case tracking-normal text-sm text-white">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{copy.salary}</p>
              <p className="mt-2 text-sm text-white/80">{metric}</p>
            </div>
            <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[11px] uppercase tracking-[0.4em] text-white/80">
              {copy.footer}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={posterRef} className={baseClasses}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", theme.gradient)} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),_transparent_55%)]" />
      <div className="absolute inset-6 rounded-[28px] border border-white/10 bg-slate-950/35 backdrop-blur-xl" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-9">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold tracking-[0.4em] text-white/80">
            {copy.badge}
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-xs text-white">
            <span className="font-semibold uppercase tracking-[0.3em]">Pulse</span>
            <span>{metric}</span>
          </div>
        </div>
        <div className="space-y-4 text-white">
          <h2 className="text-4xl font-semibold leading-tight">{copy.headline}</h2>
          <p className="max-w-sm text-sm text-white/80">{copy.subheadline}</p>
        </div>
        <div className="space-y-3">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-3 text-sm text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 text-[11px] font-semibold text-white">
                AI
              </span>
              <span className="flex-1 leading-snug">{benefit}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/12 px-5 py-4 text-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{copy.hiring}</p>
            <p className="mt-2 text-lg font-semibold">{copy.salary}</p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">
            {copy.cta}
            <MoveRight className="h-4 w-4" />
          </div>
        </div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{copy.footer}</p>
      </div>
    </div>
  );
}

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-slate-100">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-slate-300/75">{description}</p>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm text-slate-200/80">
      <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
