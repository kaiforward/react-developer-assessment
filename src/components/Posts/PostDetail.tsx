import { useLocation } from "react-router-dom";

// this component simply takes the state passed by the link, in a real world scenario we would also store the state of the post
// somewhere it could be retrieved as the state will be lost on page refresh.
const PostDetail: React.FC = () => {

    const { state } = useLocation();
    const name = state?.name;
    const title = state?.title;

    if (!name) {
        return <p>Post not found or not passed correctly.</p>;
    }

    return(
        <div>
            <h1>{title}</h1>
            <p>{name}</p>
        </div>
    )
}

export default PostDetail;