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
import AdminPanel from "./Pages/Panel"
import Users from "./Pages/Panel/Users/Users"

import AdminCourse from "./Pages/Panel/AdminCourse/AdminCourse"
import Menu from "./Pages/Panel/Menu/Menu"
import AdminArticles from "./Pages/Panel/AdminArticles/AdminArticles"
import Contacts from "./Pages/Panel/Contacts/Contacts"
import Sessions from "./Pages/Panel/Sessions/Sessions"
import Session from "./Pages/Panel/Sessions/Session"
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
    {path:'/search/:value',element :<Search/>},
    {path:'/:courseName/:sessionID',element:<Session/>},
    {path:'/p-admin/*',element :<AdminPanel/> ,children:[{path:'users',element:<Users/>},
                                                        {path:'courses',element:<AdminCourse/>},
                                                        {path:'menu',element:<Menu/>},
                                                        {path:'articles',element:<AdminArticles/>},
                                                        { path: "category", element: <AdminCategory /> },
                                                        {path:'contacts',element:<Contacts/>},
                                                        {path:'sessions',element:<Sessions/>}
                                                        ],
                                                    }


]



export default routes