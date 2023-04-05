const Content = ({part}) => {
  return(<div key={part.id}>{part.name} {part.exercises}</div>)
}

export default Content