import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../../components/Home.jsx'
import BrowseBooks from '../../components/BrowseBooks.js'
import BookDetails from '../../components/BookDetails.js'
import AddBook from '../../components/AddBook.js'
import Error from '../../components/Error.js'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"books",
        element:<BrowseBooks/>,
      },
      {
        path:"books/:category",
        element:<BrowseBooks/>,
      },
      {
        path:"books/details/:id",
        element:<BookDetails/>,
      },
      {
        path:"addbook",
        element:<AddBook/>,
      }
    ],
    errorElement:<Error/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
