export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
  features: string[];
  price: string | null;
  order: number;
  isActive?: boolean;
}

// Категория товаров
export interface Category {
  id: string;
  slug: string;
  name: string;
  order: number;
}

// Товар
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  categoryId: string;
  category?: Category;
  isActive?: boolean;
}

// Данные для создания заявки
export interface CreateRequestData {
  type: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

// Заявка с сайта
export interface Request {
  id: string;
  type: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
}

// Отзыв
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt: string;
}

// Данные для создания отзыва
export interface CreateReviewData {
  name: string;
  rating: number;
  text: string;
}

// Вопрос FAQ
export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

// Калькулятор: тип услуги (шаг 1)
export interface CalculatorServiceType {
  id: string;
  slug: string;
  title: string;
  description: string;
  basePrice: number;
  order: number;
}

// Калькулятор: опция внутри группы
export interface CalculatorOption {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  order: number;
  groupId: string;
}

// Калькулятор: группа опций (required/extra) с вложенными options
export interface CalculatorGroup {
  id: string;
  slug: string;
  title: string;
  type: "required" | "extra";
  order: number;
  options: CalculatorOption[];
}

// О компании: статистика
export interface Stat {
  id: string;
  value: string;
  label: string;
  order: number;
}

// О компании: член команды
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  order: number;
}

// Преимущество (секция "Почему мы")
export interface Advantage {
  id: string;
  title: string;
  description: string;
  order: number;
}
