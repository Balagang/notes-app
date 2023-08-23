// import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4())
// console.log(crypto.randomUUID())

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    // console.log(notesJSON !== null)
    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
const removeNote = (id) => {
    console.log(id)
    const filterId = notes.findIndex((note) => {
        return note.id === id
    })
    console.log(filterId)
    if (filterId > -1) {
        notes.splice(id, 1)
    }
}

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')
    textEl.setAttribute('href', `/notes-app/edit.html#${note.id}`)
    // Setup remove note button
    button.textContent = 'Remove'
    noteEl.appendChild(button)
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Setup the note title note
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    noteEl.appendChild(textEl)
    return noteEl
}

const renderNotes = function (notes, filters) {
    const filterNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText)
    })
    // console.log(filterNotes)
    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

