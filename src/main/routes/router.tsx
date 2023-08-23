import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import { Login } from '@/presentation/pages/login/login'

export const Router: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
  )
}
