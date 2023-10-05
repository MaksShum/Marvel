import { useState, Fragment } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from '../charSearchForm/CharSearcForm'
import {Helmet} from 'react-helmet'

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onSelectChar = (id) => {
    setSelectedChar(id);
  };
  return (
    <Fragment>
      <Helmet>
        <meta
        name="description"
        content="Marvel information portal"
        />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onSelectChar={onSelectChar} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />   
          </ErrorBoundary>   
          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>  
        </div>  
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </Fragment>
  );
};

export default MainPage