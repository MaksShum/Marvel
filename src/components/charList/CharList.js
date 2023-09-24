import React,{ Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    constructor(props){
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false,
            offset: 200,
            loadingButton: true,
            end: false
        }
        this.myRef = React.createRef()

        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    
    
    
    marvelService = new MarvelService();


    onRequest = (offset) => {
        this.loadingButton()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    loadingButton = () => {
        this.setState({loadingButton: true})
    }
    onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9)
        {ended = true}
    
        this.setState(({charList,offset}) => ({
            charList: [...charList,...newCharList],
            loading: false,
            offset: offset + 9,
            loadingButton: false,
            end: ended
        }))
    }
    
    selectChar = (ref) => {
        this.myRef.current.style = {}
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }
    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    getListChars = (list) => {
        const contents = list.map((item,i)=> {
            const picture = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
  ? {objectFit: 'contain'}
  : null 
        return (
            <li className="char__item"
                key={item.id}
                ref={this.setRef}
                onClick={() => {this.props.onSelectChar(item.id);
                    this.focusOnItem(i);}}
                >
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
        const {charList, loading, error,offset,loadingButton,end} = this.state;
        
        const items = this.getListChars(charList);
        const classButton = end ? {display : 'none'} : {display : 'block'}
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        onClick={() => this.onRequest(offset)}
                        disabled={loadingButton}
                        style={classButton}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;