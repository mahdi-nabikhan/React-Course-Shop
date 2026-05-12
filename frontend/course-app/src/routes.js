import Index from "./Pages/Index/Index"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Category from "./Pages/Category/Category"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Courses from "./Pages/Courses/Courses"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Article from "./Pages/Article/Article"
import Contact from "./Pages/Contact/Contact"
import Search from "./Pages/Search/Search"

const routes = [
    {path:'/' ,element:<Index/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'category-info/:categoryName',element:<Category/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    { path: '/courses', element: <Courses /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {path :'/article/:page', element :<Article/>},
    {path:'/contact',element:<Contact/>},
    {path:'/search/:value',element :<Search/>}


]



export default routes