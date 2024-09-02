import { useContext } from "react";
import { AccordionContext } from "../providers/accordion.provider";

export const useAccordion = () => {
  const value = useContext(AccordionContext);

  if (!value) {
    throw new Error("🗣️ useBook hook used without AccordionContext!");
  }

  return value;
};
