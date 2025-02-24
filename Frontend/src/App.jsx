import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Root from './pages/Root'
import ErrorPage from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement:<ErrorPage/>,
    children:[
      {index:true,element:<Home/>},
      {
        path:'account',
        children:[
          {path:'login',element:<Login/>},
          {path:'signup',element:<SignUp/>},
        ]
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}

export default App
