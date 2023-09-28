import { Fragment, useState, useEffect } from "react";
import "./charInfo.scss";
import Skeleton from "../skeleton/Skeleton";
import Error from "../error/Error";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();
  useEffect(() => {
    updateChar();
  }, [props.charId]);

  // componentDidUpdate(prevProps) {
  //   if (this.props.charId !== prevProps.charId) {
  //     this.updateChar();
  //   }
  // }
  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    onLoading();
    marvelService.getCharacter(charId).then(onCharListLoaded).catch(onError);
  };
  const onCharListLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onLoading = () => {
    setLoading(true);
  };
  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const View = ({ char }) => {
    const { name, discription, wiki, thumbnail, homepage, comics } = char;
    const picture =
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: "contain" }
        : { objectFit: "cover" };
    return (
      <Fragment>
        <div className="char__basics">
          <img src={thumbnail} alt={name} style={picture} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{discription}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {comics.length < 1 ? "This character have not comics" : null}
          {comics
            .map((item, i) => {
              return (
                <li className="char__comics-item" key={i}>
                  {item.name}
                </li>
              );
            })
            .slice(0, 9)}
        </ul>
      </Fragment>
    );
  };

  const skeleton = char || error || loading ? null : <Skeleton />;
  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(!char || error || loading) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default CharInfo;
