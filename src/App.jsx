import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import aboutIllustration from "./assets/undraw_about-us-page_dbh0.svg";
import heroIllustration from "./assets/undraw_visual-data_1eya.svg";
import brandLogo from "./assets/Kw Logo.png";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const serviceItems = [
  {
    title: "Mobile Application",
    description:
      "Native and cross-platform apps crafted for performance, usability, and scale.",
    icon: "APP",
  },
  {
    title: "Web Application",
    description:
      "Responsive web experiences engineered for reliability, accessibility, and speed.",
    icon: "WEB",
  },
  {
    title: "Backend Services",
    description:
      "Robust APIs and microservices powering secure, modular digital ecosystems.",
    icon: "API",
  },
  {
    title: "AWS Deployment",
    description:
      "Cloud-native architectures on AWS with automated provisioning and monitoring.",
    icon: "AWS",
  },
  {
    title: "AI Chat-Bots",
    description:
      "Intelligent conversational agents delivering instant support and lead capture.",
    icon: "BOT",
  },
  {
    title: "Digital Marketing",
    description:
      "Full-funnel growth strategies spanning SEO, paid media, and performance analytics.",
    icon: "DM",
  },
  {
    title: "Hosting Services",
    description:
      "Managed hosting with proactive security, backups, and 24/7 infrastructure care.",
    icon: "HOST",
  },
];

const projectItems = [
  {
    title: "manaHRMS",
    description:
      "An end-to-end HR management platform streamlining onboarding, payroll, and performance insights for distributed teams.",
    tags: ["React Native", "Python", "FastAPI", "GraphQL"],
  },
  {
    title: "Healthcare Management System",
    description:
      "Unified patient, clinic, and inventory operations with secure data flows and real-time care coordination.",
    tags: ["React Native", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    title: "manaKart",
    description:
      "A modern e-commerce experience for everyday essentials with personalized carts and seamless checkout.",
    tags: ["React Native", "Python", "PostgreSQL"],
  },
];

const companyValues = [
  {
    title: "Innovation First",
    description:
      "We stay ahead of technology curves, continuously exploring emerging tools and methodologies to deliver cutting-edge solutions.",
    icon: "lightbulb",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We listen, adapt, and deliver solutions that align perfectly with your business objectives.",
    icon: "track_changes",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous testing, code reviews, and quality checks ensure every product we deliver meets the highest standards.",
    icon: "verified",
  },
  {
    title: "Scalable Solutions",
    description:
      "We build for today and plan for tomorrow, creating architectures that grow seamlessly with your business needs.",
    icon: "trending_up",
  },
  {
    title: "Transparent Communication",
    description:
      "Clear, honest communication throughout the project lifecycle keeps you informed and involved every step of the way.",
    icon: "forum",
  },
  {
    title: "Timely Delivery",
    description:
      "We respect deadlines and deliver on time, combining efficiency with excellence to meet your project timelines.",
    icon: "schedule",
  },
];

const countryDialCodes = [
  { code: "AF", name: "Afghanistan", dial: "+93" },
  { code: "AL", name: "Albania", dial: "+355" },
  { code: "DZ", name: "Algeria", dial: "+213" },
  { code: "AS", name: "American Samoa", dial: "+1684" },
  { code: "AD", name: "Andorra", dial: "+376" },
  { code: "AO", name: "Angola", dial: "+244" },
  { code: "AI", name: "Anguilla", dial: "+1264" },
  { code: "AQ", name: "Antarctica", dial: "+672" },
  { code: "AG", name: "Antigua and Barbuda", dial: "+1268" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "AM", name: "Armenia", dial: "+374" },
  { code: "AW", name: "Aruba", dial: "+297" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "AZ", name: "Azerbaijan", dial: "+994" },
  { code: "BS", name: "Bahamas", dial: "+1242" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BB", name: "Barbados", dial: "+1246" },
  { code: "BY", name: "Belarus", dial: "+375" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BZ", name: "Belize", dial: "+501" },
  { code: "BJ", name: "Benin", dial: "+229" },
  { code: "BM", name: "Bermuda", dial: "+1441" },
  { code: "BT", name: "Bhutan", dial: "+975" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "BA", name: "Bosnia and Herzegovina", dial: "+387" },
  { code: "BW", name: "Botswana", dial: "+267" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "BN", name: "Brunei", dial: "+673" },
  { code: "BG", name: "Bulgaria", dial: "+359" },
  { code: "BF", name: "Burkina Faso", dial: "+226" },
  { code: "BI", name: "Burundi", dial: "+257" },
  { code: "CV", name: "Cabo Verde", dial: "+238" },
  { code: "KH", name: "Cambodia", dial: "+855" },
  { code: "CM", name: "Cameroon", dial: "+237" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "KY", name: "Cayman Islands", dial: "+1345" },
  { code: "CF", name: "Central African Republic", dial: "+236" },
  { code: "TD", name: "Chad", dial: "+235" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "KM", name: "Comoros", dial: "+269" },
  { code: "CG", name: "Congo", dial: "+242" },
  { code: "CD", name: "Congo (DRC)", dial: "+243" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "CI", name: "Côte d’Ivoire", dial: "+225" },
  { code: "HR", name: "Croatia", dial: "+385" },
  { code: "CU", name: "Cuba", dial: "+53" },
  { code: "CY", name: "Cyprus", dial: "+357" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "DJ", name: "Djibouti", dial: "+253" },
  { code: "DM", name: "Dominica", dial: "+1767" },
  { code: "DO", name: "Dominican Republic", dial: "+1" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SV", name: "El Salvador", dial: "+503" },
  { code: "GQ", name: "Equatorial Guinea", dial: "+240" },
  { code: "ER", name: "Eritrea", dial: "+291" },
  { code: "EE", name: "Estonia", dial: "+372" },
  { code: "SZ", name: "Eswatini", dial: "+268" },
  { code: "ET", name: "Ethiopia", dial: "+251" },
  { code: "FJ", name: "Fiji", dial: "+679" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "GF", name: "French Guiana", dial: "+594" },
  { code: "PF", name: "French Polynesia", dial: "+689" },
  { code: "GA", name: "Gabon", dial: "+241" },
  { code: "GM", name: "Gambia", dial: "+220" },
  { code: "GE", name: "Georgia", dial: "+995" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "GI", name: "Gibraltar", dial: "+350" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "GL", name: "Greenland", dial: "+299" },
  { code: "GD", name: "Grenada", dial: "+1473" },
  { code: "GP", name: "Guadeloupe", dial: "+590" },
  { code: "GU", name: "Guam", dial: "+1671" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "GG", name: "Guernsey", dial: "+44" },
  { code: "GN", name: "Guinea", dial: "+224" },
  { code: "GW", name: "Guinea-Bissau", dial: "+245" },
  { code: "GY", name: "Guyana", dial: "+592" },
  { code: "HT", name: "Haiti", dial: "+509" },
  { code: "HN", name: "Honduras", dial: "+504" },
  { code: "HK", name: "Hong Kong SAR", dial: "+852" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "IS", name: "Iceland", dial: "+354" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IR", name: "Iran", dial: "+98" },
  { code: "IQ", name: "Iraq", dial: "+964" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IM", name: "Isle of Man", dial: "+44" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JM", name: "Jamaica", dial: "+1876" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "JE", name: "Jersey", dial: "+44" },
  { code: "JO", name: "Jordan", dial: "+962" },
  { code: "KZ", name: "Kazakhstan", dial: "+7" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "KI", name: "Kiribati", dial: "+686" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "KG", name: "Kyrgyzstan", dial: "+996" },
  { code: "LA", name: "Laos", dial: "+856" },
  { code: "LV", name: "Latvia", dial: "+371" },
  { code: "LB", name: "Lebanon", dial: "+961" },
  { code: "LS", name: "Lesotho", dial: "+266" },
  { code: "LR", name: "Liberia", dial: "+231" },
  { code: "LY", name: "Libya", dial: "+218" },
  { code: "LI", name: "Liechtenstein", dial: "+423" },
  { code: "LT", name: "Lithuania", dial: "+370" },
  { code: "LU", name: "Luxembourg", dial: "+352" },
  { code: "MO", name: "Macao SAR", dial: "+853" },
  { code: "MG", name: "Madagascar", dial: "+261" },
  { code: "MW", name: "Malawi", dial: "+265" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "MV", name: "Maldives", dial: "+960" },
  { code: "ML", name: "Mali", dial: "+223" },
  { code: "MT", name: "Malta", dial: "+356" },
  { code: "MH", name: "Marshall Islands", dial: "+692" },
  { code: "MQ", name: "Martinique", dial: "+596" },
  { code: "MR", name: "Mauritania", dial: "+222" },
  { code: "MU", name: "Mauritius", dial: "+230" },
  { code: "YT", name: "Mayotte", dial: "+262" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "FM", name: "Micronesia", dial: "+691" },
  { code: "MD", name: "Moldova", dial: "+373" },
  { code: "MC", name: "Monaco", dial: "+377" },
  { code: "MN", name: "Mongolia", dial: "+976" },
  { code: "ME", name: "Montenegro", dial: "+382" },
  { code: "MS", name: "Montserrat", dial: "+1664" },
  { code: "MA", name: "Morocco", dial: "+212" },
  { code: "MZ", name: "Mozambique", dial: "+258" },
  { code: "MM", name: "Myanmar", dial: "+95" },
  { code: "NA", name: "Namibia", dial: "+264" },
  { code: "NR", name: "Nauru", dial: "+674" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NC", name: "New Caledonia", dial: "+687" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "NI", name: "Nicaragua", dial: "+505" },
  { code: "NE", name: "Niger", dial: "+227" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "NU", name: "Niue", dial: "+683" },
  { code: "NF", name: "Norfolk Island", dial: "+672" },
  { code: "KP", name: "North Korea", dial: "+850" },
  { code: "MK", name: "North Macedonia", dial: "+389" },
  { code: "MP", name: "Northern Mariana Islands", dial: "+1670" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "PW", name: "Palau", dial: "+680" },
  { code: "PA", name: "Panama", dial: "+507" },
  { code: "PG", name: "Papua New Guinea", dial: "+675" },
  { code: "PY", name: "Paraguay", dial: "+595" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "PR", name: "Puerto Rico", dial: "+1" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "RE", name: "Réunion", dial: "+262" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "RW", name: "Rwanda", dial: "+250" },
  { code: "WS", name: "Samoa", dial: "+685" },
  { code: "SM", name: "San Marino", dial: "+378" },
  { code: "ST", name: "São Tomé and Príncipe", dial: "+239" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SN", name: "Senegal", dial: "+221" },
  { code: "RS", name: "Serbia", dial: "+381" },
  { code: "SC", name: "Seychelles", dial: "+248" },
  { code: "SL", name: "Sierra Leone", dial: "+232" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "SX", name: "Sint Maarten", dial: "+1721" },
  { code: "SK", name: "Slovakia", dial: "+421" },
  { code: "SI", name: "Slovenia", dial: "+386" },
  { code: "SB", name: "Solomon Islands", dial: "+677" },
  { code: "SO", name: "Somalia", dial: "+252" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "SS", name: "South Sudan", dial: "+211" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "SD", name: "Sudan", dial: "+249" },
  { code: "SR", name: "Suriname", dial: "+597" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "SY", name: "Syria", dial: "+963" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "TJ", name: "Tajikistan", dial: "+992" },
  { code: "TZ", name: "Tanzania", dial: "+255" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "TL", name: "Timor-Leste", dial: "+670" },
  { code: "TG", name: "Togo", dial: "+228" },
  { code: "TK", name: "Tokelau", dial: "+690" },
  { code: "TO", name: "Tonga", dial: "+676" },
  { code: "TT", name: "Trinidad and Tobago", dial: "+1868" },
  { code: "TN", name: "Tunisia", dial: "+216" },
  { code: "TR", name: "Türkiye", dial: "+90" },
  { code: "TM", name: "Turkmenistan", dial: "+993" },
  { code: "TC", name: "Turks and Caicos Islands", dial: "+1649" },
  { code: "TV", name: "Tuvalu", dial: "+688" },
  { code: "UG", name: "Uganda", dial: "+256" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "UY", name: "Uruguay", dial: "+598" },
  { code: "UZ", name: "Uzbekistan", dial: "+998" },
  { code: "VU", name: "Vanuatu", dial: "+678" },
  { code: "VA", name: "Vatican City", dial: "+379" },
  { code: "VE", name: "Venezuela", dial: "+58" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "VG", name: "Virgin Islands (UK)", dial: "+1284" },
  { code: "VI", name: "Virgin Islands (US)", dial: "+1340" },
  { code: "WF", name: "Wallis and Futuna", dial: "+681" },
  { code: "EH", name: "Western Sahara", dial: "+212" },
  { code: "YE", name: "Yemen", dial: "+967" },
  { code: "ZM", name: "Zambia", dial: "+260" },
  { code: "ZW", name: "Zimbabwe", dial: "+263" },
];

const contactInitialState = {
  name: "",
  email: "",
  countryCode:
    countryDialCodes.find((item) => item.code === "IN")?.dial ?? "+91",
  phone: "",
  message: "",
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("kit-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("kit-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsNavOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const ThemeIcon = useMemo(
    () => (theme === "light" ? <SunIcon /> : <MoonIcon />),
    [theme]
  );

  return (
    <div className="app-shell">
      <header
        className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
      >
        <div className="container header-content">
          <div className="brand" onClick={() => handleNavClick("home")}>
            <img
              src={brandLogo}
              alt="Karthiwini Solutions logo"
              className="brand-mark"
            />
            <span className="brand-text">
              Karthiwini
              <strong>Solutions</strong>
            </span>
          </div>
          <nav className={`site-nav ${isNavOpen ? "site-nav--open" : ""}`}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-controls">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {ThemeIcon}
            </button>
            <button
              type="button"
              className={`hamburger ${isNavOpen ? "is-active" : ""}`}
              onClick={() => setIsNavOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section" data-animate>
          <div className="container hero-content">
            <div className="hero-text">
              <span className="hero-badge">
                Trusted IT Transformation Partner
              </span>
              <h1>
                Building Intelligent Digital Platforms for the Modern Enterprise
              </h1>
              <p>
                Karthiwini Solutions helps visionaries accelerate innovation
                with resilient engineering, human-centered experiences, and
                measurable outcomes.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleNavClick("projects")}
                >
                  Explore Our Projects
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => handleNavClick("contact")}
                >
                  Book a Discovery Call
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src={heroIllustration}
                alt="Team analyzing visual data dashboards"
                className="hero-illustration"
              />
              <div className="hero-glow" />
            </div>
          </div>
        </section>

        <section id="about" className="section" data-animate>
          <div className="container section-grid">
            <div className="section-text">
              <h2>About Karthiwini Solutions</h2>
              <p>
                We are a global team of architects, engineers, and strategists
                who partner with organisations to deliver mission-ready
                software. Our approach blends design thinking, modular
                architecture, and rigorous delivery practices to de-risk
                transformation initiatives and move with velocity.
              </p>
            </div>
            <div className="about-visual about-visual--right">
              <img
                src={aboutIllustration}
                alt="Team collaborating around digital platforms"
                style={{ maxWidth: "360px", width: "100%" }}
              />
            </div>
          </div>
        </section>

        <section id="services" className="section section-alt" data-animate>
          <div className="container">
            <h2>Services Tailored to Enterprise Ambitions</h2>
            <p className="section-intro">
              We align expertise across strategy, engineering, cloud, and
              security to unlock sustainable growth.
            </p>
            <div className="card-grid">
              {serviceItems.map((service) => (
                <article key={service.title} className="service-card">
                  <span className="service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section" data-animate>
          <div className="container">
            <h2>Highlighted Projects</h2>
            <p className="section-intro">
              Partnering with industry leaders to convert ambitious roadmaps
              into resilient, scalable platforms.
            </p>
            <div className="card-grid projects-grid">
              {projectItems.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-pulse" />
                  </div>
                  <p>{project.description}</p>
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="values" className="section section-alt" data-animate>
          <div className="container">
            <h2>Why Choose Karthiwini Solutions</h2>
            <p className="section-intro">
              We are committed to delivering excellence through innovation,
              quality, and client-focused solutions that drive real business
              value.
            </p>
            <div className="card-grid">
              {companyValues.map((value) => (
                <article key={value.title} className="service-card">
                  <span
                    className="service-icon material-symbols-outlined"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt" data-animate>
          <div className="container contact-layout">
            <div>
              <span className="section-kicker">Contact Us</span>
              <h2>Let’s Design Your Next Advantage</h2>
              <p className="section-intro">
                Share your vision and we’ll orchestrate the delivery
                roadmap—from strategy to launch and beyond.
              </p>
              <ul className="contact-highlights">
                <li>
                  <strong>Discovery Workshops:</strong> Insight-driven sessions
                  to baseline requirements.
                </li>
                <li>
                  <strong>Solution Blueprints:</strong> Architecture, timeline,
                  and investment clarity.
                </li>
                <li>
                  <strong>Dedicated Squads:</strong> Cross-functional teams
                  aligned to outcomes.
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand--footer">
              <img
                src={brandLogo}
                alt="Karthiwini Solutions logo"
                className="brand-mark"
              />
              <span className="brand-text">
                Karthiwini
                <strong>Solutions</strong>
              </span>
            </div>
            <p>Smart Solutions, Stronger Futures.</p>
          </div>
          <div>
            <h4>Connect</h4>
            <p>
              www.karthiwini.in
              <br />
              +91 8121201610
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => handleNavClick(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <p>
            © {new Date().getFullYear()} Karthiwini Solutions. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(contactInitialState);
  const [errors, setErrors] = useState({});
  const [successState, setSuccessState] = useState("hidden");
  const timeoutsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const setWithTimeout = (callback, timeout) => {
    const id = window.setTimeout(callback, timeout);
    timeoutsRef.current.push(id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(values.name)) {
      newErrors.name = "Name cannot contain numbers.";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    }
    if (!values.countryCode) {
      newErrors.countryCode = "Please select a dialing code.";
    }
    if (!values.message.trim()) {
      newErrors.message = "Message is required.";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("entry.518768041", values.name);
      formData.append("entry.1124164163", values.email);
      formData.append(
        "entry.672366913",
        `${values.countryCode} ${values.phone}`.trim()
      );
      formData.append("entry.1928175829", values.message);

      fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScC8PJ1xpeNA6P7f-qeTb4RKZCnGI0rHTe4tS2vGVRmNtlOWQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      ).catch(() => {
        // Google Forms responds with an opaque response in no-cors mode; ignore errors.
      });

      setSuccessState("visible");
      setValues(contactInitialState);
      setWithTimeout(() => {
        setSuccessState("hidden");
      }, 4000);
    }
  };

  const getInputClass = (field) =>
    errors[field] ? "input-control input-control--error" : "input-control";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">
          Your Name{" "}
          <span className="required-star" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={getInputClass("name")}
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="email">
          Your Email{" "}
          <span className="required-star" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={getInputClass("email")}
          value={values.email}
          onChange={handleChange}
          placeholder="name@company.com"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="phone">
          Your Mobile Number{" "}
          <span className="required-star" aria-hidden="true">
            *
          </span>
        </label>
        <div className="phone-input-wrapper">
          <select
            id="countryCode"
            name="countryCode"
            className={
              errors.countryCode
                ? "input-control input-control--error phone-select"
                : "input-control phone-select"
            }
            value={values.countryCode}
            onChange={(event) => {
              setValues((prev) => ({
                ...prev,
                countryCode: event.target.value,
              }));
              setErrors((prev) => ({
                ...prev,
                countryCode: "",
              }));
            }}
          >
            {countryDialCodes.map((country) => (
              <option key={country.code} value={country.dial}>
                {`${country.dial} ${country.code}`}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={getInputClass("phone")}
            value={values.phone}
            onChange={handleChange}
            placeholder="90000 00000"
          />
        </div>
        {errors.countryCode && (
          <span className="form-error">{errors.countryCode}</span>
        )}
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="message">
          Message{" "}
          <span className="required-star" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className={getInputClass("message")}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us about your project or challenge"
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary form-submit">
        Submit
      </button>
      {successState !== "hidden" && (
        <div
          className={`form-status form-status--success ${
            successState === "visible" ? "is-visible" : ""
          }`}
        >
          Submitted Successfully
        </div>
      )}
    </form>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" fill="none" />
      <line x1="12" y1="1.5" x2="12" y2="4.5" stroke="currentColor" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" stroke="currentColor" />
      <line x1="1.5" y1="12" x2="4.5" y2="12" stroke="currentColor" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" stroke="currentColor" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.5 14.5a8.5 8.5 0 1 1-11-11 8.5 8.5 0 0 0 11 11z"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
}

export default App;
