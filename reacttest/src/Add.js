import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

import Nav from './Nav.js';
function Add() {
    const [post, setPost] = useState({
        bookName: "",
        price: "",
        title: "",
        description: "",
        type: "",
    });

    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name] : e.target.value,
        })
    }

    const AddHandler = () => {
        console.log(post);
        axios.post('/add/post', {
            bookName: post.bookName,
            price: post.price,
            title: post.title,
            description: post.description,
            type: post.type,
        }, { withCreadentials: true }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        setPost({
            bookName: "",
            price:"",
            title:"",
            description: "",
            type: "",
        })
    }

    return (
        <div className='Add'> 
            <div className='add_wrapper'>
                <Nav btn_back={true} btn_logout={false} btn_add={false}/>
                <div className='add_container'>
                    <Form.Select 
                        className="select_wrapper" 
                        aria-label="Please select your type"
                        name="type"
                        onChange={onChange}
                        value={post.type}>
                        <option>Open this select menu</option>
                        <option value="buy">buy</option>
                        <option value="sale">sale</option>
                    </Form.Select>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Input title"
                                name="title"
                                onChange={onChange}
                                value={post.title}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bookName">
                            <Form.Label>Book name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Input book name"
                                name="bookName"
                                onChange={onChange}
                                value={post.bookName}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Input book price"
                                name="price"
                                onChange={onChange}
                                value={post.price}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Input some description"
                                name="description"
                                onChange={onChange}
                                value={post.description}
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <Button 
                            variant="primary"
                            onClick={AddHandler}
                            >ADD
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;