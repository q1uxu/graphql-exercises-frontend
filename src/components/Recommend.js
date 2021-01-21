import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = props => {
  const result = useQuery(ME)
  const client = useApolloClient();
  const dataInStore = client.readQuery({ query: ALL_BOOKS })

  const [allBooks, setAllBooks] = useState([])
  
  useEffect(() => {
    setAllBooks(dataInStore?.allBooks ?? [])
  }, [dataInStore])

  if (!props.show || result.loading) {
    return null
  }

  const recommendBooks = allBooks.filter(book => book.genres.includes(result.data.me.favoriteGenre))

  return (
    <div>
      <h2>recommend</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {recommendBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend