import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage,SinglePage } from "../pages";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact="true" path="/">
              <MainPage />
            </Route>
            <Route exact="true" path="/comics">
              <ComicsPage />
            </Route>
            <Route exact="true" path="/singlePage">
              <SinglePage/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
