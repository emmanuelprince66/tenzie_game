import './App.css';
import React from 'react';
import Die from './components/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid'
import { useEffect } from 'react';
import Confet from './components/Confet';
import Timer from './components/Timer';

function App() {

  const [dice , setDice] = useState(allNewDice())
  const [counter , setCounter] = useState(0) 
  const [Tenzies , setTenzies] = useState(false)

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);


  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
     handleStart()  
  }, [])
  
  
  function handleStart  ()  {
    setIsActive(true);
    setIsPaused(false);
  };

  function holdDice (id) {
    setDice(oldDice => oldDice.map(die => {
      return id === die.id ? 
      { ...die , held:!die.held } :
      die
    }))
  }

  //End game
 useEffect(() => {
   const allHeld = dice.every(die => die.held);
   const fisrtValue = dice[0].value;
   const allTheSame = dice.every(die => fisrtValue === die.value)
   
   if(allHeld && allTheSame ) { 
    setTenzies(true);
    setIsPaused(paused => !paused)

   } 
 }, [dice])
   
   
  function generateNewDie () {
    return {
      value:Math.ceil(Math.random() * 6 ), 
      held:false,
      id:nanoid()
     }
  }
  function allNewDice () {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
      
    }
    return newDice
  }



  function rollDice () {
    setCounter(counter + 1)

    if(!Tenzies) {
        setDice(oldDice => oldDice.map(die => {
        return die.held ? die : generateNewDie();
      }));
    } else {
      setTenzies(false)
      setDice(allNewDice())
      handleStart();
      setTime(0);
    }
    
  }

  const diceElements = dice.map(die => <Die
     key={die.id} 
     held={die.held}
     value={die.value}
     id={die.id}
     holdDice={holdDice}
     />)
 
  return (
    <div className="app">
      <main>
        <h1><Timer time={time}/></h1>
      <span className='tenzies_mobile'>{Tenzies ? <Confet width={700} height={500}/> : ''}</span>
        <h1 className='title'>Tenzies</h1>
        <h1 className='win'>{ Tenzies ? 'Congratulations': ''}</h1>
        <p className='instructions'>Roll untill all dice are the same. click each die to freeze it
        at it's current value between rolls. </p>
        <div className='dice_container' >
        {diceElements}
        </div>
        <button className='roll-dice' onClick={rollDice}>{ Tenzies ? 'New Game' : 'Roll'}</button>
        <p className=' counter'>{ Tenzies ? `you won with ${counter} rolls` : ''}</p>
      </main>
      <div className="copyright">
          &copy;Copyright OCHITECH 2022. All Right Reserved. Designed and Developed
          by
          <a
            href="https://wa.me/+2348168465081"
            target="_blank" 
            rel="noreferrer"
          >
            <p>Emmanuel ochigbo</p>
          </a>
        </div>
    </div>
  );
}

export default App;
