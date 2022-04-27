import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
function Detail() {
    const [post, setPost] = useState({
        userName: "",
        bookName: "",
        price: "",
        title: "",
        description: "",
        created_date: "",
    });

    const params = useParams();

    const navigate = useNavigate();

    const toEditHandler = () => {
        navigate(`/edit/${params.post_id}`);
    }

    const deleteHandler = () => {
        axios.delete('/delete/post', {
            params: {
                postId: params.post_id,
            }
        }).then((res) => {
            console.log(res);
            alert(res.data.message);
            navigate(-1);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get('/get/postinfo', {
            params: {
                postId : params.post_id,
            }
        }).then((res) => {
            console.log(res);
            setPost({
                ...post,
                userName: res.data.userName,
                bookName: res.data.bookName,
                price: res.data.price,
                title: res.data.title,
                description: res.data.description,
                created_date: res.data.created_date,
            })
        }).catch((err) => {
            console.log(err);
        })
    }, [params.post_id])

    return (
        <div>
            <div>{post.userName}</div>
            <div>{post.bookName}</div>
            <div>{post.price}</div>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.created_date}</div>
            <Button 
                variant="warning"
                onClick={toEditHandler}>Edit
            </Button>
            <Button 
                variant="danger"
                onClick={deleteHandler}>Delete
            </Button> 
        </div>
        
    )
}

export default Detail;