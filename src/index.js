import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

function App() {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />

            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route
                  render={() => (
                    <h1
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      404 Not Found
                    </h1>
                  )}
                />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
