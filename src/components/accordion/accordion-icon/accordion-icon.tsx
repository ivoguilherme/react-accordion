import { forwardRef, PropsWithChildren } from "react";
import "./accordion-icon.scss";

const BASE_CLASS = "accordion-icon";

const iconVariants = {
  prefix: `${BASE_CLASS}__prefix`,
  posfix: `${BASE_CLASS}__posfix`,
};

type IconVariants = keyof typeof iconVariants;

interface IAccordionIcon extends PropsWithChildren {
  variant?: IconVariants;
}

export const AccordionIcon = forwardRef<HTMLDivElement, IAccordionIcon>(
  ({ children, variant }: IAccordionIcon, ref) => {
    const variantClass = variant ? iconVariants[variant] : null;
    const classes = [BASE_CLASS, variantClass].join(" ");

    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  }
);
