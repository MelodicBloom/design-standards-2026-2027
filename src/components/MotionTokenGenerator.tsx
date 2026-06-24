import { useState, useCallback } from "react";

type Intent = "informational" | "expressive" | "focus";
type BrandScope = "organic" | "structured" | "hybrid";

interface MotionToken {
  id: string;
  name: string;
  category: "easing" | "duration";
  intent: Intent;
  brandScope: BrandScope[];
  value: string;
  unit?: string;
  trigger: string;
  reducedMotionFallback: string;
  description: string;
}

const DEFAULT_TOKENS: MotionToken[] = [
  {
    id: "1",
    name: "motion-ease-organic-enter",
    category: "easing",
    intent: "expressive",
    brandScope: ["organic"],
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    trigger: "scroll-in, page-load",
    reducedMotionFallback: "instant fade only",
    description: "Soft warm entrance for editorial hero, thesis, gallery, manifesto.",
  },
  {
    id: "2",
    name: "motion-ease-organic-accent",
    category: "easing",
    intent: "focus",
    brandScope: ["organic", "hybrid"],
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    trigger: "hover, tap-expand, focus",
    reducedMotionFallback: "instant opacity",
    description: "Sharper organic accent for CTAs, callouts, lifted cards.",
  },
  {
    id: "3",
    name: "motion-ease-structured-ui",
    category: "easing",
    intent: "informational",
    brandScope: ["structured", "hybrid"],
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    trigger: "tab-switch, accordion-toggle",
    reducedMotionFallback: "instant state change",
    description: "Neutral system curve for tabs, modals, drawers, state changes.",
  },
  {
    id: "4",
    name: "motion-duration-xxs",
    category: "duration",
    intent: "focus",
    brandScope: ["organic", "structured", "hybrid"],
    value: "120",
    unit: "ms",
    trigger: "hover, focus, tooltip",
    reducedMotionFallback: "0ms",
    description: "Microinteraction timing.",
  },
  {
    id: "5",
    name: "motion-duration-xs",
    category: "duration",
    intent: "focus",
    brandScope: ["organic", "structured", "hybrid"],
    value: "180",
    unit: "ms",
    trigger: "button-state, affordance",
    reducedMotionFallback: "0ms",
    description: "Button states and affordance cues.",
  },
  {
    id: "6",
    name: "motion-duration-sm",
    category: "duration",
    intent: "informational",
    brandScope: ["organic", "structured", "hybrid"],
    value: "240",
    unit: "ms",
    trigger: "card-enter, row-reveal",
    reducedMotionFallback: "0ms",
    description: "Small card and element reveals.",
  },
  {
    id: "7",
    name: "motion-duration-md",
    category: "duration",
    intent: "informational",
    brandScope: ["organic", "structured", "hybrid"],
    value: "320",
    unit: "ms",
    trigger: "section-transition, modal-enter",
    reducedMotionFallback: "0ms",
    description: "Section transitions, modals, drawers.",
  },
  {
    id: "8",
    name: "motion-duration-lg",
    category: "duration",
    intent: "expressive",
    brandScope: ["organic", "structured", "hybrid"],
    value: "520",
    unit: "ms",
    trigger: "scroll-in, section-reveal",
    reducedMotionFallback: "0ms",
    description: "Major editorial section entrances.",
  },
  {
    id: "9",
    name: "motion-duration-xl",
    category: "duration",
    intent: "expressive",
    brandScope: ["organic"],
    value: "700",
    unit: "ms",
    trigger: "page-load, hero-enter, manifesto-reveal",
    reducedMotionFallback: "0ms",
    description: "Hero reveals, manifesto closes, atmospheric moments.",
  },
];

function toCSS(tokens: MotionToken[]): string {
  const vars = tokens
    .map((t) => `  --${t.name}: ${t.unit ? `${t.value}${t.unit}` : t.value};`)
    .join("\n");
  return `:root {\n${vars}\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}`;
}

function toTailwind(tokens: MotionToken[]): string {
  const easing = tokens
    .filter((t) => t.category === "easing")
    .map((t) => `        '${t.name.replace("motion-ease-", "")}': '${t.value}',`)
    .join("\n");
  const duration = tokens
    .filter((t) => t.category === "duration")
    .map((t) => `        '${t.name.replace("motion-duration-", "")}': '${t.value}${t.unit || ""}',`)
    .join("\n");
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      transitionTimingFunction: {\n${easing}\n      },\n      transitionDuration: {\n${duration}\n      },\n    },\n  },\n};`;
}

function toJSON(tokens: MotionToken[]): string {
  const clean = tokens.map(({ id: _id, ...rest }) => rest);
  return JSON.stringify(clean, null, 2);
}

const INTENT_COLORS: Record<Intent, string> = {
  informational: "bg-sky-900/60 text-sky-300",
  expressive: "bg-violet-900/60 text-violet-300",
  focus: "bg-amber-900/60 text-amber-300",
};

export default function MotionTokenGenerator() {
  const [tokens, setTokens] = useState<MotionToken[]>(DEFAULT_TOKENS);
  const [activeTab, setActiveTab] = useState<"css" | "tailwind" | "json">("css");
  const [copied, setCopied] = useState(false);

  const addToken = useCallback(() => {
    setTokens((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: "motion-new-token",
        category: "duration",
        intent: "informational",
        brandScope: ["hybrid"],
        value: "240",
        unit: "ms",
        trigger: "",
        reducedMotionFallback: "0ms",
        description: "",
      },
    ]);
  }, []);

  const updateToken = useCallback(
    (id: string, field: keyof MotionToken, value: unknown) => {
      setTokens((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
      );
    },
    []
  );

  const removeToken = useCallback((id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const output =
    activeTab === "css" ? toCSS(tokens)
    : activeTab === "tailwind" ? toTailwind(tokens)
    : toJSON(tokens);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const ext = activeTab === "json" ? "json" : activeTab === "tailwind" ? "js" : "css";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motion-tokens.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 md:p-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Motion Token Generator
        </h1>
        <p className="mt-2 text-neutral-400 text-sm max-w-2xl">
          Define, preview, and export motion tokens as CSS variables, Tailwind config,
          or JSON for engineering handoff. Based on the motion-system-master skill.
        </p>
      </header>

      {/* Token table */}
      <section className="mb-10 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Tokens</h2>
          <button
            onClick={addToken}
            className="px-4 py-1.5 text-sm bg-violet-600 hover:bg-violet-500 text-white rounded-md
              transition-colors duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            + Add token
          </button>
        </div>

        <table className="w-full text-xs border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500">
              {["Name","Cat","Intent","Brand scope","Value","Unit","Trigger","Fallback","Description",""].map((h) => (
                <th key={h} className="py-2 px-2 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr
                key={t.id}
                className="border-b border-neutral-900 hover:bg-neutral-900/40 transition-colors duration-[120ms]"
              >
                <td className="py-2 px-2">
                  <input
                    value={t.name}
                    onChange={(e) => updateToken(t.id, "name", e.target.value)}
                    className="bg-transparent border-b border-neutral-700 focus:border-violet-500 outline-none w-48 text-white font-mono text-[11px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <select
                    value={t.category}
                    onChange={(e) => updateToken(t.id, "category", e.target.value)}
                    className="bg-neutral-900 border border-neutral-700 rounded px-1 py-0.5 text-white text-[11px]"
                  >
                    <option value="easing">easing</option>
                    <option value="duration">duration</option>
                  </select>
                </td>
                <td className="py-2 px-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${INTENT_COLORS[t.intent]}`}>
                    {t.intent}
                  </span>
                </td>
                <td className="py-2 px-2 text-neutral-400 text-[11px]">{t.brandScope.join(", ")}</td>
                <td className="py-2 px-2">
                  <input
                    value={t.value}
                    onChange={(e) => updateToken(t.id, "value", e.target.value)}
                    className="bg-transparent border-b border-neutral-700 focus:border-violet-500 outline-none w-52 text-emerald-400 font-mono text-[11px]"
                  />
                </td>
                <td className="py-2 px-2 text-neutral-500 text-[11px]">{t.unit ?? "—"}</td>
                <td className="py-2 px-2">
                  <input
                    value={t.trigger}
                    onChange={(e) => updateToken(t.id, "trigger", e.target.value)}
                    className="bg-transparent border-b border-neutral-700 focus:border-violet-500 outline-none w-28 text-neutral-300 text-[11px]"
                  />
                </td>
                <td className="py-2 px-2 text-neutral-500 text-[11px] whitespace-nowrap">{t.reducedMotionFallback}</td>
                <td className="py-2 px-2">
                  <input
                    value={t.description}
                    onChange={(e) => updateToken(t.id, "description", e.target.value)}
                    className="bg-transparent border-b border-neutral-700 focus:border-violet-500 outline-none w-48 text-neutral-300 text-[11px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => removeToken(t.id)}
                    className="text-neutral-700 hover:text-red-400 transition-colors text-xs"
                    aria-label={`Remove ${t.name}`}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Output panel */}
      <section>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {(["css", "tailwind", "json"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded text-sm font-medium
                transition-colors duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={copy}
              className="px-4 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded
                transition-colors duration-[180ms]"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
            <button
              onClick={download}
              className="px-4 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded
                transition-colors duration-[180ms]"
            >
              Download
            </button>
          </div>
        </div>

        <pre
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 text-xs
            text-emerald-400 font-mono overflow-x-auto whitespace-pre leading-relaxed
            max-h-[520px] overflow-y-auto"
        >
          {output}
        </pre>
      </section>
    </div>
  );
}
