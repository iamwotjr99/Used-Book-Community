import Nav from './Nav.js';
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
function Edit() {

    const [post, setPost] = useState({
        bookName: "",
        price: "",
        title: "",
        description: "",
        type: "",
    });

    const params = useParams();

    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name] : e.target.value,
        })
    }

    const onEditHandler = async() => {
        await axios.put('/edit/post', {
            params: {
                postId: params.post_id,
                data: post,
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        async function getPostInfo() {
            await axios.get('/get/postinfo', {
                params: {
                    postId : params.post_id,
                }
            }).then((res) => {
                console.log(res);
                setPost({
                    ...post,
                    bookName: res.data.bookName,
                    price: res.data.price,
                    title: res.data.title,
                    description: res.data.description,
                    type: res.data.type,
                })
            }).catch((err) => {
                console.log(err);
            })
        }
        getPostInfo();
    }, [params.post_id])
    

    return (
        <div className="edit_wrapper">
            <Nav btn_back={true} btn_logout={false} btn_add={false}/>
            <div className="edit_container">
                <Form.Select 
                        className="select_wrapper" 
                        aria-label="Please select your type"
                        name="type"
                        onChange={onChange}
                        value={post.type}>
                        <option>{post.type}</option>
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
                        variant="warning"
                        onClick={onEditHandler}
                        >Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit;