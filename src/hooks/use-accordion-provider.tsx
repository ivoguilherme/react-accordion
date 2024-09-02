import { useCallback, useMemo, useState } from "react";
import {
  IAccordionContext,
  ITimeTransition,
} from "../providers/accordion.provider";

export interface IUseAccordionProvider {
  initialAccordionOpened?: string;
  timeTransition?: ITimeTransition;
}

export const useAccordionProvider = (
  props?: IUseAccordionProvider
): IAccordionContext => {
  const { initialAccordionOpened, timeTransition } = props || {};

  const [accordionList, setAccordionList] = useState<Array<string> | null>(
    null
  );
  const [selectedAccordion, setSelectedAccordion] = useState<
    string | undefined
  >(initialAccordionOpened);

  const register = useCallback((accordionID: string) => {
    if (accordionList?.includes(accordionID)) return;
    setAccordionList((list) => [...(list || []), accordionID]);
  }, []);

  const toggle = useCallback(
    (accordionID: string, state?: "open" | "close") => {
      switch (state) {
        case "open":
          setSelectedAccordion(accordionID);
          break;
        case "close":
          setSelectedAccordion("");
          break;
        default:
          setSelectedAccordion((id) => (id === accordionID ? "" : accordionID));
      }
    },
    []
  );

  const isActive = useCallback(
    (accordionID?: string) => accordionID === selectedAccordion,
    [selectedAccordion]
  );

  const contextValue = useMemo(
    () => ({
      toggle,
      register,
      isActive,
      accordionList,
      timeTransition,
      setAccordionList,
      selectedAccordion,
      setSelectedAccordion,
    }),
    [
      toggle,
      register,
      isActive,
      accordionList,
      timeTransition,
      setAccordionList,
      selectedAccordion,
      setSelectedAccordion,
    ]
  );

  return contextValue;
};
