import { useState, useEffect } from 'react';
import './comicsList.scss';
import { Link } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';


const ComicsList = () => {
    const [charList,setCharlist] = useState([])
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [offset,setOffset] = useState(200)
    const [loadingButton,setLoadingButton] = useState(true)

    const marvelService =  new MarvelService()
    
    useEffect(() => {request()},[])

    const request = () => {
        onloadingButton()
        marvelService.getAllComics(offset)
            .then(onlistLoading)
            .catch(onError)
            
    }
    const onlistLoading = (newCharList) => {
        setCharlist(charList => [...charList,...newCharList])
        setLoading(false)
        setOffset(offset => offset + 8)
        setLoadingButton(false);
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
                    <Link exact="true" to="/singlePage">
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
    return (
        <div className="comics__list">
                {spinner}
                {errorMessage}
                {content}
            <button className="button button__main button__long"
            onClick={request}
            disabled={loadingButton}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;