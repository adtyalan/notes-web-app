import {
  loadDataFromAPI,
  loadArchivedDataFromAPI,
  postNoteToAPI,
  deleteNoteFromAPI,
  archiveNoteToAPI,
  unarchiveNoteToAPI,
} from './utils/api-handler.js'
import realtimeValidation from './utils/form-validity.js'
import { animate, stagger } from 'motion'
import './styles/style.css'
import './styles/responsive.css'
import './components/index.js'

const formContainer = document.getElementById('addNotesWithInfoContainer')
const RENDER_EVENT = 'render-note'
const notes = []

export { notes, RENDER_EVENT }

// animasi tombol Add Note
const addNoteButton = document.getElementById('addNoteButton')
addNoteButton.addEventListener('mouseenter', () => {
  animate(addNoteButton, { scale: 1.1 }, { duration: 0.2 })
})
addNoteButton.addEventListener('mouseleave', () => {
  animate(addNoteButton, { scale: 1 }, { duration: 0.2 })
})

document.addEventListener('DOMContentLoaded', () => {
  const submitForm = document.getElementById('inputNote')
  const archiveButton = document.getElementById('archiveButton')

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault()
    addNote()
    emptyInputTextArea()
    hideAddNoteForm()
  })

  loadDataFromAPI()
  loadArchivedDataFromAPI()
  realtimeValidation()

  formContainer.style.display = 'grid'

  archiveButton.addEventListener('click', showArchived())
})

function hideAddNoteForm() {
  formContainer.style.display = 'none'
}

// Animasi Form Input Catatan Baru
addNoteButton.addEventListener('click', () => {
  if (formContainer.style.display === 'none') {
    formContainer.style.display = 'grid'
    animate(formContainer, { opacity: 1, y: 0 }, { duration: 0.5 })
  } else {
    animate(
      formContainer,
      { opacity: 0, y: -20 },
      { duration: 0.5 }
    ).finished.then(() => {
      formContainer.style.display = 'none'
    })
  }
})

function addNote() {
  const noteTitle = document.getElementById('inputNoteTitle').value
  const noteBody = document.getElementById('inputNoteBody').value
  const noteObject = generateNoteObject(noteTitle, noteBody)

  notes.push(noteObject)

  document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  postNoteToAPI({ title: noteTitle, body: noteBody })
}

function generateNoteObject(title, body) {
  return {
    title,
    body,
    createdAt: new Date().toISOString(),
  }
}

document.addEventListener(RENDER_EVENT, () => {
  const unarchivedNote = document.getElementById('notesUnarchivedList')
  unarchivedNote.innerHTML = ''

  const archivedNote = document.getElementById('notesArchivedList')
  archivedNote.innerHTML = ''

  for (const noteItem of notes) {
    const noteElement = makeNote(noteItem)
    if (!noteItem.archived) {
      unarchivedNote.append(noteElement)
    } else {
      archivedNote.append(noteElement)
    }
  }
  const noteItems = document.querySelectorAll('.note_item')
  animate(
    noteItems,
    { opacity: [0, 1], y: [-20, 0] },
    { delay: stagger(0.1), duration: 0.5 }
  ) // animasi note item muncul
})

function makeNote(noteObject) {
  const noteTitle = document.createElement('h3')
  noteTitle.innerText = noteObject.title

  const noteBody = document.createElement('p')
  noteBody.innerText = noteObject.body

  const noteDate = document.createElement('p')
  noteDate.innerText = new Date(noteObject.createdAt)

  const noteContainer = document.createElement('article')
  noteContainer.classList.add('note_item')
  noteContainer.append(noteTitle, noteBody, noteDate)
  noteContainer.setAttribute('data-id', `notes-${noteObject.id}`)

  if (noteObject.archived) {
    const archivedButton = document.createElement('button')
    archivedButton.innerHTML = '<i class="fas fa-box-open"></i>'
    archivedButton.setAttribute('type', 'button')
    archivedButton.classList.add('greenArchived')
    archivedButton.addEventListener('click', () => {
      unarchiveBook(noteObject.id)
    })

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.setAttribute('type', 'button')
    trashButton.classList.add('red')
    trashButton.addEventListener('click', () => {
      removeBook(noteObject.id)
    })

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('action')
    buttonContainer.append(archivedButton, trashButton)

    noteContainer.append(buttonContainer)
  } else {
    const archivedButton = document.createElement('button')
    archivedButton.innerHTML = '<i class="fas fa-box"></i>'
    archivedButton.setAttribute('type', 'button')
    archivedButton.classList.add('green')
    archivedButton.addEventListener('click', () => {
      archiveBook(noteObject.id)
    })

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.setAttribute('type', 'button')
    trashButton.classList.add('red')
    trashButton.addEventListener('click', () => {
      removeBook(noteObject.id)
    })

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('action')
    buttonContainer.append(archivedButton, trashButton)

    noteContainer.append(buttonContainer)
  }

  return noteContainer
}

function findNote(noteId) {
  for (const noteItem of notes) {
    if (noteItem.id === noteId) {
      return noteItem
    }
  }
  return null
}

function archiveBook(noteId) {
  const noteTarget = findNote(noteId)
  if (noteTarget == null) return

  noteTarget.archived = true
  document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  archiveNoteToAPI(noteTarget)
}

function unarchiveBook(noteId) {
  const noteTarget = findNote(noteId)
  if (noteTarget == null) return

  noteTarget.archived = false
  document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  unarchiveNoteToAPI(noteTarget)
}

function removeBook(noteId) {
  const noteTarget = findNoteIndex(noteId)

  if (noteTarget == -1) return

  notes.splice(noteTarget, 1)
  document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  deleteNoteFromAPI(noteId)
}

function findNoteIndex(noteId) {
  for (const index in notes) {
    if (notes[index].id === noteId) {
      return index
    }
  }
  return -1
}

function emptyInputTextArea() {
  const allInput = document.querySelectorAll('input')
  const allTextArea = document.querySelectorAll('textarea')

  allInput.forEach((input) => {
    input.value = ''
  })

  allTextArea.forEach((textarea) => {
    textarea.value = ''
  })
}

function showArchived() {
  const notesList = document.getElementById('notesArchivedList')

  notesList.style.display = 'none'

  archiveButton.addEventListener('click', () => {
    if (notesList.style.display === 'none') {
      notesList.style.display = 'grid'
    } else {
      notesList.style.display = 'none'
    }
  })
}
