const notes = [{
    title: 'My next trip',
    body: 'I would like to go to Spain'
}, {
    title: 'My hobbies',
    body: 'I like to play guitar'
}, {
    title: 'My favourite food',
    body: 'I like Thai green curry'
}]

const filters = {
    searchText: ''
}
// localStorage.setItem('location', 'BHX') // take 2 arguments
// localStorage.removeItem('location')
// console.log(localStorage.getItem('location')) // take 1 argument // read data save in localStorage object
// localStorage.clear()

const users = [{
    name: 'Nopp',
    age: 34,
}, {
    name: 'Jeen',
    age: 35
}]

const userJSON = JSON.stringify(users)
console.log(userJSON) // value wrap in double qouat [""]
localStorage.setItem('users', userJSON)

const userGetJSON = localStorage.getItem('users') // return string from memory
const userParseJSON = JSON.parse(userGetJSON) // parse strings back into array object
console.log(userParseJSON.length)
console.log(`${userParseJSON[0].name} is ${userParseJSON[0].age} year old`)


// DOM - Document Object Model
// const p = document.querySelector('p')
// const h1 = document.querySelector('h1')
// const h2 = document.querySelector('h2')
// const ps = document.querySelectorAll('p')
// const body = document.querySelector('body')
// const b = document.body
//-- Single--
//target html element use 'tag name'('tag name')
//target html ID use '#' ('#id')
//target html Class use '.'('.class-name')

//--Multiple--
//p#order -- tag=p with id=order
//button.inventory -- tag=button with id=inventory
//<--tag element must come first and other 2nd & 3rd ref can be in any position-->
//h1#title.application -- tag=h1 with id=title with class=application
//h1.application#title -- tag=h1 with class=application with id=title

const renderNotes = function (notes, filters) {
    const filterNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText)
    })
    console.log(filterNotes)
    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const newNote = document.createElement('p')
        newNote.textContent = note.title
        document.querySelector('#notes').appendChild(newNote)
    })
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    console.log('Click button')
    console.log(e)
    e.target.textContent = 'The button was clicked'
})

document.querySelector('input#search-text').addEventListener('input', function (e) {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    console.log(e.target.value)
})