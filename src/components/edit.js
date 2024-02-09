import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

export function Edit(props) {

    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.
    let { id } = useParams();

    // update arrays using the React useState()
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [cover, setCover] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        //make a HTTP Request with GET method and pass as part of the url.
        axios.get('http://localhost:4000/api/toy/' + id)
            .then((response) => {
                setName(response.data.name);
                setPrice(response.data.price);
                setCover(response.data.cover);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editToy = {
            name: name,
            price: price,
            cover: cover
        }
        //make a HTTP Request with PUT method and pass as part of the url.
        axios.put('http://localhost:4000/api/toy/' + id, editToy)
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            })
            .catch();
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6} >

                        <h3>Edit component</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Edit Toy Name: </label>
                                <input type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Edit Toy Price: </label>
                                <input type="text"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Edit Toy Cover: </label>
                                <input type="text"
                                    className="form-control"
                                    value={cover}
                                    onChange={(e) => { setCover(e.target.value) }}
                                />
                            </div>
                            <input type="submit" value="Edit Toy"></input>
                        </form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}