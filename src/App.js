import './App.css';
import TimeSelector from './components/timeSelector.js';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
  const [timerOn, setTimerOn] = useState(false);

  let interval = useRef();

  useEffect(() => {
    if (secondsLeft > 0) {
      if (timerOn) startTimer();
      else stopTimer();
    } else {
      stopTimer(interval.current);
    }
  }, [timerOn]);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 100);
  };

  const stopTimer = () => {
    clearInterval(interval.current);
  };

  const clockify = () => {
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = Math.floor(secondsLeft - minutes * 60);
    let clockifiedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let clockifiedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${clockifiedMinutes}:${clockifiedSeconds}`;
  };

  const reset = () => {
    stopTimer();
    setBreakLength(5);
    setSessionLength(25);
    setSecondsLeft(25 * 60);
  };

  const breakIncrement = () => {
    if (breakLength === 60) return;
    setBreakLength(breakLength + 1);
  };

  const breakDecrement = () => {
    if (breakLength === 1) return;
    setBreakLength(breakLength - 1);
  };

  const sessionIncrement = () => {
    if (sessionLength === 60) return;
    setSessionLength(sessionLength + 1);
  };

  const sessionDecrement = () => {
    if (sessionLength === 1) return;
    setSessionLength(sessionLength - 1);
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
