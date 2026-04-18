import CalculatorClient from "@/components/calculator/CalculatorClient";
import { getCalculatorGroups, getCalculatorServiceTypes } from "@/lib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор",
  description:
    "Рассчитайте стоимость ритуальных услуг онлайн. Выберите тип услуги, комплектацию и дополнительные опции.",
};

export const revalidate = 60;

export default async function CalculatorPage() {
  const [serviceTypes, groups] = await Promise.all([
    getCalculatorServiceTypes(),
    getCalculatorGroups(),
  ]);

  return <CalculatorClient serviceTypes={serviceTypes} groups={groups} />;
}
