import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage/';
import BookPage from '../bookPage/';
import HousesPage from '../housesPage/'
import BooksItem from '../booksItem/'
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';


const ToggleButton = styled.button`
    background-color: blue;
    color: red;
    width: 50%;
    height: 80px;
    margin: 0 auto;
    margin-bottom: 20px;
`


export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })

    }

    toggleRandomChar = () => {
        this.setState({
            showRandomChar: !this.state.showRandomChar
        })
    }


    


    

    render() {
        const {showRandomChar} = this.state;
        const showRandom = (showRandomChar)?<RandomChar/>: null;

        if (this.state.error) {
           return <ErrorMessage />
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {showRandom}
                                <ToggleButton onClick={this.toggleRandomChar}>Toogle randomChar</ToggleButton>
                            </Col>
                        </Row>

                    <Route  path='/characters' component={CharacterPage}/> 
                    <Route  path='/books' component={BookPage}/>   
                    <Route  path='/houses' exact component={HousesPage}/>     
                    <Route  path='/houses/:id' component={}/>  
                    
                    </Container>
                </div>
            </Router>
        );
    }
};

