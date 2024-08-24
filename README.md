---

# Notes Web App (Connected to Free Dicoding API)

This is a simple web-based application that allows users to create, view, and delete notes. The app is built using modern web technologies including Web Components to ensure a modular and maintainable codebase. This app is connected to free API. But, it reset every couple minutes. So, don't use this for storing your important note.

## Features

- **Create Notes:** Users can create new notes with a title and content.
- **View Notes:** All notes are displayed in a list.
- **Archive or Unarchive Notes:** Users can prefer to make the notes can be seen or hidden.
- **Delete Notes:** Users can delete notes they no longer need.
- **Responsive Design:** The app is responsive and works well on both desktop and mobile devices.
- **Connected with free API:** Sadly, it actually reset every couple minutes. Yes, deleting your added notes.

## Technologies Used

- **Web Components:** For creating reusable custom elements.
- **HTML5:** Structure and layout of the app.
- **CSS3:** Styling of the app.
- **JavaScript (ES6+):** Functionality and interaction.
- **Local Storage:** Persisting notes data on the user's device.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adtyalan/notes-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd notes-web-app
   ```

3. Install all the dependencies needed:
   
   ```bash
   npm install
   ```
   
4. Run the project for development stage:
   
   ```bash
   npm run start-dev
   ```

5. Or you can build the application to production stage:
   
   ```bash
   npm run build
   ```

6. You can open the app from `index.html` in dist folder
   
   
## Usage

1. **Create a Note:** Click on the "New Note" button and fill in the title and content fields.
2. **View Notes:** All notes displayed in a grid layout.
3. **Archive or Unarchive a Note:** While viewing a note, click the "box" button to move the note.
4. **Delete a Note:** While viewing a note, click the "Delete" button to remove it.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and add tests where necessary.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
