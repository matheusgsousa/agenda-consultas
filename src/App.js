import React from 'react'
import { Switch, Route } from 'react-router-dom'
// COMPONENTS
import Header from './components/header'
import Title from './components/title'
//PAGES
import Agendamentos from './pages/Agendamentos'
import Exames from './pages/Exames'
import Medicos from './pages/Medicos'
import Home from './pages/Home'


function App() {
  return (
    <div>
      <Header />
      <div className='container mt-3'>
      
        <Title />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path='/exames' component={Exames} />
          <Route exact path='/medicos' component={Medicos} />
          <Route exact path='/agendamentos' component={Agendamentos} />

        </Switch>
      </div>
    </div>
  )
}

export default App
