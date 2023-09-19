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
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    // Setup remove note button
    // const button = document.createElement('button')
    // button.textContent = 'x'
    // noteEl.appendChild(button)
    // button.addEventListener('click', () => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    // Setup the note title note
    // textEl.setAttribute('href', `/notes-app/edit.html#${note.id}`)
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    // Setup th elink
    noteEl.setAttribute('href', `/notes-app/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
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
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    // console.log(filterNotes)
    notesEl.innerHTML = ''

    if (filterNotes.length > 0) {
        filterNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
