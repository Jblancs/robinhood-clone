import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SingleStock from "./components/SingleStock";
import AccountNavigation from "./components/AccountNavigation";
import Transfers from "./components/Transfers";
import Recurring from "./components/Recurring";
import History from "./components/History";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/stocks/:ticker">
            <SingleStock />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <div>
            <AccountNavigation />
            <Switch>
              <Route path="/account/transfers">
                <Transfers />
              </Route>
              <Route path="/account/recurring">
                <Recurring />
              </Route>
              <Route path="/account/history">
                <History />
              </Route>
            </Switch>
          </div>
        </Switch>
      )}
    </>
  );
}

export default App;
