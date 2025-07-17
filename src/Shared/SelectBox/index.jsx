import { StyledSelect } from "./style";

export const SelectBox = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <StyledSelect
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    >
      <option value="">{placeholder}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
};
