import styled from "styled-components";
import PostsContainer from "./Posts/PostsContainer";

const Header = styled.h1`
  padding: 16px;
  background: #eeb868;
`

const MainContainer = styled.div`
  max-width: 1280px;
  padding: 0 10px;
  margin: auto;
`

const App: React.FC = () => {

  return (
    <div>
      <Header>
        Kai Forward - Technical Assessment
      </Header>
      <MainContainer>
        <PostsContainer/>       
      </MainContainer>
      <footer>
        <p>Kai Forward 2025</p>
      </footer>
    </div>
  );

};

export default App;
