import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/styles/index.css'

import App from '@/pages'
import Home from '@/pages/inicio'
import HomeDetails from '@/pages/inicio/Details'

import Notices from '@/pages/editais'
import NoticesDetails from '@/pages/editais/Details'

import Minutes from '@/pages/atas'
import MinutesDetails from '@/pages/atas/Details'

import Contract from '@/pages/contratos'
import ContractDetails from '@/pages/contratos/Details'

import About from '@/pages/sobre'
import Contact from '@/pages/contato'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={ <App /> }>
          <Route path='/' element={ <Home /> } />
          <Route path='/detalhes/:cnpj/:ano/:id' element={ <HomeDetails /> } />

          <Route path='/editais' element={ <Notices /> } /> 
          <Route path='/editais/detalhes/:cnpj/:ano/:id' element={ <NoticesDetails /> } />

          <Route path='/atas' element={ <Minutes /> } /> 
          <Route path='/atas/detalhes/:cnpj/:ano/:process/:numAta' element={ <MinutesDetails /> } />

          <Route path='/contratos' element={ <Contract /> } /> 
          <Route path='/contratos/detalhes/:cnpj/:ano/:id' element={ <ContractDetails /> } />

          <Route path='/sobre' element={ <About /> } />
          <Route path='/contato' element={ <Contact /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
