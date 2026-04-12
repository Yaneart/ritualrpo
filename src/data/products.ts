export interface Product {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const categories = [
  { slug: "all", label: "Все" },
  { slug: "groby", label: "Гробы" },
  { slug: "venki", label: "Венки" },
  { slug: "tsvety", label: "Цветы" },
  { slug: "pamyatniki", label: "Памятники" },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "grob-sosna-standart",
    category: "groby",
    title: "Гроб сосна «Стандарт»",
    description:
      "Гроб из массива сосны с тканевой обивкой. Классическая форма.",
    price: 12000,
    image: "/images/products/grob-1.png",
  },
  {
    id: 2,
    slug: "grob-dub-premium",
    category: "groby",
    title: "Гроб дуб «Премиум»",
    description:
      "Гроб из массива дуба с лакированным покрытием и резным декором.",
    price: 45000,
    image: "/images/products/grob-2.png",
  },
  {
    id: 3,
    slug: "venok-iz-zhivyh-roz",
    category: "venki",
    title: "Венок из живых роз",
    description: "Траурный венок из свежих роз с атласной лентой.",
    price: 8500,
    image: "/images/products/venok-1.png",
  },
  {
    id: 4,
    slug: "venok-iskusstvennyy",
    category: "venki",
    title: "Венок искусственный",
    description:
      "Венок из искусственных цветов. Долговечный, подходит для установки на могилу.",
    price: 3500,
    image: "/images/products/venok-2.png",
  },
  {
    id: 5,
    slug: "bukety-zhivye-lilii",
    category: "tsvety",
    title: "Букет живых лилий",
    description: "Траурный букет из белых лилий.",
    price: 4500,
    image: "/images/products/tsvety-1.png",
  },
  {
    id: 6,
    slug: "korzina-iz-hrizantem",
    category: "tsvety",
    title: "Корзина из хризантем",
    description: "Корзина из белых хризантем с зеленью.",
    price: 6000,
    image: "/images/products/tsvety-2.png",
  },
  {
    id: 7,
    slug: "pamyatnik-granit-vertikalnyy",
    category: "pamyatniki",
    title: "Памятник гранит вертикальный",
    description:
      "Памятник из чёрного гранита. Вертикальная стела с гравировкой.",
    price: 35000,
    image: "/images/products/pamyatnik-1.png",
  },
  {
    id: 8,
    slug: "pamyatnik-mramor-krest",
    category: "pamyatniki",
    title: "Памятник мрамор с крестом",
    description: "Памятник из белого мрамора с резным крестом.",
    price: 55000,
    image: "/images/products/pamyatnik-2.png",
  },
];
