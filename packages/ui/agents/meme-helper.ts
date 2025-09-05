export interface MemeTemplate {
  id: string;
  text: string;
}

const TEMPLATES: MemeTemplate[] = [
  { id: 'drake', text: 'Drake Hotline Bling' },
  { id: 'distracted', text: 'Distracted Boyfriend' },
];

export function randomTemplate(seed = 0): MemeTemplate {
  const idx = Math.abs(Math.sin(seed)) * TEMPLATES.length;
  return TEMPLATES[Math.floor(idx)] ?? TEMPLATES[0];
}
