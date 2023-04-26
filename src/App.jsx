import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import UserMenu from './components/UserMenu'
import LogIn from './components/LogIn'
import { useStateContext } from './contexts/ContextProvider'

function App() {
  const [loginActive, setLoginActive] = useState(false)
  const { user, setUser } = useStateContext()
  const [key , setKey] = useReducer(x => x + 1, 0);

  useEffect(() => {
    setKey()
  }, [user])

  return !loginActive ?
    <div className={['pageWrap'].join(' ')} >
      <Header><UserMenu setLoginActive={setLoginActive} /></Header>
      <Outlet key={key}/>
      <Footer></Footer>
    </div>
    :
    <LogIn returnSuccess={success => setLoginActive(!success)}></LogIn>

}

export default App
