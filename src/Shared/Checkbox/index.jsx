import React, { forwardRef } from "react";
import { StyledCheckboxWrapper, StyledCheckbox, StyledLabel } from "./style";

export const Checkbox = forwardRef(
  ({ label, id, name, className = "", ...props }, ref) => {
    return (
      <StyledCheckboxWrapper className={className}>
        <StyledCheckbox
          type="checkbox"
          id={id}
          name={name}
          ref={ref}
          {...props}
        />
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
      </StyledCheckboxWrapper>
    );
  }
);
