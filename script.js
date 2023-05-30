const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const addBtn = document.getElementById('add-btn');
const libraryCollection = document.getElementById('library');

let Books = []; // array to store books

function saveData() {
  localStorage.setItem('data', JSON.stringify(Books));
}

// function to display books
function displayBooks() {
  let bookList;
  for (let i = 0; i < Books.length; i += 1) {
    bookList = `
      <div class="book-container">
        <div>${Books[i].title}</div>
        <div>${Books[i].author}</div>
        <button id=${i} type='button' class="remove-btn">Remove</button>
        <hr>
      </div>
    `;
  }
  libraryCollection.innerHTML += bookList;
}

// function to add new book to books array
function addNewBook() {
  if (title.value !== '' && author.value !== '') {
    Books.push({ title: title.value, author: author.value });
    displayBooks();
    saveData();
    title.value = '';
    author.value = '';
  }
}

addBtn.addEventListener('click', addNewBook);

function removeBook(e) {
  if (e.target.className === 'remove-btn') {
    Books = Books.filter((book, index) => index !== e.target.id);
    e.target.parentNode.remove();
    saveData();
  }
}

document.addEventListener('click', removeBook);

window.addEventListener('load', () => {
  if (localStorage.getItem('data')) {
    Books = JSON.parse(localStorage.getItem('data'));
  }
  if (Books.length !== 0) {
    displayBooks();
  }
});