import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';



const Field = ({item, field, label}) => { //получаем элемент, поле в верстке и как назвать поле.
    //верстку возьмем из уже существующей.
    //{item[field]} итем получается из АПИ из массива по названию поля.
    return (
        
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{item[field]}</span> 
            </li>
        
    )
}

export {
    Field
}
export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() { //когда компонент получается новый пропс или изменяется стэйт, должна вызываться наша функция
        this.updateItem();

       
    }

    updateItem () {
        const {itemId} = this.props;
        const {getItem} = this.props;

        if (!itemId) { //на случай, если ИД не был передан
            return;
        }

        getItem(itemId) //записываем персонажа в стэйт //getCharacter
        .then((item) => {
            this.setState({item})
        })
        /* this.foo.bar = 0; */
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }

    }

    render() {
        if(!this.state.item) { // если стэйт пуст, буду возвращать предложение выбрать персонажа
            return <span className="select-error">Please, select a character.</span>;
        }

        

        const {item} = this.state; //в дз избавиться от привязки к чар.
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { 
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item}) //чайлд это полная копия передаваемого ребенка. а айтем (char) мы получаем из стэйта.
                            //когда вызывается функция рендер, в стэйте уже есть какой-то персонаж.
                        })
                    }
                </ul>
            </div>
        );
    }
}