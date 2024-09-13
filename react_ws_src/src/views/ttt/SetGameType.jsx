import React, { useCallback } from "react";
import { useGameContext } from "../../contexts/GameContext";
import Button from "../../components/atoms/Button.jsx";
const SetGameType = () => {
  // No Prop Drilling. Use Context Api to share, access and update shared parent state
  const { saveGameType, gameStep } = useGameContext();
  // Use useCallback to memoize event handlers
  const selTypeLive = useCallback(() => {
    saveGameType("live");
  }, [saveGameType]);

  const selTypeComp = useCallback(() => {
    saveGameType("comp");
  }, [saveGameType]);
  // show this section only when is the step to select a game type
  if (gameStep !== "set_game_type") {
    return null;
  }

  return (
    <div>
      <h1>Choose game type</h1>
      <Button
        text="Live against another player"
        onClick={selTypeLive}
        className="long"
        isRightIcon
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        text=" Against a computer"
        onClick={selTypeComp}
        className="long"
        isRightIcon
      />
    </div>
  );
};

export default SetGameType;
