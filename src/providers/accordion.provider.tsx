import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

interface ITimeTransition {
  height?: number;
  opacity?: number;
}

export interface IAccordionContext {
  isActive: (accordionID?: string) => boolean;
  selectedAccordion?: string;
  setSelectedAccordion: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  accordionList: string[] | null;
  setAccordionList: React.Dispatch<React.SetStateAction<string[] | null>>;
  timeTransition?: ITimeTransition;
}

export const AccordionContext = createContext<IAccordionContext | null>(null);

export interface IAccordionProvider extends PropsWithChildren {
  initialAccordionOpened?: string;
  timeTransition?: ITimeTransition;
}

export const AccordionProvider = ({
  children,
  initialAccordionOpened,
  timeTransition,
}: IAccordionProvider) => {
  const [accordionList, setAccordionList] = useState<Array<string> | null>(
    null
  );
  const [selectedAccordion, setSelectedAccordion] = useState<
    string | undefined
  >(initialAccordionOpened);

  const isActive = useCallback(
    (accordionID?: string) => accordionID === selectedAccordion,
    [selectedAccordion]
  );

  const contextValue = useMemo(
    () => ({
      isActive,
      accordionList,
      timeTransition,
      setAccordionList,
      selectedAccordion,
      setSelectedAccordion,
    }),
    [
      accordionList,
      timeTransition,
      setAccordionList,
      selectedAccordion,
      setSelectedAccordion,
    ]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  );
};
