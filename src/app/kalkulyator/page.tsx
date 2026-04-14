import CalculatorClient from "@/components/calculator/CalculatorClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор",
  description:
    "Рассчитайте стоимость ритуальных услуг онлайн. Выберите тип услуги, комплектацию и дополнительные опции.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
