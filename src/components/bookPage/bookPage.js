import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock'




export default class BookPage extends Component {

    gotService = new gotService();

    state = {
        selectedBook: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => { //функция получит ИД из события и поместит в стэйт
        this.setState({
            selectedBook: id
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage />
         }


        const itemList = (
            <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllBooks} 
                    renderItem={({name}) => name}/>
        )
        
        const bookDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                getItem={this.gotService.getBook}
                >
                <Field field={'authors'} label={'Authors'} />
                <Field field={'numberOfPages'} label={'Pages'} />
                <Field field={'isbn'} label={'ISBN'} />
                <Field field={'released'} label={'Release date'} />
            </ItemDetails>
        )


        return (
            <RowBlock left={itemList} right={bookDetails}/>
        ) 
       
    }
}