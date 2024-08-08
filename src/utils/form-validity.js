const realtimeValidation = () => {
  const titleValid = document.getElementById('inputNoteTitle')
  const bodyValid = document.getElementById('inputNoteBody')

  const customValidationTitleHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Judul harus ada!')
      return
    }
  }

  const customValidationBodyHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Isi harus ada!')
      return
    }
  }

  titleValid.addEventListener('change', customValidationTitleHandler)
  titleValid.addEventListener('invalid', customValidationTitleHandler)
  bodyValid.addEventListener('change', customValidationBodyHandler)
  bodyValid.addEventListener('invalid', customValidationBodyHandler)

  titleValid.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  })

  bodyValid.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  })
}

export default realtimeValidation
