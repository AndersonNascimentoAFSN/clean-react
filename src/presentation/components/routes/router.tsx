import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import React from 'react'

import { Login } from '@/presentation/pages'

import '@/presentation/styles/global.scss'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);

const Router: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
