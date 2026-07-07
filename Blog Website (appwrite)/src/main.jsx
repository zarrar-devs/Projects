import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout/AuthLayout.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import ListPosts from './pages/ListPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import NotFound from './pages/NotFound.jsx'
import Landing from './pages/Landing.jsx'
import MainLayout from './MainLayout.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        element: <MainLayout></MainLayout>,
        children: [
          { path: '/', element: <Landing></Landing> },
          { path: '/home', element: <Home></Home> },
          { path: '/all-posts', element: <ListPosts></ListPosts> },
          { path: '/post/', element: <ListPosts></ListPosts> },
        ]
      },

      {
        children: [
          { path: '/login', element: <AuthLayout> <Login></Login> </AuthLayout> },
          { path: '/sign-up', element: <SignUp></SignUp> },
          { path: '/add-post', element: <AddPost></AddPost> },
          { path: '/edit-post/:slug', element: <EditPost></EditPost> },
          { path: '/post/:slug', element: <Post></Post> },
          { path: '*', element: <NotFound></NotFound> }
        ]
      }

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
