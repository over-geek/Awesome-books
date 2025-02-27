const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const addBtn = document.getElementById('add-btn');
const libraryCollection = document.getElementById('library');
const bookForm = document.getElementById('addBook-form');
const dash = document.getElementById('dash');
const sectionBookList = document.getElementById('book-list');
const sectionNewBook = document.getElementById('new-book');
const contactSection = document.getElementById('Contact-section');
const listLink = document.querySelector('.list-link');
const newLink = document.querySelector('.new-link');
const contactLink = document.querySelector('.contact-link');

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
    if (Booklist.length > 0) {
      dash.style.display = 'block';
    }
  }
}

addBtn.addEventListener('click', addNewBook);

function removeBook(e) {
  if (e.target.className === 'remove-btn') {
    const btnId = Number(e.target.id);
    Booklist = Booklist.filter((book, index) => index !== btnId);
    if (Booklist.length === 0) {
      dash.style.display = 'none';
    }
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
    Booklist.forEach((book) => {
      libraryCollection.innerHTML += `
        <div class="added-books-container">
          <div>
            <p>"${book.title}" by ${book.author}</p>
          </div>
          <div>
            <button type="button" class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    });
  }
});

listLink.addEventListener('click', () => {
  sectionBookList.classList.remove('display-none');
  sectionNewBook.classList.add('display-none');
  contactSection.classList.add('display-none');
});
newLink.addEventListener('click', () => {
  sectionNewBook.classList.remove('display-none');
  sectionBookList.classList.add('display-none');
  contactSection.classList.add('display-none');
});
contactLink.addEventListener('click', () => {
  contactSection.classList.remove('display-none');
  sectionBookList.classList.add('display-none');
  sectionNewBook.classList.add('display-none');
});

// date
const date = new Date();
const options = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

document.getElementById('date').innerHTML = date.toLocaleDateString('en-US', options);