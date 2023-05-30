const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const addBtn = document.getElementById('add-btn');
const libraryCollection = document.getElementById('library');
const bookForm = document.getElementById('addBook-form');

let Booklist = []; // array to store books

function saveData() {
  localStorage.setItem('data', JSON.stringify(Booklist));
}

// Book Class
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  displayBooks() {
    let bookCard = '';
    for (let i = 0; i < Booklist.length; i += 1) {
      bookCard = `
        <div class="added-books-container">
          <div>
            <p>"${this.title}" by ${this.author}</p>
          </div>
          <div>
            <button type="button" class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    }
    libraryCollection.innerHTML += bookCard;
  }
}

// add book method
function addNewBook() {
  if (title.value !== '' && author.value !== '') {
    const id = Booklist.length;
    const book = new Book(id, title.value, author.value);
    Booklist.push(book);
    book.displayBooks();
    saveData();
    bookForm.reset();
  }
}

addBtn.addEventListener('click', addNewBook);

function removeBook(e) {
  if (e.target.className === 'remove-btn') {
    const btnId = Number(e.target.id);
    Booklist = Booklist.filter((book, index) => index !== btnId);
    e.target.parentNode.parentNode.remove();
    saveData();
  }
}

document.addEventListener('click', removeBook);

window.addEventListener('load', () => {
  if (localStorage.getItem('data')) {
    Booklist = JSON.parse(localStorage.getItem('data'));
  }
  if (Booklist.length !== 0) {
    Book.displayBooks();
  }
});