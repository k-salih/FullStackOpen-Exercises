import Content from './Content'

const Course = ({courses}) => {
    return (
    <div>
        {courses.map(course => <Content key={course.id} parts={course.parts} course={course}/>)}
    </div>
)
}

export default Course