import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const SetBirthyear = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

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
          name
          <input value={name} onChange={({ target }) => setName(target.value.trim())} />
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