import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import UpdatePost from "./pages/UpdatePost";
import BlogList from './pages/BlogList';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/blogs" element={<BlogList />} ></Route>
        <Route path="/sign-in" element={<SignIn />} ></Route>
        <Route path="/sign-up" element={<SignUp />} ></Route>
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} ></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
