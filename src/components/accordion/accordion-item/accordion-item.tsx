import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useId,
} from "react";
import "./accordion-item.scss";
import { useAccordion } from "../../../hooks/use-accordion";

interface IAccordionItem extends PropsWithChildren {
  referenceID?: string;
  startOpened?: boolean;
}

interface IChildren {
  accordionID?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItem>(
  ({ children, referenceID, startOpened }: IAccordionItem, ref) => {
    const id = referenceID ? referenceID : useId();
    const { setSelectedAccordion, register } = useAccordion();

    const childrenWithProps = () => {
      if (Array.isArray(children)) {
        return Children.map(children, (child) =>
          cloneElement(child, {
            accordionID: id,
          })
        );
      }

      if (isValidElement<IChildren>(children))
        return cloneElement(children, {
          accordionID: id,
        });

      return children;
    };

    useEffect(() => register(id), [id]);

    useEffect(() => {
      if (!startOpened) return;
      setSelectedAccordion(id);
    }, [startOpened]);

    return (
      <div ref={ref} className="accordion-item">
        {childrenWithProps()}
      </div>
    );
  }
);
