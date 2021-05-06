import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock'




export default class BookPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => { //функция получит ИД из события и поместит в стэйт
        this.setState({
            selectedHouse: id
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage />
         }


        const itemList = (
            <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllHouses} 
                    renderItem={({name}) => name}/>
        )
        
        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getItem={this.gotService.getHouse}
                >
                <Field field={'region'} label={'Region'} />
                <Field field={'words'} label={'Words'} />
                <Field field={'seats'} label={'Seats'} />
            </ItemDetails>
        )


        return (
            <RowBlock left={itemList} right={houseDetails}/>
        ) 
       
    }
}