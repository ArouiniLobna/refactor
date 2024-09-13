import { useState, useEffect, useRef } from "react";
import { TweenMax } from "gsap";
import io from "socket.io-client";
import randArrElem from "../helpers/rand_arr_elem";
import randToFro from "../helpers/rand_to_fro";

const useTicTacToe = (gameType, onEndGame) => {
  const winSets = useRef([
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
    ["c1", "c4", "c7"],
    ["c2", "c5", "c8"],
    ["c3", "c6", "c9"],
    ["c1", "c5", "c9"],
    ["c3", "c5", "c7"],
  ]);

  const [cellVals, setCellVals] = useState({});
  const cellValsRef = useRef(cellVals);
  const [isNextTurnPlayer, setIsNextTurnPlayer] = useState(true);
  const [gamePlay, setGamePlay] = useState(gameType !== "live");
  const [gameStat, setGameStat] = useState("Start game");
  const [socket, setSocket] = useState(null);

  // Handle socket connection if it's a live game
  useEffect(() => {
    if (gameType === "live") {
      const sock = io(app.settings.ws_conf.loc.SOCKET__io.u);
      sock.on("connect", () => {
        sock.emit("new player", { name: app.settings.curr_user.name });
      });
      sock.on("pair_players", (data) => {
        setIsNextTurnPlayer(data.mode === "m");
        setGamePlay(true);
        setGameStat(`Playing with ${data.opp.name}`);
      });
      sock.on("opp_turn", (data) => turnOpponentLive(data.cell_id));
      setSocket(sock);

      return () => sock.disconnect();
    }
  }, [gameType]);

  const handleCellClick = (cellId) => {
    if (!isNextTurnPlayer || !gamePlay || cellVals[cellId]) return;
    if (gameType === "live") turnPlayerLive(cellId);
    else turnPlayerComp(cellId);
  };

  const turnPlayerLive = (cellId) => {
    updateCell(cellId, "x");
    socket.emit("ply_turn", { cell_id: cellId });
    checkTurn();
  };

  const turnPlayerComp = (cellId) => {
    updateCell(cellId, "x");

    setTimeout(() => turnComp(), randToFro(500, 1000)); // Trigger computer's move

    checkTurn();
  };

  const turnComp = () => {
    // Ensure you're only checking "c1" to "c9" cells
    const emptyCells = [];
    for (let i = 1; i <= 9; i++) {
      const cellId = `c${i}`;
      if (!cellValsRef.current[cellId]) {
        emptyCells.push(cellId);
      }
    }

    const randomCell = randArrElem(emptyCells);
    updateCell(randomCell, "o");
    setTimeout(() => checkTurn(), randToFro(500, 1000)); // has set timeout until cell updated before running check
    // checkTurn();
  };

  const turnOpponentLive = (cellId) => {
    updateCell(cellId, "o");
    checkTurn();
  };

  const updateCell = (cellId, value) => {
    setCellVals((prev) => {
      const newCellVals = Object.assign({}, prev, { [cellId]: value });

      cellValsRef.current = newCellVals;
      return newCellVals;
    });
    TweenMax.from(`#${cellId}`, 0.7, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeOut,
    });
  };

  const checkTurn = () => {
    const { current: cellVals } = cellValsRef; // Always use the latest cell values

    let win = false;
    let set;
    let fin = true;
    console.log(cellVals);
    // Check for a win
    for (let i = 0; !win && i < winSets.current.length; i++) {
      set = winSets.current[i];

      if (
        cellVals[set[0]] &&
        cellVals[set[0]] === cellVals[set[1]] &&
        cellVals[set[0]] === cellVals[set[2]]
      ) {
        win = true;
      }
    }
    // Check if the board is full
    for (let i = 1; i <= 9; i++) {
      if (!cellVals[`c${i}`]) {
        fin = false;
        break;
      }
    }

    if (win) {
      // Add 'win' class to the winning cells
      set.forEach((cellId) => {
        const cellElement = document.getElementById(`game_board-${cellId}`);
        if (cellElement) {
          cellElement.classList.add("win"); // Add 'win' class
        }
      });
      // If someone won, display the result and end the game
      setGameStat(`${cellVals[set[0]] == "x" ? "You" : "Opponent"} win`);
      setGamePlay(false);
      TweenMax.killAll(true);
      TweenMax.from("td.win", 1, { opacity: 0, ease: Linear.easeIn });
      socket && socket.disconnect();
    } else if (fin) {
      // If the board is full and no one won, it's a draw
      setGameStat("Draw");
      setGamePlay(false);
      socket && socket.disconnect();
    } else {
      // Continue the game if no win/draw
      setIsNextTurnPlayer((prev) => !prev); // Toggle turn
    }
  };

  const endGame = () => {
    socket && socket.disconnect();
    onEndGame();
  };

  return {
    cellVals,
    isNextTurnPlayer,
    gamePlay,
    gameStat,
    handleCellClick,
    endGame,
  };
};

export default useTicTacToe;
