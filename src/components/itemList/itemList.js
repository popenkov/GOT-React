import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/';


export default class ItemList extends Component {

    state = { //в состоянии будем хранить список персонажей.
        itemList: null
    }
   
    componentDidMount() {
        const {getData} = this.props; // теперь я в апп жс пропсом итемлисту могу передавать нужную функцию.

        getData()
        .then((itemList)=> this.setState({
            itemList
        }));
    }

    //пишем рендеращий метод для формирования списка героев
    renderItems (arr) {
        return arr.map((item, index) => {
            /* const {id} = item; */
            const label = this.props.renderItem(item);

            return <>
                <li 
                key={index} // не забываем создавать ключи. Не самый лучший способ создания.
                className="list-group-item" // метод выбора персонажа подхватывает ИД, чтобы знать, что показывать. 
                onClick={() => {this.props.onItemSelected( 41 + index)}}> 
                    {label}
                </li>
            </>
        });
    }

    render() {        
        const {itemList} = this.state;  

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group-item">
                {items}
            </ul>
        );
    }
}