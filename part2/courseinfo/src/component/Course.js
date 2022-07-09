import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    return (
    <div>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts}/>
    </div>
    )
}

export default Course