import { forwardRef, ReactNode } from "react";
import "./accordion-header.scss";
import { useAccordion } from "../../../hooks/use-accordion";

interface IAccordionHeader {
  title: string;
  prefixIcon?: ReactNode;
  posfixIcon?: ReactNode;
  accordionID?: string;
}

const BASE_CLASS = "accordion-header";

export const AccordionHeader = forwardRef<HTMLDivElement, IAccordionHeader>(
  ({ title, prefixIcon, posfixIcon, accordionID }: IAccordionHeader, ref) => {
    const { setSelectedAccordion, isActive } = useAccordion();

    const active = isActive(accordionID);

    const classes = [BASE_CLASS, active && `${BASE_CLASS}__is-active`]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        onClick={() => {
          setSelectedAccordion((current) =>
            current === accordionID ? "" : accordionID!
          );
        }}
      >
        <div className="accordion-header__content">
          {prefixIcon && (
            <div className="accordion-header__prefix-icon">{prefixIcon}</div>
          )}

          <div className="accordion-header__title">
            <span>{title}</span>
          </div>
        </div>

        {posfixIcon && (
          <div className="accordion-header__posfix-icon">{posfixIcon}</div>
        )}
      </div>
    );
  }
);
