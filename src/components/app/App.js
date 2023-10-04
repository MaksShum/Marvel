import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy,Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";



const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const ErrorPage = lazy(() => import('../pages/404'))
const SingleChar = lazy(() => import('../pages/SingleChar'))

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
            <Route path="/" element={ <MainPage />}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/singlePage/:comicID" element={<SinglePage />}/>
            <Route path="*" element={<ErrorPage />}/>
            <Route path="/characters/:charID" element={<SingleChar />}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
