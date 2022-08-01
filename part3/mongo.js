const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://phonebook:${password}@cluster0.g3ozs.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    if (process.argv.length == 3) {
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person)
            })
            mongoose.connection.close()
          })
    } else if (process.argv.length == 5) {
        const person = new Person({
          name: name,
          number: number,
        })
        person.save().then(response => {
          console.log(`Added ${name} number ${number} to the phonebook`)
          mongoose.connection.close()
        })
    }})

  .catch((err) => console.log(err))