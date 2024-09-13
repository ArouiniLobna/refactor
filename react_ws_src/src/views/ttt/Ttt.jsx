import React from "react";
import { useGameContext } from "../../contexts/GameContext.js";
import SetName from "./SetName.jsx";
import SetGameType from "./SetGameType.jsx";
import GameMain from "./GameMain.jsx";

const Ttt = () => {
  const { gameStep } = useGameContext();
  return (
    <section id="TTT_game">
      <div id="page-container">
        {gameStep === "set_name" && <SetName />}

        {gameStep !== "set_name" && (
          <div>
            <h2>Welcome, {app.settings.curr_user.name}</h2>
          </div>
        )}

        <SetGameType />
        {gameStep === "start_game" && <GameMain />}
      </div>
    </section>
  );
};

export default Ttt;
