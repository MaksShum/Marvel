import React, { useState, useEffect, useRef } from "react";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import MarvelService from "../../services/MarvelService";
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  visibility: 'hidden'
}

const transitionStyles = {
  entering: { opacity: 1,visibility: 'visible' },
  entered:  { opacity: 1,visibility: 'visible' },
  exiting:  { opacity: 0,visibility: 'hidden' },
  exited:  { opacity: 0,visibility: 'hidden' },
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(200);
  const [loadingButton, setLoadingButton] = useState(true);
  const [end, setEnd] = useState(false);
  const [trans,setTrans] = useState(false)

  const marvelService = new MarvelService();
  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    setTrans(true)
    onloadingButton();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };
  const onloadingButton = () => {
    setLoadingButton(true);
  };
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(loading => false);
    setOffset(offset => offset + 9);
    setLoadingButton(false);
    setEnd(end => ended);
    
    
    
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function getListChars(list) {
    const contents = list.map((item, i) => {
      const picture =
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "contain" }
          : null;
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}         
          onClick={() => {
            props.onSelectChar(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
                props.onSelectChar(item.id);
                focusOnItem(i);
            }}}
          
        >
          <img src={item.thumbnail} alt="abyss" style={picture} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{contents}</ul>;
  }

  const items = getListChars(charList);
  const classButton = end ? { display: "none" } : { display: "block" };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <Transition  in={trans} timeout={duration}>
      {state => (
        <div className="char__list"
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
            {errorMessage}
            {spinner}
            {content}
            <button
              className="button button__main button__long"
              onClick={() => onRequest(offset)}
              disabled={loadingButton}
              style={classButton}
            >
              <div className="inner">load more</div>
            </button>
        </div>
      )}
    </Transition>
    
  );
};

export default CharList;
