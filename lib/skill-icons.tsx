import type { ComponentType } from 'react'
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiOpencv,
  SiScikitlearn,
  SiStreamlit,
  SiGit,
  SiGithub,
  SiLinux,
  SiMysql,
  SiArduino,
  SiStmicroelectronics,
} from 'react-icons/si'
import {
  Cpu,
  CircuitBoard,
  Network,
  BrainCircuit,
  Radio,
  Wifi,
  Code2,
  BarChart3,
  Table2,
  Server,
} from 'lucide-react'

type IconComponent = ComponentType<{ className?: string }>

// Maps a skill name to a small logo/icon. Brand logos come from react-icons
// (Simple Icons); anything without an official brand mark uses a Lucide icon.
const skillIcons: Record<string, IconComponent> = {
  Python: SiPython,
  C: SiC,
  'C++': SiCplusplus,
  'Embedded C': Cpu,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'REST APIs': Server,
  OpenCV: SiOpencv,
  NLP: BrainCircuit,
  'Scikit-learn': SiScikitlearn,
  Streamlit: SiStreamlit,
  '8051': Cpu,
  Arduino: SiArduino,
  STM32: SiStmicroelectronics,
  'ARM Cortex M4': Cpu,
  Sensors: Radio,
  IoT: Wifi,
  'PCB Design': CircuitBoard,
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': Code2,
  'Power BI': BarChart3,
  Excel: Table2,
  MySQL: SiMysql,
  Linux: SiLinux,
  'TCP/IP': Network,
}

export function getSkillIcon(skill: string): IconComponent {
  return skillIcons[skill] ?? Code2
}
