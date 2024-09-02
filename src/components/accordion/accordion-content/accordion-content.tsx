import { forwardRef, PropsWithChildren, useCallback, useRef } from "react";
import "./accordion-content.scss";
import { useAccordion } from "../../../hooks/use-accordion";

const BASE_CLASS = "accordion-content";

interface IAccordionContent extends PropsWithChildren {
  accordionID?: string;
}

export const AccordionContent = forwardRef<HTMLDivElement, IAccordionContent>(
  ({ children, accordionID }: IAccordionContent, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const { isActive, timeTransition } = useAccordion();

    const active = isActive(accordionID);

    const internalHeightWithMargins = useCallback(() => {
      if (!internalRef?.current || !window?.getComputedStyle) return 0;

      const styles = window.getComputedStyle(internalRef.current as Element);

      return (
        parseInt(styles?.height) +
        parseInt(styles?.marginTop) +
        parseInt(styles?.marginBottom)
      );
    }, [internalRef.current]);

    const classes = [BASE_CLASS, active && `${BASE_CLASS}__is-active`]
      .filter(Boolean)
      .join(" ");

    const heightTransition = timeTransition?.height
      ? `height ease ${timeTransition.height}ms`
      : "";
    const opacityTransition = timeTransition?.opacity
      ? `opacity ease ${timeTransition.opacity}ms`
      : "";

    const transitionStyles = [heightTransition, opacityTransition]
      .filter(Boolean)
      .join(",");

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          transition: transitionStyles,
          height: active ? internalHeightWithMargins() : 0,
        }}
      >
        <div ref={internalRef} className="accordion-content__internal">
          {children}
        </div>
      </div>
    );
  }
);
