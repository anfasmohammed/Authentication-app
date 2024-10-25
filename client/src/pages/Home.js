import React from 'react'
import { useContext } from 'react'
import AuthContext from '../components/context/authContext'

const Home = () => {
const {auth} = useContext(AuthContext)
  return (
    <div>Home
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
  )
}

export default Home