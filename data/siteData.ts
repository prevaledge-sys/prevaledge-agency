import type { BlogPost, Service, Project, TeamMember, Testimonial, ServicePricing } from '../types';
import AgentIcon from '../components/icons/AgentIcon';
import MetaverseIcon from '../components/icons/MetaverseIcon';
import PerformanceIcon from '../components/icons/PerformanceIcon';
import SocialIcon from '../components/icons/SocialIcon';
import ContentIcon from '../components/icons/ContentIcon';
import EcommIcon from '../components/icons/EcommIcon';
import SeoIcon from '../components/icons/SeoIcon';
import GeoIcon from '../components/icons/GeoIcon';
import NeuralSignatureIcon from '../components/icons/NeuralSignatureIcon';



export const initialServices: Service[] = [
  {
    id: 'ai-automation',
    icon: AgentIcon,
    title: 'AI & Automation',
    description: 'We deploy custom AI agents and chatbots to automate workflows, enhance customer support, and provide data-driven insights.',
  },
  {
    id: 'website-development',
    icon: MetaverseIcon,
    title: 'Website Development',
    description: 'We build beautiful, high-performance websites and applications using the latest technologies for an exceptional user experience.',
  },
  {
    id: 'perf-marketing',
    icon: PerformanceIcon,
    title: 'Performance Marketing',
    description: 'Leverage our data-driven approach to paid advertising. We optimize your ad spend for maximum ROI across all major platforms.',
  },
  {
    id: 'social-media',
    icon: SocialIcon,
    title: 'Social Media Marketing',
    description: 'We create and manage engaging social media campaigns that build your brand, grow your community, and drive conversions.',
  },
  {
    id: 'content-creation',
    icon: ContentIcon,
    title: 'Content Creation',
    description: 'Utilize our creative team and AI tools to produce high-quality, SEO-friendly text, visual, and video content at scale.',
  },
  {
    id: 'ecomm',
    icon: EcommIcon,
    title: 'E-Commerce Solutions',
    description: 'We design, build, and market powerful e-commerce stores on platforms like Shopify and WooCommerce to boost your online sales.',
  },
  {
    id: 'seo',
    icon: SeoIcon,
    title: 'Search Engine Optimization',
    description: 'Improve your organic visibility on Google. We use proven strategies to rank your website for your most profitable keywords.',
  },
  {
    id: 'local-seo',
    icon: GeoIcon,
    title: 'Local SEO & Reviews',
    description: 'Enhance your local presence on Google Maps and manage your online reputation to attract more local customers.',
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop',
    title: 'QuantumLeap SaaS Platform',
    category: 'Web Application',
    description: 'A comprehensive B2B SaaS platform for data analytics and visualization.',
    detailedDescription: 'We built the QuantumLeap platform from the ground up, focusing on a scalable microservices architecture. The platform allows businesses to connect various data sources, generate insightful reports, and create interactive dashboards to drive decision-making.',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'D3.js'],
  },
  {
    id: 'proj-2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop',
    title: 'Aura Fashion E-Commerce',
    category: 'E-Commerce',
    description: 'A high-fashion e-commerce experience with a focus on visuals and performance.',
    detailedDescription: 'For Aura Fashion, we created a bespoke Shopify Plus theme and integrated a headless CMS for dynamic content management. The result is a lightning-fast, visually stunning online store that provides a seamless shopping experience on any device.',
    techStack: ['Shopify Plus', 'Liquid', 'React', 'Sanity CMS', 'GraphQL', 'Tailwind CSS'],
  },
  {
    id: 'proj-3',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=1470&auto=format&fit=crop',
    title: 'Apex Dental Group Website',
    category: 'Website Development',
    description: 'A professional and user-friendly website for a multi-location dental practice.',
    detailedDescription: 'Apex Dental Group needed a modern web presence to attract new patients. We designed and developed a mobile-first website featuring online appointment booking, patient forms, and detailed service information, all managed through an intuitive CMS.',
    techStack: ['Next.js', 'Vercel', 'Sanity CMS', 'React', 'Styled Components'],
  },
  {
    id: 'proj-4',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1470&auto=format&fit=crop',
    title: 'Synapse B2B Lead Gen',
    category: 'Performance Marketing',
    description: 'A targeted lead generation campaign and landing page ecosystem.',
    detailedDescription: 'Our work with Synapse involved a multi-channel performance marketing strategy, including paid search, social ads, and content marketing. We created a series of high-converting landing pages integrated with HubSpot to capture and nurture leads, resulting in a 150% increase in MQLs.',
    techStack: ['HubSpot CMS', 'Google Ads', 'LinkedIn Ads', 'Hotjar', 'Google Analytics'],
  },
  {
    id: 'proj-5',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    title: 'Nova Financial App',
    category: 'UI/UX Design',
    description: 'UI/UX design for a next-generation mobile fintech application.',
    detailedDescription: 'We partnered with Nova to design their mobile app from concept to high-fidelity prototype. Our process involved user research, wireframing, and creating a comprehensive design system to ensure a beautiful, intuitive, and accessible user experience for managing personal finances.',
    techStack: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'React Native'],
  },
  {
    id: 'proj-6',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop',
    title: 'Helios Energy Dashboard',
    category: 'Data Visualization',
    description: 'An interactive dashboard for monitoring renewable energy production.',
    detailedDescription: 'Helios Energy required a tool to visualize real-time data from their solar and wind farms. We developed a custom web-based dashboard that displays key performance indicators, historical trends, and predictive analytics, empowering them to optimize energy output.',
    techStack: ['Vue.js', 'D3.js', 'Python', 'Flask', 'WebSocket', 'InfluxDB'],
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-5',
    icon: NeuralSignatureIcon,
    name: 'Muskan Pathan',
    title: 'CEO',
    bio: 'Leads the Prevaledge team in delivering exceptional client results, building strategic partnerships, and steering the company\'s growth.'
  },
  {
    id: 'team-1',
    icon: NeuralSignatureIcon,
    name: 'Atul Kumar',
    title: 'Chief Strategist',
    bio: 'Architects the grand strategies that bridge creative vision with technical execution, ensuring Prevaledge delivers results.'
  },
  {
    id: 'team-2',
    icon: NeuralSignatureIcon,
    name: 'Er. Atul Kori',
    title: 'Lead AI Engineer',
    bio: 'Specializes in crafting and integrating custom AI solutions that feel intuitive, human, and genuinely helpful for our clients.'
  },
  {
    id: 'team-3',
    icon: NeuralSignatureIcon,
    name: 'Omkar Vilas Vichare',
    title: 'Head of UX & Design',
    bio: 'Leads our design team to create beautiful, user-centric experiences that are both accessible and highly effective.'
  },
  {
    id: 'team-4',
    icon: NeuralSignatureIcon,
    name: 'Siddhartha Kumar',
    title: 'Lead Full-Stack Developer',
    bio: 'Constructs the secure, scalable web foundations upon which our clients build and grow their digital presence.'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    slug: 'future-of-seo',
    title: 'The Future of SEO: Navigating AI-Powered Search',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'The world of Search Engine Optimization is in the midst of its most significant transformation yet. Discover how to adapt your strategy for the age of AI.',
    author: 'Dr. Evelyn Reed',
    date: 'August 16, 2024',
    content: `The world of Search Engine Optimization is in the midst of its most significant transformation yet. For years, the game was about keywords, backlinks, and technical optimization. While those elements remain important, the rise of powerful generative AI is fundamentally changing how information is surfaced. We're moving from a web of links to a web of answers.\n\n### 1. The Shift to Conversational, Answer-First Results\nGoogle's Search Generative Experience (SGE) and other AI-powered search tools aim to provide direct, synthesized answers to user queries, often eliminating the need to click through to a website. This means "position zero" is now more powerful than ever.\n\n**What this means for you:** Your content must be structured to directly answer questions. Think in terms of entities, topics, and clear, concise information. Use FAQ schema and structure your articles with clear headings that pose and answer common user questions. Your goal is to become a citable source for the AI's answer.\n\n### 2. The Unwavering Importance of E-E-A-T\nIn an AI-driven world, trust is paramount. Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) guidelines are more critical than ever. Search engines need to differentiate between generic, AI-generated content and authentic, expert-led information.\n\n**Practical Steps:**\n1. **Authoritative Authors:** Ensure your content is written by genuine experts. Include author bios with credentials and links to their social profiles.\n2. **Show, Don't Just Tell:** Add your own experiences, case studies, and unique data. This is something generic AI struggles to replicate.\n3. **Build a Trusted Brand:** Secure mentions from reputable sites, gather positive reviews, and ensure your "About Us" page clearly communicates your expertise.\n\n### 3. Technical SEO as the Foundation for AI\nAI can't understand your content if it can't crawl and index it efficiently. A solid technical foundation is non-negotiable.\n\n**Key Focus Areas:**\n- **Structured Data:** Use schema markup to explicitly tell search engines what your content is about. This makes it easier for AI to parse and use your information.\n- **Site Speed:** Core Web Vitals are still a major ranking factor. A fast, responsive site is a quality signal that AI models will likely incorporate.\n- **Logical Site Architecture:** A clean, hierarchical site structure helps crawlers understand the relationship between your pages and establish topical authority.\n\nThe future of SEO isn't about tricking an algorithm; it's about providing the best, most trustworthy, and most accessible information for both humans and the AI assistants that serve them. The fundamentals of creating high-quality, user-centric content have never been more important.`,
    metaTitle: 'The Future of SEO with AI-Powered Search | Prevaledge',
    metaDescription: 'Discover how AI is transforming SEO. Learn to adapt your strategy for Google\'s SGE, E-E-A-T, and the new answer-first web.',
    focusKeyword: 'AI SEO'
  },
  {
    slug: 'local-seo-success',
    title: 'Dominating the Map: A 5-Step Guide to Local SEO Success',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'For businesses with physical locations, local SEO is non-negotiable. Learn how to optimize your presence to attract nearby customers.',
    author: 'Maria Garcia',
    date: 'August 28, 2024',
    content: `For brick-and-mortar businesses, your most valuable customers are often right around the corner. Local SEO is the practice of optimizing your online presence to attract more customers from relevant local searches. Here’s a 5-step guide to get you started.\n\n### 1. Master Your Google Business Profile (GBP)\nYour GBP is the cornerstone of local SEO. It's the information panel that appears in Google Search and on Google Maps. Claiming and fully optimizing it is the single most important step.\n\n**Actionable Checklist:**\n1. **Complete Every Section:** Fill out your business name, address, phone number (NAP), hours, services, products, and categories with 100% accuracy.\n2. **Upload High-Quality Photos:** Add photos of your storefront, interior, products, and team.\n3. **Utilize Google Posts:** Regularly share updates, offers, and events using Google Posts to keep your profile active.\n4. **Answer Questions:** Proactively answer questions in the Q&A section to control the narrative.\n\n### 2. Build Consistent Citations\nCitations are mentions of your business's NAP on other websites, like Yelp, Yellow Pages, and industry-specific directories. Consistency is key. Inconsistent information confuses search engines and erodes trust.\n\n**Strategy:** Use a tool like Moz Local or BrightLocal to audit your existing citations and identify inconsistencies. Then, build out your profile on the most relevant directories for your industry.\n\n### 3. Implement a Proactive Review Strategy\nOnline reviews are a massive ranking factor for local search. They provide social proof to potential customers and signal trust to Google. You need a consistent stream of positive, authentic reviews.\n\n**How to get them:**\n- Ask satisfied customers directly via email or SMS with a link to your GBP.\n- Create small, printed cards with a QR code to your review link.\n- **Crucially:** Respond to ALL reviews, both positive and negative. This shows you are engaged and value customer feedback.\n\n### 4. Optimize Your Website for Local Search\nYour website needs to reinforce the local signals you're sending. This is called on-page local SEO.\n\n**Key Optimizations:**\n- **NAP in Footer:** Ensure your Name, Address, and Phone number are on every page.\n- **Location Pages:** If you have multiple locations, create a dedicated, optimized page for each one.\n- **Local Keywords:** Incorporate keywords like "[service] in [city]" or "[product] near me" naturally into your page titles, headings, and content.\n- **Embed a Google Map:** Embed a map of your location on your contact page.\n\n### 5. Generate Local Backlinks\nBacklinks are still a powerful signal. For local businesses, the most valuable links come from other local websites. This demonstrates community relevance.\n\n**Ideas for local links:**\n- Sponsor a local charity event or sports team.\n- Host a workshop or event and get coverage from local bloggers or news sites.\n- Join your local Chamber of Commerce.\n\nBy systematically working through these five steps, you can significantly improve your visibility in the local search results and drive more foot traffic to your business.`,
    metaTitle: '5-Step Local SEO Guide for Business Success | Prevaledge',
    metaDescription: 'Dominate local search results. Our 5-step guide covers Google Business Profile, citations, reviews, and on-page tactics to attract more local customers.',
    focusKeyword: 'Local SEO'
  },
  {
    slug: 'technical-seo-backbone',
    title: 'Beyond Keywords: Why Technical SEO is Your Website\'s Backbone',
    image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'Great content is useless if search engines can\'t find it. Dive into the critical elements of technical SEO that support all your marketing efforts.',
    author: 'Dr. Evelyn Reed',
    date: 'September 05, 2024',
    content: `Content and keywords often get the spotlight in SEO, but without a strong technical foundation, even the best content can fail to rank. Technical SEO is the practice of optimizing your website's infrastructure to help search engine crawlers find, understand, and index your pages more effectively. It's the invisible backbone that holds your entire SEO strategy up.\n\n### 1. Crawlability and Indexability\nThis is the most fundamental aspect. If Googlebot can't crawl your pages, they won't be indexed, and they certainly won't rank.\n\n**Key Elements:**\n- **robots.txt:** This file tells search engines which pages they should and shouldn't crawl. A misconfiguration here can be catastrophic.\n- **XML Sitemap:** This is a roadmap of your website that you submit to search engines, helping them discover all of your important pages.\n- **Crawl Budget:** For large websites, ensuring that search engines spend their limited crawl time on your most important pages is crucial.\n\n### 2. Site Speed and Core Web Vitals\nPage experience is a confirmed Google ranking factor. A slow, clunky website will not only frustrate users but also hurt your search rankings.\n\n**The Core Web Vitals are:**\n1. **Largest Contentful Paint (LCP):** How long it takes for the main content of a page to load.\n2. **First Input Delay (FID) / Interaction to Next Paint (INP):** How long it takes for a page to become interactive.\n3. **Cumulative Layout Shift (CLS):** How much the page layout unexpectedly moves around during loading.\n\nOptimizing images, using modern code, and choosing a good hosting provider are essential for scoring well on these metrics.\n\n### 3. Structured Data (Schema Markup)\nStructured data is a standardized format for providing information about a page and classifying its content. It's like adding labels to your data so search engines can understand it without ambiguity.\n\n**Why it matters:** Schema markup can lead to "rich snippets" in search results—like star ratings, event details, or FAQ dropdowns. These make your listing more eye-catching and can significantly improve your click-through rate (CTR).\n\n### 4. Secure and Accessible URL Structure\nYour website's architecture should be logical and easy for both users and crawlers to understand.\n\n**Best Practices:**\n- **HTTPS:** Your site must be secure. This is a baseline requirement now.\n- **Clean URL Structure:** Use simple, readable URLs that include keywords (e.g., 'yourdomain.com/services/local-seo' is better than 'yourdomain.com/p?id=123').\n- **Internal Linking:** A strong internal linking strategy helps spread link equity throughout your site and shows search engines the relationship between your pages.\n\nTechnical SEO is not a one-time fix. It requires ongoing monitoring and maintenance. But by investing in a solid technical foundation, you ensure that all your other marketing efforts—from content creation to paid ads—are built on solid ground.`,
    metaTitle: 'Why Technical SEO is the Backbone of Your Website | Prevaledge',
    metaDescription: 'Learn why technical SEO is critical. We cover crawlability, Core Web Vitals, structured data, and more essentials for ranking success.',
    focusKeyword: 'Technical SEO'
  },
  {
    slug: 'ai-marketing-automation',
    title: '5 Ways to Automate Your Marketing with Custom AI Agents',
    image: 'https://images.unsplash.com/photo-1620712943543-26fc7631b818?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'Go beyond basic chatbots. Discover how custom AI agents can revolutionize your lead nurturing, content creation, and customer segmentation.',
    author: 'Alex Maxwell',
    date: 'August 10, 2024',
    content: `Marketing automation isn't new, but the introduction of sophisticated AI agents has elevated it from simple "if-then" workflows to intelligent, autonomous systems. These agents can reason, adapt, and execute complex tasks, freeing up your team to focus on high-level strategy. Here are five practical ways to deploy them.\n\n### 1. The Intelligent Lead Qualification Agent\nInstead of a static form, imagine an AI agent that engages potential leads on your website in a natural conversation. It can ask clarifying questions, understand nuanced answers, and score the lead in real-time based on your ideal customer profile.\n\n**How it works:** This agent integrates with your CRM. Once a lead score crosses a certain threshold, it can automatically book a meeting on a sales rep's calendar or assign them for immediate follow-up, complete with a summary of the conversation.\n\n### 2. The Hyper-Personalization Content Agent\nThis AI agent analyzes a user's browsing behavior, purchase history, and CRM data to dynamically assemble and send hyper-personalized emails or even generate personalized landing pages. It moves beyond just inserting a **FIRST_NAME** tag.\n\n**Example:** An e-commerce customer who previously bought running shoes might receive an email featuring new trail running shoes, a curated blog post about local hiking trails, and a personalized discount code, all generated and sent autonomously.\n\n### 3. The Social Media Monitoring & Engagement Agent\nThis agent constantly scans social media platforms for mentions of your brand, competitors, and relevant keywords. It can categorize mentions by sentiment (positive, negative, neutral) and even draft context-aware replies for your approval.\n\n**Advanced Use:** It can identify potential user-generated content (UGC) and automatically reach out to the creator for permission to use it, streamlining your social proof pipeline.\n\n### 4. The SEO Content Brief Agent\nBefore your writers even start, this AI agent can perform a full SERP analysis for a target keyword. It identifies top-ranking competitors, analyzes their content structure, finds common questions people are asking (People Also Ask), and generates a comprehensive content brief.\n\n**What it includes:** The brief contains a recommended word count, target keywords, semantic keywords (LSI), a suggested heading structure, and internal linking opportunities, cutting research time by hours.\n\n### 5. The Predictive A/B Testing Agent\nTraditional A/B testing can be slow. A predictive agent uses a multi-armed bandit approach to dynamically allocate more traffic to the winning variation of an ad or landing page in real-time, rather than waiting for statistical significance in a fixed 50/50 split. This maximizes conversions during the testing period itself, saving you money and getting you results faster.`,
    metaTitle: '5 Ways to Use Custom AI Agents for Marketing Automation',
    metaDescription: 'Explore 5 powerful ways to automate your marketing using custom AI agents, from lead qualification and content personalization to SEO and A/B testing.',
    focusKeyword: 'AI Marketing Automation'
  },
  {
    slug: 'ecommerce-seo-strategies',
    title: 'From Clicks to Carts: Essential E-commerce SEO Strategies',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'Driving organic traffic to an online store requires a specialized approach. Master these e-commerce SEO tactics to boost your sales.',
    author: 'Sam Chen',
    date: 'September 12, 2024',
    content: `E-commerce SEO is a unique discipline. Unlike a blog or a service site, you're dealing with hundreds or thousands of product pages, complex navigation, and a direct line to revenue. Mastering e-commerce SEO means turning searchers into shoppers.\n\n### 1. Optimize Your Product Pages\nYour product pages are your most important landing pages. Each one needs to be a perfectly optimized conversion machine.\n\n**Key Elements:**\n- **Unique Descriptions:** Never use manufacturer descriptions. Write unique, compelling copy that highlights benefits and includes your target keywords.\n- **High-Quality Images/Videos:** Use multiple high-resolution images and videos with optimized alt text.\n- **Product Schema:** Implement product schema to get rich snippets like price, availability, and reviews right in the search results.\n- **Customer Reviews:** Encourage and display customer reviews. They are powerful for both social proof and SEO.\n\n### 2. Structure Your Site for Search and UX\nA logical site architecture is crucial for e-commerce. Users need to be able to find products easily, and so do search engine crawlers.\n\n**Best Practices:**\n1. **Keep it Simple:** Aim for a structure where any product is no more than three clicks away from the homepage.\n2. **Logical Category Pages:** Create well-defined category and sub-category pages. These are excellent pages to target broader keywords (e.g., "men's running shoes").\n3. **Breadcrumbs:** Use breadcrumb navigation to help users and search engines understand where they are in your site's hierarchy.\n\n### 3. Handle Faceted Navigation Correctly\nFaceted navigation (the filters for size, color, brand, etc.) is great for users but can create a nightmare for SEO by generating a massive number of URLs with duplicate content. This can dilute your ranking signals and waste crawl budget.\n\n**The Solution:** You need to control how Google crawls these filtered URLs. The best approach is often to use a combination of 'rel="canonical"' tags to point to the main category page and blocking faceted URLs in your 'robots.txt' file to prevent crawling of less important combinations.\n\n### 4. Create Content to Support Your Products\nDon't just rely on your product and category pages. Build out a content strategy that supports your products and targets informational keywords that your customers are searching for.\n\n**Content Ideas:**\n- **Buying Guides:** "How to Choose the Best Hiking Boots"\n- **Comparison Posts:** "Product A vs. Product B: Which is Right for You?"\n- **"How-To" Articles:** "How to Care for Your Leather Jacket"\n\nThis type of content attracts top-of-funnel traffic, builds your brand authority, and provides excellent internal linking opportunities back to your product pages.\n\nBy focusing on these core e-commerce SEO strategies, you can build a powerful organic traffic engine that drives consistent, qualified customers to your online store.`,
    metaTitle: 'Essential E-commerce SEO Strategies to Boost Sales | Prevaledge',
    metaDescription: 'Turn clicks into carts with our expert e-commerce SEO guide. Learn to optimize product pages, site structure, and content to drive organic sales.',
    focusKeyword: 'E-commerce SEO'
  },
  {
    slug: 'ux-costing-sales',
    title: 'The Silent Killer: 3 Ways Poor UX Is Costing You Sales',
    image: 'https://images.unsplash.com/photo-1583336663270-f7d9c34f3b75?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'Your marketing is driving traffic, but are your conversion rates flat? Your website\'s user experience might be the culprit. Here’s where to look.',
    author: 'Sam Chen',
    date: 'July 22, 2024',
    content: `You can have the best product and the most brilliant marketing campaign in the world, but if your website is frustrating to use, you are leaving money on the table. Poor User Experience (UX) is a silent conversion killer that creates friction, erodes trust, and sends potential customers straight to your competitors. Here are three of the most common—and costly—UX mistakes.\n\n### 1. A Slow and Clunky Page Experience\nIn an age of instant gratification, speed is everything. Slow-loading pages are a primary driver of abandonment.\n\n**The Data:** According to Google, the probability of a user bouncing increases by **32%** as page load time goes from 1 to 3 seconds. At 5 seconds, it jumps to **90%**.\n\nThis isn't just about your homepage. Think about the entire journey. Slow-loading product images, a laggy checkout process, or unstable layouts that cause users to mis-click (Cumulative Layout Shift) all contribute to a poor experience and lost revenue. Optimizing images, leveraging browser caching, and minimizing code are not just technical tasks; they are critical business investments.\n\n### 2. Confusing and Inconsistent Navigation\n"I can't find what I'm looking for." If your users are saying this, you have a major navigation problem. Ambiguous labels, hidden menus (especially on desktop), and inconsistent design patterns force users to think too much. The more cognitive load you place on a user, the more likely they are to give up.\n\n**How to fix it:**\n1. **Use Clear, Conventional Labels:** Don't get clever. "Products" is better than "Creations." "Contact Us" is better than "Get in Touch."\n2. **Provide a Clear Path:** Use breadcrumbs to show users where they are. Ensure your search bar is prominent and provides relevant results.\n3. **Maintain Consistency:** Your header, footer, and key calls-to-action should look and behave the same way across every single page.\n\n### 3. High-Friction Forms and Checkout Processes\nThis is where the user is ready to give you their money or information, and it's the worst possible place to introduce friction. Long forms, asking for unnecessary information, a lack of payment options, or forcing account creation are all massive conversion killers.\n\n**The Baymard Institute** found that **18%** of users abandon their cart because of a checkout process that is too long or complicated.\n\n**Streamline your process:**\n- Only ask for essential information.\n- Offer a guest checkout option.\n- Clearly display trust signals like security badges and return policies.\n- Provide multiple payment options (Credit Card, PayPal, Apple Pay, etc.).\n\nFixing these UX issues isn't about a cosmetic redesign. It's about removing barriers between your customer and the solution they came to you for. Every piece of friction you remove is a direct investment in your bottom line.`,
    metaTitle: '3 Ways Poor UX Is Costing You Sales (and How to Fix It)',
    metaDescription: 'Is your website\'s user experience killing your conversions? Learn how slow pages, confusing navigation, and friction-filled forms are costing you sales.',
    focusKeyword: 'Poor UX'
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Prevaledge transformed our online presence. Their SEO strategy doubled our organic traffic in just six months. Their team is knowledgeable, responsive, and truly a partner in our growth.",
    name: "Jessica Chen",
    title: "Marketing Director",
    company: "QuantumLeap SaaS",
  },
  {
    id: 'test-2',
    quote: "The AI chatbot they developed for us has been a game-changer. It handles over 70% of our customer inquiries, freeing up our support team to focus on complex issues. The ROI was immediate.",
    name: "Michael Rodriguez",
    title: "VP of Operations",
    company: "Aura Fashion",
  },
  {
    id: 'test-3',
    quote: "Working with Prevaledge on our new website was a fantastic experience. They delivered a beautiful, high-performance site on time and on budget. Our conversion rates have increased by 40%.",
    name: "Sarah Johnson",
    title: "Founder",
    company: "Apex Dental Group",
  },
   {
    id: 'test-4',
    quote: "Their performance marketing team is second to none. They optimized our ad spend across multiple platforms and lowered our cost-per-acquisition by a staggering 60%. Highly recommended.",
    name: "David Kim",
    title: "CEO",
    company: "Synapse B2B",
  },
];

export const initialServicePricingData: ServicePricing[] = [
  {
    id: 'sp-1',
    serviceTitle: 'Search Engine Optimization',
    icon: SeoIcon,
    plans: [
      {
        id: 'plan-seo-1',
        name: 'Starter SEO',
        price: '$499',
        priceDetail: '/mo',
        description: 'Establish your search presence and build a foundation for growth.',
        features: ['On-Page SEO', 'Technical SEO Audit', 'Keyword Research (50 keywords)', 'Local SEO Setup (GBP)', 'Monthly Reporting'],
      },
      {
        id: 'plan-seo-2',
        name: 'Growth SEO',
        price: '$999',
        priceDetail: '/mo',
        description: 'For businesses aiming to increase rankings and organic traffic.',
        features: ['Everything in Starter, plus:', 'Backlink Building (5 links/mo)', 'Competitor Analysis', 'Schema Markup Implementation', 'Review Management'],
        isPopular: true,
      },
      {
        id: 'plan-seo-3',
        name: 'Scale SEO',
        price: 'Custom',
        description: 'A comprehensive strategy for dominating the search results.',
        features: ['Everything in Growth, plus:', 'Advanced Technical SEO', 'E-commerce SEO', 'Content Strategy & Briefs', 'Dedicated SEO Strategist'],
      },
    ],
  },
  {
    id: 'sp-2',
    serviceTitle: 'Website Development',
    icon: MetaverseIcon,
    plans: [
      {
        id: 'plan-web-1',
        name: 'Basic Site',
        price: '$2,500',
        priceDetail: 'one-time',
        description: 'A professional landing page or brochure site to get you online.',
        features: ['5-Page Website', 'Mobile-Responsive Design', 'Contact Form', 'Basic SEO Setup', '1 Month Support'],
      },
      {
        id: 'plan-web-2',
        name: 'Business Site',
        price: '$6,000',
        priceDetail: 'one-time',
        description: 'A comprehensive, feature-rich website for growing businesses.',
        features: ['Everything in Basic, plus:', 'Up to 15 Pages', 'CMS Integration (Sanity, etc.)', 'Blog/Portfolio Functionality', '3 Months Support'],
        isPopular: true,
      },
      {
        id: 'plan-web-3',
        name: 'Enterprise Site',
        price: 'Custom',
        description: 'Bespoke web applications with complex integrations.',
        features: ['Everything in Business, plus:', 'Custom Web Application', 'Third-Party API Integrations', 'Advanced Functionality', 'Ongoing Maintenance Plan'],
      },
    ],
  },
  {
    id: 'sp-3',
    serviceTitle: 'E-commerce Solutions',
    icon: EcommIcon,
    plans: [
      {
        id: 'plan-ecom-1',
        name: 'Store Launch',
        price: '$4,500',
        priceDetail: 'one-time',
        description: 'Launch your online store with a powerful and beautiful setup.',
        features: ['Shopify/WooCommerce Setup', 'Custom Theme Configuration', 'Up to 50 Products', 'Payment Gateway Integration', 'Mobile Optimized Design'],
      },
      {
        id: 'plan-ecom-2',
        name: 'Growth Store',
        price: '$8,500',
        priceDetail: 'one-time',
        description: 'For established sellers needing advanced features and optimization.',
        features: ['Everything in Launch, plus:', 'Up to 200 Products', 'Advanced Features (e.g., Subscriptions)', 'E-commerce SEO Setup', 'CRM Integration'],
        isPopular: true,
      },
      {
        id: 'plan-ecom-3',
        name: 'Headless Commerce',
        price: 'Custom',
        description: 'Ultimate performance and flexibility with a headless architecture.',
        features: ['Everything in Growth, plus:', 'Headless Architecture (Next.js/Shopify)', 'Custom System Integrations', 'PIM Setup & Integration', 'Dedicated Project Manager'],
      },
    ],
  },
  {
    id: 'sp-4',
    serviceTitle: 'Performance Marketing',
    icon: PerformanceIcon,
    plans: [
      {
        id: 'plan-perf-1',
        name: 'Launch Ads',
        price: '$750',
        priceDetail: '/mo + ad spend',
        description: 'Get started with paid advertising on one major platform.',
        features: ['1 Ad Platform (Google/Meta)', 'Campaign Setup & Management', 'Audience Targeting', 'Ad Copy Creation', 'Weekly Reporting'],
      },
      {
        id: 'plan-perf-2',
        name: 'Accelerate Ads',
        price: '$1,500',
        priceDetail: '/mo + ad spend',
        description: 'Expand your reach and optimize performance across channels.',
        features: ['Everything in Launch, plus:', 'Up to 2 Ad Platforms', 'A/B Testing & Optimization', 'Remarketing Campaigns', 'Custom Dashboards'],
        isPopular: true,
      },
      {
        id: 'plan-perf-3',
        name: 'Dominate Ads',
        price: 'Custom',
        description: 'A full-funnel, multi-channel strategy for aggressive growth.',
        features: ['Everything in Accelerate, plus:', 'Multi-channel Strategy (incl. TikTok)', 'Programmatic Advertising', 'Landing Page Optimization (CRO)', 'Dedicated Strategist'],
      },
    ],
  },
  {
    id: 'sp-5',
    serviceTitle: 'Social & Content',
    icon: SocialIcon,
    plans: [
      {
        id: 'plan-social-1',
        name: 'Engage',
        price: '$600',
        priceDetail: '/mo',
        description: 'Build and engage your community on your most important platforms.',
        features: ['2 Social Platforms', '12 Posts per month', 'Community Management', 'Monthly Content Calendar', 'Basic Performance Reporting'],
      },
      {
        id: 'plan-social-2',
        name: 'Create',
        price: '$1,200',
        priceDetail: '/mo',
        description: 'A complete content and social media solution for brand growth.',
        features: ['Everything in Engage, plus:', '3 Social Platforms', '20 Posts per month', '2 Blog Articles (800 words)', 'Custom Graphics for Posts'],
        isPopular: true,
      },
      {
        id: 'plan-social-3',
        name: 'Influence',
        price: 'Custom',
        description: 'Become a thought leader with a comprehensive content strategy.',
        features: ['Everything in Create, plus:', 'Video Content (2 short-form/mo)', 'Influencer Outreach', 'Full Content Funnel Strategy', 'Dedicated Content Manager'],
      },
    ],
  },
  {
    id: 'sp-6',
    serviceTitle: 'AI & Automation',
    icon: AgentIcon,
    plans: [
      {
        id: 'plan-ai-1',
        name: 'Starter Bot',
        price: '$500',
        priceDetail: '/mo',
        description: 'Deploy an intelligent chatbot to handle inquiries and capture leads.',
        features: ['1 AI Chatbot', 'Website Integration', 'Basic FAQ Automation', 'Lead Capture Forms', 'Monthly Performance Report'],
      },
      {
        id: 'plan-ai-2',
        name: 'Advanced Automation',
        price: '$1,200',
        priceDetail: '/mo',
        description: 'Automate internal workflows and enhance customer support.',
        features: ['Everything in Starter Bot, plus:', 'CRM Integration', 'Internal Workflow Automation (2)', 'Advanced Customer Support AI', 'Custom Scripts'],
        isPopular: true,
      },
      {
        id: 'plan-ai-3',
        name: 'Custom AI Solution',
        price: 'Custom',
        description: 'Bespoke AI solutions, custom models, and full system integration.',
        features: ['Everything in Advanced, plus:', 'Custom AI Model Development', 'API & Systems Integration', 'Dedicated AI Strategist', 'Full Data Analysis'],
      },
    ],
  },
  {
    id: 'local-seo',
    serviceTitle: 'Local SEO & Reviews',
    icon: GeoIcon,
    plans: [
      {
        id: 'plan-local-seo-1',
        name: 'Local Starter',
        price: '$299',
        priceDetail: '/mo',
        description: 'Establish your local online presence.',
        features: ['Google Business Profile Optimization', 'Local Citation Building (10/mo)', 'Basic Review Monitoring', 'Monthly Reporting'],
      },
      {
        id: 'plan-local-seo-2',
        name: 'Local Growth',
        price: '$599',
        priceDetail: '/mo',
        description: 'Attract more local customers and manage your reputation.',
        features: ['Everything in Local Starter, plus:', 'Advanced GBP Management', 'Local Citation Building (25/mo)', 'Proactive Review Generation Strategy', 'Competitor Local Analysis'],
        isPopular: true,
      },
      {
        id: 'plan-local-seo-3',
        name: 'Local Domination',
        price: 'Custom',
        description: 'Dominate your local market with a comprehensive strategy.',
        features: ['Everything in Local Growth, plus:', 'Hyperlocal Content Strategy', 'Advanced Review Management & Response', 'Local Link Building', 'Dedicated Local SEO Specialist'],
      },
    ],
  },
];