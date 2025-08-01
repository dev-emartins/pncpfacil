import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/styles/index.css'

import App from '@/pages'
import Home from '@/pages/home'
import Details from '@/pages/details'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={ <App /> }>
          <Route path='/' element={ <Home /> } />
          <Route path='/details/:cnpj/contratos/:ano/:id' element={ <Details /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
