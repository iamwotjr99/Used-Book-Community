import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function PostList({postList}) {

    const navigate = useNavigate();

    const onClickListener = (e) => {
        console.log(e.target.getAttribute("data_id"));
        navigate(`/detail/${e.target.getAttribute("data_id")}`)
    }
    const list = postList.map((item, index) => 
    (
        <ListGroupItem key={index} onClick={onClickListener}
            data_id={item._id}>
            <div className="postList_container" data_id={item._id}>
                <div className="title_wrapper" data_id={item._id}>
                    {item.title}
                </div>
                <div className="bookName_wrapper" data_id={item._id}>
                    {item.bookName}
                </div>
                <div className="description_wrapper" data_id={item._id}>
                    {item.description}
                </div>
                <div className="tiem_name_wrapper" data_id={item._id}>
                    {item.userName} | {item.created_data}
                </div>
            </div>
        </ListGroupItem>
    ));
    return (
        <ListGroup>{list}</ListGroup>
    )
}

export default PostList;