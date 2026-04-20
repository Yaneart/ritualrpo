import { Stat, TeamMember } from "@/types";
import { fetchAPI } from "./client";

export const getStats = () => {
  return fetchAPI<Stat[]>("stats");
};

export const getTeam = () => {
  return fetchAPI<TeamMember[]>("team");
};
