import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const genres = new Set();
  for (let book of books) {
    for (let genre of book.genres) {
      genres.add(genre)
    }
  }

  let booksToShow = books;
  if (genre) {
    booksToShow = books.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      {Array.from(genres).map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>

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
          {booksToShow.map(a =>
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

export default Books