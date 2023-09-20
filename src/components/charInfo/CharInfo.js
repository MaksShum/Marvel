import { Component,Fragment } from "react";
import "./charInfo.scss";
import Skeleton from "../skeleton/Skeleton";
import Error from "../error/Error";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelService = new MarvelService();
  
  componentDidMount() {
    this.updateChar()
  }
  componentDidUpdate(prevProps){
    if(this.props.charId !== prevProps.charId){
        this.updateChar()
    }
  }
  updateChar = () => {
    const {charId} = this.props
    if(!charId){
        return;
    }
    this.onLoading()
    this.marvelService.getCharacter(charId)
    .then(this.onCharListLoaded)
    .catch(this.onError)
  };
  onCharListLoaded = (char) => {
    this.setState({
        char,
        loading: false
    })
}
  onLoading = () => {
    this.setState({loading: true})
 }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  
  

  render() {
    const View = ({char}) => {
        const {name,discription,wiki,thumbnail,homepage,comics} = char
        const picture = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
  ? {objectFit: 'contain'}
  : {objectFit: 'cover'}
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
                <div className="char__descr">
                    {discription}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length < 1 ? 'This character have not comics' : null}
                {comics.map((item,i) => {
                            return  <li className="char__comics-item" key={i}>{item.name}</li>
                        }).slice(0,9)}
                   
                </ul>
            </Fragment>
        )
      }
    const {char, loading, error} = this.state;;

        const skeleton = char || error || loading ? null : <Skeleton/>
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(!char || error || loading )? <View char={char}/> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

export default CharInfo;
