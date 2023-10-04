import './singleCharPage.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import { Fragment } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';



const SingleCharPage = () => {
    
    const [char,setChar] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {charID} = useParams()
    const marvelService = new MarvelService();
 
    useEffect(() => {
    updateChar();
  }, [charID]);

  const updateChar = () => {
    onLoading();
    marvelService.getCharacter(charID)
    .then(onCharListLoaded)
    .catch(onError);
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
  
  const View = () => {
        const description = char.description ? char.description : 'This is character have not description'
    return (
        <Fragment>
            <img style={{height: '350px'}} src={char.thumbnail} alt={char.name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{char.name}</h2>
                <p className="single-comic__descr">{description}</p>
                <ul className="char__comics-list">
          {char.comics.length < 1 ? "This character have not comics" : null}
          {char.comics
            .map((item, i) => {
              return (
                <Link to={`/singlePage/${item.resourceURI.split('/').pop()}`}className="char__comics-item" key={i}>
                  {item.name}
                </Link>
              );
            })
            .slice(0, 9)}
        </ul>
            </div>
            <Link to="/" className="single-comic__back">Back to all characters</Link>
        
        </Fragment>
    )
}

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!char || error || loading) ? <View/> : null;


    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
}

export default SingleCharPage;