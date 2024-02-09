import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Create extends React.Component {

    constructor(){ //Binding events to each method.
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeToyName = this.onChangeToyName.bind(this);
        this.onChangeToyPrice = this.onChangeToyPrice.bind(this);
        this.onChangeToyCover = this.onChangeToyCover.bind(this);
        
        this.state = {
            name:'',
            price:'',
            cover:''
        }
    }

    handleSubmit(e){ //Method to handle submit button.
        e.preventDefault();
        console.log(`Button clicked 
        ${this.state.name},
        ${this.state.price},
        ${this.state.cover}`);

        const toy ={
            name:this.state.name,
            price:this.state.price,
            cover:this.state.cover
        }
        //Post request to create item in Database
        axios.post('http://localhost:4000/api/toys',toy) 
        .then()
        .catch();

        this.setState({
            name:'',
            price:'',
            cover:''
        })
    }

    onChangeToyName(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangeToyPrice(e){
        this.setState({
            price:e.target.value
        })
    }
    onChangeToyCover(e){
        this.setState({
            cover:e.target.value
        })
    }
    

    render() {
        return (
            <div>
                <Container>
                <Row>
                <Col></Col>
                <Col xs={6}> <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                        <label>Add Toy name: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeToyName}
                        />
                </div>

                <div className="form-group">
                        <label>Add Toy price: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangeToyPrice}
                        />
                </div>

                <div className="form-group">
                        <label>Add Toy Cover: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.cover}
                        onChange={this.onChangeToyCover}
                        />
                </div>


                <input type="submit" value="Add Toy" />
            </form></Col>
                    <Col></Col>
                    </Row>
                </Container>
                
            </div>
        );
    }
}