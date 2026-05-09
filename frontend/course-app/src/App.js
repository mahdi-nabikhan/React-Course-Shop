import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthContext from './context/authContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
  const [isLoggedIn,setLoggedIn]=useState(false)
  const [token,setToken]=useState(false)
  const [userInfos,setUserInfos]=useState(false)
  const router = useRoutes(routes)
  const login = (token) =>{
    setToken(token)
    localStorage.setItem('user',{token})

  }
  const logout = ()=>{
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }
  return (
    <div>
      <AuthContext.Provider value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout
      }}>
        { router }
      </AuthContext.Provider>
      
    </div>
  )
}
