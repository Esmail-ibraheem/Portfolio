// Mock data for Esmail Gumaan's Portfolio

export const personalInfo = {
  name: "Esmail Gumaan",
  title: "AI Research Engineer — LLMs, RAG, and scalable ML systems",
  tagline: "I build neural systems from scratch—PyTorch, CUDA, and practical research bridging theory and applications.",
  email: "esm.agumaan@gmail.com",
  phone: "+967-772-945-392",
  github: "https://github.com/Esmail-ibraheem",
  linkedin: "https://linkedin.com/in/esmail-a-gumaan",
  location: "Yemen"
};

export const heroStats = [
  { label: "Published Papers", value: "5+", subtext: "arXiv / ResearchGate" },
  { label: "Open Source", value: "3", subtext: "nanograd, Axon, TinyLlamas" },
  { label: "Focus Areas", value: "4", subtext: "LLMs, MoE, RAG, Distributed Training" }
];

export const publications = [
  {
    id: 1,
    title: "Theoretical Foundations and Mitigation of Hallucination in LLMs",
    venue: "arXiv:2507.22915",
    date: "July 2025",
    highlights: [
      "Novel theoretical framework for understanding LLM hallucinations",
      "Practical mitigation strategies with measurable improvements",
      "Comprehensive analysis of attention mechanisms"
    ],
    link: "https://arxiv.org/abs/2507.22915"
  },
  {
    id: 2,
    title: "Universal Approximation Theorem for a Single-Layer Transformer",
    venue: "arXiv:2507.10581",
    date: "July 2025",
    highlights: [
      "Mathematical proof of universal approximation capabilities",
      "Implications for efficient model architecture design",
      "Bridge between theoretical foundations and practical applications"
    ],
    link: "https://arxiv.org/abs/2507.10581"
  },
  {
    id: 3,
    title: "Mixture of Transformers: Macro-Level Gating for Sparse Activation in LLM Ensembles",
    venue: "ResearchGate DOI RG.2.2.25049.02400",
    date: "April 2025",
    highlights: [
      "Novel macro-level gating mechanism for transformer ensembles",
      "Significant reduction in computational overhead",
      "Improved performance on complex reasoning tasks"
    ],
    link: "https://www.researchgate.net/publication/RG.2.2.25049.02400"
  },
  {
    id: 4,
    title: "ExpertRAG: Efficient RAG with Mixture of Experts",
    venue: "arXiv:2505.08744",
    date: "March 2025",
    highlights: [
      "Optimizing context retrieval for adaptive LLM responses",
      "Mixture of Experts architecture for RAG systems",
      "Demonstrated 40% improvement in retrieval accuracy"
    ],
    link: "https://arxiv.org/abs/2505.08744"
  },
  {
    id: 5,
    title: "Galvatron: Automatic Distributed Training for Large Transformer Models",
    venue: "arXiv:2505.03662",
    date: "March 2025",
    highlights: [
      "Automated distributed training framework",
      "Support for models up to 175B parameters",
      "Optimized memory usage and training efficiency"
    ],
    link: "https://arxiv.org/abs/2505.03662"
  }
];

export const projects = [
  {
    id: 1,
    name: "nanograd: AI Engine",
    description: "Mini-ecosystem to run GPT/ViT/diffusion/RL models with comprehensive neural network implementation from scratch.",
    technologies: ["Python", "PyTorch", "FastAPI", "Gradio", "CUDA"],
    github: "https://github.com/Esmail-ibraheem/nanograd",
    highlights: [
      "Complete neural network framework implementation",
      "Support for multiple model architectures",
      "Educational and research-focused design"
    ]
  },
  {
    id: 2,
    name: "Axon: AI Research Lab",
    description: "Reproducible implementations of seminal and modern models including Transformers, Diffusion, and RLHF.",
    technologies: ["Python", "PyTorch", "Transformers", "Diffusion", "RLHF"],
    github: "https://github.com/Esmail-ibraheem/Axon",
    highlights: [
      "Faithful reproductions of key research papers",
      "Collaborative research platform",
      "Educational resources and tutorials"
    ]
  },
  {
    id: 3,
    name: "TinyLlamas (PyTorch)",
    description: "LLAMA-inspired implementation with GQA and MHA, serving as an experimentation platform for language model research.",
    technologies: ["Python", "PyTorch", "GQA", "MHA", "Transformers"],
    github: "https://github.com/Esmail-ibraheem/Tinyllamas",
    highlights: [
      "Efficient LLAMA-inspired architecture",
      "Group Query Attention implementation",
      "Research experimentation platform"
    ]
  }
];

export const experience = [
  {
    id: 1,
    title: "ML Engineer",
    company: "Automa8e",
    location: "Philippines",
    period: "Dec 2024 – Jan 2025",
    description: "Built AI apps for dynamic responses and actionable insights from documents (NLP + doc processing).",
    achievements: [
      "Developed AI-powered applications for document processing",
      "Advanced NLP techniques for insight extraction",
      "Dynamic response generation systems"
    ]
  },
  {
    id: 2,
    title: "AI/ML Software Engineer",
    company: "AI Development Collaborator",
    location: "Germany",
    period: "Nov 2023 – Aug 2024",
    description: "RAG systems; OCR + LLMs for MRI detection assistance.",
    achievements: [
      "Built RAG systems for medical applications",
      "Integrated OCR with LLMs for MRI analysis",
      "Enhanced detection capabilities for medical imaging"
    ]
  },
  {
    id: 3,
    title: "AI Engineer",
    company: "Creative Point",
    location: "Sana'a",
    period: "Jan 2024 – Nov 2024",
    description: "Built AI models from scratch; performance-driven training.",
    achievements: [
      "Built AI models from scratch with high performance standards",
      "Worked 12 hours/day on challenging AI problems",
      "Performance-driven algorithm training and optimization"
    ]
  },
  {
    id: 4,
    title: "AI/ML Student Researcher",
    company: "Sana'a University",
    location: "Sana'a",
    period: "May – Aug 2023",
    description: "Implemented Transformer & diffusion models; multiple RAG variants (agentic, graph-based, self-correcting).",
    achievements: [
      "Implemented key research papers (Transformer, diffusion models)",
      "Developed diverse RAG systems (agentic, graph-based, self-correcting)",
      "Contributed to LLM research and applications"
    ]
  }
];

export const education = {
  degree: "B.Sc. Computer Science",
  university: "University of Sana'a",
  period: "Jan 2023 – Mar 2025",
  gpa: "79.72% (≈ German 2.2, \"Gut\")",
  courses: ["AI", "Data Science", "Data Mining", "Advanced Programming"]
};

export const skills = {
  programming: ["Python", "C++", "Java", "JavaScript", "SQL", "CUDA", "LaTeX"],
  frameworks: ["PyTorch", "TensorFlow", "Lightning", "LangChain", "Haystack", "HuggingFace", "FastAPI", "Gradio", "Git/GitHub", "Linux"],
  mathematics: ["Differential Equations", "Calculus", "Linear Algebra"],
  languages: ["English (B2, IELTS 6.0)", "Arabic (native)"]
};

export const certificates = [
  "Machine Learning Specialization (Stanford & Deeplearning.AI)",
  "Intro to AI (IBM)",
  "Generative AI (Google Cloud)",
  "University AI Competitions"
];

// Mock form submission function
export const submitContactForm = async (formData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock form submission:', formData);
      resolve({ success: true, message: 'Message sent successfully!' });
    }, 1000);
  });
};