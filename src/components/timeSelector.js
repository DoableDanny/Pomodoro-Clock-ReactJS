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
    <div>
      <h3 id={titleId}>{title}</h3>
      <div>
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
