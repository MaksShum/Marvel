import { useState, useEffect } from 'react';
import './comicsList.scss';
import { Link } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import { Transition } from 'react-transition-group';

const duration = 400;

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


const ComicsList = (props) => {
    const [charList,setCharlist] = useState([])
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [offset,setOffset] = useState(200)
    const [loadingButton,setLoadingButton] = useState(true)
    const [end,setEnd] = useState(false)
    const [trans,setTrans] = useState(false)

    const marvelService =  new MarvelService()
    
    useEffect(() => {request()},[])

    const request = () => {
        setTrans(true)
        onloadingButton()
        marvelService.getAllComics(offset)
            .then(onlistLoading)
            .catch(onError)
            
    }
    const onlistLoading = (newCharList) => {
        
        let ended = false;
        if (newCharList.length < 8) {
          ended = true;
        }
        setCharlist(charList => [...charList,...newCharList])
        setLoading(false)
        setOffset(offset => offset + 8)
        setLoadingButton(false);
        setEnd( ended);
        
    }
    const onError = () => {
        setError(true)
    }
    
    const onloadingButton = () => {
        setLoadingButton(true);
      };
    const getListComics = (list) => {
       const comics = list.map((item,i) => {
            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={`/singlePage/${item.id}`}
                        >
                        <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return <ul className="comics__grid">{comics}</ul>
    }
    const items = getListComics(charList)
    const spinner = loading? <Spinner/> : null
    const errorMessage = error? <Error/> : null
    const content = (loading || error)? null : items

    const classButton = end ? { display: "none" } : { display: "block" };
    return (
        <Transition in={trans} timeout={duration}>
            {state => (
                <div className="comics__list"
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}>
            {spinner}
            {errorMessage}
            {content}
                <button className="button button__main button__long"
                    onClick={request}
                    disabled={loadingButton}
                    style={classButton}>
                    <div className="inner">load more</div>
                </button>
            </div>
            )
            }
        </Transition>
        
    )
}

export default ComicsList;