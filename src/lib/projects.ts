export interface ProjectItem {
  slug: string;
  src: string;
  gallery?: string[];
  alt: string;
  title: string;
  subtitle: string;
  category: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  date?: string;
  role?: string;
  client?: string;
  isPersonal?: boolean;
  isOpenSource?: boolean;
  packageManager?: string;
  npmUrl?: string;
  badge?: string;
}

export const PROJECTS: ProjectItem[] = [
  // 1st: ScubaLife
  {
    slug: "scubalife",
    src: "/images/projects/scubalife.png",
    
    alt: "ScubaLife — Dive Into Adventure | Scuba Diving Courses, Trips & E-Commerce",
    title: "ScubaLife",
    subtitle: "Dive Into Adventure • Scuba Courses, Trips & E-Commerce",
    category: "Full-Stack Platform",
    description:
      "From your first breath underwater to advanced specialties and liveaboard trips — an all-in-one platform across Southern California to book courses, schedule expeditions, and purchase diving gear.",
    longDescription:
      "ScubaLife is a premier production-grade full-stack platform built for scuba diving enthusiasts, students, and ocean adventure seekers across Southern California. Engineered from the ground up to solve fragmented dive workflows, ScubaLife unifies course booking (PADI Open Water, Advanced, Rescue, Nitrox, Divemaster), guided Catalina Island boat expeditions, retail scuba gear e-commerce, equipment servicing, and student credential tracking into a cohesive, high-performance web experience.",
    challenge:
      "Harmonizing complex course scheduling with Catalina Island ferry logistics and hotel bookings, alongside a fast multi-category equipment shop with cart state management, user authentication, and high-converting checkout flows.",
    solution:
      "Engineered an end-to-end fullstack platform with Next.js App Router, TypeScript, and MongoDB. Integrated secure NextAuth credential workflows, dynamic booking calendars with automated confirmation emails, persistent shopping carts, and a robust admin dashboard for managing classes and expeditions.",
    highlights: [
      "Dynamic course enrollment and boat trip reservation engine with real-time schedule selection",
      "Full e-commerce dive shop with persistent cart, gear variants, and checkout flows",
      "Personalized student dashboard for tracking dive certifications, schedules, and orders",
      "Location-specific dive guides across Los Angeles, Ventura, and Orange County with rich SEO",
      "Enterprise-grade authentication and user account management powered by NextAuth",
      "Built with high-accessibility Tailwind CSS and shadcn/ui components",
    ],
    metrics: [
      { label: "Course Bookings", value: "Realtime" },
      { label: "Counties Served", value: "LA, Ventura, OC" },
      { label: "Performance Score", value: "98/100" },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Node.js",
      "Express.js",
      "NextAuth",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    liveUrl: "https://www.scubalife.net/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer & Creator",
    client: "Scuba Life (Live Production)",
  },

  // 2nd: The Miami Condo Source
  {
    slug: "miamicondo",
    src: "/images/projects/miamicondo.png",
    
    alt: "The Miami Condo Source — Pre-Construction Luxury Real Estate & Waterfront Residences",
    title: "The Miami Condo Source",
    subtitle: "Pre-Construction Luxury Real Estate & Waterfront Residences",
    category: "Luxury Real Estate & Architecture",
    description:
      "Exclusive digital real estate portal showcasing Miami's premier pre-construction condominiums, branded waterfront residences, and private buyer presentations.",
    longDescription:
      "The Miami Condo Source is an exclusive digital real estate portal engineered for high-net-worth property investors and luxury buyers. The platform provides interactive building profiles, floor plans, pre-construction pricing tiers, architectural renderings, and private presentation bookings across Miami's most coveted waterfront districts.",
    challenge:
      "Delivering high-resolution architectural media, 3D renderings, and extensive PDF floor plan downloads without degrading mobile rendering speed or initial page load latency.",
    solution:
      "Architected a Next.js platform with modern responsive image optimization, localized property filtering, custom interactive gallery viewers, and lead generation inquiry pipelines.",
    highlights: [
      "Curated index of premier Miami pre-construction condominiums and private waterfront estates",
      "Dynamic neighborhood filtering covering Brickell, Miami Beach, Edgewater, and Coconut Grove",
      "High-fidelity architectural photo galleries and interactive floor plan showcases",
      "Direct VIP presentation scheduling integration with real-time agent lead routing",
    ],
    metrics: [
      { label: "Catalog Listings", value: "Multi-Million" },
      { label: "Image Optimization", value: "WebP / AVIF" },
      { label: "Mobile Speed", value: "Instant" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Framer Motion",
    ],
    liveUrl: "https://themiamicondosource.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Frontend Engineer & UI Architect",
    client: "The Miami Condo Source",
  },

  // 3rd: Act On Climate
  {
    slug: "actonclimate",
    src: "/images/projects/actonclimate.png",
    
    alt: "Act On Climate — Connecting People to Climate Careers & Opportunities",
    title: "Act On Climate",
    subtitle: "Connecting People to Climate Careers & Opportunities",
    category: "Climate Careers & Community Platform",
    description:
      "Act on Climate is a global platform dedicated to connecting individuals with meaningful careers, resources, and opportunities in the climate space.",
    longDescription:
      "Act on Climate is a premier global ecosystem dedicated to accelerating sustainability careers. The platform connects professionals, students, and organizations with meaningful green jobs, climate courses, impact events, media resources, and global community memberships.",
    challenge:
      "Aggregating distributed climate opportunities into a unified, high-performance database with faceted search, accessible typography, and international community submissions.",
    solution:
      "Built a modern Next.js and Tailwind CSS web application featuring multi-tag filtering, server-side search indexing, and streamlined contribution forms for international organizations.",
    highlights: [
      "Global climate career directory and green opportunity matching engine",
      "Educational climate courses, community events, and multimedia library",
      "Interactive membership system and exploration services for climate institutions",
      "Clean, accessible responsive UI with fast client-side navigation",
    ],
    metrics: [
      { label: "Community Reach", value: "Global" },
      { label: "Opportunities", value: "Careers & Grants" },
      { label: "User Rating", value: "4.9 ★" },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "MongoDB",
    ],
    liveUrl: "https://actonclimate.co/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer",
    client: "Act On Climate Global",
  },

  // 4th: Boekerello
  {
    slug: "boekerello",
    src: "/images/projects/boekerello.png",
    
    alt: "Boekerello — Personalized Children's Storybook Creation Platform",
    title: "Boekerello",
    subtitle: "Personalized Children's Storybook & E-Commerce Platform",
    category: "Personalized Storybook Platform",
    description:
      "Create a one-of-a-kind storybook where your child becomes the main character in a world made just for them, fully personalised with magical adventures and printed keepsakes.",
    longDescription:
      "Boekerello brings imagination to life with personalized storybooks where children become the heroes of their own enchanting journeys. Parents, family members, and educators can customize characters, select age-tailored storylines, preview full-color illustrations, and order premium hardcover editions or instant digital storybooks.",
    challenge:
      "Developing an interactive, real-time story customizer with instant book previews, multi-language support, and a high-converting e-commerce checkout flow.",
    solution:
      "Engineered an intuitive Next.js and React frontend featuring responsive book configurators, internationalization selectors, persistent shopping cart management, and seamless payment integration.",
    highlights: [
      "Custom storybook builder allowing children to be the starring protagonist in their own adventure",
      "Dynamic storyline catalog covering magical kingdoms, space explorations, and animal expeditions",
      "Interactive digital book preview with personalized dedications and custom covers",
      "Full e-commerce shopping cart with multi-currency checkout and print-on-demand fulfillment",
    ],
    metrics: [
      { label: "Personalization", value: "100% Custom" },
      { label: "Book Creation", value: "<3 Mins" },
      { label: "Parent Satisfaction", value: "5.0 ★" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "E-Commerce",
      "Stripe",
    ],
    liveUrl: "https://boekerello.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Web Developer",
    client: "Boekerello (Live)",
  },

  // 5th: Braga Experience
  {
    slug: "bragaexperience",
    src: "/images/projects/bragaexperience.jpg",
    
    alt: "Braga Experience — Tourism & Cultural City Guide",
    title: "Braga Experience",
    subtitle: "Curated Tourism, Cultural Itineraries & Local Discovery",
    category: "Travel & Destination Platform",
    description:
      "Premium destination discovery platform showcasing Portugal's historic city of Braga, featuring bespoke tourist guides, heritage monuments, gastronomy, and cultural experiences.",
    longDescription:
      "Braga Experience serves as the definitive cultural companion for travelers exploring Braga, one of Portugal's oldest and most vibrant cities. The platform highlights architectural sanctuaries, traditional culinary gems, seasonal festivals, and self-guided walking tours.",
    challenge:
      "Crafting an immersive, visually captivating editorial experience that loads instantly on roaming mobile connections across Europe.",
    solution:
      "Leveraged Next.js Static Site Generation (SSG) with aggressive CDN caching, responsive visual assets, and interactive route mapping.",
    highlights: [
      "Curated thematic itineraries spanning historic sanctuaries, Roman ruins, and culinary hotspots",
      "Interactive location guides with embedded maps and public transit recommendations",
      "Multi-language tourist content structure with fast client-side transitions",
      "Editorial photography showcase spotlighting Northern Portugal's architectural heritage",
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "First Contentful Paint", value: "0.6s" },
      { label: "Featured Locations", value: "50+ Guides" },
    ],
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Headless CMS",
    ],
    liveUrl: "https://bragaexperience.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Frontend Engineer & UI Designer",
    client: "Braga Experience Tourism",
  },

  // 6th: AR Auto Parts
  {
    slug: "arautoparts",
    src: "/images/projects/arautoparts.jpg",
    
    alt: "AR Auto Parts — Quality Used Engines & Transmissions E-Commerce",
    title: "AR Auto Parts",
    subtitle: "Quality Used Engines & Transmissions • VIN Match Platform",
    category: "Automotive E-Commerce",
    description:
      "Specialized automotive e-commerce platform offering quality A-grade used engines, transmissions, exact VIN match fitment lookup, and nationwide fast fulfillment.",
    longDescription:
      "AR Auto Parts is an extensive online marketplace for automotive mechanics, dealerships, and car enthusiasts. Featuring thousands of OEM and aftermarket parts across braking, suspension, engine cooling, and transmission systems, the platform eliminates part incompatibility through intelligent year-make-model compatibility filters.",
    challenge:
      "Organizing vast relational catalogs with thousands of vehicle compatibility cross-references while delivering lightning-fast faceted search results.",
    solution:
      "Engineered an optimized catalog filtering engine in Node.js and MongoDB with normalized category hierarchies, quick-add persistent shopping cart, and secure checkout processing.",
    highlights: [
      "Year-Make-Model vehicle lookup filter preventing parts mismatch returns",
      "Categorized parts taxonomy across engine, electrical, suspension, and body components",
      "Persistent cart state with live shipping rate calculator and stock status indicators",
      "B2B and retail customer account portal with order tracking and invoice downloads",
    ],
    metrics: [
      { label: "Catalog Scale", value: "Thousands of Parts" },
      { label: "Search Latency", value: "<75ms" },
      { label: "Checkout Conversion", value: "+32%" },
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Redux Toolkit",
      "Stripe",
    ],
    liveUrl: "https://www.arautoparts.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer",
    client: "AR Auto Parts",
  },

  // 7th: SKTCH Labs
  {
    slug: "sktchlabs",
    src: "/images/projects/sktchlabs.png",
    
    alt: "sketch LABS — Turn Your Photos Into Custom Coloring & Sketch Books",
    title: "SKTCH Labs",
    subtitle: "Custom Photo-to-Sketch & Coloring Book Platform",
    category: "Creative AI & Digital Art Platform",
    description:
      "Turn your favorite photos into custom coloring and sketch books, transforming memories into tangible art, instant digital PDFs, or professionally printed keepsakes.",
    longDescription:
      "sketch LABS transforms personal memories into tangible works of art. Users can upload photographs of favorite people and beloved pets, choose between bold crayon-ready coloring outlines or refined pencil sketch styles, and receive professionally printed books or instant digital PDF downloads.",
    challenge:
      "Developing an edge-detection and outline generation pipeline that produces clean, high-resolution vector sketch lines suitable for professional 300 DPI physical book printing.",
    solution:
      "Engineered an interactive web customizer with image filtering algorithms, responsive preview canvases, print-on-demand fulfillment integration, and seamless cart checkout.",
    highlights: [
      "Photo-to-sketch outline generator converting portraits and pets into coloring pages",
      "Multiple rendering styles from bold crayon-ready contours to detailed artistic sketches",
      "Instant high-resolution Digital PDF generation alongside hardcover print delivery",
      "User collections portal, responsive preview customizer, and account management",
    ],
    metrics: [
      { label: "Rendering Speed", value: "<10s" },
      { label: "Print Resolution", value: "300 DPI" },
      { label: "Customer Delight", value: "5.0 ★" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Canvas API",
      "Node.js",
      "Stripe",
    ],
    liveUrl: "https://sktchlabs.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer",
    client: "sketch LABS (Live)",
  },

  // 8th: Hierro a Medida
  {
    slug: "hierroamedida",
    src: "/images/projects/hierroamedida.png",
    
    alt: "Hierro a Medida — Custom Cut-to-Size Steel & Iron E-Commerce Platform",
    title: "Hierro a Medida",
    subtitle: "Custom Cut-to-Size Steel & Industrial Metal E-Commerce",
    category: "Industrial E-Commerce & Metal Fabrication",
    description:
      "Specialized industrial e-commerce platform delivering custom cut-to-size steel tubes, UPN beams, and sheet metal directly from user blueprints in seconds.",
    longDescription:
      "Hierro a Medida modernizes steel and industrial metal purchasing across Spain and Europe. Customers, construction contractors, and DIY builders can select square/round tubes, beams, and sheet metal, specify exact custom millimeter lengths, or upload hand-drawn sketches for instant quote calculation and nationwide delivery.",
    challenge:
      "Developing a real-time dimensional pricing engine calculating precise cuts, material weights, and delivery logistics directly from user-input lengths and uploaded blueprints.",
    solution:
      "Engineered an automated calculation engine and responsive catalog with interactive 3D component previews, instant blueprint quoting tools, and streamlined cart checkout.",
    highlights: [
      "Custom millimeter cut-to-size configurator for square tubes, round tubes, and UPN channel beams",
      "Instant blueprint-to-quote engine converting uploaded hand sketches into accurate orders",
      "Over 850 catalog references with precision cutting (±1mm tolerance) included in price",
      "Nationwide 48-72 hour peninsula shipping calculator and trade contractor invoice pipeline",
    ],
    metrics: [
      { label: "Catalog References", value: "854+ Items" },
      { label: "Cutting Precision", value: "±1 mm" },
      { label: "Delivery Speed", value: "48-72 Hours" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "Stripe",
    ],
    liveUrl: "https://hierroamedida.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer",
    client: "Hierro a Medida (Live)",
  },

  // 9th: Giftap
  {
    slug: "giftap",
    src: "/images/projects/giftap.png",
    
    alt: "Giftap — Curated Flower, Beauty & Gift E-Commerce Platform",
    title: "Giftap",
    subtitle: "Curated Flower, Beauty & Lifestyle Gifting E-Commerce",
    category: "Gifting & E-Commerce Platform",
    description:
      "Curated flower, beauty, and wellness gifting e-commerce platform offering customized bouquet packages, self-care bundles, and seamless online shopping.",
    longDescription:
      "Giftap is an elegant lifestyle and gifting e-commerce platform designed to celebrate life's cherished moments. Customers can explore handcrafted floral arrangements, curated beauty and skincare packages, and wellness essentials with real-time product search, interactive wishlist, and swift checkout.",
    challenge:
      "Creating an intuitive shopping experience with responsive flower and beauty package showcases, persistent cart synchronization, and dynamic search filtering.",
    solution:
      "Engineered an optimized React and Tailwind CSS web application integrated with Firebase, featuring streamlined catalog browsing, real-time cart state, and fast client-side navigation.",
    highlights: [
      "Curated floral gift packages including custom Tulip and Rose seasonal arrangements",
      "Comprehensive beauty and self-care wellness catalog with faceted keyword search",
      "Interactive shopping cart with live total computation and promotional banner integration",
      "Responsive, mobile-first design with fluid animations and fast product browsing",
    ],
    metrics: [
      { label: "Catalog Experience", value: "Curated" },
      { label: "Search Latency", value: "<50ms" },
      { label: "Customer Rating", value: "4.9 ★" },
    ],
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "TypeScript",
      "Firebase",
      "REST API",
    ],
    liveUrl: "https://giftap901.web.app/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2025",
    role: "Frontend Developer",
    client: "Giftap",
  },

  // 10th: Witklip Farm
  {
    slug: "witklipfarm",
    src: "/images/projects/witklipfarm.jpg",
    
    alt: "Witklip Farm — Eco-Tourism, Nature Retreat & Farm Stay Experience",
    title: "Witklip Farm",
    subtitle: "Eco-Tourism, Nature Retreat & Farm Stay Experience",
    category: "Hospitality & Nature Retreat",
    description:
      "Idyllic farm stay and eco-lodge reservation website nestled in South Africa's scenic countryside, offering immersive cottage bookings, hiking trail guides, and farm fresh experiences.",
    longDescription:
      "Witklip Farm offers an authentic rural sanctuary for eco-travelers seeking respite in nature. The website invites guests to explore rustic self-catering cottages, mountain hiking trails, seasonal harvests, and outdoor stargazing activities with direct reservation capabilities.",
    challenge:
      "Presenting serene natural photography and cottage availability without sluggish asset loading for international vacation planners.",
    solution:
      "Engineered an optimized Next.js platform with responsive image loading, intuitive date picker booking inquiries, and interactive farm activity guides.",
    highlights: [
      "Detailed cottage accommodation profiles with amenities lists and high-resolution galleries",
      "Interactive farm activities guide detailing bird watching, hiking trails, and stargazing",
      "Direct booking inquiry system with automated confirmation emails",
      "Warm rustic design language harmonizing with South African natural landscapes",
    ],
    metrics: [
      { label: "Booking Inquiries", value: "Direct" },
      { label: "Page Load Speed", value: "0.8s" },
      { label: "Guest Satisfaction", value: "5.0 ★" },
    ],
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Booking Engine",
    ],
    liveUrl: "https://witklipfarm.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Web Developer",
    client: "Witklip Farm Estate",
  },

  // 11th: Imoscan
  {
    slug: "imoscan",
    src: "/images/projects/imoscan.png",
    
    alt: "Imoscan — Real-Time Global IMEI Intelligence & Device Diagnostics",
    title: "Imoscan",
    subtitle: "Global IMEI Intelligence, AI Diagnostics & Blacklist Check",
    category: "SaaS & Cybersecurity Platform",
    description:
      "Advanced AI-powered diagnostics and blacklisting checks for secure device transactions, real-time IMEI verification, and telecom inventory management.",
    longDescription:
      "Imoscan is an enterprise-grade global device intelligence and IMEI diagnostic platform. Built for phone retailers, telecom carriers, refurbishers, and consumers, Imoscan performs real-time GSX, iCloud status, MDM lock, carrier blacklist, and financial block checks across global device databases with sub-second response times.",
    challenge:
      "Executing high-frequency multi-carrier GSX and OEM database lookups across international telecom registries while preventing rate limiting and ensuring sub-second response speeds.",
    solution:
      "Architected an event-driven microservices lookup engine with Redis caching, asynchronous queue workers, dark/light theme toggle, and an automated report generation pipeline.",
    highlights: [
      "Instant real-time global IMEI and serial number diagnostics with carrier blacklist checks",
      "Deep hardware verification covering Apple GSX, FMI (Find My iPhone), MDM, and iCloud status",
      "Automated PDF diagnostic report generation for device buyback and wholesale trade-ins",
      "High-throughput REST API integration for telecom resellers and e-commerce device marketplaces",
    ],
    metrics: [
      { label: "Query Speed", value: "<1.2s" },
      { label: "Carrier Coverage", value: "Global" },
      { label: "Data Accuracy", value: "99.9%" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Redis",
      "REST API",
    ],
    liveUrl: "https://imoscan.com/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Web Developer",
    client: "Imoscan (Live)",
  },

  // 12th: Destiny Abroad
  {
    slug: "destinyabroad",
    src: "/images/projects/destinyabroad.png",
    
    alt: "Destiny Abroad — Work, Study & Immigration Consultation Portal",
    title: "Destiny Abroad",
    subtitle: "Global Work, Study & Immigration Consultation Portal",
    category: "LegalTech & Immigration Services",
    description:
      "UAE-licensed immigration consultation and visa services portal providing clear guidance, documentation support, and embassy filing assistance for global work and study.",
    longDescription:
      "Destiny Abroad is a premier immigration and global education advisory platform based in the United Arab Emirates. The platform streamlines visa applications for study, skilled work, and residency across Canada, the UK, Europe, Australia, and New Zealand with online expert consultations, secure document verification, and payment gateway integration.",
    challenge:
      "Creating an intuitive, frictionless multi-step immigration profile assessment and consultation booking pipeline with localized payment processing in the UAE and worldwide.",
    solution:
      "Built a responsive Next.js web application with streamlined consultation appointment booking, automated client document checklist workflows, and secure multi-currency payment checkout.",
    highlights: [
      "Direct online consultation scheduling with certified immigration specialists (1:1 sessions)",
      "Comprehensive country visa guides spanning Canada, Europe, the UK, Australia, and the UAE",
      "Integrated client registration portal with secure digital payment processing",
      "Trusted by 3,400+ clients with automated document preparation tracking and status alerts",
    ],
    metrics: [
      { label: "Client Cases", value: "3,400+" },
      { label: "License Status", value: "UAE-Licensed" },
      { label: "Success Rate", value: "98%" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Stripe",
      "Booking Engine",
    ],
    liveUrl: "https://www.destinyabroad.ae/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Full-Stack Developer",
    client: "Destiny Abroad (Live)",
  },

  // 13th: MCQ BD (1st Personal Creation / Active Dev)
  {
    slug: "mcqbd",
    src: "/images/projects/mcqbd.png",
    alt: "MCQ BD — HSC & University Admission Exam Preparation App",
    title: "MCQ BD",
    subtitle: "HSC & Admission Exam Preparation App • Monorepo Mobile & Web Platform",
    category: "Mobile App & EdTech Platform",
    description:
      "স্মার্টফোন দিয়েই HSC ও ভর্তি পরীক্ষার ১০০% আত্মবিশ্বাসী প্রস্তুতি। A comprehensive digital examination platform for 1.4M+ Bangladeshi students featuring chapter-wise practice, all education board questions, top college test papers, and university admission question banks.",
    longDescription:
      "MCQ BD is an ambitious educational testing platform built to democratize exam preparation for over 1.4 million Bangladeshi Higher Secondary Certificate (HSC) candidates and university admission aspirants. Developed as an enterprise monorepo comprising a React Native / Expo mobile application, a Next.js 16 super-admin question studio with live phone simulator, and a Node.js/Express REST backend on MongoDB Atlas. Designed around four foundational prep pillars: 1) Chapter-wise practice across science, commerce, and arts subjects; 2) Official board questions from 2018–2024 across all 9 education boards and Madrasah board; 3) Top college test papers from Notre Dame College, Holy Cross, Dhaka College, and Rajuk; 4) University admission question banks for DU, BUET, Medical/Dental, RU, JU, CU, and GST clusters. Features realtime countdown timers, negative marking (-0.25), instant step-by-step explanations, live national and batch leaderboards with streaks, and an interactive peer doubt-solving community feed.",
    challenge:
      "Traditional HSC exam prep relies on heavy, expensive paper guide books that cost thousands of Taka, lack countdown timing pressure, offer zero automated analytics on student subject weaknesses, and fail to bridge the gap between HSC exams and fast-approaching university admission tests.",
    solution:
      "Engineered a lightweight, high-performance cross-platform mobile client with NativeWind and Reanimated paired with a robust Next.js 16 admin portal featuring zero-modal inline question editing, bulk JSON/CSV question ingestion, and a secure Node.js JWT/OTP authentication engine on MongoDB Atlas.",
    highlights: [
      "Monorepo architecture with React Native (Expo SDK 52) mobile app, Next.js 16 admin portal, and Node.js REST API",
      "4 core preparation pillars: Chapter-wise practice, All 9 Education Board question banks (2018–2024), Top college test papers (NDC, Holy Cross, Dhaka College), and University admission prep (DU, BUET, Medical, GST)",
      "Realistic exam simulation: Realtime countdown timers and official negative marking calculation (-0.25 per incorrect answer)",
      "Instant answer verification with comprehensive Bengali explanations, diagrams, and mathematical formulas",
      "Live national and batch leaderboard with daily streak tracking to motivate consistent daily practice",
      "Interactive doubt-solving student community feed allowing students to discuss complex questions with peers",
      "Admin Question Studio with live smartphone mockup preview and zero-modal inline question authoring",
    ],
    metrics: [
      { label: "Prep Pillars", value: "4 Core Flows" },
      { label: "Target Audience", value: "1.4M+ Students" },
      { label: "Development", value: "Active Dev" },
    ],
    tech: [
      "React Native",
      "Expo SDK 52",
      "Next.js 16",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "TypeScript",
      "NativeWind",
      "Tailwind CSS",
      "JWT & OTP Auth",
    ],
    liveUrl: "https://github.com/RashedulHaqueRasel1/mcqbd",
    githubUrl: "https://github.com/RashedulHaqueRasel1/mcqbd",
    date: "2026",
    role: "Lead Full-Stack & Mobile Developer",
    client: "Personal EdTech Venture (Active Dev)",
    isPersonal: true,
    isOpenSource: true,
    badge: "Mobile App (Active Dev)",
  },

  // 14th: Anatomy Lab 3D (2nd Personal Creation)
  {
    slug: "human-anatomy-3d",
    src: "/images/projects/human-anatomy-3d.png",
    alt: "Anatomy Lab 3D — Real-Time 3D Human Anatomy, Live Physiology & Surgery Simulator",
    title: "Anatomy Lab 3D",
    subtitle: "Real-Time 3D Human Anatomy, Live Physiology & Surgery Simulator",
    category: "3D WebGL & MedTech Simulator",
    description:
      "Interactive real human anatomy, live physiology and virtual surgery practice in the browser for medical students. Explore 3D organs, simulate scalpel incisions, watch heartbeats and blood circulation, and practice 16 surgical procedures.",
    longDescription:
      "Anatomy Lab 3D is an advanced medical simulation web platform engineered with Next.js 16, React Three Fiber, Three.js, and custom WebGL tissue shaders. Designed for medical students, doctors, and healthcare educators, the application provides interactive 3D anatomical dissection across male and female models, real-time live physiological processes (cardiac cycle, breathing, food transit through the gut, nerve reflexes, kidney filtration with live ECG monitor), organ exploded views, and virtual surgery training across 16 guided procedures (open appendicectomy, CABG, craniotomy, VATS lobectomy, knee replacement, caesarean section). Operates 100% in-browser with zero backend dependencies, synthesized Web Audio sound effects, and bilingual English / বাংলা (Bangla) medical terminology.",
    challenge:
      "Rendering dense multi-system anatomical 3D mesh hierarchies smoothly at 60 FPS in WebGL while supporting procedural scalpel incision deformation, wound rim shaders, and multi-organ ray casting without browser freezing or memory leaks.",
    solution:
      "Implemented meshopt-compressed GLTF assets (~4.5MB total) loaded via Three.js with BVH spatial indexing (three-mesh-bvh) for sub-millisecond picking. Developed custom GLSL tissue shaders that calculate incision polylines and simulate wound gaping on the GPU, paired with imperative Three.js loops outside React state.",
    highlights: [
      "Full 3D anatomical exploration: 10 body systems, skin transparency slider, cross-section slicing (coronal, sagittal, axial)",
      "Live physiology simulation: Real-time beating heart, expanding lungs, particle-driven digestive flow, and live ECG monitor",
      "Virtual surgical suite: 16 guided procedures (abdominal, cardiothoracic, neurosurgery, orthopaedics) with procedural instruments (scalpel, retractor, forceps, clamp, suture)",
      "Pure client-side WebGL architecture running 100% in-browser with zero backend or database required",
      "Full bilingual interface supporting both English and বাংলা (Bangla) medical nomenclature",
      "Synthesized Web Audio sound effects replicating real operating theatre instrumentation",
    ],
    metrics: [
      { label: "Surgical Procedures", value: "16 Guided" },
      { label: "Asset Compression", value: "≈4.5 MB" },
      { label: "Frame Rate", value: "60 FPS WebGL" },
    ],
    tech: [
      "Next.js",
      "React Three Fiber",
      "Three.js",
      "TypeScript",
      "three-mesh-bvh",
      "GLSL Shaders",
      "Tailwind CSS",
      "Web Audio API",
    ],
    liveUrl: "https://human-anatomy-3d-v2.vercel.app/",
    githubUrl: "https://github.com/RashedulHaqueRasel1/Human-Anatomy-3D",
    date: "2026",
    role: "Creator & 3D WebGL Engineer",
    client: "Open Source MedTech Simulator",
    isPersonal: true,
    isOpenSource: true,
    badge: "3D WebGL Simulator",
  },

  // 15th: BlankPage (3rd Personal Creation)
  {
    slug: "blank-page",
    src: "/images/projects/blankpage.png",
    alt: "BlankPage — Minimalist Distraction-Free Zen Writing Workspace",
    title: "BlankPage",
    subtitle: "Minimalist Zen Writing Workspace • Ambient Audio & Flow State",
    category: "Minimalist Productivity & Editor",
    description:
      "A serene, distraction-free digital writing space crafted for authors, thinkers, and journalists. Features live word analytics, ambient soundscapes, instant publishing, and pure focus.",
    longDescription:
      "BlankPage is an ultra-minimalist, distraction-free writing environment built for deep focus and flow state. Designed with the philosophy of 'pure digital paper', BlankPage strips away cluttered ribbons and noisy interfaces, giving writers a clean canvas accompanied by ambient soundscapes, live word and character analytics, keyboard-first navigation, cloud autosave, and direct one-click publishing capabilities.",
    challenge:
      "Crafting an invisible, distraction-free typography interface that provides ambient audio, real-time typing rhythm metrics, and reliable state recovery without intruding on the user's flow.",
    solution:
      "Built a lightweight, responsive Next.js application with contenteditable rich text synchronization, local storage persistence, ambient audio synthesis, and a serene monochromatic design language.",
    highlights: [
      "Pure distraction-free typography editor with customizable font pairing and line-height rhythms",
      "Real-time word, character, and estimated reading time telemetry counters",
      "Built-in ambient soundscapes (rain, vinyl fireplace, coffee shop, white noise) for focus",
      "Zero-lag auto-saving with instant local cache recovery preventing data loss",
      "One-click web publishing and markdown/text export workflow",
    ],
    metrics: [
      { label: "Interface Clutter", value: "0% Minimal" },
      { label: "Autosave Latency", value: "Instant" },
      { label: "Typing Latency", value: "<5ms" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Audio API",
      "Local Storage",
      "Vercel",
    ],
    liveUrl: "https://blank-page-v1.vercel.app/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Solo Creator & UI Designer",
    client: "Personal Product",
    isPersonal: true,
    badge: "Personal App",
  },

  // 16th: Dengue Slap Master / ডেঙ্গু থাপ্পড় বাজ (4th Personal Creation)
  {
    slug: "dengue-maro",
    src: "/images/projects/dengue-maro.png",
    alt: "ডেঙ্গু থাপ্পড় বাজ 👋🦟 · Dengue Slap Master — Bengali HTML5 Browser Game",
    title: "Dengue Slap Master",
    subtitle: "ডেঙ্গু থাপ্পড় বাজ 👋🦟 • Bengali Browser Game & Awareness",
    category: "Indie Web Game & Public Health",
    description:
      "মশা মারতে কামান লাগে না, একটা থাপ্পড়ই যথেষ্ট! An interactive Bengali browser game built with HTML5 Canvas, 38 native meme sounds, Cloudflare Workers, and dynamic 'Dainik Moshari' newspaper cards to raise dengue awareness.",
    longDescription:
      "Dengue Slap Master (ডেঙ্গু থাপ্পড় বাজ) is an engaging, viral Bengali browser game created to fight dengue through awareness and entertainment. Players defend a sleeping uncle ('Mama') from oncoming Aedes mosquitoes by tapping or slapping the screen with razor-sharp reflexes. Featuring hand-drawn canvas graphics, boss mosquito battles, power-ups (mosquito coil, repellent cream, electric bat, green coconut water), larva elimination in stagnant plant water, and 38 situation-responsive Bengali/Hindi meme sound bites. Powered by Cloudflare Workers and MongoDB Atlas for real-time global leaderboards and automated 'Dainik Moshari' shareable newspaper clippings.",
    challenge:
      "Optimizing real-time 60 FPS HTML5 Canvas 2D animations and responsive touch slapping across all mobile and desktop devices without external game engines, paired with zero-login cloud leaderboard synchronization.",
    solution:
      "Engineered pure vanilla HTML5 Canvas and Web Audio API architecture with zero external runtime dependencies. Deployed low-latency Cloudflare Workers API endpoints connected to MongoDB Atlas for instantaneous global leaderboard ranking and automated digital newspaper clipping generation.",
    highlights: [
      "Pure HTML5 Canvas 2D game engine running smoothly at 60 FPS without heavy frameworks",
      "Dynamic mosquito hierarchy: Normal, Fast, Heavy, and multi-hit Boss mosquitoes",
      "Power-up mechanics: Coils (slow down), Repellent Cream (bite immunity), Electric Bat (AOE wipe), Green Coconut (life restore)",
      "Public health larva destruction mini-action preventing mosquito wave spawn from stagnant water",
      "38 context-aware situational Bengali & Hindi meme audio sound effects",
      "Serverless global leaderboard on Cloudflare Workers and MongoDB Atlas with zero account required",
      "Automated 'Dainik Moshari' digital newspaper generation with downloadable social share cards",
    ],
    metrics: [
      { label: "Meme Sounds", value: "38 Audio FX" },
      { label: "Frame Rate", value: "60 FPS Canvas" },
      { label: "Edge Latency", value: "<45ms Edge" },
    ],
    tech: [
      "HTML5 Canvas",
      "Vanilla JavaScript",
      "Web Audio API",
      "Cloudflare Workers",
      "Cloudflare Pages",
      "MongoDB Atlas",
      "CSS3 Animations",
    ],
    liveUrl: "https://dengue-maro.pages.dev/",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Solo Creator & Game Engineer",
    client: "Personal Creation / Open Web",
    isPersonal: true,
    badge: "Personal Game",
  },

  // 17th: Web History Tracker
  {
    slug: "web-history-tracker",
    src: "/images/projects/web-history-tracker.png",
    alt: "Web History Tracker — Lightweight & Elegant Chrome Extension for Active Browsing Analytics",
    title: "Web History Tracker",
    subtitle: "Active Browsing Time & Analytics • Chrome Extension (Manifest V3)",
    category: "Chrome Extension & DevTool",
    description:
      "A lightweight Chrome extension that tracks real active browsing duration per webpage with a 10-second heartbeat mechanism, smart record merging, and a sleek dark-mode glassmorphic popup.",
    longDescription:
      "Web History Tracker is an open-source Chromium extension engineered with Manifest V3 to solve inaccurate browser history tracking. Unlike traditional browsers that only log visit timestamps, Web History Tracker measures actual engaged dwell time using a background service worker heartbeat mechanism. Featuring smart record merging for revisited domains, 100% on-device private storage with chrome.storage.local, instant clipboard copying, and a modern glassmorphic dark-mode interface with zero external telemetry.",
    challenge:
      "Tracking tab dwell time accurately across window switches, minimizing CPU cycles and memory footprint without draining user battery, while complying strictly with Chrome Manifest V3 service worker lifecycle constraints.",
    solution:
      "Implemented an event-driven background service worker listening to chrome.tabs.onActivated and chrome.tabs.onUpdated alongside an alarm-based 10-second heartbeat. Persisted data locally in chrome.storage.local with FIFO cleanup capped at 100 entries.",
    highlights: [
      "Manifest V3 compliant background service worker with event-driven tab lifecycle tracking",
      "Accurate dwell time computation with 10-second heartbeat alarms and automatic record merging",
      "Modern glassmorphism dark-mode popup UI with toast feedback and micro-interactions",
      "100% private, on-device data storage with chrome.storage.local — zero server telemetry",
      "One-click URL clipboard copying, individual item deletion, and bulk wipe with confirmation",
    ],
    metrics: [
      { label: "Manifest Standard", value: "MV3 Ready" },
      { label: "Telemetry Exfiltration", value: "0% Local" },
      { label: "Memory Footprint", value: "<15 MB" },
    ],
    tech: [
      "JavaScript (ES6+)",
      "Chrome Extensions API",
      "Manifest V3",
      "Service Workers",
      "Glassmorphic CSS",
      "HTML5",
    ],
    liveUrl: "https://github.com/RashedulHaqueRasel1/web-history-tracker",
    githubUrl: "https://github.com/RashedulHaqueRasel1/web-history-tracker",
    date: "2026",
    role: "Author & Extension Developer",
    client: "Open Source Tool",
    isPersonal: true,
    isOpenSource: true,
    badge: "Chrome Extension",
  },

  // 18th: Short Caption
  {
    slug: "short-caption",
    src: "/images/projects/short-caption.png",
    alt: "Short Caption — Curated Social Media Captions, Status & Quotes Platform",
    title: "Short Caption",
    subtitle: "Curated Social Media Captions, Quotes & Status Platform",
    category: "Social Web App & Content Hub",
    description:
      "A curated Bengali social media captions, quotes, and status portal featuring instant keyword search, one-click clipboard copying, card sharing, favorites, and dynamic categorization.",
    longDescription:
      "Short Caption is an intuitive, fast-loading social content discovery web application built for creators, writers, and social media enthusiasts. The platform organizes thousands of expressive Bengali captions across emotion, romance, motivation, attitude, and life perspectives into a sleek dark-mode card layout. Users can filter captions in real-time, copy formatted text with a single tap, bookmark favorites, generate downloadable share cards, and submit custom quotes through a member login portal.",
    challenge:
      "Creating a lightning-fast caption browsing and instant copying experience with seamless client-side state persistence for favorites and responsive card layouts across all mobile screen sizes.",
    solution:
      "Built an optimized React and Vite application with responsive Tailwind CSS card grid, localized search indexing, persistent local storage synchronization for saved captions, and native Clipboard API integration with animated toast notifications.",
    highlights: [
      "Categorized Bengali caption directory covering love, inspiration, attitude, and emotional quotes",
      "Instant one-click clipboard copying with visual toast confirmation",
      "Real-time instant keyword search and category pill navigation",
      "Interactive favorite/like system with persistent user bookmarks",
      "Social sharing integration and user account login portal",
    ],
    metrics: [
      { label: "Search Latency", value: "<15ms" },
      { label: "Interface", value: "Dark Glass" },
      { label: "Copy Action", value: "Instant 1-Click" },
    ],
    tech: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "REST API",
      "Clipboard API",
    ],
    liveUrl: "https://short-caption.vercel.app/",
    githubUrl: "https://github.com/RashedulHaqueRasel1/Short-Caption",
    date: "2026",
    role: "Creator & Frontend Developer",
    client: "Personal Web Product",
    isPersonal: true,
    isOpenSource: true,
    badge: "Personal Web App",
  },

  // 19th: AIVatar
  {
    slug: "aivatar",
    src: "/images/projects/aivatar.png",
    alt: "AIVatar — Premium AI Avatar Generator & Digital Soul Creator",
    title: "AIVatar",
    subtitle: "Premium AI Avatar Generator • Privacy-Focused Binary Streaming",
    category: "Generative AI & Privacy-First Web App",
    description:
      "A high-end web application to generate unique digital avatars using advanced AI. Features privacy-first server-side proxying, payload obfuscation, raw binary image streaming, and one-click export.",
    longDescription:
      "AIVatar is an upscale, privacy-first single-page generative AI application designed to create bespoke digital avatars. Built with Next.js 15 App Router, Tailwind CSS 4, and Framer Motion, AIVatar introduces an uncompromising privacy architecture: prompt payloads are obfuscated on the client, external AI engine requests are proxied exclusively through server-side handlers, and generated image binaries are streamed directly as raw blobs to prevent upstream API URL exfiltration in browser network inspectors. Incorporates instant one-click downloads with timestamped file naming, prompt style presets ('3D Cartoon', 'Neon Cyberpunk', 'Studio Portrait', 'Watercolor Art'), and glassmorphic micro-animations.",
    challenge:
      "Preventing third-party generative AI endpoints and upstream CDN URLs from leaking in user browser network tabs while maintaining responsive streaming speeds and high visual fidelity across mobile and desktop devices.",
    solution:
      "Architected an internal server-side proxy route with Base64 payload decoding, upstream image buffer fetching, and direct binary stream piping back to the client as an in-memory blob URL. Enhanced UX with Framer Motion fluid transitions and quick style selectors.",
    highlights: [
      "Zero-leak security architecture: server-side proxying and raw binary streaming keep external API URLs invisible",
      "Client-side payload obfuscation encoding prompt data prior to transmission",
      "Curated style presets: 3D Cartoon Style, Neon Cyberpunk, Studio Portrait, and Watercolor Art",
      "Instant one-click high-resolution image downloads with automated timestamped naming",
      "Luminous glassmorphism user interface built with Tailwind CSS 4, Radix UI, and Framer Motion",
    ],
    metrics: [
      { label: "API Privacy", value: "100% Proxied" },
      { label: "Image Delivery", value: "Binary Stream" },
      { label: "Style Presets", value: "Multi-Genre" },
    ],
    tech: [
      "Next.js 15",
      "Tailwind CSS 4",
      "Framer Motion",
      "Radix UI",
      "Axios",
      "TypeScript",
      "Sonner",
      "Binary Streaming",
    ],
    liveUrl: "https://ai-image-generate-v1.vercel.app/",
    githubUrl: "https://github.com/RashedulHaqueRasel1/ai-image-generate",
    date: "2026",
    role: "Creator & Full-Stack Developer",
    client: "Personal AI Venture",
    isPersonal: true,
    isOpenSource: true,
    badge: "Generative AI App",
  },

  // 20th: smart-pdf-js (Published NPM Package)
  {
    slug: "smart-pdf-js",
    src: "/images/projects/smart-pdf-js.png",
    alt: "smart-pdf-js — Modern DOM to PDF generator supporting OKLCH CSS colors & smart pagination",
    title: "smart-pdf-js",
    subtitle: "Modern DOM-to-PDF Generator • OKLCH CSS & Smart Pagination",
    category: "Published NPM Package",
    description:
      "Published NPM library providing modern DOM-to-PDF generation with first-class support for CSS OKLCH colors, automatic multi-page pagination, and high-DPI canvas rendering.",
    longDescription:
      "smart-pdf-js is a published open-source NPM library engineered to eliminate common rendering pitfalls when generating PDFs from contemporary web interfaces. Built to handle modern CSS color spaces like OKLCH, Display-P3, and CSS variables that frequently break traditional html2canvas workflows, smart-pdf-js provides intelligent multi-page document pagination, page break controls, retina canvas upscaling, and TypeScript types out of the box.",
    challenge:
      "Preventing page-break clipping on DOM elements (cutting text lines in half) and resolving modern CSS OKLCH color rendering crashes in standard HTML-to-canvas PDF converters.",
    solution:
      "Engineered an automatic color space preprocessor that normalizes OKLCH and lab() color values prior to rasterization, combined with an intelligent vertical DOM node height splitting algorithm that guarantees clean page breaks across multi-page documents.",
    highlights: [
      "Native compatibility with Tailwind CSS v4 and modern CSS OKLCH / color() gamuts",
      "Smart automatic pagination preventing text and image cutoff between PDF pages",
      "High-DPI retina rendering ensuring crisp typography and vector-like output",
      "Zero-config promise-based API with customizable margins, orientations, and formats",
      "Full TypeScript type declarations with automated build verification",
    ],
    metrics: [
      { label: "NPM Package", value: "v1.0.1 Live" },
      { label: "Color Gamut", value: "OKLCH Ready" },
      { label: "API Style", value: "Promise-Based" },
    ],
    tech: [
      "TypeScript",
      "JavaScript (ESM/CJS)",
      "NPM Package",
      "DOM API",
      "HTML5 Canvas",
      "PDF Generation",
    ],
    liveUrl: "https://www.npmjs.com/package/smart-pdf-js",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Package Author & Maintainer",
    client: "NPM Registry (Public)",
    isPersonal: true,
    isOpenSource: true,
    packageManager: "npm i smart-pdf-js",
    npmUrl: "https://www.npmjs.com/package/smart-pdf-js",
    badge: "Published NPM Package",
  },

  // 21st: env-secret (Published NPM Package / CLI)
  {
    slug: "env-secret",
    src: "/images/projects/env-secret.png",
    alt: "env-secret — Zero-dependency CLI for encrypting & decrypting .env secrets with Argon2",
    title: "env-secret",
    subtitle: "Zero-Dependency CLI for Encrypting & Managing .env Secrets",
    category: "Published NPM Package & CLI",
    description:
      "A zero-dependency developer security CLI to encrypt and decrypt sensitive environment variables and .env files using robust Argon2 key derivation and AES encryption.",
    longDescription:
      "env-secret is a developer-first security CLI and Node.js utility published on NPM. Built to eliminate leaked API keys and accidental .env commits into public git repositories, env-secret offers secure zero-dependency encryption and decryption using industry-standard AES cryptography paired with Argon2 key derivation. Developers can safely commit encrypted .env.enc files to version control and inject decrypted variables directly into application runtimes.",
    challenge:
      "Building a secure environment encryption utility with zero external dependency bloat to prevent supply chain vulnerabilities while maintaining cross-platform compatibility across Windows, macOS, and Linux.",
    solution:
      "Leveraged native Node.js crypto primitives with Argon2 password hashing and AES-256-GCM authenticated encryption. Designed an intuitive interactive CLI with support for terminal piping and CI/CD secret injection.",
    highlights: [
      "Zero external dependencies for maximum supply-chain security and instant install speed",
      "Industrial-strength AES-256-GCM encryption with Argon2 key derivation",
      "Safe version-control workflow: commit encrypted .env.enc files with total peace of mind",
      "Command-line CLI and programmatic JavaScript/TypeScript runtime import support",
      "Automated decryption in CI/CD pipelines via environment variable passphrases",
    ],
    metrics: [
      { label: "NPM Package", value: "v1.0.1 Live" },
      { label: "External Deps", value: "0 Zero-Bloat" },
      { label: "Encryption", value: "AES-256-GCM" },
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "NPM Package",
      "AES-256-GCM",
      "Argon2",
      "Crypto API",
      "CLI Tooling",
    ],
    liveUrl: "https://www.npmjs.com/package/env-secret",
    githubUrl: "https://github.com/RashedulHaqueRasel1",
    date: "2026",
    role: "Package Author & Maintainer",
    client: "NPM Registry (Public)",
    isPersonal: true,
    isOpenSource: true,
    packageManager: "npm i env-secret",
    npmUrl: "https://www.npmjs.com/package/env-secret",
    badge: "Published NPM Package",
  },
];

/** The first 6 projects to display in the homepage pinned 3D carousel */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 6);

/** Personal projects & open source creations built by the author */
export const PERSONAL_PROJECTS = PROJECTS.filter((p) => p.isPersonal);

/** Published NPM packages */
export const NPM_PACKAGES = PROJECTS.filter((p) => Boolean(p.packageManager));

export function getAllProjects(): ProjectItem[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return PROJECTS.find(
    (p) =>
      p.slug === normalized ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized,
  );
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectItem;
  next: ProjectItem;
} {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  const prevIndex = (safeIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (safeIndex + 1) % PROJECTS.length;
  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex],
  };
}
