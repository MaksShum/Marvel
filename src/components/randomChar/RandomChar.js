import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const RandomChar = (props) => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onErrorMessage = () => {
    setLoading(false);
    setError(true);
  };
  const onLoading = () => {
    setLoading(true);
    setError(false);
  };
  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011340 - 1011200) + 1011200);
    onLoading();
    marvelService
      .getCharacter(id)
      .then((char) => {
        setChar(char);
        setLoading(false);
      })
      .catch(onErrorMessage);
  };
  const WievChar = (props) => {
    return (
      <div className="randomchar__block">
        <img
          src={props.char.thumbnail}
          style={props.picture}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{props.char.name}</p>
          <p className="randomchar__descr">{props.descrip}</p>
          <div className="randomchar__btns">
            <a href={props.char.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={props.char.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const descrip =
    (char.description
      ? char.description
      : "This character have not discription"
    ).slice(0, 100) + "...";
  const picture =
    char.thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : null;

  const errorMessage = error ? <Error /> : null;
  const load = loading ? <Spinner /> : null;
  const charWiev = !(loading || error) ? (
    <WievChar char={char} descrip={descrip} picture={picture} />
  ) : null;

  return (
    <div className="randomchar">
      {load}
      {errorMessage}
      {charWiev}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div onClick={updateChar} className="inner">
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
