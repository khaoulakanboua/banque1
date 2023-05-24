import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "../ErrorMessage";

const variants = {
  srcFillGray101: "bg-gray_101",
  OutlineGray300: "bg-white_A700 border border-gray_300 border-solid",
  GradientWhiteA70026WhiteA70026: "bg-gradient ",
};
const shapes = {
  srcCircleBorder25: "rounded-[25px]",
  RoundedBorder15: "rounded-[15px]",
  CustomBorderBL25: "rounded-bl-[25px] rounded-br-[25px]",
};
const sizes = {
  smSrc: "p-4",
  sm: "p-4",
  md: "pb-5 pt-4 px-4",
  lg: "p-[21px] sm:px-5",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      onChange,

      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ""} 
              ${variants[variant] || ""} 
              ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf([
    "srcCircleBorder25",
    "RoundedBorder15",
    "CustomBorderBL25",
  ]),
  variant: PropTypes.oneOf([
    "srcFillGray101",
    "OutlineGray300",
    "GradientWhiteA70026WhiteA70026",
  ]),
  size: PropTypes.oneOf(["smSrc", "sm", "md", "lg"]),
};

Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "",
  variant: "",
  size: "",
};

export { Input };
