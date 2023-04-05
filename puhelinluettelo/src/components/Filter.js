
const Filter = ({value, handle}) => {
  return(
    <div>
      filter shown with <input value={value} onChange={handle} />
    </div>
  )
}

export default Filter