import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ plans, setPlans }) => {
  const [plansIsStart, setPlansIsStart] = useState(false);
  const timer = useRef("initial");

  const startPlans = () => {
    plans.map((plan) => {
      if (!plan.start && !plan.finish && timer.current === "initial") {
        let planInterval = setInterval(() => {
          setPlans(
            plans.map((planItem) => {
              if (planItem.id !== plan.id) return planItem;
              if (planItem.type === "Stopwatch") {
                console.log(planItem);
                if (planItem.count === planItem.value) {
                  planItem.finish = true;
                  timer.current = "stopped";
                  clearInterval(planInterval);
                } else {
                  // planItem.count;
                  planItem.count = parseInt(planItem.count) + 1;
                  // planItem.count++;
                  console.log(planItem.value);
                }
                return planItem;
              } else if (planItem.type === "Countdown") {
                if (planItem.count === 0) {
                  planItem.finish = true;
                  timer.current = "stopped";
                  clearInterval(planInterval);
                } else {
                  planItem.count = planItem.count - 1;
                }
                return planItem;
              } else if (planItem.type != null && planItem.type === "XY") {
                if (planItem.value === 0) {
                  planItem.finish = true;
                  timer.current = "stopped";
                  clearInterval(planInterval);
                } else {
                  if (planItem.xy.value == 0 && planItem.xy.round == 0) {
                    planItem.finish = true;
                    timer.current = "stopped";
                    clearInterval(planInterval);
                  } else {
                    if (planItem.xy.value == 0) {
                      planItem.xy.round = planItem.xy.round - 1;
                      if (planItem.xy.round > 0) {
                        planItem.xy.value = planItem.xy.count;
                      }
                    } else {
                      planItem.xy.value = planItem.xy.value - 1;
                    }
                  }
                }
                return planItem;
              } else if (planItem.type === "TABATA") {
                if (planItem.tabata.workSecond == 0 && planItem.tabata.round <= 1 && planItem.tabata.restSecond == 1) { // Me
                  planItem.tabata.round = 0; // Me
                  planItem.tabata.restSecond = 0;
                  planItem.finish = true;
                  timer.current = "stopped";
                  clearInterval(planInterval);
                } else {
                  if (planItem.tabata.workSecond == 0) {
                    if (planItem.tabata.count == planItem.tabata.workSecond) {
                      if (planItem.tabata.restSecond == 0) {
                        planItem.tabata.workSecond = planItem.tabata.count;

                        if (planItem.tabata.round > 1) planItem.tabata.restSecond = planItem.tabata.restSecondCount;
                        // planItem.tabata.round = planItem.tabata.round - 1;

                        // Me
                        if (planItem.tabata.round === 1) {
                          planItem.tabata.round = 0;
                          planItem.tabata.restSecond = planItem.tabata.restSecond - 1;
                        } else {
                          planItem.tabata.round = planItem.tabata.round - 1;
                        }
                        // Me
                      }
                    } else {
                      if (planItem.tabata.round > 0) planItem.tabata.restSecond = planItem.tabata.restSecond - 1;
                      if (planItem.tabata.restSecond == 0) {
                        // Me
                        if (planItem.tabata.round === 1) {
                          planItem.tabata.round = 0;
                          planItem.tabata.restSecond = planItem.tabata.restSecond - 1;
                        } else {
                          planItem.tabata.round = planItem.tabata.round - 1;
                        }
                        // Me

                        planItem.tabata.workSecond = planItem.tabata.count;
                      }
                    }
                  } else {
                    planItem.tabata.workSecond = planItem.tabata.workSecond - 1;
                  }
                  if (planItem.tabata.restSecond == 0) {
                    planItem.tabata.restSecond = planItem.tabata.restSecondCount
                  }
                }
                return planItem;
              }
            })
          );
        }, 1000);

        if (timer.current === "initial") {
          timer.current = "started";
        }
      }
    });
  };

  useEffect(() => {
    if (timer.current === "stopped") {
      timer.current = "initial";
      startPlans();
    }
  }, [timer.current]);

  const removePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const SECONDS_PER_DAY = 86400;
  const HOURS_PER_DAY = 24;

  const secondsToHms = (seconds) => {
    const days = Math.floor(seconds / SECONDS_PER_DAY);
    const remainderSeconds = seconds % SECONDS_PER_DAY;
    alert(new Date(remainderSeconds * 1000).toISOString())
    const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
    return hms.replace(/^(\d+)/, (h) => `${Number(h) + days * HOURS_PER_DAY}`.padStart(2, "0"));
  };

  const fancyTimeFormat = (duration) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  return (
    <div className="container">
      <div className="home_page">
        <h1 className="title">Home</h1>
        <h3 className="totalTime">0 minute</h3>
        <div className="time_items">
          {plans.length > 0 ? (
            plans.map((item, index) => {
              return (
                <div key={item.id} className="item">
                  <span>{item.type}</span>
                  {item.type === "Countdown" || item.type === "Stopwatch" ? (
                    <div className="display">
                      <span>{fancyTimeFormat(item.count)}</span>
                    </div>
                  ) : null}
                  {item.type === "XY" ? (
                    <div className="display">
                      <span>{item.xy.round} Round</span>
                      <span>{fancyTimeFormat(item.xy.value)}</span>
                    </div>
                  ) : null}
                  {item.type === "TABATA" ? (
                    <div className="display">
                      <span>{item.tabata.round} Round</span>
                      <span>{fancyTimeFormat(item.tabata.restSecond)} Rest</span>
                      <span>{fancyTimeFormat(item.tabata.workSecond)}</span>
                    </div>
                  ) : null}
                  {item.finish === true && <span>completed!</span>}
                  <button
                    onClick={() => removePlan(item.id)}
                    type="button"
                    className="remove"
                  >
                    remove
                  </button>
                </div>
              );
            })
          ) : (
            <h3> Not yet time</h3>
          )}
        </div>
        <Link to="/add" className="btnAdd">
          Add
        </Link>
        {plans.length > 0 && (
          <button
            className="btnStart"
            type="button"
            disabled={plansIsStart}
            onClick={() => {
              if (plansIsStart) return false;
              setPlansIsStart(true);
              startPlans();
            }}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
