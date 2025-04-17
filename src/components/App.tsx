import { useEffect, useRef, useState } from "react";
import Post, { PostProps } from "./Posts/Post";
import styled from "styled-components";
import Select from "./Forms/Select";
import Shimmer from "./Posts/Shimmer";
import { Spacer } from "./GenericStyledComponents";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostDetail from "./Posts/PostDetail";
import { useSearchParams } from 'react-router-dom';

const UNKNOWN_ERROR = "Sorry an unknown error has occured, please try again."
const ITEMS_PER_PAGE = 10;

// Styled components are a new concept for me that I learned for this technical exercise
// so I might be missing some of the obvious patterns used but I wanted to demonstrate my
// ability and willingness to pick up new libraries/frameworks.
const Title = styled.h1`
  color: white;
  background: #456990;
  padding: 48px 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Loader = styled.div`
  height: 40px;
  text-align: center;
  padding: 16px;
`

const Label = styled.label`
  margin-right: 16px;
  margin-bottom: 16px;
`

const SelectContainer = styled(Spacer)`
  background-color: lightgray;
`

const App: React.FC = () => {

  const apiUrl = "/api/posts";
  const [posts, setPosts] = useState<Array<PostProps>>([]);
  const [error, setError] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Array<string>>([])
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = searchParams.get('category') || '';
  const [filter, setFilter] = useState(initialFilter);

  // filter posts by the selected category
  const filteredPosts = posts.filter((post) => {
    return filter === "" || post.categories.some(cat => cat.name === filter);
  });

  // slice filtered posts to show only the articles which should be visible based on screen position
  const visibleArticles = filteredPosts.slice(0, visibleCount);

  // This use effect simply loads the posts on page load
  useEffect(() => {

    fetchPosts();

  }, []);

  // This run whens the category filter changes so update the URL param
  useEffect(() => {
    if (filter) {
      setSearchParams({ category: filter });
    } else {
      setSearchParams({}); // Clear param if no filter
    }
  }, [filter, setSearchParams]);

  // This runs on back/forward to ensure filter is applied correctly.
  useEffect(() => {
    const current = searchParams.get('category') || '';
    setFilter(current);
  }, [searchParams]);

  // when filter changes visible count must be reset
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filter]);

  // I decided to use 'load more' functionality so I could use mutation observer to observe when the bottom div is visible in the viewport and load more posts accordingly.
  useEffect(() => {
    if (visibleCount >= filteredPosts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          delayLoading();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [visibleCount, filteredPosts.length, filter]);

  // this intentionally delays the loading so the shimmer affect can be seen.
  const delayLoading = () => {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredPosts.length));
      setLoading(false);
    }, 5000)
  }

  const fetchPosts = async () => {

    // only a very simple fetch call with basic error handling needed here, but I could add retries and more complex helpers for formatting requests options if needed.
    try {

      setLoading(true);
      const response = await fetch(apiUrl);

      if (response.ok) {

        const data = await response.json();

        // This should use ID's but the ID's for categories of the same name did not match! So I had to use the string name.
        // generally this logic might not be needed as a list of all possible categories would be retrieved from the backend.
        // create a temporary map so only unique entries are added, then map back to a list for easy rendering in select element.
        const nameSet: Array<string> = [];

        data.posts.forEach((post: PostProps) => {
          post.categories.forEach(category => {
            if (!nameSet.includes(category.name)) nameSet.push(category.name);
          });
        });

        setLoading(false);
        setCategories(nameSet);
        setPosts(data.posts);

      } else {

        // Here is where I might format project specific errors that are returned under states codes 400, 401 ect,
        // but for the purposes of the test an unknown error will do
        setError(UNKNOWN_ERROR);
        console.error(response.status + response.statusText);

      }

    } catch (error) {

      setError(UNKNOWN_ERROR);
      console.error(error);

    }

  }

  const renderitems = (items: Array<PostProps>) => {
    return items.map((card: PostProps, index: number) => {
      return <Post key={index} {...card} />
    })
  }

  return (
    <Routes>
      <Route path="/" element={<div>
        <Title>Blog Posts</Title>
        <SelectContainer $marginBottom={16} $padding={16}>
          <Label htmlFor="category-filter">Filter by category</Label>
          <Select id="category-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((name: string) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </Select>
        </SelectContainer>
        {!error &&
          <div aria-live="polite">
            <Grid>
              {renderitems(visibleArticles)}
              {isLoading && <>
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </>}
            </Grid>
            {visibleCount < filteredPosts.length && (
              <Loader ref={loaderRef} style={{ height: 40, textAlign: 'center', padding: 10 }}>
                <span>Loading more...</span>
              </Loader>
            )}
          </div>}
      </div>} />
      <Route path="/posts/:id" element={<PostDetail/>}/>    
    </Routes>
  );

};

export default App;
