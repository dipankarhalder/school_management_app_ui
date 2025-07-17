import { useState } from "react";
import { InputWrapper, StyledInput, Chip } from "./style";

export const MultiValueInput = ({ value = [], onChange, placeholder = "" }) => {
  const [input, setInput] = useState("");

  const addValue = (val) => {
    const trimmed = val.trim();
    if (!trimmed || value.includes(trimmed)) return;

    const newValue = [...value, trimmed];
    onChange?.(newValue);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue(input);
    }
  };

  const handleRemove = (val) => {
    const newValue = value.filter((v) => v !== val);
    onChange?.(newValue);
  };

  return (
    <InputWrapper>
      {value.map((val) => (
        <Chip key={val}>
          {val}
          <span onClick={() => handleRemove(val)}>×</span>
        </Chip>
      ))}
      <StyledInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};
