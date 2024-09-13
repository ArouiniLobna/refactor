import React from "react";

const Button = ({
  text,
  isRightIcon,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text} {isRightIcon && <span className="fa fa-caret-right"></span>}
    </button>
  );
};

export default Button;
