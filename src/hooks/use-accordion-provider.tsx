import { IAccordionProvider } from "../providers/accordion.provider";

type IUseAccordionProvider = Partial<Omit<IAccordionProvider, "children">>;

export const useAccordionProvider = (
  props?: IUseAccordionProvider
): IAccordionProvider => {
  return {
    initialAccordionOpened: props?.initialAccordionOpened,
  };
};
