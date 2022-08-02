const mongoose = require('mongoose')

if (process.argv.length < 3) { // eslint-disable-line no-undef
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1) // eslint-disable-line no-undef
} 

const password = process.argv[2] // eslint-disable-line no-undef
const name = process.argv[3] // eslint-disable-line no-undef
const number = process.argv[4] // eslint-disable-line no-undef

const url = `mongodb+srv://phonebook:${password}@cluster0.g3ozs.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => { // eslint-disable-line no-unused-vars
    if (process.argv.length === 3) { // eslint-disable-line no-undef
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    } else if (process.argv.length === 5) { // eslint-disable-line no-undef
      const person = new Person({
        name: name,
        number: number,
      })
      person.save().then(response => { // eslint-disable-line no-unused-vars
        console.log(`Added ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
      })
    }})

  .catch((err) => console.log(err))