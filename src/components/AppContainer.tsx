import { Route, Routes } from "react-router-dom";
import App from "./App";
import PostDetail from "./Posts/PostDetail";

const AppContainer: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
    );

};

export default AppContainer;
