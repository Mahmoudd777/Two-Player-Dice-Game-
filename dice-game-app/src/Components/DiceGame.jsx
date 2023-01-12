//import "./App.css";

import React, { useState } from "react";

import dice1 from "../assts/dice1.png"
import dice2 from "../assts/dice2.png"
import dice3 from "../assts/dice3.png"
import dice4 from "../assts/dice4.png"
import dice5 from "../assts/dice5.png"
import dice6 from "../assts/dice6.png"
import { v4 as uuidv4 } from "uuid";

function DiceGame() {
  const [player1, setPlayer1] = useState({
    id: uuidv4(),
    name: "",
    gender: "",
    score: 0,
    wins: 0
  });

  const [player2, setPlayer2] = useState({
    id: uuidv4(),
    name: "",
    gender: "",
    score: 0,
    wins: 0
  });

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceRoll, setDiceRoll] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  const handlePlayer1Details = (event) => {
    setPlayer1({ ...player1, [event.target.name]: event.target.value });
  };

  const handlePlayer2Details = (event) => {
    setPlayer2({ ...player2, [event.target.name]: event.target.value });
  };

  const startGame = () => {
    setGameInProgress(true);
    setPlayer1({ ...player1, score: 0 });
    setPlayer2({ ...player2, score: 0 });
  };
  var diceIcons = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
  ]
const[dice0, setdice0] =useState(diceIcons[0])
  const rollDice = () => {
    if (!gameInProgress) {
      alert("Please start a new game");
      return;
    }
    var roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    let currentPlayerScore;
    let nextPlayer;
    if (currentPlayer === 1) {
      currentPlayerScore = player1.score + roll;
      if (currentPlayerScore >= 20) {
        setPlayer1({ ...player1, score: currentPlayerScore, wins: player1.wins + 1 });
        setGameInProgress(false);
        setGameHistory([
          ...gameHistory,
          { winner: player1.name, date: new Date().toLocaleString() }
        ]);
        alert(`${player1.name} wins!`);
        return;
        
      }
      setPlayer1({ ...player1, score: currentPlayerScore });
      nextPlayer = 2;
    } else {
      currentPlayerScore = player2.score + roll;
      if (currentPlayerScore >= 20) {
        setPlayer2({ ...player2, score: currentPlayerScore, wins: player2.wins + 1 });
        setGameInProgress(false);
        setGameHistory([
          ...gameHistory,
          { winner: player2.name, date: new Date().toLocaleString() }
        ]);
        alert(`${player2.name} wins!`);
        return;
      }
      setPlayer2({ ...player2, score: currentPlayerScore });
      nextPlayer = 1;
    }
    setCurrentPlayer(nextPlayer);
    setdice0(diceIcons[roll-1]);
  };

  const quitGame = () => {
    if (!gameInProgress) {
        alert("There is no game in progress");
        return;
      }
      setGameInProgress(false);
      setPlayer1({ ...player1, score: 0 });
      setPlayer2({ ...player2, score: 0 });
      setDiceRoll(0);
      alert("The game has been quit");
    };
  
    return (
        <div className="App">
          <h1 className="text-3xl">Two Player Dice Game</h1>
          <div className="flex">
            
            <div className="w-1/2">
              <h2 className="text-xl mb-4">Player 1</h2>
              <form>
                <label className="block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={player1.name}
                    onChange={handlePlayer1Details}
                    className="form-input mt-1 ml-2"
                  />
                </label>
                <label className="block mt-4">
                  Gender:
                  <select className="border rounded-md p-2 m-2" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
                </label>
              </form>
              <div className="mt-4">
                <h3 className="text-lg">Score: {player1.score}</h3>
                <h3 className="text-lg">Wins: {player1.wins}</h3>
              </div>
            </div>
            
            <img className="  h-48 w-auto mt-3" src={dice0}></img>
            
            <div className="w-1/2">
              <h2 className="text-xl mb-4">Player 2</h2>
              <form>
                <label className="block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={player2.name}
                    onChange={handlePlayer2Details}
                    className="form-input mt-1 ml-2"
                  />
                </label>
                <label className="block mt-4">
                  Gender:
                  <select className="border rounded-md p-2 m-2" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
                </label>
              </form>
              <div className="mt-4">
                <h3 className="text-lg">Score: {player2.score}</h3>
                <h3 className="text-lg">Wins: {player2.wins}</h3>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button onClick={startGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Start Game
            </button>
            
        <button onClick={rollDice} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
        Roll Dice
      </button>
      <button onClick={quitGame} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
        Quit Game
      </button>
    </div>
    <div className="mt-8">
      <h2 className="text-xl">Game History</h2>
      <ul>
        {gameHistory.map((game) => (
          <li key={uuidv4()}>
            {game.winner} won on {game.date}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
export default DiceGame    