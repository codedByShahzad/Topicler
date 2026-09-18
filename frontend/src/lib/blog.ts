export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogSection = {
  id: string; // used for TOC + anchors
  title: string;
  content: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string; // online image URL
  category: string;
  publishDate: string; // human readable
  readingTime: string;
  guideLabel: string;
  guideValue: string;
  sections: BlogSection[];
  relatedSlugs: string[];

  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string;
  publishISO?: string;
  canonicalPath?: string;
};

export const BLOGS: BlogPost[] = [
  // =========================================================
  // 1) AI IN HEALTHCARE
  // =========================================================
  {
    slug: "ai-in-healthcare",
    title: "The Rise of Artificial Intelligence in Healthcare",
    subtitle:
      "How AI is reshaping diagnosis, workflows, research, and preventive care — explained clearly.",
    heroImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2400&auto=format&fit=crop",
    category: "Health",
    publishDate: "October 15, 2025",
    publishISO: "2025-10-15T00:00:00.000Z",
    readingTime: "12 min",
    guideLabel: "This guide",
    guideValue: "Clear concepts + practical context",
    canonicalPath: "/blog/ai-in-healthcare",
    seoTitle: "AI in Healthcare: Use Cases, Risks & Future (Clear Guide) | Numoro",
    seoDescription:
      "Learn how AI is used in healthcare: imaging, workflows, prediction, privacy, ethics, and what the future looks like — explained in simple terms.",
    keywords: [
      "AI in healthcare",
      "medical AI",
      "clinical workflows",
      "medical imaging AI",
      "healthcare data privacy",
      "AI ethics",
      "predictive analytics healthcare",
      "Numoro blog",
    ],
    ogImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          {
            type: "p",
            text: "Artificial Intelligence (AI) is quickly becoming a real tool in healthcare — not as a sci-fi replacement for doctors, but as a layer that supports faster decisions and reduces repetitive work. Hospitals and clinics generate huge amounts of information every day: notes, lab results, scans, prescriptions, and monitoring signals. AI helps organize that information so teams can focus on what matters most.",
          },
          {
            type: "p",
            text: "When people say “AI in healthcare,” they usually mean one of two things: models that find patterns, such as detecting abnormalities in images, and models that process language, such as summarizing clinical notes. Both can be helpful, but they come with constraints: data quality, bias, privacy, and the need for validation in real clinical settings.",
          },
          {
            type: "p",
            text: "In this blog, we’ll break down the most common AI use cases, what benefits they bring, what risks to watch for, and how to evaluate claims responsibly. The goal is clarity: you should be able to tell the difference between useful AI and marketing buzz.",
          },
        ],
      },
      {
        id: "ai-basics",
        title: "Artificial Intelligence (AI) Basics",
        content: [
          { type: "h3", text: "What AI actually does in healthcare" },
          {
            type: "p",
            text: "In practical terms, AI systems learn from past examples. If a model sees thousands of labeled X-rays, it can learn patterns that correlate with conditions. If it sees many clinical notes, it can learn how medical language is structured and generate summaries or extract key fields.",
          },
          {
            type: "p",
            text: "Most healthcare AI is not “general intelligence.” It is typically narrow: built for a specific task such as triage, screening, transcription, coding assistance, or risk scoring. That narrow focus is a strength because it makes validation more realistic — you can measure performance on one task with clear metrics.",
          },
          {
            type: "p",
            text: "A useful way to think of AI is: it predicts or ranks. It predicts the probability of something being true, or ranks which items need attention first. The safest systems keep a human in the loop and show what evidence influenced the output.",
          },
        ],
      },
      {
        id: "clinical-workflows",
        title: "AI in Clinical Workflows",
        content: [
          {
            type: "p",
            text: "Clinical work is full of repeated steps: documenting symptoms, summarizing patient history, ordering tests, reviewing results, and planning follow-ups. AI can help by reducing documentation time and helping clinicians find relevant information faster, especially in long patient histories.",
          },
          {
            type: "p",
            text: "One of the most impactful areas is clinical documentation support, where AI drafts summaries or extracts structured data such as problem lists, medications, and allergies from unstructured notes. This can reduce cognitive load — but only if clinicians can quickly verify and correct the output.",
          },
          {
            type: "p",
            text: "A common risk is silent errors: if an AI summary sounds confident but misses a critical detail, it can mislead. That’s why workflow design matters. The best implementations make it easy to trace the summary back to original sources and require confirmation for high-risk decisions.",
          },
        ],
      },
      {
        id: "medical-imaging",
        title: "Medical Imaging & Diagnostics",
        content: [
          {
            type: "p",
            text: "Medical imaging is one of the earliest and strongest domains for AI because images are naturally suited for pattern recognition. Models can flag areas of concern in X-rays, CT scans, MRIs, and pathology slides — often helping radiologists prioritize studies that likely contain urgent findings.",
          },
          {
            type: "p",
            text: "AI systems in imaging are commonly used as second readers. Instead of replacing experts, they surface possibilities: a suspicious lesion, a potential bleed, or a pattern that deserves a closer look. This can help reduce missed findings and improve throughput during high-volume periods.",
          },
          {
            type: "p",
            text: "However, imaging AI must be validated across different machines, patient populations, and clinical settings. A model trained on one hospital’s data may perform worse elsewhere due to differences in equipment, protocols, or demographics. Real-world monitoring is essential — performance is not static.",
          },
        ],
      },
      {
        id: "predictive-analytics",
        title: "Predictive Analytics & Disease Prevention",
        content: [
          {
            type: "p",
            text: "Predictive analytics estimates risk based on patterns in historical data. In healthcare, this often means predicting events like readmission, deterioration, complications, or likelihood of a diagnosis. When used carefully, risk scoring helps teams allocate attention where it’s most needed.",
          },
          {
            type: "p",
            text: "Prevention is the long-term value: if you can identify high risk earlier, you can intervene sooner with follow-ups, education, monitoring, and support. For example, predicting risk of uncontrolled diabetes can trigger early outreach, improving outcomes and reducing emergency visits.",
          },
          {
            type: "p",
            text: "The key is calibration and fairness. A model might look accurate overall but systematically underestimate risk for certain groups if the training data underrepresents them. Good healthcare AI requires subgroup testing, transparent validation, and ongoing adjustments as populations change.",
          },
        ],
      },
      {
        id: "drug-discovery",
        title: "Drug Discovery & Research",
        content: [
          {
            type: "p",
            text: "Research workflows are data-heavy: genomics, protein structures, trial results, and massive biomedical corpuses. AI helps sift through this information faster, highlight promising hypotheses, and reduce the cost of exploring candidate molecules.",
          },
          {
            type: "p",
            text: "In drug discovery, models can suggest molecules with certain properties, predict binding affinity, or identify patterns in biological pathways. While AI doesn’t invent cures alone, it can shorten the early exploration cycle and help researchers focus on the most promising paths.",
          },
          {
            type: "p",
            text: "Clinical validation remains the hard part. A molecule that looks good in simulation still has to pass lab tests, safety evaluations, and trials. AI improves efficiency, but it doesn’t eliminate the need for rigorous scientific methods and careful interpretation of results.",
          },
        ],
      },
      {
        id: "privacy-security",
        title: "Data Privacy & Security",
        content: [
          {
            type: "p",
            text: "Healthcare data is highly sensitive, so privacy isn’t optional — it’s foundational. AI systems often require access to clinical records, which means secure storage, strong access controls, and careful handling of identifiers and personal information.",
          },
          {
            type: "p",
            text: "A major risk is unintended exposure through training data, logging, or third-party integrations. Systems should follow least-privilege access and ensure audit trails exist for who accessed what and why. When possible, de-identification and data minimization reduce risk.",
          },
          {
            type: "p",
            text: "Privacy also connects to trust. Patients and clinicians need confidence that data is used responsibly. Clear policies, transparent consent, and thoughtful product design help ensure AI benefits don’t come at the cost of safety or ethics.",
          },
        ],
      },
      {
        id: "ethics-and-bias",
        title: "Ethics, Bias & Accountability",
        content: [
          {
            type: "p",
            text: "Healthcare is high-stakes, so AI must be evaluated for bias, fairness, and safety. If a model performs better for one population than another, it can widen health gaps. Ethical AI means testing across demographics and documenting limitations clearly.",
          },
          {
            type: "p",
            text: "Accountability matters: if an AI output influences a decision, there must be clarity on who is responsible. The safest systems don’t hide behind the idea that the model said so. They support evidence-based reasoning and allow clinicians to override outputs easily.",
          },
          {
            type: "p",
            text: "Finally, ethical design includes usability. If AI adds extra steps, clinicians might ignore it; if it hides uncertainty, users might over-trust it. Strong systems communicate confidence levels and encourage verification — especially for high-impact decisions.",
          },
        ],
      },
      {
        id: "future",
        title: "The Future of AI in Healthcare",
        content: [
          {
            type: "p",
            text: "The future is less about flashy demos and more about workflow integration: AI that quietly helps triage, speeds documentation, reduces administrative friction, and improves monitoring — all while maintaining safety standards.",
          },
          {
            type: "p",
            text: "We’ll likely see more assistive copilots embedded into clinical systems, plus improved interoperability so data can move safely between tools. Regulation and standards will continue to mature, pushing developers to prove performance and maintain auditability.",
          },
          {
            type: "p",
            text: "The best outcomes will come from collaboration: clinicians defining the problems, researchers validating solutions, and builders creating interfaces that support real-world constraints. AI will be most valuable where it saves time and reduces errors without adding complexity.",
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          {
            type: "p",
            text: "AI is already improving healthcare — but it works best as support, not replacement. It can reduce noise, speed workflows, and highlight risks earlier when it’s validated, transparent, and designed around clinician oversight.",
          },
          {
            type: "p",
            text: "If you evaluate healthcare AI, prioritize evidence over hype: look for real-world validation, subgroup performance, and clear limitations. The most trustworthy tools communicate uncertainty and focus on practical impact.",
          },
          {
            type: "p",
            text: "As AI adoption grows, clarity becomes even more important. When systems are built responsibly, they can help healthcare become faster, safer, and more consistent — while keeping humans in control of high-stakes decisions.",
          },
        ],
      },
    ],
    relatedSlugs: [
      "compound-interest-made-simple",
      "bmi-explained",
      "cybersecurity-for-beginners",
    ],
  },
// =========================================================
// 1) MODERN DEMOCRACY
// =========================================================
{
  slug: "modern-democracy-explained",
  title: "Modern Democracy Explained: Systems, Strengths & Challenges",
  subtitle:
    "A clear breakdown of how modern democracies function, evolve, and face new challenges in a globalized world.",
  heroImage:
    "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2400&auto=format&fit=crop",
  category: "Politics",
  publishDate: "March 20, 2026",
  publishISO: "2026-03-20T00:00:00.000Z",
  readingTime: "12 min",
  guideLabel: "This guide",
  guideValue: "Clear concepts + real-world context",
  canonicalPath: "/blog/modern-democracy-explained",
  seoTitle:
    "Modern Democracy Explained: Systems, Challenges & Future | Topicler",
  seoDescription:
    "Understand how modern democracies work, their strengths, weaknesses, and how they are evolving in the digital age.",
  keywords: [
    "modern democracy",
    "political systems",
    "democracy challenges",
    "global politics",
    "elections",
    "governance",
  ],
  ogImage:
    "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2400&auto=format&fit=crop",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Democracy remains one of the most widely adopted systems of governance in the modern world. At its core, it is built on the idea that citizens have the power to choose their leaders and influence decisions that shape society. While the concept is simple, the implementation varies significantly across countries.",
        },
        {
          type: "p",
          text: "Modern democracies operate within complex frameworks involving institutions, constitutions, and electoral systems. These systems are designed to balance power, prevent abuse, and ensure accountability. However, they are constantly tested by political polarization, misinformation, and global pressures.",
        },
        {
          type: "p",
          text: "This blog explores how democracy works today, the challenges it faces, and what the future may hold in an increasingly connected world.",
        },
      ],
    },
    {
      id: "foundations",
      title: "Foundations of Democracy",
      content: [
        { type: "h3", text: "Key Principles" },
        {
          type: "p",
          text: "Modern democracy is built on principles such as free elections, rule of law, individual rights, and separation of powers. These elements ensure that authority is not concentrated in a single entity and that citizens have a voice.",
        },
        {
          type: "p",
          text: "Institutions like legislatures, courts, and independent media play a crucial role in maintaining democratic balance. Without these, democracy risks becoming unstable or ineffective.",
        },
        {
          type: "p",
          text: "Transparency and accountability are essential for public trust. Governments must operate in ways that allow citizens to evaluate their performance and make informed decisions.",
        },
      ],
    },
    {
      id: "challenges",
      title: "Challenges Facing Modern Democracies",
      content: [
        {
          type: "p",
          text: "One of the biggest challenges is political polarization. As societies become more divided, compromise becomes harder, leading to gridlock and reduced effectiveness of governance.",
        },
        {
          type: "p",
          text: "Misinformation, especially through digital platforms, has also become a significant concern. False narratives can influence public opinion and undermine trust in institutions.",
        },
        {
          type: "p",
          text: "Additionally, economic inequality can weaken democratic systems by creating disparities in influence and access to opportunities.",
        },
      ],
    },
    {
      id: "future",
      title: "The Future of Democracy",
      content: [
        {
          type: "p",
          text: "Technology will play a major role in shaping the future of democracy. From digital voting systems to AI-driven policy analysis, innovation has the potential to improve efficiency and participation.",
        },
        {
          type: "p",
          text: "However, these advancements must be implemented carefully to avoid security risks and ensure fairness.",
        },
        {
          type: "p",
          text: "The future of democracy depends on adaptability, civic engagement, and a commitment to core values that prioritize people over power.",
        },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: [
        {
          type: "p",
          text: "Democracy is not a static system — it evolves with society. While it faces challenges, its fundamental principles remain relevant and powerful.",
        },
        {
          type: "p",
          text: "By strengthening institutions and encouraging informed participation, democracies can continue to thrive in a changing world.",
        },
      ],
    },
  ],
  relatedSlugs: [],
},

// =========================================================
// 2) GLOBAL POLITICS
// =========================================================
{
  slug: "global-politics-power-shift",
  title: "Global Politics: The Shifting Balance of Power",
  subtitle:
    "How economic growth, alliances, and geopolitics are reshaping global influence.",
  heroImage:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2400",
  category: "Politics",
  publishDate: "March 18, 2026",
  publishISO: "2026-03-18T00:00:00.000Z",
  readingTime: "11 min",
  guideLabel: "This guide",
  guideValue: "Global perspective",
  canonicalPath: "/blog/global-politics-power-shift",
  seoTitle: "Global Politics & Power Shifts Explained | Topicler",
  seoDescription:
    "Explore how global power is shifting due to economics, technology, and international relations.",
  keywords: ["global politics", "geopolitics", "power shift", "international relations"],
  ogImage:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2400",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Global politics is constantly evolving as nations compete for influence and resources. Power is no longer concentrated in a few countries, but distributed across emerging economies and alliances.",
        },
        {
          type: "p",
          text: "Economic growth, technological innovation, and diplomatic strategies all play a role in shaping global dynamics.",
        },
      ],
    },
    {
      id: "power",
      title: "Power Dynamics",
      content: [
        {
          type: "p",
          text: "Countries gain influence through economic strength, military capability, and soft power such as culture and diplomacy.",
        },
      ],
    },
    {
      id: "alliances",
      title: "International Alliances",
      content: [
        {
          type: "p",
          text: "Alliances help nations collaborate on trade, security, and global issues, but they also create complex dependencies.",
        },
      ],
    },
    {
      id: "future",
      title: "Future Outlook",
      content: [
        {
          type: "p",
          text: "The balance of power will continue shifting as new technologies and economic trends reshape the global landscape.",
        },
      ],
    },
  ],
  relatedSlugs: [],
},

// =========================================================
// 3) ELECTION SYSTEMS
// =========================================================
{
  slug: "how-elections-work",
  title: "How Elections Work: A Complete Guide",
  subtitle:
    "Understanding voting systems, electoral processes, and their impact on governance.",
  heroImage:
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2400",
  category: "Politics",
  publishDate: "March 17, 2026",
  publishISO: "2026-03-17T00:00:00.000Z",
  readingTime: "10 min",
  guideLabel: "This guide",
  guideValue: "Step-by-step clarity",
  canonicalPath: "/blog/how-elections-work",
  seoTitle: "How Elections Work (Simple Guide) | Topicler",
  seoDescription:
    "Learn how elections work, including voting systems, ballots, and election processes explained simply.",
  keywords: ["elections", "voting system", "democracy", "politics"],
  ogImage:
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2400",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Elections are the foundation of democracy, allowing citizens to choose their representatives and influence government decisions.",
        },
      ],
    },
    {
      id: "systems",
      title: "Voting Systems",
      content: [
        {
          type: "p",
          text: "Different countries use various systems such as first-past-the-post, proportional representation, and ranked-choice voting.",
        },
      ],
    },
    {
      id: "impact",
      title: "Impact of Elections",
      content: [
        {
          type: "p",
          text: "Election outcomes shape policies, leadership, and the direction of nations.",
        },
      ],
    },
  ],
  relatedSlugs: [],
},

// =========================================================
// 4) POLITICAL IDEOLOGIES
// =========================================================
{
  slug: "political-ideologies-explained",
  title: "Political Ideologies Explained",
  subtitle:
    "Understanding liberalism, conservatism, socialism, and modern political thought.",
  heroImage:
    "https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=2400",
  category: "Politics",
  publishDate: "March 16, 2026",
  publishISO: "2026-03-16T00:00:00.000Z",
  readingTime: "11 min",
  guideLabel: "This guide",
  guideValue: "Concept clarity",
  canonicalPath: "/blog/political-ideologies-explained",
  seoTitle: "Political Ideologies Explained | Topicler",
  seoDescription:
    "Learn about major political ideologies and how they shape governments and societies.",
  keywords: ["political ideologies", "liberalism", "conservatism", "socialism"],
  ogImage:
    "https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=2400",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Political ideologies shape how societies organize power, economy, and rights.",
        },
      ],
    },
    {
      id: "types",
      title: "Types of Ideologies",
      content: [
        {
          type: "p",
          text: "Liberalism focuses on individual rights, while conservatism emphasizes tradition and stability.",
        },
      ],
    },
  ],
  relatedSlugs: [],
},

// =========================================================
// 5) MEDIA & POLITICS
// =========================================================
{
  slug: "media-in-politics",
  title: "The Role of Media in Politics",
  subtitle:
    "How media influences public opinion, elections, and political narratives.",
  heroImage:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2400",
  category: "Politics",
  publishDate: "March 15, 2026",
  publishISO: "2026-03-15T00:00:00.000Z",
  readingTime: "10 min",
  guideLabel: "This guide",
  guideValue: "Real-world insight",
  canonicalPath: "/blog/media-in-politics",
  seoTitle: "Media in Politics Explained | Topicler",
  seoDescription:
    "Understand how media shapes political opinions, elections, and public discourse.",
  keywords: ["media politics", "news influence", "public opinion"],
  ogImage:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2400",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Media plays a crucial role in shaping political narratives and informing the public.",
        },
      ],
    },
    {
      id: "influence",
      title: "Media Influence",
      content: [
        {
          type: "p",
          text: "News outlets and social media platforms impact how people perceive political events.",
        },
      ],
    },
  ],
  relatedSlugs: [],
},



];

export function getBlogBySlug(slug: string) {
  return BLOGS.find((b) => b.slug === slug) || null;
}

export function getRelatedBlogs(slugs: string[]) {
  const set = new Set(slugs);
  return BLOGS.filter((b) => set.has(b.slug));
}

