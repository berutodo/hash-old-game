import { useEffect, useState } from "react";
import "../styles.css";
export default function Dashboad() {
  // Falta uma função de recomecar o jogo
  const [tabuleiro, setTabuleiro] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState("");
  const [player, setPlayer] = useState(true);
  const [rodadas, setRodadas] = useState(1);
  const winningProbability = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 5, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6]
  ];
  // Falta travar o Jogo dps de vencer
  const checkWinner = () => {
    if (winningProbability.some((i) => i.every((j) => tabuleiro[j] === 1))) {
      return setWinner("X");
    }
    if (winningProbability.some((i) => i.every((j) => tabuleiro[j] === 2))) {
      return setWinner("O");
    }
  };
  useEffect(() => {
    checkWinner();
  }, [tabuleiro]);
  // Problemas Atuais > Vencedor >
  // Avoid same click on the same square 2 times
  const handleClick = (index) => {
    //Cancela jogadas em Valores já jogados
    if (tabuleiro[index] !== 0) {
      return;
    }
    // Cria o novo tabuleiro
    setTabuleiro((prev) => {
      const newTabuleiro = [...prev];
      newTabuleiro[index] = player ? 1 : 2;
      return newTabuleiro;
    });
    // Controle de jogadas para anular o tabuleiro
    setRodadas(rodadas + 1);
    console.log(rodadas);
    setPlayer(!player);
  };
  return (
    <div>
      {player ? "Player 1 : X" : "Player 2 : O"}
      {winner && <h2>O Campeão é {winner}</h2>}
      <div className="dashboard">
        {tabuleiro.map((e, index) => (
          <div
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {e === 1 && "X"}
            {e === 2 && "O"}
          </div>
        ))}
      </div>
    </div>
  );
}
