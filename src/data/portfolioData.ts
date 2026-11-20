export type PublicationCategory =
  | 'All'
  | 'Systematic Review Protocols'
  | 'Original Research'
  | 'Ongoing/Under Review';

export interface Publication {
  id: string;
  index: string;
  title: string;
  italicTerm?: string;
  venue: string;
  year: string;
  category: Exclude<PublicationCategory, 'All'>;
  categoryLabel: string;
  indexing: string;
  summary: string;
  citation: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  domain: string;
  summary: string;
  highlights: string[];
}

export interface SkillPillar {
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  scopeSummary: string;
  items: {
    name: string;
    tier: string;
    detail: string;
    appliedIn: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  university: string;
  period: string;
  score: string;
  scoreLabel: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  detail: string;
}

export interface ConferenceItem {
  role: string;
  title: string;
  venue: string;
  year: string;
}

export interface AcademicProject {
  degree: string;
  title: string;
  italicTerm?: string;
  methods: string;
  outcome: string;
}

export const PROFILE = {
  name: 'Dr. Prarthan KN',
  credentials: 'PharmD (Post-Baccalaureate) · B.Pharm · Registered Member, Karnataka State Pharmacy Council',
  shortCredentials: 'PharmD (PB) · B.Pharm',
  tagline: 'Clinical Pharmacy Intern · Pharmacovigilance & Regulatory Affairs · Clinical Researcher',
  bio: 'Final-year PharmD (Post-Baccalaureate) intern with a B.Pharm background and hands-on experience across clinical pharmacy, pharmacovigilance (VigiFlow), research, pharmaceutical quality and regulatory processes, and scientific writing. Experienced in medication review, prescription auditing, ADR reporting, antimicrobial stewardship, clinical data analysis, and research documentation, with a strong willingness to contribute across diverse pharmaceutical and healthcare roles.',
  location: 'Kabaka, Puttur – 574201, Karnataka, India',
  shortLocation: 'Puttur, Karnataka, India',
  email: 'prarthank123@gmail.com',
  phone: '+91 6361672257',
  phoneHref: 'tel:+916361672257',
  linkedin: 'https://www.linkedin.com/in/prarthan-kn-39632a2b3/',
  linkedinDisplay: 'linkedin.com/in/prarthan-kn-39632a2b3',
  researchGate: 'https://share.google/nEEqim0xCMG8apCKP',
  researchGateDisplay: 'ResearchGate Profile',
  portraitSrc: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-08-27_at_5.35.01_PM_da4e39f4.jpeg`,
  cvPdfSrc: `${import.meta.env.BASE_URL}assets/aistudio/Prarthan_K_N__CV___cb10206a.pdf`,
  registration: 'Registered Member, Karnataka State Pharmacy Council (KSPC)',
  languages: ['English', 'Hindi', 'Kannada'],
};

export const ACADEMIC_PROJECTS: AcademicProject[] = [
  {
    degree: 'PharmD PB Research',
    title: 'Retrospective Study on Antihypertensive Therapy in Toxemia-Induced Hypertension',
    methods: 'Clinical data extraction and statistical evaluation using Microsoft Excel and SPSS',
    outcome: 'Analyzed clinical efficacy, safety, and nutrition parameters; contributed to manuscript preparation.',
  },
  {
    degree: 'B.Pharm Research',
    title: 'Phytochemical Screening and Antibacterial Evaluation of Tabernaemontana divaricata Leaf Extracts',
    italicTerm: 'Tabernaemontana divaricata',
    methods: 'Phytochemical constituent profiling and in vitro antibacterial evaluation',
    outcome: 'Contributed to full manuscript preparation and peer-reviewed journal publication.',
  },
];

export const RESEARCH_METRICS = [
  {
    id: 'citations',
    value: 25,
    suffix: '',
    label: 'Citations',
    context: 'Indexed academic citations across peer-reviewed literature',
  },
  {
    id: 'h-index',
    value: 2,
    suffix: '',
    label: 'H-Index',
    context: 'Verified citation impact across clinical & pharmaceutical studies',
  },
  {
    id: 'outputs',
    value: 22,
    suffix: '+',
    label: 'Scholarly Outputs',
    context: 'Research papers, reviews, case series, case reports & protocols',
  },
  {
    id: 'under-review',
    value: 2,
    suffix: '',
    label: 'Manuscripts Under Peer Review',
    context: 'Active 2026 journal peer-review pipeline',
  },
];

export const OUTPUT_BREAKDOWN = [
  { label: 'Research Papers', count: 11 },
  { label: 'Review Articles', count: 4 },
  { label: 'Case Series', count: 3 },
  { label: 'Case Reports', count: 2 },
  { label: 'Systematic Reviews', count: 2 },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    index: '01',
    title:
      'Therapeutic Effectiveness, Safety Profile and Clinical Outcomes of Patients with MELAS Syndrome: A Systematic Review Protocol',
    venue: 'PROSPERO International Prospective Register of Systematic Reviews',
    year: '2025–2026',
    category: 'Systematic Review Protocols',
    categoryLabel: 'Systematic Review Protocol',
    indexing: 'PROSPERO (Scopus / Web of Science indexed)',
    summary:
      'Prospective systematic review protocol evaluating therapeutic regimens, clinical safety profiles, and neurological outcomes in patients diagnosed with Mitochondrial Encephalomyopathy, Lactic Acidosis, and Stroke-like episodes (MELAS).',
    citation:
      'Prarthan KN, et al. Therapeutic Effectiveness, Safety Profile and Clinical Outcomes of Patients with MELAS Syndrome: A Systematic Review Protocol. PROSPERO (Scopus/Web of Science indexed).',
  },
  {
    id: 'pub-2',
    index: '02',
    title:
      'Efficacy and Safety of Leqselvi (deuruxolitinib) in Severe Alopecia Areata: A Systematic Review Protocol',
    venue: 'PROSPERO International Prospective Register of Systematic Reviews',
    year: '2025–2026',
    category: 'Systematic Review Protocols',
    categoryLabel: 'Systematic Review Protocol',
    indexing: 'PROSPERO (Scopus / Web of Science indexed)',
    summary:
      'Structured evidence synthesis protocol assessing JAK1/JAK2 inhibitor deuruxolitinib (Leqselvi) clinical efficacy endpoints and adverse event profiles in severe alopecia areata cohorts.',
    citation:
      'Prarthan KN, et al. Efficacy and Safety of Leqselvi (deuruxolitinib) in Severe Alopecia Areata: A Systematic Review Protocol. PROSPERO (Scopus/Web of Science indexed).',
  },
  {
    id: 'pub-3',
    index: '03',
    title:
      'Public Attitudes Towards Antibiotic Consumption and Antimicrobial Resistance in Dakshina Kannada',
    venue: 'International Journal of Pharmaceutical and Healthcare Innovation',
    year: '2024',
    category: 'Original Research',
    categoryLabel: 'Original Research',
    indexing: 'Peer-Reviewed Journal',
    summary:
      'Community-based cross-sectional assessment examining antibiotic utilization patterns, self-medication drivers, and antimicrobial resistance awareness across Dakshina Kannada.',
    citation:
      'Prarthan KN, et al. Public Attitudes Towards Antibiotic Consumption and Antimicrobial Resistance in Dakshina Kannada. International Journal of Pharmaceutical and Healthcare Innovation.',
  },
  {
    id: 'pub-4',
    index: '04',
    title:
      'Synthesis, Spectroscopic and Antibacterial Studies of Some N-Phenylpyridinium Chloride Derivatives',
    venue: 'Journal of Community Pharmacy Practice',
    year: '2024',
    category: 'Original Research',
    categoryLabel: 'Original Research',
    indexing: 'Peer-Reviewed Journal',
    summary:
      'Synthetic organic chemistry investigation characterizing N-phenylpyridinium chloride derivatives via spectroscopic profiling alongside in vitro antibacterial activity assays.',
    citation:
      'Prarthan KN, et al. Synthesis, Spectroscopic and Antibacterial Studies of Some N-Phenylpyridinium Chloride Derivatives. Journal of Community Pharmacy Practice.',
  },
  {
    id: 'pub-5',
    index: '05',
    title:
      'Phytochemical Constituent and Anti-Bacterial Activity of Tabernaemontana divaricata (Dwarf) Leaves',
    italicTerm: 'Tabernaemontana divaricata',
    venue: 'Journal of Biochemical Technology',
    year: '2024',
    category: 'Original Research',
    categoryLabel: 'Original Research',
    indexing: 'Peer-Reviewed Journal',
    summary:
      'Phytochemical screening and antimicrobial evaluation of dwarf Tabernaemontana divaricata foliar extracts, identifying bioactive constituents relevant to antibacterial therapeutics.',
    citation:
      'Prarthan KN, et al. Phytochemical Constituent and Anti-Bacterial Activity of Tabernaemontana divaricata (Dwarf) Leaves. Journal of Biochemical Technology.',
  },
  {
    id: 'pub-6',
    index: '06',
    title: 'Formulation and Evaluation of Herbal Face Pack for Healthy Skincare',
    venue: 'International Journal of Current Research in Physiology and Pharmacology',
    year: '2024',
    category: 'Original Research',
    categoryLabel: 'Original Research',
    indexing: 'Peer-Reviewed Journal (2024)',
    summary:
      'Formulation development, physicochemical evaluation, and stability profiling of a polyherbal topical skincare preparation for dermatological safety and efficacy.',
    citation:
      'Prarthan KN, et al. Formulation and Evaluation of Herbal Face Pack for Healthy Skincare. International Journal of Current Research in Physiology and Pharmacology. 2024.',
  },
  {
    id: 'pub-7',
    index: '07',
    title:
      'A Retrospective Study on the Role of Anti-Hypertensives in Safety, Clinical Efficacy and Nutrition in Toxemia-Induced Hypertension',
    venue: 'PharmD PB Research Project · Manuscript Prepared',
    year: '2025–2026',
    category: 'Ongoing/Under Review',
    categoryLabel: 'Ongoing / Under Review',
    indexing: 'Excel & SPSS Analyzed · Manuscript Prepared',
    summary:
      'Retrospective clinical investigation analyzing antihypertensive pharmacotherapy safety, maternal clinical efficacy outcomes, and nutritional correlations in toxemia-induced hypertension using Excel and SPSS statistical workflows.',
    citation:
      'Prarthan KN. A Retrospective Study on the Role of Anti-Hypertensives in Safety, Clinical Efficacy and Nutrition in Toxemia-Induced Hypertension. PharmD PB Research Project (2025); Manuscript Prepared.',
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Clinical Pharmacy Intern',
    organization: 'Srinivas Institute of Medical Sciences & Research Centre',
    location: 'Mangalore, Karnataka',
    period: 'Feb 2026 – Present',
    domain: 'Hospital & Clinical Pharmacy',
    summary:
      'Reviewing patient medication profiles for therapeutic appropriateness, drug interactions, and medication-related problems alongside 2 months of hospital pharmacy experience and clinical case reporting.',
    highlights: [
      'Comprehensive patient medication profile review for therapeutic appropriateness, dosing accuracy, and drug interaction screening.',
      'Identification, documentation, and clinical intervention on medication-related problems in coordination with medical teams.',
      'Completed 2 months of dedicated hospital pharmacy operational experience alongside structured clinical case reporting.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Clinical Pharmacy Intern',
    organization: 'Narayana Health',
    location: 'Bangalore, Karnataka',
    period: 'Nov 2025 – Feb 2026',
    domain: 'Pharmacovigilance · Oncology & Cardiology',
    summary:
      'Conducted prescription audits, participated in VigiFlow ADR reporting and antimicrobial stewardship (AMS), patient counseling, drug interaction analysis, and specialty case series studies.',
    highlights: [
      'Conducted systematic prescription audits and clinical drug interaction analyses across tertiary-care Oncology and Cardiology units.',
      'Identified, evaluated, and reported Adverse Drug Reactions (ADRs) utilizing the national VigiFlow pharmacovigilance platform.',
      'Participated in Antimicrobial Stewardship (AMS) monitoring, structured patient medication counseling, and clinical case series studies.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Research Trainee',
    organization: 'Society of Clinical Research and Medical Professionals (SCRMP)',
    location: 'Structured Academic Training',
    period: 'Apr 2025 – Sep 2025',
    domain: 'Clinical Research & Editorial Workflows',
    summary:
      'Completed structured research training in research documentation, editorial workflows, manuscript handling, and publication ethics.',
    highlights: [
      'Trained in end-to-end research documentation protocols, systematic literature appraisal, and peer-review manuscript preparation.',
      'Hands-on familiarity with journal editorial workflows, ethical publication standards, and manuscript handling.',
    ],
  },
  {
    id: 'exp-4',
    role: 'Industrial Training Intern',
    organization: 'CE Chem Pharmaceutical Pvt. Ltd.',
    location: 'Bangalore, Karnataka',
    period: 'Dec 2022 – Jan 2023',
    domain: 'Pharmaceutical Manufacturing & QC',
    summary:
      'Gained practical industrial exposure in manufacturing of tablets and liquid orals, quality control (QC), and pharmaceutical packaging operations.',
    highlights: [
      'Observed and documented solid oral dosage (tablet) and liquid oral formulation manufacturing workflows under GMP guidelines.',
      'Gained practical exposure to Quality Control (QC) testing protocols and primary/secondary packaging operations.',
    ],
  },
];

export const SKILL_PILLARS: SkillPillar[] = [
  {
    number: '01',
    shortTitle: 'Clinical & PV',
    title: 'Clinical & Pharmacovigilance',
    subtitle: 'Bedside therapeutic optimization and post-marketing drug safety surveillance.',
    scopeSummary: 'Hospital rotations · Oncology & Cardiology · VigiFlow',
    items: [
      {
        name: 'ADR Identification & Reporting (VigiFlow)',
        tier: 'Hands-On Clinical Practice',
        detail: 'Causality assessment, safety documentation, and standardized adverse event reporting via the VigiFlow platform.',
        appliedIn: 'Narayana Health, Bangalore (Nov 2025 – Feb 2026)',
      },
      {
        name: 'Medication Review & Prescription Auditing',
        tier: 'Clinical Ward Practice',
        detail: 'Inpatient chart review for therapeutic appropriateness, dosing accuracy, drug–drug interactions, and medication-related problems.',
        appliedIn: 'Srinivas Institute of Medical Sciences & Narayana Health',
      },
      {
        name: 'Antimicrobial Stewardship (AMS)',
        tier: 'Hospital Initiative',
        detail: 'Rational antibiotic utilization monitoring, resistance mitigation, and evidence-based antimicrobial surveillance.',
        appliedIn: 'Narayana Health & Dakshina Kannada AMR Study',
      },
      {
        name: 'Clinical Research & Patient Counseling',
        tier: 'Bedside & Academic',
        detail: 'Structured therapeutic adherence counseling alongside clinical case reporting and specialty case series documentation.',
        appliedIn: 'Hospital Pharmacy Rotations & Case Series Studies',
      },
    ],
  },
  {
    number: '02',
    shortTitle: 'Regulatory',
    title: 'Regulatory Affairs',
    subtitle: 'Pharmaceutical quality/regulatory documentation and global submission pathways.',
    scopeSummary: 'IND / NDA / ANDA · CTD / eCTD · CDSCO & ICH',
    items: [
      {
        name: 'IND, NDA & ANDA Submission Knowledge',
        tier: 'Certified Training',
        detail: 'Structured understanding of investigational, new drug, and abbreviated generic submission pathways and lifecycle requirements.',
        appliedIn: 'Researium Labs Regulatory Affairs Program',
      },
      {
        name: 'CTD & eCTD Dossier Concepts',
        tier: 'Documentation Framework',
        detail: 'Module-level familiarity with Common Technical Document architecture, quality summaries, and submission readiness.',
        appliedIn: 'Pharmaceutical Regulatory Documentation Training',
      },
      {
        name: 'CDSCO, ICH, FDA & EMA Guidelines',
        tier: 'Regulatory Compliance',
        detail: 'Working knowledge of national and international regulatory standards, Good Clinical Practice (GCP), and GMP quality controls.',
        appliedIn: 'NIDA GCP Certification & CE Chem Industrial Training',
      },
    ],
  },
  {
    number: '03',
    shortTitle: 'Data & Analytics',
    title: 'Data & Analytics',
    subtitle: 'Biostatistical evaluation, clinical dataset organization, and applied AI tools.',
    scopeSummary: 'Excel · SPSS · R · SQL · Healthcare AI',
    items: [
      {
        name: 'Microsoft Excel',
        tier: 'Applied Clinical Analysis',
        detail: 'Data organization, cleaning, sorting/filtering, structured formulas, summary tables, and exploratory quantitative analysis.',
        appliedIn: 'PharmD PB Retrospective Hypertension Study',
      },
      {
        name: 'SPSS Statistical Analysis',
        tier: 'Basic–Intermediate',
        detail: 'Clinical dataset entry, descriptive statistics, and Chi-Square testing for retrospective efficacy and safety outcomes.',
        appliedIn: 'PharmD PB Research Project & Clinical Datasets',
      },
      {
        name: 'R Programming & Basic SQL',
        tier: 'Foundational',
        detail: 'Basic R coding for statistical evaluation alongside SQL fundamentals for structured data entry, sorting, and filtering.',
        appliedIn: 'Clinical Data Management & Analytics Training',
      },
      {
        name: 'AI & Web Tools for Healthcare & Research',
        tier: 'Proficient',
        detail: 'Applied use of AI tools for literature screening, clinical research workflows, healthcare applications, and productivity.',
        appliedIn: 'Systematic Review Screening & Research Documentation',
      },
    ],
  },
  {
    number: '04',
    shortTitle: 'Scientific Writing',
    title: 'Scientific Writing',
    subtitle: 'Peer-reviewed medical communications, protocol design, and editorial rigor.',
    scopeSummary: '22+ Outputs · PROSPERO · Editorial Ethics',
    items: [
      {
        name: 'Systematic Reviews & PROSPERO Protocols',
        tier: 'Indexed Protocols',
        detail: 'PRISMA-aligned evidence synthesis, structured search strategies, and prospective protocol registration on PROSPERO.',
        appliedIn: 'MELAS Syndrome & Leqselvi Alopecia Areata Protocols',
      },
      {
        name: 'Literature Evaluation & Manuscript Preparation',
        tier: 'Published Author',
        detail: 'Critical appraisal of clinical literature, original research articles, review papers, case series, and journal submissions.',
        appliedIn: '22+ Scholarly Outputs · 2 Manuscripts Under Review (2026)',
      },
      {
        name: 'Scientific & Regulatory Writing',
        tier: 'Trained & Certified',
        detail: 'Clear, structured medical and regulatory writing aligned with editorial workflows and publication ethics.',
        appliedIn: 'SCRMP 6-Month Research Training & IMWA Certification',
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Doctor of Pharmacy — PharmD (Post-Baccalaureate)',
    institution: 'Srinivas College of Pharmacy',
    university: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    period: '2024 – 2026',
    score: '85.8%',
    scoreLabel: 'Aggregate Score',
  },
  {
    degree: 'Bachelor of Pharmacy (B.Pharm)',
    institution: 'Srinivas College of Pharmacy',
    university: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    period: '2019 – 2024',
    score: '7.66 CGPA',
    scoreLabel: 'Cumulative GPA',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Regulatory Affairs for Pharmaceutical Industry',
    issuer: 'Researium Labs',
    detail: '1-month hands-on training program',
  },
  {
    title: 'Clinical Research, Clinical Data Management & Medical Coding',
    issuer: 'Researium Labs',
    detail: '1-month hands-on training course',
  },
  {
    title: 'Good Clinical Practice (GCP)',
    issuer: 'NIDA Clinical Trials Network',
    detail: 'International ethical & scientific quality standard',
  },
  {
    title: 'Medical Writing Skills for Beginners',
    issuer: 'International Medical Writers Association (IMWA)',
    detail: 'Foundations of scientific & clinical communication',
  },
];

export const CONFERENCES: ConferenceItem[] = [
  {
    role: 'Organizer & Participant',
    title: '8th IPCTS 2026 International Conference',
    venue: 'Srinivas College of Pharmacy',
    year: '2026',
  },
  {
    role: 'Participant',
    title:
      'International Conference on Emerging Technologies in Drug Discovery, Development & Delivery: Bridging Innovation from Molecule to Medicine',
    venue: 'International Scientific Forum',
    year: '2026',
  },
];
