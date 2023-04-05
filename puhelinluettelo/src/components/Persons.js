
const Persons = ({persons, remove}) => {

  return(
    <table>
      <tbody>
        {persons.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td>
        <td><button onClick={() => remove(person.name, person.id)}>delete</button></td></tr>)}
      </tbody>
    </table>
  )
}

export default Persons