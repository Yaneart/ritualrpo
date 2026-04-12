export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Certificate {
  title: string;
  image: string;
}

export const stats: Stat[] = [
  { number: "10+", label: "лет опыта" },
  { number: "24/7", label: "на связи" },
  { number: "5000+", label: "семей доверились нам" },
  { number: "100%", label: "прозрачные цены" },
];

export const team: TeamMember[] = [
  {
    name: "Алексей Петров",
    role: "Директор",
    image: "/images/about/team-1.webp",
  },
  {
    name: "Мария Иванова",
    role: "Агент",
    image: "/images/about/team-1.webp",
  },
  {
    name: "Дмитрий Смирнов",
    role: "Агент",
    image: "/images/about/team-1.webp",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Свидетельство о регистрации",
    image: "/images/about/cert-1.jpg",
  },
  {
    title: "Лицензия на ритуальные услуги",
    image: "/images/about/cert-2.jpg",
  },
  {
    title: "Сертификат качества",
    image: "/images/about/cert-3.jpg",
  },
];
