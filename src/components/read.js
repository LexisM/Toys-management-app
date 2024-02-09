import React from "react";
import { Toys } from "./toys";
import axios from "axios";
import { CardGroup } from "react-bootstrap";

export class Read extends React.Component {
    constructor() {
        super(); //Binding event with method
        this.componentDidMount = this.componentDidMount.bind(this);
    }
   
    componentDidMount() {
        //make a HTTP Request with GET method and pass as part of the url to list toys items.
        axios.get('http://localhost:4000/api/toys')
            .then((response) => {  //Gets the reponse from the link above and retrieves the data.
                this.setState({ toys: response.data }) //Saves the data in the books var using the setState function
            })
            .catch((error) => {
                console.log(error);
            })
    }

    state = {
        toys: []
    }

    render() {
        return (
            <div>
                <h3>List of toys</h3>

                <CardGroup>
                    <Toys toys={this.state.toys}  Reload={this.componentDidMount}   ></Toys>
                     {/* Send the object from the parent component to the child component. */}
                </CardGroup>
            </div>
        );
    }
}