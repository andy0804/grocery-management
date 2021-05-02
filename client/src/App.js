import "./App.css";
import AddItem from "./AddItem";
import { Provider } from "react-redux";
import store from "./store";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Login } from "./auth/Login";
import Home from "./home/Home";
import { Register } from "./auth/Register";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./types/groceryItems";
import { PrivateRoute } from "./hoc/PrivateRoute";
import { Navbar } from "./layout/Navbar";

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <section className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/add" component={AddItem} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
