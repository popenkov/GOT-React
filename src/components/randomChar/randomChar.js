import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    constructor(props) {
        super(props);  
    }

    componentDidMount() {
        this.timerId=  setInterval( () => {
            this.updateChar()
           }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
    
        });

    }

     //создает стрелочные функции, чтобы не было проблем с конекстом? почему?
     onError =(err) => {
        this.setState({
            error: true,
            loading: false 
        })
    }
  

    updateChar= () => { //эта функция должна обновлять персонажа, чтобы он отображался в поле.
        //для получения конкретного персонажа из сервиса нам нужен ИД
        const id = Math.floor(Math.random()* 140 + 25);  //ид будет меняться авто (+25 это диапазон с которого считать от 24 до 140)
       
        this.gotService.getCharacter(id)//конструкция возвращает промис, который надо обработать
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

  


    render() {


        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = !(loading || error) ? <View char={char}/> : null;
        const content = loading ? <Spinner/>    : null;
        
       
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }

 
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
        </>
    )
}