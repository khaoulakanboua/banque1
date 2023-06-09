import React from "react";

const variantClasses = {
  h1: "font-semibold sm:text-2xl md:text-[26px] text-[28px]",
  h2: "sm:text-[21px] md:text-[23px] text-[25px]",
  h3: "font-semibold text-[22px] sm:text-lg md:text-xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-[17px]",
  body1: "text-base",
  body2: "text-[15px]",
  body3: "text-sm",
  body4: "text-[13px]",
  body5: "font-normal text-xs",
};

const Text = ({ children, className = "", variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variant && variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
