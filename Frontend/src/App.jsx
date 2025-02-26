import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Root from './pages/Root'
import ErrorPage from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cookies from './pages/Cookies'
import Chocolates from './pages/Chocolates'
import { tokenLoader } from './util/auth'
import {action as Authlogout} from './pages/Logout'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement:<ErrorPage/>,
    id:"root",
    loader:tokenLoader,
    children:[
      {index:true,element:<Home/>,loader:tokenLoader},
      {
        path:'account',
        children:[
          {path:'login',element:<Login/>},
          {path:'signup',element:<SignUp/>},
        ]
      },{
        path:'/product',
        children:[
          {path:'cookies',element:<Cookies/>},
          {path:'chocolate',element:<Chocolates/>}
        ]
      },
      {
        path: "logout",
        action: Authlogout,
      },
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}
export default App
