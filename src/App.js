import './App.css';
import TimeSelector from './components/timeSelector.js';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [isSession, setIsSession] = useState(true);

  let interval = useRef();

  useEffect(() => {
    if (timerOn) startClock();
    else stopClock();
  }, [timerOn]);

  const startClock = () => {
    interval.current = setInterval(() => {
      setSecondsLeft(prevTime => {
        if (prevTime > 0) return prevTime - 1;
        else {
          // return a function that returns the new secondsLeft depending on if break or session.
          // For now so doesnt break!
          return 0;
        }
      });
    }, 1000);
  };

  const stopClock = () => {
    clearInterval(interval.current);
  };

  const clockify = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = Math.floor(secondsLeft - minutes * 60);

    const clockifiedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const clockifiedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${clockifiedMinutes}:${clockifiedSeconds}`;
  };

  const breakIncrement = () => {
    if (breakLength === 60 || timerOn) return;
    setBreakLength(breakLength => breakLength + 1);
  };

  const breakDecrement = () => {
    if (breakLength === 1 || timerOn) return;
    setBreakLength(breakLength => breakLength - 1);
  };

  const sessionIncrement = () => {
    if (sessionLength === 60 || timerOn) return;
    setSessionLength(sessionLength => sessionLength + 1);
    setSecondsLeft(prevSeconds => prevSeconds + 60);
  };

  const sessionDecrement = () => {
    if (sessionLength === 1 || timerOn) return;
    setSessionLength(sessionLength => sessionLength - 1);
    setSecondsLeft(prevSeconds => prevSeconds - 60);
  };

  const reset = () => {
    clearInterval(interval.current);
    setTimerOn(false);
    setSessionLength(25);
    setBreakLength(5);
    setSecondsLeft(25 * 60);
  };

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>

      {/* Select session and break times */}
      <TimeSelector
        title="Break Length"
        titleId="break-label"
        time={breakLength}
        timeID="break-length"
        decrementBtnId="break-decrement"
        incrementBtnId="break-increment"
        increment={breakIncrement}
        decrement={breakDecrement}
      />
      <TimeSelector
        title="Session Length"
        titleId="session-label"
        timeID="session-length"
        time={sessionLength}
        decrementBtnId="session-decrement"
        incrementBtnId="session-increment"
        increment={sessionIncrement}
        decrement={sessionDecrement}
      />

      {/* Time Left */}
      <div className="timer-container">
        <h3 id="timer-label">Session</h3>
        <p id="time-left">{clockify()}</p>
      </div>

      {/* Timer controls */}
      <div className="timer-controls">
        <button id="start_stop" onClick={() => setTimerOn(timerOn => !timerOn)}>
          Start/Stop
        </button>
        <button id="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
