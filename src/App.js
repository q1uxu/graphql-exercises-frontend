import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { ME } from './queries' 
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  
  const client = useApolloClient()
  const [getMe, result] = useLazyQuery(ME)
  const favoriteGenre = result?.data?.me?.favoriteGenre ?? null
  
  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if ( token ) {
      setToken(token)
      getMe()
    }
  }, []) // eslint-disable-line

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
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage}/>
      <Authors show={page === 'authors'} notify={notify} />
      <Books show={page === 'books'} notify={notify} />
      <NewBook show={page === 'add'} notify={notify} />
      <Recommend show={page === 'recommend'} favoriteGenre={favoriteGenre}/>
      <LoginForm show={page === 'login'} notify={notify} setToken={setToken} setPage={setPage} getMe={getMe}/>
    </div>
  )
}

export default App