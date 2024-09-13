import { useState, useCallback } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = useCallback((event) => {
    const newValue = event.target.value.trim();
    setValue(newValue);
    setIsButtonDisabled(newValue === "");
  }, []);

  return {
    value,
    isButtonDisabled,
    handleChange,
    setValue,
  };
};

export default useInput;
