import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/home";
import Add from "./pages/add";

export default function App() {
    const [plans, setPlans] = useState([]);

    const addPlan = (plan) => setPlans([...plans, plan]);

    const generateAutoIncrement = () => {
        let primaryKeys = plans.map(plan => plan.id);

        if (primaryKeys.length === 0) return 1;

        return Math.max(...primaryKeys) + 1;
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home plans={plans} setPlans={setPlans}/>
                </Route>
                <Route exact path="/add">
                    <Add
                        addPlan={(plan) => addPlan(plan)}
                        generateAutoIncrement={generateAutoIncrement}
                    />
                </Route>
            </Switch>
        </Router>
    );
}
