import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  Layout,
  Server,
  Wrench,
  BrainCircuit,
  Cpu,
  MonitorCog,
  Network,
} from 'lucide-react'

export const profile = {
  name: 'ASHHA G',
  roles: [
    'Software Engineer',
    'Python Developer',
    'AI & Machine Learning Engineer',
    'Embedded Systems Engineer',
    'Data Analyst',
  ],
  tagline:
    'Electronics and Communication Engineering graduate passionate about developing intelligent software, AI-powered applications, and embedded systems that solve real-world problems. Experienced in Python, Machine Learning, Embedded Systems, IoT, and Data Analytics.',
  email: 'ashhareddy19@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashha-g-25722a384',
  github: 'https://github.com/ASHHA19?tab=repositories',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const aboutHighlights = [
  'Software Development',
  'Python',
  'Machine Learning',
  'Embedded Systems',
  'IoT',
  'Image Processing',
  'Data Analytics',
  'Power BI',
  'MySQL',
  'Embedded C',
  'Arduino',
  'STM32',
  'ARM Cortex M4',
  'PCB Design',
  'Git',
]

export const aboutTraits = [
  'Strong problem-solving mindset',
  'Continuous learner',
  'Passionate about AI and modern software engineering',
  'Seeking Software Engineer / AI Engineer opportunities',
]

export type SkillGroup = {
  title: string
  icon: LucideIcon
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'C', 'C++', 'Embedded C', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frontend',
    icon: Layout,
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Python', 'REST APIs'],
  },
  {
    title: 'Machine Learning',
    icon: BrainCircuit,
    skills: ['OpenCV', 'NLP', 'Scikit-learn', 'Streamlit'],
  },
  {
    title: 'Embedded',
    icon: Cpu,
    skills: ['8051', 'Arduino', 'STM32', 'ARM Cortex M4', 'Sensors', 'IoT', 'PCB Design'],
  },
  {
    title: 'Tools & Databases',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Power BI', 'Excel', 'MySQL'],
  },
  {
    title: 'Operating Systems',
    icon: MonitorCog,
    skills: ['Linux'],
  },
  {
    title: 'Networking',
    icon: Network,
    skills: ['TCP/IP'],
  },
]

export type Project = {
  title: string
  category: 'AI / ML' | 'Data & Vision' | 'Embedded'
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
}

export const projects: Project[] = [
  {
    title: 'AI Interview Platform',
    category: 'AI / ML',
    description:
      'An AI-powered recruitment platform that analyzes resumes using NLP, compares resumes against job descriptions, generates ATS compatibility scores, and conducts AI-driven mock interviews with intelligent feedback.',
    technologies: ['Python', 'Streamlit', 'NLP', 'Machine Learning', 'Scikit-learn'],
    image: '/project-ai-interview.png',
    github: 'https://github.com/ashha-g',
    demo: 'https://github.com/ashha-g',
  },
  {
    title: 'Heart Disease Analyzer',
    category: 'Data & Vision',
    description:
      'A medical image processing application that detects heart disease using OpenCV and Machine Learning. The system preprocesses medical images, extracts diagnostic features, and assists in early disease detection.',
    technologies: ['Python', 'OpenCV', 'Machine Learning', 'NumPy', 'Matplotlib'],
    image: '/project-heart-disease.png',
    github: 'https://github.com/ashha-g',
    demo: 'https://github.com/ashha-g',
  },
  {
    title: 'Train Track Defect Detection System',
    category: 'Embedded',
    description:
      'An embedded safety system using an 8051 microcontroller and sensors to detect railway track defects. The project provides automated alerts for improved railway safety using IoT concepts.',
    technologies: ['Embedded C', '8051', 'Sensors', 'IoT', 'Arduino'],
    image: '/project-train-track.png',
    github: 'https://github.com/ashha-g',
    demo: 'https://github.com/ashha-g',
  },
]

export const projectCategories = ['All', 'AI / ML', 'Data & Vision', 'Embedded'] as const

export type Experience = {
  role: string
  company: string
  period: string
  responsibilities: string[]
  skills: string[]
}

export const experiences: Experience[] = [
  {
    role: 'PCB Design Intern',
    company: 'Pantech AI',
    period: 'Internship',
    responsibilities: [
      'Designed and developed PCB layouts for embedded systems projects.',
      'Worked with schematic design and PCB routing.',
      'Learned component selection and circuit optimization.',
      'Assisted in hardware testing and debugging.',
    ],
    skills: ['PCB Design', 'Embedded Hardware', 'Circuit Design', 'Hardware Debugging'],
  },
  {
    role: 'ARM Cortex-M4 Programming Intern',
    company: 'Pantech AI',
    period: 'Internship',
    responsibilities: [
      'Developed embedded applications using ARM Cortex-M4 microcontrollers.',
      'Worked with Embedded C programming.',
      'Implemented peripheral interfacing and hardware communication.',
      'Learned interrupt handling, timers, UART, SPI, and I2C.',
      'Performed debugging and firmware testing.',
    ],
    skills: [
      'ARM Cortex-M4',
      'Embedded C',
      'Firmware Development',
      'UART',
      'SPI',
      'I2C',
      'Timers',
      'Interrupts',
    ],
  },
  {
    role: 'IoT Intern',
    company: 'Pantech AI',
    period: 'Internship',
    responsibilities: [
      'Built IoT applications using sensors and microcontrollers.',
      'Connected embedded devices to cloud services.',
      'Worked on real-time monitoring systems.',
      'Integrated hardware with software applications.',
    ],
    skills: [
      'IoT',
      'Sensors',
      'Arduino',
      'Microcontrollers',
      'Cloud Connectivity',
      'Embedded Systems',
    ],
  },
  {
    role: 'Embedded Systems Intern',
    company: 'Besant Technologies',
    period: 'Internship',
    responsibilities: [
      'Worked on microcontrollers and embedded systems.',
      'Interfaced sensors and actuators.',
      'Developed Embedded C applications.',
      'Built real-time hardware projects.',
    ],
    skills: ['Embedded C', '8051', 'Sensors', 'Arduino', 'Microcontrollers'],
  },
  {
    role: 'Data Analysis Intern',
    company: 'LearnNex (Powered by Wipro DICE)',
    period: 'Internship',
    responsibilities: [
      'Performed data cleaning and preprocessing.',
      'Built dashboards using Power BI.',
      'Analyzed datasets using Python.',
      'Generated business insights using Excel.',
    ],
    skills: ['Python', 'Power BI', 'Excel', 'Data Analytics'],
  },
]

export const education = {
  degree: 'B.E Electronics and Communication Engineering',
  institution: 'Bangalore College of Engineering and Technology',
  cgpa: '8.6 / 10',
}

export const certifications = [
  { title: 'Embedded Systems', issuer: 'Professional Certification' },
  { title: 'Internet of Things', issuer: 'Professional Certification' },
  { title: 'Ethical Hacking', issuer: 'Professional Certification' },
  { title: 'Digital Electronics', issuer: 'Professional Certification' },
  { title: 'Python Programming', issuer: 'Professional Certification' },
  { title: 'Data Analysis', issuer: 'Professional Certification' },
]
