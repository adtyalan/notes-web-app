import { notes, RENDER_EVENT } from '../app.js'

async function loadDataFromAPI() {
  showLoading(loading)

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const index = await response.json()
    console.log(`Unarchived data: ${index.message}`)

    const existingIds = notes.map((note) => note.id)
    for (const note of index.data) {
      if (!existingIds.includes(note.id)) {
        notes.push({
          ...note,
          createdAt: note.createdAt || new Date().toISOString(),
        })
      }
    }
    document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  } catch (error) {
    console.error('Failed to fetch unarchived notes from API:', error)
    alert('Gagal memuat data')
  } finally {
    hideLoading(loading)
  }
}

async function loadArchivedDataFromAPI() {
  try {
    const response = await fetch(
      'https://notes-api.dicoding.dev/v2/notes/archived',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const index = await response.json()
    console.log(`Archived data: ${index.message}`)

    const existingIds = notes.map((note) => note.id)
    for (const note of index.data) {
      if (!existingIds.includes(note.id)) {
        notes.push({
          ...note,
          createdAt: note.createdAt || new Date().toISOString(),
        })
      }
    }
    document.dispatchEvent(new CustomEvent(RENDER_EVENT))
  } catch (error) {
    console.error('Failed to fetch archived notes from API:', error)
    alert('Cek koneksi internet!')
  }
}

async function postNoteToAPI(note) {
  showLoading(loading)

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
    const index = await response.json()
    console.log(index.message)
  } catch (error) {
    console.error('Failed to post data to API:', error)
    alert('Gagal menambahkan catatan')
  } finally {
    hideLoading(loading)
  }
}

async function deleteNoteFromAPI(noteId) {
  showLoading(loading)

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: 'DELETE',
      }
    )
    const index = await response.json()
    console.log(index.message)
  } catch (error) {
    console.error('Failed to delete data from API:', error)
    alert('Gagal menghapus catatan')
  } finally {
    hideLoading(loading)
  }
}

async function archiveNoteToAPI(note) {
  showLoading(loading)

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${note.id}/archive`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }
    )
    const index = await response.json()
    console.log(index.message)
  } catch (error) {
    console.error('Failed to archive data to API:', error)
    alert('Gagal mengarsipkan catatan')
  } finally {
    hideLoading(loading)
  }
}

async function unarchiveNoteToAPI(note) {
  showLoading(loading)

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${note.id}/unarchive`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }
    )
    const index = await response.json()
    console.log(index.message)
  } catch (error) {
    console.error('Failed to unarchive data to API:', error)
    alert('Gagal membuka arsip catatan')
  } finally {
    hideLoading(loading)
  }
}

const loading = document.querySelector('loading-bar')

function showLoading(loading) {
  loading.style.display = 'flex'
}

function hideLoading(loading) {
  loading.style.display = 'none'
}

export {
  loadDataFromAPI,
  loadArchivedDataFromAPI,
  postNoteToAPI,
  deleteNoteFromAPI,
  archiveNoteToAPI,
  unarchiveNoteToAPI,
}
