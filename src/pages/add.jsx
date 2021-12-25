import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Add = ({ addPlan, generateAutoIncrement }) => {
  const [dataTimes, setDataTimes] = useState();

  const [typeTimer, setTypeTimer] = useState("Stopwatch");
  const history = useHistory();

  const addNewWorkoutTime = () => {
    addPlan(dataTimes);
    history.push("/");
  };

  const changeSelectValue = (e) => {
    setTypeTimer(e.target.value);
    switch (typeTimer) {
      case "Stopwatch":
        return setDataTimes({
          id: generateAutoIncrement(),
          type: "Stopwatch",
          value: 0,
          count: 0
        });
      case "XY":
        return setDataTimes({
          id: generateAutoIncrement(),
          type: "XY",
          xy: {
            round: 0,
            value: 0,
            count: 0
          },
        });
      case "Countdown":
        return setDataTimes({
          id: generateAutoIncrement(),
          type: "Countdown",
          value: 0,
          count: 0
        });
      case "TABATA":
        return setDataTimes({
          id: generateAutoIncrement(),
          type: "TABATA",
          tabata: {
            round: 0,
            workSecond: 0,
            restSecond: 0,
            restSecondCount: 0,
            count: 0
          },
        });
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="add_page">
        <h1 className="title">Add</h1>
        <select
          className="type_timer"
          onChange={(e) => {
            changeSelectValue(e);
          }}
        >
          <option value="Stopwatch">Type: Stopwatch</option>
          <option value="XY">Type: XY</option>
          <option value="Countdown">Type: Countdown</option>
          <option value="TABATA">Type: TABATA</option>
        </select>
        {typeTimer === "Stopwatch" && (
          <div className="set_timer">
            <span>Start time: </span>
            <input
              type="number"
              onChange={(e) => {
                setDataTimes({
                  id: generateAutoIncrement(),
                  start: false,
                  finish: false,
                  type: "Stopwatch",
                  value: parseInt(e.target.value),
                  count: 0,
                });
              }}
            />
          </div>
        )}
        {typeTimer === "XY" && (
          <div className="set_timer_block">
            <div className="set_timer">
              <span>Rounds: </span>
              <input
                type="number"
                placeholder="0"
                onChange={(e) => {
                  setDataTimes({
                    id: generateAutoIncrement(),
                    start: false,
                    finish: false,
                    type: "XY",
                    xy: {
                      ...dataTimes.xy,
                      round: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="set_timer">
              <span>Second: </span>
              <input
                type="number"
                onChange={(e) => {
                  setDataTimes({
                    id: generateAutoIncrement(),
                    start: false,
                    finish: false,
                    type: "XY",
                    xy: {
                      ...dataTimes.xy,
                      value: parseInt(e.target.value),
                      count: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>
          </div>
        )}
        {typeTimer === "Countdown" && (
          <div className="set_timer">
            <span>Start time: </span>
            <input
              type="number"
              onChange={(e) => {
                setDataTimes({
                  id: generateAutoIncrement(),
                  start: false,
                  finish: false,
                  type: "Countdown",
                  count: parseInt(e.target.value),
                });
              }}
            />
          </div>
        )}
        {typeTimer === "TABATA" && (
          <div className="set_timer_block">
            <div className="set_timer">
              <span>Rounds: </span>
              <input
                type="number"
                placeholder="0"
                onChange={(e) => {
                  setDataTimes({
                    id: generateAutoIncrement(),
                    start: false,
                    finish: false,
                    type: "TABATA",
                    tabata: {
                      ...dataTimes.tabata,
                      round: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="set_timer">
              <span>Work second: </span>
              <input
                type="number"
                onChange={(e) => {
                  setDataTimes({
                    id: generateAutoIncrement(),
                    start: false,
                    finish: false,
                    type: "TABATA",
                    tabata: {
                      ...dataTimes.tabata,
                      workSecond: parseInt(e.target.value),
                      count: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>
            <div className="set_timer">
              <span>Rest second: </span>
              <input
                type="number"
                onChange={(e) => {
                  setDataTimes({
                    id: generateAutoIncrement(),
                    start: false,
                    finish: false,
                    type: "TABATA",
                    tabata: {
                      ...dataTimes.tabata,
                      restSecond: parseInt(e.target.value),
                      restSecondCount: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>
          </div>
        )}
        <button type="button" className="btnAdd" onClick={addNewWorkoutTime}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
