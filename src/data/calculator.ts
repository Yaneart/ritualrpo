export interface ServiceOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
}

export interface ItemOption {
  id: string;
  title: string;
  price: number;
}

export interface RequiredGroup {
  id: string;
  title: string;
  options: ItemOption[];
}

export interface ExtraGroup {
  id: string;
  title: string;
  options: ItemOption[];
}

export const serviceOptions: ServiceOption[] = [
  {
    id: "funeral",
    title: "Организация похорон",
    description: "Полный цикл — документы, церемония, транспортировка",
    basePrice: 25000,
  },
  {
    id: "cremation",
    title: "Кремация",
    description: "Кремация с церемонией прощания и оформлением",
    basePrice: 20000,
  },
];

export const requiredGroups: RequiredGroup[] = [
  {
    id: "coffin",
    title: "Гроб",
    options: [
      { id: "coffin-economy", title: "Гроб «Эконом» (ДСП)", price: 6000 },
      { id: "coffin-standard", title: "Гроб «Стандарт» (сосна)", price: 12000 },
      { id: "coffin-premium", title: "Гроб «Премиум» (дуб)", price: 45000 },
      {
        id: "coffin-elite",
        title: "Гроб «Элитный» (лакированный дуб)",
        price: 80000,
      },
    ],
  },
  {
    id: "transport",
    title: "Транспорт",
    options: [
      { id: "transport-standard", title: "Катафалк (ГАЗель)", price: 5000 },
      { id: "transport-comfort", title: "Катафалк (Mercedes)", price: 12000 },
    ],
  },
  {
    id: "farewell",
    title: "Зал прощания",
    options: [
      { id: "farewell-basic", title: "Зал стандарт (1 час)", price: 5000 },
      {
        id: "farewell-extended",
        title: "Зал расширенный (2 часа)",
        price: 9000,
      },
      { id: "farewell-vip", title: "VIP-зал (3 часа)", price: 18000 },
    ],
  },
];

export const extraGroups: ExtraGroup[] = [
  {
    id: "flowers",
    title: "Венки и цветы",
    options: [
      { id: "wreath-fresh", title: "Венок из живых роз", price: 8500 },
      { id: "wreath-artificial", title: "Венок искусственный", price: 3500 },
      { id: "flowers-lilies", title: "Букет живых лилий", price: 4500 },
      { id: "flowers-basket", title: "Корзина из хризантем", price: 6000 },
    ],
  },
  {
    id: "ceremony",
    title: "Церемония",
    options: [
      { id: "photo-video", title: "Фото/видеосъёмка", price: 7000 },
      { id: "music", title: "Музыкальное сопровождение", price: 5000 },
      {
        id: "memorial-dinner",
        title: "Поминальный обед (10 чел.)",
        price: 15000,
      },
    ],
  },
  {
    id: "other",
    title: "Прочее",
    options: [
      { id: "documents", title: "Оформление документов", price: 3000 },
      { id: "clothing", title: "Комплект траурной одежды", price: 8000 },
      { id: "grave-care", title: "Уход за захоронением (1 год)", price: 12000 },
    ],
  },
];
