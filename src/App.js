import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  
  const client = useApolloClient()
  
  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    setPage("authors")
    localStorage.clear()
    client.resetStore()
  }
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage}/>
      <Authors show={page === 'authors'} notify={notify} />
      <Books show={page === 'books'} notify={notify} />
      <NewBook show={page === 'add'} notify={notify} />
      <LoginForm show={page === 'login'} notify={notify} setToken={setToken} setPage={setPage}/>

    </div>
  )
}

export default App