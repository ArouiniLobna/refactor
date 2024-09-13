// both GameMain and GameCell components use the same instance of the useTicTacToe hook,
// meaning the cellVals state should be passed down as props from the parent component.

import React, { memo } from "react";

const GameCell = memo(
  ({ id, className = "", cellVals, handleCellClick, disabled = false }) => {
    return (
      <td
        id={`game_board-${id}`}
        className={`${className} ${disabled && "disabled"}`}
        onClick={() => handleCellClick(id)}
      >
        {cellVals[id] === "x" && <i className="fa fa-times fa-5x" />}
        {cellVals[id] === "o" && <i className="fa fa-circle-o fa-5x" />}
      </td>
    );
  }
);

export default memo(GameCell);
