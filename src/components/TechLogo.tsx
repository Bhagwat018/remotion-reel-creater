import React from "react";
import {
  SiAnthropic,
  SiGithub,
  SiPython,
  SiDocker,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiRedis,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiLinux,
  SiGit,
  SiSonarqubeserver,
  SiNpm,
  SiBun,
  SiDeno,
  SiRust,
  SiGo,
  SiSupabase,
  SiTailwindcss,
  SiNginx,
  SiGraphql,
  SiFirebase,
  SiVuedotjs,
  SiNodedotjs,
  SiApachekafka,
  SiCloudflare,
  SiGitlab,
  SiJenkins,
  SiPhonepe,
  SiRazorpay,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";

export interface TechLogoProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface BrandConfig {
  component: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  defaultColor: string;
  label: string;
}

const BRAND_MAP: Record<string, BrandConfig> = {
  claude: { component: SiAnthropic, defaultColor: "#D97706", label: "Claude" },
  anthropic: { component: SiAnthropic, defaultColor: "#D97706", label: "Anthropic" },
  openai: { component: TbBrandOpenai, defaultColor: "#10A37F", label: "OpenAI" },
  chatgpt: { component: TbBrandOpenai, defaultColor: "#10A37F", label: "ChatGPT" },
  github: { component: SiGithub, defaultColor: "#F0F6FC", label: "GitHub" },
  python: { component: SiPython, defaultColor: "#387EB8", label: "Python" },
  docker: { component: SiDocker, defaultColor: "#2496ED", label: "Docker" },
  react: { component: SiReact, defaultColor: "#61DAFB", label: "React" },
  typescript: { component: SiTypescript, defaultColor: "#3178C6", label: "TypeScript" },
  ts: { component: SiTypescript, defaultColor: "#3178C6", label: "TypeScript" },
  javascript: { component: SiJavascript, defaultColor: "#F7DF1E", label: "JavaScript" },
  js: { component: SiJavascript, defaultColor: "#F7DF1E", label: "JavaScript" },
  nextjs: { component: SiNextdotjs, defaultColor: "#FFFFFF", label: "Next.js" },
  redis: { component: SiRedis, defaultColor: "#DC382D", label: "Redis" },
  postgresql: { component: SiPostgresql, defaultColor: "#4169E1", label: "PostgreSQL" },
  postgres: { component: SiPostgresql, defaultColor: "#4169E1", label: "PostgreSQL" },
  mongodb: { component: SiMongodb, defaultColor: "#47A248", label: "MongoDB" },
  mongo: { component: SiMongodb, defaultColor: "#47A248", label: "MongoDB" },
  aws: { component: FaAws, defaultColor: "#FF9900", label: "AWS" },
  kubernetes: { component: SiKubernetes, defaultColor: "#326CE5", label: "Kubernetes" },
  k8s: { component: SiKubernetes, defaultColor: "#326CE5", label: "Kubernetes" },
  linux: { component: SiLinux, defaultColor: "#FCC624", label: "Linux" },
  git: { component: SiGit, defaultColor: "#F05032", label: "Git" },
  sonarqube: { component: SiSonarqubeserver, defaultColor: "#4B9FD5", label: "SonarQube" },
  npm: { component: SiNpm, defaultColor: "#CB3837", label: "npm" },
  bun: { component: SiBun, defaultColor: "#FBF0DF", label: "Bun" },
  deno: { component: SiDeno, defaultColor: "#FFFFFF", label: "Deno" },
  rust: { component: SiRust, defaultColor: "#DEA584", label: "Rust" },
  go: { component: SiGo, defaultColor: "#00ADD8", label: "Go" },
  golang: { component: SiGo, defaultColor: "#00ADD8", label: "Go" },
  supabase: { component: SiSupabase, defaultColor: "#3ECF8E", label: "Supabase" },
  tailwind: { component: SiTailwindcss, defaultColor: "#06B6D4", label: "Tailwind CSS" },
  tailwindcss: { component: SiTailwindcss, defaultColor: "#06B6D4", label: "Tailwind CSS" },
  nginx: { component: SiNginx, defaultColor: "#009639", label: "NGINX" },
  graphql: { component: SiGraphql, defaultColor: "#E10098", label: "GraphQL" },
  firebase: { component: SiFirebase, defaultColor: "#FFCA28", label: "Firebase" },
  vue: { component: SiVuedotjs, defaultColor: "#4FC08D", label: "Vue" },
  vuejs: { component: SiVuedotjs, defaultColor: "#4FC08D", label: "Vue.js" },
  node: { component: SiNodedotjs, defaultColor: "#5FA04E", label: "Node.js" },
  nodejs: { component: SiNodedotjs, defaultColor: "#5FA04E", label: "Node.js" },
  kafka: { component: SiApachekafka, defaultColor: "#FFFFFF", label: "Apache Kafka" },
  cloudflare: { component: SiCloudflare, defaultColor: "#F38020", label: "Cloudflare" },
  gitlab: { component: SiGitlab, defaultColor: "#FC6D26", label: "GitLab" },
  jenkins: { component: SiJenkins, defaultColor: "#D24939", label: "Jenkins" },
  phonepe: { component: SiPhonepe, defaultColor: "#5f259f", label: "PhonePe" },
  razorpay: { component: SiRazorpay, defaultColor: "#0284c7", label: "Razorpay" },
};

export const getBrandMeta = (name: string) => {
  const key = (name || "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
  return BRAND_MAP[key] || null;
};

export const findBrandInText = (text: string): { key: string; meta: BrandConfig } | null => {
  if (!text) return null;
  const lower = text.toLowerCase();
  for (const [key, meta] of Object.entries(BRAND_MAP)) {
    if (key.length <= 2) continue; // Skip very short abbreviations to prevent false positives in sentences
    const regex = new RegExp(`(^|[^a-z0-9])${key}([^a-z0-9]|$)`, "i");
    if (regex.test(lower)) {
      return { key, meta };
    }
  }
  return null;
};

export const TechLogo: React.FC<TechLogoProps> = ({
  name,
  size = 48,
  color,
  style = {},
}) => {
  const brand = getBrandMeta(name);
  if (!brand) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: Math.max(12, size * 0.4),
          fontWeight: 700,
          color: "#94a3b8",
          ...style,
        }}
      >
        {(name || "?").slice(0, 2).toUpperCase()}
      </div>
    );
  }

  const Component = brand.component;
  const finalColor = color || brand.defaultColor;

  return (
    <Component
      size={size}
      color={finalColor}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        filter: `drop-shadow(0 0 16px ${finalColor}40)`,
        ...style,
      }}
    />
  );
};
