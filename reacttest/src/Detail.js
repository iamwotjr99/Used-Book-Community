import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import Nav from './Nav.js';
function Detail() {
    const [post, setPost] = useState({
        userName: "",
        bookName: "",
        price: "",
        title: "",
        description: "",
        created_date: "",
    });

    const [userId, setUserId] = useState("");
    const [authorId, setAuthorId] = useState("");

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
        async function getUserInfo() {
            await axios.get('/userinfo').then((res) => {
                console.log(res);
                setUserId(res.data.userId);
            }).catch((err) => {
                console.log(err);
            });
        }

        async function getPostInfo() {
            await axios.get('/get/postinfo', {
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
                setAuthorId(res.data.authorId);
            }).catch((err) => {
                console.log(err);
            })
        }
        getUserInfo();
        getPostInfo();
    }, [params.post_id])

    return (
        <div className='detail_wrapper'>
            <Nav btn_back={true} btn_logout={false} btn_add={false}/>
            <div className='detail_container'>
                <div className='title'>{post.title}</div>
                <div className='userName'>{post.userName}</div>
                <hr></hr>
                <img 
                    alt=""
                    src='https://media.karousell.com/media/photos/products/2021/12/11/cosmos_by_carl_sagan_1639214113_dea7378d.jpg'>
                </img>
                <div className='bookName'>{post.bookName}</div>
                <div className='price'>{post.price} 원</div>
                <div className='description'>{post.description}</div>
                <div className='created_date'>{post.created_date}</div>
                {authorId !== userId ? <></> : 
                <div>
                <Button 
                    variant="warning"
                    onClick={toEditHandler}>Edit
                </Button>
                <Button 
                    variant="danger"
                    onClick={deleteHandler}>Delete
                </Button>
            </div>}
            </div>
        </div>
        
    )
}

export default Detail;