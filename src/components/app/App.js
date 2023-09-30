import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SinglePage, ErrorPage } from "../pages";

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={ <MainPage />}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/singlePage/:comicID" element={<SinglePage />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
