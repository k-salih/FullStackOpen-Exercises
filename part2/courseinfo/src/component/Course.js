import Content from './Content'

const Course = ({course}) => {
    return (
    <div>
    <Content parts = {course.parts}/>
    </div>
    )
}

export default Course