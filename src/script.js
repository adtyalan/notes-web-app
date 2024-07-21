import notesData from "./js/notes.js";
const notes = [];
const RENDER_EVENT = 'render-note';
const titleValid = document.getElementById('inputNoteTitle');
const bodyValid = document.getElementById('inputNoteBody');
const formContainer = document.getElementById('addNotesWithInfoContainer');

document.addEventListener('DOMContentLoaded', () => {
  const submitForm = document.getElementById('inputNote');
  const archiveButton = document.getElementById('archiveButton');

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNote();
    emptyInputTextArea();
  });

  if(isStorageExist()) {
    loadDataFromStorage();
  }

  formContainer.style.display = 'none';

  archiveButton.addEventListener('click', showArchived());
});

addNoteButton.addEventListener('click', () => {

  if(formContainer.style.display === 'none') {
    formContainer.style.display = 'grid';
  } else {
    formContainer.style.display = 'none';
  }
});

const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity('');

  if(event.target.validity.valueMissing) {
    event.target.setCustomValidity('Judul harus ada!');
    return;
  }
}

const customValidationBodyHandler = (event) => {
  event.target.setCustomValidity('');

  if(event.target.validity.valueMissing) {
    event.target.setCustomValidity('Isi harus ada!');
    return;
  }
}

titleValid.addEventListener('change', customValidationTitleHandler);
titleValid.addEventListener('invalid', customValidationTitleHandler);
bodyValid.addEventListener('change', customValidationBodyHandler);
bodyValid.addEventListener('invalid', customValidationBodyHandler);

titleValid.addEventListener('blur', (event) => {
  // Validate the field
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});

bodyValid.addEventListener('blur', (event) => {
  // Validate the field
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});

function addNote() {
  const createdAt = new Date();
  const generatedId = +new Date();
  const noteTitle = document.getElementById('inputNoteTitle').value;
  const noteBody = document.getElementById('inputNoteBody').value;
  const archived = document.getElementById('inputNoteIsArchive').checked;
  
  const noteObject = generateNoteObject(generatedId, noteTitle, noteBody, createdAt, archived);

  notes.push(noteObject);

  document.dispatchEvent(new CustomEvent(RENDER_EVENT));
  saveData();
}

function generateNoteObject(id, title, body, createdAt, archived) {
  return {
    id,
    title,
    body,
    createdAt,
    archived
  };
}

document.addEventListener(RENDER_EVENT, () => {
  const unarchivedNote = document.getElementById('notesUnarchivedList');
  unarchivedNote.innerHTML = '';

  const archivedNote = document.getElementById('notesArchivedList');
  archivedNote.innerHTML = '';

  for (const noteItem of notes) {
    const noteElement = makeNote(noteItem);
    if (!noteItem.archived) {
      unarchivedNote.append(noteElement);
    } else {
      archivedNote.append(noteElement);
    }
  }
});

function makeNote(noteObject) {
  const noteTitle = document.createElement('h3');
  noteTitle.innerText = noteObject.title;

  const noteBody = document.createElement('p');
  noteBody.innerText = noteObject.body;

  const noteDate = document.createElement('p');
  noteDate.innerText = noteObject.createdAt;

  const noteContainer = document.createElement('article');
  noteContainer.classList.add('note_item');
  noteContainer.append(noteTitle, noteBody, noteDate);
  noteContainer.setAttribute('data-id', `notes-${noteObject.id}`);

  if(noteObject.archived) {
    const archivedButton = document.createElement('button');
    archivedButton.innerHTML = '<i class="fas fa-box-open"></i>';
    archivedButton.setAttribute('type', 'button');
    archivedButton.classList.add('greenArchived');
    archivedButton.addEventListener('click',() => {
      unarchiveBook(noteObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.setAttribute('type', 'button');
    trashButton.classList.add('red');
    trashButton.addEventListener('click',() => {
      removeBook(noteObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(archivedButton, trashButton);

    noteContainer.append(buttonContainer);

  } else {
    const archivedButton = document.createElement('button');
    archivedButton.innerHTML = '<i class="fas fa-box"></i>';
    archivedButton.setAttribute('type', 'button');
    archivedButton.classList.add('green');
    archivedButton.addEventListener('click',() => {
      archiveBook(noteObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.setAttribute('type', 'button');
    trashButton.classList.add('red');
    trashButton.addEventListener('click',() => {
      removeBook(noteObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(archivedButton, trashButton);

    noteContainer.append(buttonContainer);
  }

  return noteContainer;
}

function findNote(noteId) {
  for (const noteItem of notes) {
    if(noteItem.id === noteId) {
      return noteItem;
    }
  }
  return null;
}

function archiveBook(noteId) {
  const noteTarget = findNote(noteId);
  if (noteTarget == null) return;

  noteTarget.archived = true;
  document.dispatchEvent(new CustomEvent(RENDER_EVENT));
  saveData();
}

function unarchiveBook(noteId) {
  const noteTarget = findNote(noteId);
  if (noteTarget == null) return;

  noteTarget.archived = false;
  document.dispatchEvent(new CustomEvent(RENDER_EVENT));
  saveData();
}

function removeBook(noteId) {
  const noteTarget = findNoteIndex(noteId);

  if (noteTarget == -1) return;

  notes.splice(noteTarget, 1);
  document.dispatchEvent(new CustomEvent(RENDER_EVENT));
  saveData();
}

function findNoteIndex(noteId) {
  for (const index in notes) {
    if(notes[index].id === noteId) {
      return index;
    }
  }
  return -1;
}

const SAVED_EVENT = 'saved-notes';
const STORAGE_KEY = 'NOTE_APPS';

function saveData() {
  const parsed = JSON.stringify(notes);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event(SAVED_EVENT));
}

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, () => {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  const dataFromNotesJS = notesData;

  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const note of data) {
      notes.push(note);
    }
  }

  if(dataFromNotesJS !== null) {
    for (const note of dataFromNotesJS) {
      notes.push(note);
    }
  }

  document.dispatchEvent(new CustomEvent(RENDER_EVENT));
}

function emptyInputTextArea() {
  const allInput = document.querySelectorAll('input');
  const allTextArea = document.querySelectorAll('textarea');

  allInput.forEach((input) => {
    input.value = '';
  });

  allTextArea.forEach((textarea) => { 
    textarea.value = '';
  });
}

function showArchived() {
  const notesList = document.getElementById('notesArchivedList');

  notesList.style.display = 'none';

  archiveButton.addEventListener('click', () => {
    if (notesList.style.display === 'none') {
      notesList.style.display = 'grid';
    } else {
      notesList.style.display = 'none';
    }
  });
}

document.addEventListener('click', (event) => {
  if (event.target.matches('a[href^="#"]')) {
      event.preventDefault();
      document.querySelector(event.target.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  }
});