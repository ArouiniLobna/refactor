import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

// Create Context
const GameContext = createContext();

// Create a custom hook to use the GameContext with error handling
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

// Create a provider component
export const GameProvider = ({ children }) => {
  const [gameStep, setGameStep] = useState(getInitialGameStep());
  const [gameType, setGameType] = useState(null);

  function getInitialGameStep() {
    const currUser = app.settings.curr_user;
    if (!currUser || !currUser.name) return "set_name";

    if (!gameType) return "set_game_type";
    return "start_game";
  }

  const saveUserName = (name) => {
    app.settings.curr_user = { name };
    updateGameStep();
  };

  // when we select a game type (vs machine or person), we start the game board

  const saveGameType = (type) => {
    setGameType(type);
    setGameStep("start_game");
  };

  // when game finishes, we go back to game type selection
  const gameEnd = () => {
    setGameType(null);
    setGameStep("set_game_type");
  };

  function updateGameStep() {
    setGameStep(getInitialGameStep());
  }

  const value = useMemo(
    () => ({
      gameStep,
      gameType,
      saveUserName,
      saveGameType,
      gameEnd,
    }),
    [gameStep, gameType, saveUserName, saveGameType, gameEnd]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
