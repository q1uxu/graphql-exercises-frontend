import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = props => {
  // const result = useQuery(ME)
  // const favoriteGenre = result?.data?.me?.favoriteGenre ?? null;
  const favoriteGenre = props.favoriteGenre;
  const [getRecommendBooks, response] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  const [recommendBooks, setRecommendBooks] = useState([])

  useEffect(getRecommendBooks, [])
  
  useEffect(() => {
    if (response.data && favoriteGenre) {
      setRecommendBooks(response.data.allBooks)
    }
  }, [response, favoriteGenre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

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