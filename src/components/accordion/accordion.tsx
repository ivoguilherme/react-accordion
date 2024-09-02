import { PropsWithChildren } from "react";
import {
  AccordionProvider,
  IAccordionContext,
} from "../../providers/accordion.provider";
import { AccordionHeader } from "./accordion-header/accordion-header";
import { AccordionItem } from "./accordion-item/accordion-item";
import { AccordionIcon } from "./accordion-icon/accordion-icon";
import { AccordionContent } from "./accordion-content/accordion-content";

import "./accordion.scss";

interface AccordionProps extends PropsWithChildren {
  providerValue?: IAccordionContext;
}

const Accordion = ({ children, providerValue }: AccordionProps) => {
  return (
    <AccordionProvider contextValue={providerValue}>
      <div className="accordion">{children}</div>
    </AccordionProvider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Icon = AccordionIcon;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export { Accordion };
