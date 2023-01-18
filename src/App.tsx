import { useEffect, useState } from 'react';
/*import reactLogo from './assets/react.svg'*/
import './App.css';


const WIN =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

const INITIAL_STATE = new Array(9). fill ("")

enum Player {
  X = "X",
  O= "O"
}

enum Status{
  Playing,
  Draw,
  XWon,
  OWon,
}

function App() {
  const [turn, setTurn] = useState<Player>(Player.X)
  const [cells, setCells] = useState<(Player | "" )[]>(INITIAL_STATE);
  const [status, setStatus] = useState <Status> (Status.Playing)
  const [scoreboard, setScoreboard] = useState <Record <Player, number>> (() => ({
    [Player.X]: 0,
    [Player.O]: 0,
  }));

  function handleClick(index:number){
    if(status !== Status.Playing) return;

    const draft = [...cells];

    if (draft[index] === "") {
      draft [index] = turn;
      setTurn ((turn) => (turn === Player.X ? Player.O : Player.X));
      setCells(draft);
  }
  }

  function handleReset(){
    setCells (INITIAL_STATE);
    setStatus (Status.Playing);
  }

  useEffect(()=>{
    let winner: Player | undefined;

    for(let player of [Player.X, Player.O]){
      const hasWon = WIN.some(comp => {
        return comp.every (cell => {
          return player === cells[cell]
        })
      })
      if (hasWon){
        winner = player;
      }

      console.log(winner);
    }

    if(winner=== Player.X){
      setStatus(Status.XWon)
      setScoreboard (scoreboard => ({...scoreboard, [Player.X]: scoreboard [Player.X] + 1}))
    } else if (winner === Player.O ){
      setStatus(Status.OWon)
      setScoreboard (scoreboard => ({...scoreboard, [Player.O]: scoreboard [Player.O] + 1}))
    } else if (!cells.some((cell) => cell === "")){
      setStatus(Status.Draw)
    }
    
  }, [cells])

  console.log(turn)

  return (
    <main>
      <section className='turnos'>
        <p>Turno de: {turn}</p>
      </section>
      <div className="board">
      {cells.map( (cell, index) => (
        <div key={index} className="cell" onClick={() =>handleClick(index)}>
          {cell}
        </div>
      ))}
    </div>
    <section className='winners'>
      <p>
        Team X Ganó: {scoreboard[Player.X]}
      </p>
      <p>
        Team O Ganó: {scoreboard[Player.O]}
      </p>
    </section>
    {status !== Status.Playing &&
    (
      <section className='result'>
        <article role="alert">
        {status === Status.Draw && "EMPATE!" }
        {status === Status.XWon && "GANÓ TEAM 'X"}
        {status === Status.OWon && "GANÓ TEAM 'O'"}
    </article>
      </section>
    
    )}
    <section className='boton'>
    <button onClick={handleReset}>
      Reset
    </button>
    </section>
    </main>
    
  )
}

export default App
