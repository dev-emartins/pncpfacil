import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/styles/index.css'

import App from '@/pages'
import Home from '@/pages/home'

import Notices from '@/pages/notices'
import NoticesDetails from '@/pages/notices/Details'

import Minutes from '@/pages/minutes'
import MinutesDetails from '@/pages/minutes/Details'

import Contract from '@/pages/contract'
import ContractDetails from '@/pages/contract/Details'

import About from '@/pages/about'
import Contact from '@/pages/contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={ <App /> }>
          <Route path='/' element={ <Home /> } />

          <Route path='/notices' element={ <Notices /> } /> 
          <Route path='/notices/details/:cnpj/:ano/:id' element={ <NoticesDetails /> } />

          <Route path='/minutes' element={ <Minutes /> } /> 
          <Route path='/minutes/details/:cnpj/:ano/:id' element={ <MinutesDetails /> } />

          <Route path='/contract' element={ <Contract /> } /> 
          <Route path='/contract/details/:cnpj/:ano/:id' element={ <ContractDetails /> } />

          <Route path='/about' element={ <About /> } />
          <Route path='/contact' element={ <Contact /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
