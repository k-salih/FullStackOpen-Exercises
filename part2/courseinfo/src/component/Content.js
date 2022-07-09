import Part from './Part'

const Content = ({ parts }) => parts.map(item => <Part part = {item}/>)

export default Content