import './singleComic.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import { Fragment } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';



const SingleComic = () => {
    const [comic,setComic] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {comicID} = useParams()
    const marvelService = new MarvelService();
 
    useEffect(() => {
    updateChar();
  }, [comicID]);

  const updateChar = () => {
    onLoading();
    marvelService.getComic(comicID)
    .then(onCharListLoaded)
    .catch(onError);
  };

  const onCharListLoaded = (comic) => {
    setComic(comic);
    setLoading(false);
  };

  const onLoading = () => {
    setLoading(true);
  };
  const onError = () => {
    setError(true);
    setLoading(false);
  };
  
  const View = () => {
    return (
        <Fragment>
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{comic.price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all comics</Link>
        
        </Fragment>
    )
}

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!comic || error || loading) ? <View/> : null;


    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
}

export default SingleComic;