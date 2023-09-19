// import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4())
// console.log(crypto.randomUUID())
'use strict'
// const public = true // public keyword is a reverved identifier
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    // console.log(notesJSON !== null)
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
const removeNote = (id) => {
    console.log(id)
    const filterId = notes.findIndex((note) => note.id === id)
    // console.log(filterId)
    if (filterId > -1) {
        notes.splice(filterId, 1)
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

const sortNotes = (notes, sortBy) => {
    // debugger
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else { return 0 }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else { return 0 }
        })
    } else if (sortBy === 'byAlphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else { return 0 }
        })
    } { return 0 }
}

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    // console.log(filterNotes)
    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
