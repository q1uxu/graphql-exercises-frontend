import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOKS = gql`
  query getBooksByAuthorAndGenre($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author
      published
      genres
    }
  }
`