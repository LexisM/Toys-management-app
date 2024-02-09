import React from "react";
import { ToyItem } from "./toyItem";


export class Toys extends React.Component{
    render(){ 
        //Go  through the object checking each item in the array.
        return this.props.toys.map( (toy)=>{ 
                return <ToyItem toy={toy} key={toy._id} Reload={this.props.Reload}> </ToyItem>
            }
        );
    }
}