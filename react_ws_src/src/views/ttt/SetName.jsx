import React from "react";
import { useGameContext } from "../../contexts/GameContext";
import useInput from "../../hooks/useInput";
import Button from "../../components/atoms/Button.jsx";

const SetName = () => {
  // access directly from context Api
  // Avoid Props drilling
  const { saveUserName } = useGameContext();
  const { value, isButtonDisabled, handleChange } = useInput("");

  const saveName = () => {
    saveUserName(value);
  };

  return (
    <div>
      <h1>Set Name</h1>
      <div className="input_holder left">
        <label>Name </label>
        <input
          type="text"
          className="input name"
          placeholder="Name"
          value={value}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        onClick={saveName}
        disabled={isButtonDisabled}
        text="SAVE"
        isRightIcon
      />
    </div>
  );
};

export default SetName;
