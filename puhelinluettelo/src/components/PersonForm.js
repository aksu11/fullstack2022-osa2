
const PersonForm = ({name, number, nameChange, numberChange, submitForm}) => {
  return (
    <form onSubmit={submitForm}>
      <div>
        name: <input value={name} onChange={nameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={numberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm