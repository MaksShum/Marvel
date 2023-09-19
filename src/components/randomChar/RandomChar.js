import {Component} from 'react'

import MarvelService from '../../services/MarvelService'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updateChar()
    }

    state = {
        char : {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService();
    
    errorMessage = () => {
        this.setState({error: true,
        loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011340 - 1011200) + 1011200)
        this.marvelService
        .getCharacter(id)
        .then(char => {
            this.setState({char,loading : false})
        })
        .catch(this.errorMessage)
    }
    
    render() {
        const {char :{name,description,thumbnail,homepage,wiki},loading,error} = this.state
        const descrip = (description ? description : 'This character have not discription')
        .slice(0,100) + '...'
        const errorMessage = error ? <Error/> : null
        const load = loading ? <Spinner/> : null
        if(!name) {
            return <div className="randomchar">
                        {load}
                        {errorMessage}
                        <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!<br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                        </div>
                    </div>
        }

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                           {descrip}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;