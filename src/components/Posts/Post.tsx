import styled from "styled-components";
import {
    Link
} from "react-router-dom";

export interface PostProps {
    id: string;
    title: string;
    publishDate: string; // ISO 8601 format
    author: {
        name: string;
        avatar: string; // URL to avatar image
    };
    summary: string;
    categories: Array<Category>;
}

export interface Category {
    id: string;
    name: string;
}

const Article = styled.article`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    transition: all ease-in-out 0.5s;
    &:nth-child(4n+1) {
        background: #EF767A;
        color: black;
        a {
            color: black;
        }
    }    
    &:nth-child(4n+2) {
        background: #456990;
        color: white;
        a {
            color: white;
        }
    }    
    &:nth-child(4n+3) {
        background: #49BEAA;
        color: black;
        a {
            color: black;
        }
    }    
    &:nth-child(4n+4) {
        background: #eeb868;
        color: black;
        a {
            color: black;
        }
    }
`

const Author = styled.div`
    display: flex;
    gap: 16px;
`

const Avatar = styled.img`
    border-radius: 50%;
    background: black;
`

const Categories = styled.div`
    margin-top: auto;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`

const Category = styled.span`
    border: solid 1px black;
    border-radius: 4px;
    padding: 4px;
    font-size: 14px;
`

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
        border-bottom: solid 4px currentColor;
    }
`

// I could have gone much more generic here but for the purposes of the test I thought this was enough,
// for example adding an even more basic 'card' component that has the standard styling for cards 
// e.g 'box-shadow, padding, border-radius' that would be consistent accross an app
const Post: React.FC<PostProps> = ({
    id,
    title,
    publishDate, // ISO 8601 format
    author,
    summary,
    categories = []
}) => {

    const { name } = author;

    const renderCategories = (categories: Array<Category>) => {
        return categories?.length > 0 && <Categories>
            {categories.map((category: Category, index: number) => {
                return <Category key={index}>{category.name}</Category>
            })}
        </Categories>
    }

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(publishDate));

    return (
        <Article data-id={id}>
            <Author>
                <Avatar src={author.avatar} alt="User avatar" />
                <p>{author.name}</p>
            </Author>
            <div>
                <h3><StyledLink to={`/posts/${id}`} state={{ name, title }}>{title}</StyledLink></h3>
                <time dateTime={publishDate}>{formattedDate}</time>
                <p>{summary}</p>
            </div>
            {renderCategories(categories)}
        </Article>
    )

}

export default Post;