import Content from './Content.js'
import Total from './Total'

const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map( part => <Content key={part.id} part={part}/> )}
      <Total key={course.id} parts={course.parts}/>
    </div>
  )
}

export default Course