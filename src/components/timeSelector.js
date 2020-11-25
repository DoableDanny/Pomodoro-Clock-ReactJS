import React from 'react';

export default function TimeSelector({
  title,
  titleId,
  decrementBtnId,
  incrementBtnId,
  time,
  timeID,
  increment,
  decrement,
}) {
  return (
    <div className="time-selector">
      <h3 id={titleId}>{title}</h3>
      <div className="time-buttons">
        <button id={decrementBtnId} onClick={decrement}>
          -
        </button>
        <span id={timeID}>{time}</span>
        <button id={incrementBtnId} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}
