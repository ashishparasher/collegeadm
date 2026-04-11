// lib/seoKeywords.ts

export const cities = [
  "bangalore",
  "mysore",
  "mangalore",
  "hubli",
  "belgaum",
  "davangere",
  "tumkur",
  "shimoga",
  "gulbarga",
  "udupi",
  "kolar",
  "bidar"
];

export const courses = [
  "engineering",
  "mba",
  "bba",
  "bca",
  "mbbs",
  "medical",
  "law",
  "architecture",
  "bams",
  "physiotherapy",
  "nursing"
];

export const modifiers = [
  "top",
  "best",
  "private",
  "direct-admission"
];

export const courseSlugToName: Record<string, string> = {
  engineering: "B.Tech/Engineering",
  mba: "MBA",
  bba: "BBA",
  bca: "BCA",
  mbbs: "MBBS",
  medical: "Medical (MBBS/MD/MS)",
  law: "LLB/Law",
  architecture: "B.Arch/Architecture",
  bams: "BAMS (Ayurveda)",
  physiotherapy: "BPT (Physiotherapy)",
  nursing: "B.Sc Nursing"
};

export const modifierToTitle: Record<string, string> = {
  top: "Top Ranked",
  best: "Best Rated",
  private: "Premier Private",
  "direct-admission": "Direct Admission in"
};
