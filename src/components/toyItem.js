import React from "react";
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export class ToyItem extends React.Component {
     //Binding events with Delete method .
    constructor(){
        super();
        this.DeleteToy = this.DeleteToy.bind(this);
    }
    DeleteToy(e){ //Delete Method 
        e.preventDefault();
        axios.delete('http://localhost:4000/api/toy/'+this.props.toy._id)
        .then((res)=>{this.props.Reload();}) //reload component after deleting item.
        .catch();
    }
    render() {
        return (
            <div>

                <Card className="mx-5 my-3" border="dark" style={{ width: '18EM' }}>
                    <Card.Img variant="top" src={this.props.toy.cover} />   {/* prints out the data of each individual item from the object array*/}
                        <Card.Body>
                            <Card.Title>{this.props.toy.name}</Card.Title>
                            <Card.Text> 
                                <span>&euro;</span>
                            {this.props.toy.price}
                            </Card.Text>
                            <Link to={"/edit/"+this.props.toy._id} className="btn btn-primary my-3">Edit</Link> {/* Adding the button to Edit Item and linking to api/book/edit/: ading the id of he item*/ }
                            <Button variant="danger" onClick={this.DeleteToy}>Delete</Button> {/*Delete button with an onClick funtion to run delete method */}
                        </Card.Body>
                </Card>

                
            </div>
        );
    }
}