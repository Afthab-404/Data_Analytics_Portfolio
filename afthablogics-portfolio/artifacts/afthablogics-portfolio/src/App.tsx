import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  BarChart3,
  Braces,
  Check,
  ChevronDown,
  Database,
  FileSpreadsheet,
  Github,
  Linkedin,
  Mail,
  Table2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocation, Router as WouterRouter, Route, Switch } from 'wouter';
import salesDashboardImage from '@/assets/sales-dashboard.jpg';
import customerOrdersDashboardImage from '@/assets/customer-orders-dashboard.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// Edit external destinations here. The rest of the page reads from this single source.
const CONTACTS = {
  email: 'mailto:afthablogics@gmail.com',
  emailLabel: 'afthablogics@gmail.com',
  github: 'https://github.com/Afthab-404/',
  linkedin: 'https://www.linkedin.com/in/mohemmad-afthab/',
  portfolio: 'https://personal-profile-certificates-showc.vercel.app/',
} as const;

const projects = [
  {
    id: 'retail-pulse',
    index: '01',
    type: 'Commercial intelligence',
    title: 'Retail pulse, without the noise.',
    description: 'A Power BI operating view that turns four disconnected sales sources into one weekly answer: where should the team act next?',
    tags: ['Power BI', 'SQL', 'DAX'],
    featured: true,
    variant: 'line',
    image: undefined,
    imageAlt: undefined,
  },
  {
    id: 'ops-forecast',
    index: '02',
    type: 'Operations',
    title: 'Forecasting the Monday rush.',
    description: 'A Python model that gave an operations team a calmer way to plan staffing around demand.',
    tags: ['Python', 'Pandas'],
    featured: false,
    variant: 'bars',
    image: undefined,
    imageAlt: undefined,
  },
  {
    id: 'margin-model',
    index: '03',
    type: 'Decision model',
    title: 'The margin hiding in plain sight.',
    description: 'An Excel scenario model for finding profitable customer and product combinations.',
    tags: ['Excel', 'Power Query'],
    featured: false,
    variant: 'scatter',
    image: undefined,
    imageAlt: undefined,
  },
  {
    id: 'sales-prediction',
    index: '04',
    type: 'Forecasting & performance',
    title: 'Sales prediction, made actionable.',
    description: 'An interactive Power BI dashboard that cleans, models, and visualizes business performance so teams can track KPIs and act on trends.',
    tags: ['Power BI', 'Data modeling', 'DAX'],
    featured: false,
    variant: 'bars',
    image: salesDashboardImage,
    imageAlt: 'Power BI sales performance dashboard with category, segment, trend, and state analysis',
  },
  {
    id: 'customer-orders',
    index: '05',
    type: 'Customer & profit analysis',
    title: 'Every order, one clear picture.',
    description: 'A Power BI dashboard analyzing 100 orders and ₹594.93K profit across customers, products, regions, and weekday sales trends.',
    tags: ['Power BI', 'Power Query', 'DAX'],
    featured: false,
    variant: 'scatter',
    image: customerOrdersDashboardImage,
    imageAlt: 'Power BI customer orders dashboard with profit, order count, regional, and product analysis',
  },
];

const toolkit: { name: string; detail: string; icon: LucideIcon }[] = [
  { name: 'Python', detail: 'Pandas · NumPy · notebooks', icon: Braces },
  { name: 'SQL', detail: 'Queries · models · clean joins', icon: Database },
  { name: 'Power BI', detail: 'DAX · dashboards · narrative', icon: BarChart3 },
  { name: 'Excel', detail: 'Models · pivots · what-ifs', icon: FileSpreadsheet },
];

const methods = [
  ['01', 'Start with the question', 'The best chart cannot rescue a vague decision. I define the decision before I touch the data.'],
  ['02', 'Make the mess legible', 'Missing values, mismatched names, odd outliers — I document the shape of reality before summarising it.'],
  ['03', 'Ship the useful version', 'A clear first answer in the hands of a team beats a perfect dashboard no one opens.'],
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, className: visible ? 'reveal is-visible' : 'reveal' };
}

function MiniChart({ variant }: { variant: string }) {
  if (variant === 'bars') {
    return (
      <div className="mini-chart" aria-hidden="true">
        <svg viewBox="0 0 500 100" preserveAspectRatio="none">
          {[25, 48, 75, 39, 63, 89, 55, 78, 44, 68].map((height, index) => (
            <rect key={`bar-${index}`} x={index * 51 + 5} y={100 - height} width="26" height={height} fill={index % 3 === 0 ? 'var(--cyan)' : 'var(--lime)'} opacity={index % 3 === 0 ? '.45' : '.72'} />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'scatter') {
    return (
      <div className="mini-chart" aria-hidden="true">
        <svg viewBox="0 0 500 100" preserveAspectRatio="none">
          <path d="M0 84 C80 78 110 71 160 68 S250 55 295 52 S410 28 500 17" className="chart-line cyan" />
          {[45, 91, 142, 194, 246, 305, 363, 420, 473].map((x, index) => (
            <circle key={x} cx={x} cy={84 - index * 8 + (index % 2) * 9} r="4" className="chart-node" opacity=".75" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="project-chart" aria-hidden="true">
      <svg viewBox="0 0 720 180" preserveAspectRatio="none">
        <path d="M0 146 H720 M0 94 H720 M0 42 H720" className="chart-grid" />
        <path d="M0 138 C34 133 50 117 82 124 S137 149 164 116 S216 74 249 102 S294 133 325 92 S375 51 405 70 S450 118 479 80 S535 21 562 53 S625 69 720 7" className="chart-line cyan" />
        <path d="M0 151 C44 146 74 140 105 133 S160 132 188 115 S220 102 255 112 S314 133 341 111 S389 74 421 89 S475 112 507 74 S563 46 594 54 S657 27 720 38" className="chart-line" />
        {[[164, 116], [249, 102], [405, 70], [562, 53], [720, 7]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="chart-node" />
        ))}
      </svg>
    </div>
  );
}

function SideRail() {
  return (
    <aside className="side-rail" aria-label="Page navigation">
      <a className="monogram" href="#top" data-testid="link-monogram" aria-label="Back to top">AL</a>
      <nav className="rail-nav">
        <a className="rail-link" href="#projects" data-testid="link-rail-projects">Projects</a>
        <a className="rail-link" href="#toolkit" data-testid="link-rail-toolkit">Toolkit</a>
        <a className="rail-link" href="#contact" data-testid="link-rail-contact">Contact</a>
      </nav>
      <div className="rail-status"><i aria-hidden="true" /> Available</div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="mobile-header">
      <a className="monogram" href="#top" data-testid="link-mobile-monogram" aria-label="Back to top">AL</a>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#projects" data-testid="link-mobile-projects">Projects</a>
        <a href="#toolkit" data-testid="link-mobile-toolkit">Toolkit</a>
        <a href="#contact" data-testid="link-mobile-contact">Contact</a>
      </nav>
    </header>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const reveal = useReveal();
  return (
    <article
      ref={reveal.ref}
      className={`${reveal.className} project-card ${project.featured ? 'featured' : ''} ${project.image ? 'has-project-image' : ''}`}
      data-testid={`card-project-${project.id}`}
    >
      <div className="project-top">
        <span className="project-index" data-testid={`text-project-index-${project.id}`}>{project.index} / {String(projects.length).padStart(2, '0')}</span>
        <span className="project-type" data-testid={`text-project-type-${project.id}`}>{project.type}</span>
      </div>
      {project.image ? (
        <div className="project-image">
          <img src={project.image} alt={project.imageAlt} />
        </div>
      ) : <MiniChart variant={project.variant} />}
      <div className="project-body">
        <h3 data-testid={`text-project-title-${project.id}`}>{project.title}</h3>
        <p data-testid={`text-project-description-${project.id}`}>{project.description}</p>
      </div>
      <div className="project-footer">
        <div className="tag-row" aria-label="Tools used">
          {project.tags.map((tag) => <span className="tag" key={tag} data-testid={`tag-${project.id}-${tag}`}>{tag}</span>)}
        </div>
        <a className="project-arrow" href="#contact" data-testid={`link-project-${project.id}`} aria-label={`Ask about ${project.title}`}>
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

function Home() {
  const [copied, setCopied] = useState(false);
  const workHeading = useReveal();
  const toolkitHeading = useReveal();
  const methodHeading = useReveal();
  const contactHeading = useReveal();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTS.emailLabel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = CONTACTS.email;
    }
  };

  return (
    <div className="portfolio-root" id="top">
      <div className="portfolio-shell">
        <SideRail />
        <main className="main-canvas">
          <MobileHeader />
          <div className="topbar intro-animate">
            <span className="topbar-location"><span>●</span> Based in Kerala, India</span>
            <span className="topbar-mark">MOHEMMAD AFTHAB / +91 9686246987</span>
            <span>Independent data analyst</span>
          </div>

          <section className="hero section-wrap" aria-labelledby="hero-title">
            <div className="hero-orbit hero-dashboard" aria-hidden="true">
              <div className="dashboard-topline">
                <span><i /> Live dashboard</span>
                <b>Q4 / 2024—25</b>
              </div>
              <div className="dashboard-main">
                <div className="donut-wrap">
                  <div className="donut-chart">
                    <div className="donut-center"><strong>72%</strong><span>signal</span></div>
                  </div>
                  <div className="donut-legend">
                    <span><i className="legend-lime" /> Revenue <b>48%</b></span>
                    <span><i className="legend-cyan" /> Retention <b>24%</b></span>
                    <span><i className="legend-coral" /> Other <b>28%</b></span>
                  </div>
                </div>
                <div className="dashboard-bars">
                  <span className="dashboard-mini-label">Monthly movement</span>
                  <div className="bar-chart">
                    <i style={{ height: '38%' }} />
                    <i style={{ height: '54%' }} />
                    <i style={{ height: '44%' }} />
                    <i style={{ height: '72%' }} />
                    <i style={{ height: '61%' }} />
                    <i style={{ height: '88%' }} />
                    <i style={{ height: '76%' }} />
                  </div>
                  <div className="bar-labels"><span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span></div>
                </div>
              </div>
              <div className="dashboard-kpis">
                <span><b>+18.4%</b><small>accuracy</small></span>
                <span><b>4 → 1</b><small>sources</small></span>
                <span><b>−31%</b><small>reporting time</small></span>
              </div>
            </div>
            <div className="hero-content">
              <div className="eyebrow intro-animate">Data, with a point of view</div>
              <h1 id="hero-title" className="intro-animate delay-1">
                Messy data.<br />
                <em>Clear direction.</em>
              </h1>
              <div className="hero-intro intro-animate delay-2">
                <p>
                  I&apos;m Afthab — an analyst who turns scattered business data into
                  <strong> decisions people can actually use.</strong>
                </p>
                <div className="hero-meta" aria-label="Specialisms">
                  <div className="meta-chip"><b>04</b><span>Core tools</span></div>
                  <div className="meta-chip"><b>10+</b><span>GitHub projects</span></div>
                </div>
              </div>
            </div>
            <div className="hero-foot intro-animate delay-3">
              <span className="scroll-cue"><i aria-hidden="true" /> Scroll to inspect</span>
              <span>↓ 10.18° N, 76.27° E</span>
            </div>
          </section>

          <section className="section section-wrap" id="projects" aria-labelledby="projects-title">
            <div ref={workHeading.ref} className={workHeading.className}>
              <div className="section-heading">
                <div>
                  <p className="section-kicker">01 / Projects</p>
                  <h2 id="projects-title">Selected projects<br />from the <em>numbers.</em></h2>
                </div>
                <span className="section-number">Five representative projects / replace anytime</span>
              </div>
            </div>
            <div className="work-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <div className="signal-strip reveal is-visible" data-testid="display-impact-strip">
              <div className="signal"><strong>−31%</strong><span>reporting time</span></div>
              <div className="signal"><strong>4 → 1</strong><span>source of truth</span></div>
              <div className="signal"><strong>+18.4%</strong><span>forecast accuracy</span></div>
              <div className="signal"><strong>1 clear</strong><span>next move</span></div>
            </div>
          </section>

          <section className="section section-wrap" id="toolkit" aria-labelledby="toolkit-title">
            <div className="toolkit-layout">
              <div ref={toolkitHeading.ref} className={`${toolkitHeading.className} toolkit-copy`}>
                <p className="section-kicker">02 / The toolkit</p>
                <h2 id="toolkit-title">Tools are only useful when they <em>disappear.</em></h2>
                <p>The stack changes with the question. The standard stays the same: accurate, explainable, ready for the next conversation.</p>
              </div>
              <div className="toolkit-list reveal is-visible" data-testid="list-toolkit">
                {toolkit.map(({ name, detail, icon: Icon }, index) => (
                  <div className="toolkit-row" key={name} data-testid={`row-toolkit-${name.toLowerCase().replace(' ', '-')}`}>
                    <h3>{name}</h3>
                    <p>{detail}</p>
                    <Icon className="toolkit-icon" size={21} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-wrap method-section" aria-labelledby="method-title">
            <div ref={methodHeading.ref} className={methodHeading.className}>
              <div className="section-heading">
                <div>
                  <p className="section-kicker">03 / Working method</p>
                  <h2 id="method-title">Less dashboard. <em>More signal.</em></h2>
                </div>
                <span className="section-number">How the work gets done</span>
              </div>
            </div>
            <div className="method-grid">
              {methods.map(([number, title, description], index) => (
                <article className={`method-card reveal is-visible delay-${index + 1}`} key={number} data-testid={`card-method-${number}`}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section-wrap contact-section" id="contact" aria-labelledby="contact-title">
            <div ref={contactHeading.ref} className={contactHeading.className}>
              <div className="contact-panel">
                <p className="section-kicker">04 / Start a conversation</p>
                <h2 id="contact-title">Have a question hiding in your <em>data?</em></h2>
                <p>Tell me what you&apos;re looking at, what feels unclear, or where the spreadsheet starts to fight back. I&apos;ll bring a clean first read.</p>
                <div className="contact-actions">
                  <a className="action-link primary" href={CONTACTS.email} data-testid="link-email">
                    <Mail size={15} strokeWidth={1.8} /> Email Afthab <ArrowUpRight size={15} />
                  </a>
                  <button className="action-link" type="button" onClick={copyEmail} data-testid="button-copy-email">
                    {copied ? <Check size={15} /> : <Table2 size={15} strokeWidth={1.8} />}
                    {copied ? 'Copied to clipboard' : 'Copy email address'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer section-wrap">
            <span data-testid="text-footer-brand">© Afthab Logics / make data make sense.</span>
            <div className="footer-links">
              <a href={CONTACTS.github} target="_blank" rel="noopener noreferrer" data-testid="link-github"><Github size={14} /> GitHub</a>
              <a href={CONTACTS.linkedin} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin"><Linkedin size={14} /> LinkedIn</a>
              <a href={CONTACTS.portfolio} target="_blank" rel="noopener noreferrer" data-testid="link-portfolio"><ArrowUpRight size={14} /> Portfolio</a>
              <a href="#top" data-testid="link-back-to-top"><ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} /> Top</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;