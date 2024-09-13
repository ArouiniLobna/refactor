import React, { useEffect } from "react";
import GameCell from "../../components/atoms/GameCell.jsx";
import useTicTacToe from "../../hooks/useTicTacToe";
import { useGameContext } from "../../contexts/GameContext";
import Button from "../../components/atoms/Button.jsx";
const GameMain = () => {
  const { gameType, gameEnd } = useGameContext();
  const {
    isNextTurnPlayer,
    gamePlay,
    gameStat,
    endGame,
    cellVals,
    handleCellClick,
  } = useTicTacToe(gameType, gameEnd);

  useEffect(() => {
    TweenMax.from("#game_stat", 1, {
      display: "none",
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeIn,
    });
    TweenMax.from("#game_board", 1, {
      display: "none",
      opacity: 0,
      x: -200,
      y: -200,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeIn,
    });
  }, []);

  // Helper function to generate cells
  const renderCell = (id, extraClasses = "") => (
    <GameCell
      key={id}
      id={id}
      cellVals={cellVals}
      handleCellClick={handleCellClick}
      className={extraClasses}
      disabled={gameStat !== "Start game" || !isNextTurnPlayer}
    />
  );

  // Cell rows
  const rows = [
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
  ];

  return (
    <div>
      <h1>Play {gameType}</h1>
      <div id="game_stat">
        <div id="game_stat_msg">{gameStat}</div>
        {gamePlay && (
          <div id="game_turn_msg">
            {isNextTurnPlayer ? (
              <span className="green">Your turn</span>
            ) : (
              <span className="purple">Opponent turn</span>
            )}
          </div>
        )}
      </div>
      <div id="game_board">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cellId, cellIndex) => {
                  // Determine extra classes based on position
                  const extraClasses = `${rowIndex === 1 ? "hbrd" : ""} ${
                    cellIndex === 1 ? "vbrd" : ""
                  }`;
                  return renderCell(cellId, extraClasses);
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button text="End Game" onClick={endGame} />
    </div>
  );
};

export default GameMain;
