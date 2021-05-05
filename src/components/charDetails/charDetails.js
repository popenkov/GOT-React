import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';


const Field = ({char, field, label}) => { //получаем элемент, поле в верстке и как назвать поле.
    //верстку возьмем из уже существующей.
    //{item[field]} итем получается из АПИ из массива по названию поля.
    return (
        
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{char[field]}</span> 
            </li>
        
    )
}

export {
    Field
}
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount() { //когда компонент получается новый пропс или изменяется стэйт, должна вызываться наша функция
        this.updateChar();
           
    }

    updateChar () {
        const {charId} = this.props;

        if (!charId) { //на случай, если ИД не был передан
            return;
        }

        this.gotService.getCharacter(charId) //записываем персонажа в стэйт
        .then((char) => {
            this.setState({char})
        })
        /* this.foo.bar = 0; */
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

    }

    render() {
        if(!this.state.char) { // если стэйт пуст, буду возвращать предложение выбрать персонажа
            return <span className="select-error">Please, select a character.</span>;
        }

        

        const {char} = this.state; //в дз избавиться от привязки к чар.
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { 
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char}) //чайлд это полная копия передаваемого ребенка. а айтем (char) мы получаем из стэйта.
                            //когда вызывается функция рендер, в стэйте уже есть какой-то персонаж.
                        })
                    }
                </ul>
            </div>
        );
    }
}