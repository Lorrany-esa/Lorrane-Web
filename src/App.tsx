import { useState } from "react";
import {
  Cpu,
  Brain,
  Code2,
  Sparkles,
  ArrowDown,
  MessageCircle,
  ShoppingCart,
  Languages,
  Github,
  Linkedin,
  Check,
  ExternalLink,
  Eye,
  X,
  Trash2,
} from "lucide-react";

// Importações de imagens baseadas na estrutura do projeto
import heroDev from "@/assets/hero-dev.png";
import projectCityHall from "@/assets/project-cityhall.jpg";
import projectMunicipal from "@/assets/project-municipal.jpg";
import projectFashion from "@/assets/project-fashion.jpg";

import serviceEcommerce from "@/assets/service-ecommerce.jpg";
import serviceInstitucional from "@/assets/service-institucional.jpg";
import serviceLanding from "@/assets/service-landing.jpg";
import svcMail from "@/assets/service-email.png";

import { ProjectModal, type Project } from "@/components/portfolio/ProjectModal";

const ACCENT = "#00D2FF";
const ACCENT2 = "#B14CFF";
const WHATSAPP_NUMBER = "5538920008869";

interface ServiceItem {
  img: string;
  title: string;
  subtitle: string;
  price: string;
  priceNumber: number;
  features: string[];
}

const differentials = [
  { icon: Cpu, title: "Tecnologia Estratégica", desc: "Stack moderna escolhida para escalar." },
  { icon: Brain, title: "Sistemas Inteligentes", desc: "Arquitetura pensada para crescer." },
  { icon: Code2, title: "Código de Valor", desc: "Limpo, testado e documentado." },
  { icon: Sparkles, title: "Transformação de Ideias", desc: "Do conceito ao produto final." },
];

const projects: (Project & { id: string; category: string; img: string })[] = [
  {
    id: "p1",
    category: "Institucional",
    tag: "Institucional",
    img: projectMunicipal,
    title: "Portal da Prefeitura Municipal de São João da Ponte - MG",
    description:
      "Portal para o cidadão com formulários online, acompanhamento de status e UX focada em acessibilidade.",
    longDescription:
      "Plataforma institucional desenvolvida para conectar o cidadão à gestão pública. Foco em acessibilidade WCAG, performance e transparência ativa.",
    pillars: ["Transparência", "Cidadania", "Segurança", "Acessibilidade"],
    features: [
      "Portal da Transparência: Consulta de gastos, receitas, licitações e contratos.",
      "Central de Serviços: Emissão de IPTU, certidões negativas, notas fiscais e consulta de protocolos.",
      "Diário Oficial Eletrônico: Publicações legais e atos administrativos.",
      "Notícias e Eventos: Atualizações em tempo real sobre a cidade e agenda cultural.",
      "Ouvidoria/e-SIC: Canal direto para solicitações, denúncias e pedidos de informação."
    ],
    tech: ["Next.js", "TypeScript", "React", "Tailwind", "Supabase"],
    demoUrl: "https://saojoaodaponte.mg.gov.br/",
  },
  {
    id: "p2",
    category: "E-commerce",
    tag: "E-commerce",
    img: projectCityHall,
    title: "E-commerce L&G Informática",
    description:
      "E-commerce focado em soluções de TI, cursos profissionalizantes e venda de equipamentos.",
    longDescription:
      "Loja virtual completa para venda de equipamentos e cursos, com checkout otimizado e gestão de catálogo.",
    pillars: ["Conversão", "Performance", "UX Mobile"],
    features: [
      "Catálogo completo de produtos",
      "Solicitação de orçamentos de forma rápida",
      "Permite que os clientes acompanhem as redes sociais",
    ],
    tech: ["Next.js", "TypeScript", "React", "Tailwind", "Supabase"],
    demoUrl: "https://leginformatica.com.br/",
  },
  {
    id: "p3",
    category: "Landing Page",
    tag: "Landing Page",
    img: projectFashion,
    title: "Landing Page - Lorrane Veloso",
    description:
      "Página Web de alto impacto desenvolvida para centralizar a apresentação de projetos e otimizar conversão.",
    longDescription:
      "Landing page focada em conversão de leads comerciais, com narrativa clara, prova social e CTA destacado.",
    pillars: ["Alta Conversão", "Branding", "Velocidade"],
    features: [
      "Design System Consistente.",
      "Acessibilidade Nativa.",
      "Navegação Fluida.",
    ],
    tech: ["Next.js", "TypeScript", "React", "Tailwind"],
    demoUrl: "http://lorranevelosodevweb.com.br/",
  },
];

const services: ServiceItem[] = [
  {
    img: serviceEcommerce,
    title: "Loja Virtual Completa",
    subtitle: "E-commerce",
    price: "R$ 1.399,99",
    priceNumber: 1399.99,
    features: ["Catálogo ilimitado", "Checkout otimizado", "Painel admin", "Integração de pagamentos"],
  },
  {
    img: serviceInstitucional,
    title: "Site Institucional",
    subtitle: "Portal Institucional",
    price: "R$ 1.999,99",
    priceNumber: 1999.99,
    features: ["Transparência", "SEO técnico", "Painel de conteúdo"],
  },
  {
    img: serviceLanding,
    title: "Landing Page",
    subtitle: "Página Web Comercial",
    price: "R$ 499,99",
    priceNumber: 499.99,
    features: ["Página única", "Foco em CTA", "Formulário inteligente", "Analytics"],
  },
  {
    img: svcMail,
    title: "E-mails Personalizados",
    subtitle: "Identidade profissional",
    price: "R$ 79,99",
    priceNumber: 79.99,
    features: ["Domínio próprio", "Anti-spam", "Suporte"],
  },
];

const stack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Supabase", "Git"];
const focus = [
  "Arquitetura Inteligente",
  "Código Limpo & Escalável",
  "Inclusão & Performance",
  "Transparência Total",
];

const gradientBtn =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(0,210,255,0.6)] transition hover:brightness-110";
const gradientStyle = {
  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT2} 100%)`,
};

export default function App() {
  const [filter, setFilter] = useState<string>("Todos");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);
  const filters = ["Todos", "Institucional", "E-commerce", "Landing Page"];

  const addToCart = (service: ServiceItem) => {
    setCart((prev) => [...prev, service]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.priceNumber, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((item) => `- ${item.title} (${item.price})`).join("\n");
    const message = encodeURIComponent(
      `Olá Lorrane! Gostaria de fechar o pedido dos seguintes serviços:\n\n${itemsList}\n\nTotal: R$ ${cartTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\nNo aguardo para darmos início!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleBudgetRequest = (context: string) => {
    const message = encodeURIComponent(
      `Olá Lorrane! Acessei seu portfólio e gostaria de solicitar um orçamento personalizado para um projeto de ${context}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleDemoClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0B0A11] text-white selection:bg-[#00D2FF]/30 selection:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0A11]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-bold tracking-tight text-white">
            Lorrane Veloso{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
            >
              DevWeb.
            </span>
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
            <li><a href="#portfolio" className="transition hover:text-white">Portfólio</a></li>
            <li><a href="#sobre" className="transition hover:text-white">Sobre</a></li>
            <li><a href="#servicos" className="transition hover:text-white">Serviços</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 text-gray-300 transition hover:bg-white/5 hover:text-white" aria-label="Idioma">
              <Languages size={18} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-gray-300 transition hover:bg-white/5 hover:text-white" 
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full text-[10px] font-bold leading-4 text-black text-center animate-pulse"
                  style={{ background: ACCENT }}
                >
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleBudgetRequest("Desenvolvimento Web")}
              className={`${gradientBtn} ml-2 hidden px-4 py-2 sm:inline-flex`}
              style={gradientStyle}
            >
              Solicitar Orçamento
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: ACCENT }}
            >
              Desenvolvedora Web | Analista de Sistemas e Informação
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Soluções inteligentes para{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
              >
                transformar ideias
              </span>{" "}
              em resultados!
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300">
              Portais institucionais, e-commerces de alta conversão e landing pages que vendem —
              feitos com código limpo, performance e foco em resultado corporativo.
            </p>

            {/* Diferenciais */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {differentials.map((d) => (
                <div
                  key={d.title}
                  className="group rounded-xl border border-white/10 bg-[#161522]/50 p-4 backdrop-blur transition hover:border-[#00D2FF]/40 hover:shadow-[0_0_30px_-10px_rgba(0,210,255,0.5)]"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-black mb-3"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    <d.icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{d.title}</h3>
                  <p className="mt-1 text-xs text-gray-400">{d.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className={gradientBtn} style={gradientStyle}>
                Ver Projetos <ArrowDown size={16} />
              </a>
              <button
                onClick={() => handleBudgetRequest("Projeto Personalizado")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle size={16} /> Solicitar Orçamento
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
              style={{
                background: `radial-gradient(circle at 60% 40%, ${ACCENT}33, transparent 60%), radial-gradient(circle at 30% 70%, ${ACCENT2}33, transparent 60%)`,
              }}
            />
            {heroDev ? (
              <img
                src={heroDev}
                alt="Ilustração ambiente de desenvolvimento com laptop e código"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-lg drop-shadow-[0_0_40px_rgba(0,210,255,0.25)] object-contain"
              />
            ) : (
              <div className="mx-auto h-80 w-full max-w-md rounded-2xl bg-gradient-to-tr from-[#00D2FF]/10 to-[#B14CFF]/10 border border-white/10 flex items-center justify-center">
                <Code2 size={48} className="text-[#00D2FF]/50 animate-pulse" />
              </div>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["HTML", "CSS", "JavaScript", "PHP", "MySQL"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-[#161522]/60 px-2.5 py-1 text-xs font-medium text-gray-300 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="py-24 border-t border-white/5 bg-[#0F0E17]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Port
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
              >
                fólio
              </span>
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === f
                    ? "text-black shadow-[0_0_20px_-5px_rgba(0,210,255,0.6)]"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:text-white"
                }`}
                style={filter === f ? gradientStyle : undefined}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161522]/50 backdrop-blur transition hover:-translate-y-1 hover:border-[#00D2FF]/40 hover:shadow-[0_0_40px_-10px_rgba(0,210,255,0.5)]"
              >
                <div className="relative h-48 overflow-hidden flex items-center justify-center border-b border-white/5 bg-black/20">
                  {p.img ? (
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                    />
                  )}
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm z-10">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold leading-snug text-white">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-400">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDemoClick(p.demoUrl)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-black transition hover:brightness-110"
                      style={gradientStyle}
                    >
                      <ExternalLink size={14} /> Demo
                    </button>
                    <button
                      onClick={() => setOpenProject(p)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      <Eye size={14} /> Detalhes
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:grid-cols-2 lg:px-8 lg:grid gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Transformando código rigoroso em{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
            >
              produtos digitais
            </span>{" "}
            que geram resultados.
          </h2>
          <p className="mt-5 leading-relaxed text-gray-300">
            Sou desenvolvedora Web e Full-Stack com formação em Sistemas de Informação. Na prática,
            isso significa que não apenas escrevo código, mas desenho soluções: desde portais
            institucionais acessíveis e e-commerces de alta conversão até sistemas internos que
            organizam e automatizam regras de negócio complexas. Meu foco é entregar software
            sustentável, performático e visualmente impecável.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {focus.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-gray-300">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-black shrink-0"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                >
                  <Check size={12} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 mt-12 lg:mt-0">
          <div className="rounded-2xl border border-white/10 bg-[#161522]/50 p-6 sm:p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
              Stack Técnica
            </p>
    
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-200 transition hover:border-[#00D2FF]/50 hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161522]/50 p-6 sm:p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT2 }}>
              Foco de Atuação
            </p>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                Plataformas corporativas e SPA eficientes com React e Supabase.
              </li>
              <li className="flex items-start gap-2">
                <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                Sistemas acessíveis em conformidade com padrões de transparência pública.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 border-t border-white/5 bg-[#0F0E17]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Serviços de{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
              >
                Desenvolvimento
              </span>
            </h2>
            <div
              className="mx-auto mt-3 h-0.5 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
            />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#161522]/50 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[#00D2FF]/40 hover:shadow-[0_0_40px_-10px_rgba(0,210,255,0.5)]"
              >
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                  {s.img ? (
                    <img
                      src={s.img}
                      alt={s.title}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Code2 size={32} className="text-gray-500" />
                  )}
                </div>
                <h3 className="mt-5 text-center text-base font-bold text-white min-h-[48px] flex items-center justify-center">{s.title}</h3>
                <p className="text-center text-xs text-gray-400 mb-4">{s.subtitle}</p>
                <ul className="mt-2 flex-1 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[11px] text-gray-400">A partir de</p>
                  <p
                    className="bg-clip-text text-lg font-bold text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    {s.price}
                  </p>
                  <button
                    onClick={() => addToCart(s)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-black transition hover:brightness-110"
                    style={gradientStyle}
                  >
                    <ShoppingCart size={14} /> Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => handleBudgetRequest("Portfólio de Serviços")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Consultar Outros Escopos
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0B0A11]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            Lorrane Veloso{" "}
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
            >
              DevWeb.
            </span>{" "}
            — © 2026. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/Lorrany-esa " },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/lorrane-santana-5973741a6/" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#00D2FF] hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* SIDEBAR DO CARRINHO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#12111A] h-full p-6 flex flex-col shadow-2xl border-l border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} style={{ color: ACCENT }} /> Seu Carrinho
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <ShoppingCart size={40} className="mx-auto mb-3 opacity-20" />
                  Seu carrinho está vazio.
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.subtitle}</p>
                      <p className="text-sm font-medium mt-1" style={{ color: ACCENT }}>{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-gray-400 hover:text-rose-400 p-2 rounded-lg hover:bg-white/5"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-400">Valor Estimado:</span>
                  <span className="text-xl text-white">
                    R$ {cartTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full text-center font-bold text-black py-3 rounded-xl transition hover:brightness-110 flex items-center justify-center gap-2"
                  style={gradientStyle}
                >
                  <MessageCircle size={18} /> Finalizar via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}