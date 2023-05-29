const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const addBtn = document.getElementById('add-btn');
const libraryCollection = document.getElementById('library');

const Books = []; // array to store books

// function to display books
function displayBooks() {
  let bookList;
  for (let i = 0; i < Books.length; i += 1) {
    bookList = `
      <div>${Books[i].title}</div>
      <div>${Books[i].author}</div>
      <div>
        <button type='button'>Remove</button>
      </div>
    `;
  }
  libraryCollection.innerHTML += bookList;
}

// function to add new book to books array
function addNewBook() {
  Books.push({ title: title.value, author: author.value });
  displayBooks();
  title.value = '';
  author.value = '';
}

addBtn.addEventListener('click', addNewBook);
