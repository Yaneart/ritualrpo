import { CalculatorGroup, CalculatorServiceType } from "@/types";
import { fetchAPI } from "./client";

export const getCalculatorServiceTypes = () => {
  return fetchAPI<CalculatorServiceType[]>("calculator/service-types");
};

export const getCalculatorGroups = () => {
  return fetchAPI<CalculatorGroup[]>("calculator/groups");
};
