import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';
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

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}