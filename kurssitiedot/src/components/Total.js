const Total = ({parts}) => {
  const arr = parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const sum = arr.reduce(reducer)
  return ( <b>total of {sum} exercises</b> )
}

export default Total