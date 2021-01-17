import React, { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const SetBirthyear = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const client = useApolloClient();
  const { allAuthors } = client.readQuery({ query: ALL_AUTHORS }) || []

  const handleSubmit = async event => {
    event.preventDefault()
    const result = await editAuthor({
      variables: {
        name, born
      }
    })
    console.log(result);
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {allAuthors.map(author => <option value={author.name} key={author.name}>{ author.name }</option>)}
          </select>
        </div>
        <div>
          born
          <input value={born} type="number" onChange={({ target }) => setBorn(+target.value)} />
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default SetBirthyear