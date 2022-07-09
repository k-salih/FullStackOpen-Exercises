import Part from './Part'
import Header from './Header'
import Total from './Total'

function Content({ course ,parts }) {
    return (
        <div>
            {<Header course={course}/>}
            {parts.map(item => <Part key={item.id} part={item} />)}
            {<Total parts={course.parts}/>}
        </div>
    )
}

export default Content