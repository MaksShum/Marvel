import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    getListChars = (list) => {
        const contents = list.map(item => {
            const picture = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
  ? {objectFit: 'contain'}
  : null 
        return (
            <li className="char__item"
                key={item.id}
                onClick={() => this.props.onSelectChar(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={picture}/>
                    <div className="char__name">{item.name}</div>
                </li>
        )
    })

        return (
            <ul className="char__grid">
                {contents}
            </ul>
        )

    }
    render() {
        const {charList, loading, error} = this.state;
        
        const items = this.getListChars(charList);

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;