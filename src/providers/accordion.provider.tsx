import { createContext, PropsWithChildren } from "react";
import { useAccordionProvider } from "../hooks/use-accordion-provider";

interface ITimeTransition {
  height?: number;
  opacity?: number;
}

interface IAccordionContext {
  isActive: (accordionID?: string) => boolean;
  selectedAccordion?: string;
  setSelectedAccordion: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  accordionList: string[] | null;
  setAccordionList: React.Dispatch<React.SetStateAction<string[] | null>>;
  timeTransition?: ITimeTransition;
  register: (accordionID: string) => void;
  toggle: (accordionID: string, state?: "open" | "close") => void;
}

interface IAccordionProvider extends PropsWithChildren {
  contextValue?: IAccordionContext;
}

const AccordionContext = createContext<IAccordionContext | null>(null);

const AccordionProvider = ({ children, contextValue }: IAccordionProvider) => {
  const defaultsContextValue: IAccordionContext | undefined = contextValue
    ? {
        ...contextValue,
        timeTransition: contextValue?.timeTransition
          ? contextValue.timeTransition
          : {
              height: 150,
              opacity: 600,
            },
      }
    : undefined;

  const selectedContextValue =
    defaultsContextValue ||
    useAccordionProvider({
      timeTransition: {
        height: 150,
        opacity: 600,
      },
    });

  return (
    <AccordionContext.Provider value={selectedContextValue}>
      {children}
    </AccordionContext.Provider>
  );
};

export type { ITimeTransition, IAccordionContext };
export { AccordionContext, AccordionProvider };
