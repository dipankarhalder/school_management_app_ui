import { useWatch } from "react-hook-form";
import { AppFromField, AppPhoneCover, AppErrorMessage } from "../style";

const countryOptions = [
  { code: "+91", label: "IN" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AU" },
  { code: "+1", label: "CA" },
];

const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  const [, part1, part2, part3] = match;
  return [part1, part2, part3].filter(Boolean).join("-");
};

export const PhoneInput = ({ name, label, control, errors, setValue }) => {
  const error = errors?.[name];
  const phoneValue = useWatch({ control, name }) || {
    countryCode: "+91",
    number: "",
  };

  const formattedNumber = formatPhoneNumber(phoneValue.number || "");

  const handleNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue(name, { ...phoneValue, number: raw }, { shouldValidate: true });
  };

  const handleCodeChange = (e) => {
    setValue(
      name,
      { ...phoneValue, countryCode: e.target.value },
      { shouldValidate: true }
    );
  };

  return (
    <AppFromField>
      <label htmlFor={name}>{label}</label>
      <AppPhoneCover>
        <select
          value={phoneValue.countryCode}
          id="countryCode"
          onChange={handleCodeChange}
        >
          {countryOptions.map(({ code, label }) => (
            <option key={code + label} value={code}>
              {label} ({code})
            </option>
          ))}
        </select>
        <input
          type="text"
          id={name}
          inputMode="numeric"
          placeholder="123-456-7890"
          maxLength={12}
          value={formattedNumber}
          onChange={handleNumberChange}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          autoComplete="tel"
        />
      </AppPhoneCover>
      {error && (
        <AppErrorMessage id={`${name}-error`}>
          {error?.number?.message || error.message}
        </AppErrorMessage>
      )}
    </AppFromField>
  );
};
