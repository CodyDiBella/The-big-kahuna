const bookshelfElement = document.querySelector(".books");
const bookshelf = new Bookshelf(bookshelfElement);
bookshelf.seed(bookData);
// document.body.classList.add("blurred");


// Here is the setting up for favorite counter
const favCount = document.querySelector(".favCount");
// declaring various things. counter, search bar and button
const searchInput = document.querySelector("#searchBar");
const searchBtn = document.querySelector(".searchBtn");
// event listenr on click for the search button. its set up so that you input the string and then click search, to get the full list back you can press the button on an empty string value in the input
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const searchFn = (b) => b.title.toLowerCase().includes(query);
  bookshelf.filterVisibleBooks(searchFn);
  document.getElementById("searchBar").value = "";
});

// const registerButt = document.getElementById("registerButt");
// registerButt.addEventListener("click", () => {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   let user = username;
//   document.getElementById("userPrompt").classList.add("hidden");
//   document.getElementById("overlay").style.filter = "none";
// });


// const input = document.querySelector(".commentPage input");
// const counter = document.createElement("span");
// counter.textContent = `280`;
// counter.className = "tweetButt";
// input.parentNode.appendChild(counter);

// input.addEventListener("input", () => {
//   if (input.value.length > 280) {
//     input.value = input.value.slice(0, 280);
//   }
//   counter.textContent = `${280 - input.value.length}`;
// });

// const sortBy = document.querySelector(".sortBy");

// sortBy.addEventListener("change", () => {
//   const query = sortBy.value;
//   let sortFn;

//   if (query === "titleaz") {
//     sortFn = (a, b) => a.title.localeCompare(b.title);
//   } else if (query === "titleza") {
//     sortFn = (a, b) => b.title.localeCompare(a.title);
//   }
//   bookshelf.sortBooks(sortFn);
//   bookshelf.renderBooks();
// });

// const commentButtons = document.querySelectorAll(".addComBtn");

// commentButtons.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     const bookId = event.target.dataset.bookId;
//     const book = bookshelf.find((b) => b.id === bookId);
//     // Add comment to book object
//     book.comments.push(newComment);
//   });
// });
// The maing book function, he is the constructor and where we start making the book objects
function Book(authors, language, subject, title, comments = []) {
  this.authors = authors;
  this.language = language;
  this.subject = subject;
  this.title = title;
  this.isFavorite = false;
  this.comments = comments;

// comments are stored in an array, so we can push the latest comment to the array

  this.displayCom = function () {};

// the render function

  this.render = function () {
    const li = document.createElement("li");
    li.textContent = this.title;

    // creating a li which we will return with the render function. this list will include things inside of our books. title, author, sub, lang, buttons for the books.

    const favButton = document.createElement("button");
    favButton.textContent = this.isFavorite ? "⭐" : "☆";
    li.append(favButton);
// favorite buttons. on click they will flip the button to the other image so we have a visual and add to the favcount. the reverse will subtract

    favButton.addEventListener("click", () => {
      this.isFavorite = !this.isFavorite;
      favButton.textContent = this.isFavorite ? "⭐" : "☆";

      favCount.textContent = bookshelf.countFavoriteBooks();
    });

// creating the comment buttons. these will open a div where our comments will be stored and displayed and written to

    const commentButton = document.createElement("button");
    commentButton.className = "commentButt";
    commentButton.textContent = "✉";
    li.append(commentButton);

// this is how I was able to implement the limit for the characters

    commentButton.addEventListener("click", () => {
      comPage.classList.remove("hidden");
      const input = comInp;
      const counter = document.createElement("span");
      counter.textContent = `280`;
      counter.className = "counter";
      input.parentNode.insertBefore(counter, input);
      document.body.style.filter = "none";

      input.addEventListener("input", () => {
        if (input.value.length > 280) {
          input.value = input.value.slice(0, 280);
        }
        counter.textContent = `${280 - input.value.length}`;
      });

// here is the listener for the click on the submit comment button which does a few things including grabbing the vaule of the input

      submitComBtn.addEventListener("click", () => {
        this.comments.push(comInp.value);
        comInp.value = "";
        addComment();
        counter.textContent = 280;
        console.log(comments);
      });

// here is the close button, I didnt want the div to close on submit, so that we can see our comments. this is the only way to close the div

      closeComBtn.addEventListener("click", () => {
        comInp.value = "";
        comPage.classList.add("hidden");
        counter.remove();
      });
      li.append(comPage);
  
    });

// creating and declaring different elements. input, close button, submit butt, the div page itself. this is done in the book so that each book has its own comments section

    const comPage = document.createElement("div");
    comPage.classList = "commentPage hidden";
    const submitComBtn = document.createElement("button");
    submitComBtn.textContent = "Submit";
    submitComBtn.className = "submitComment";
    const closeComBtn = document.createElement("button");
    closeComBtn.textContent = "X";
    closeComBtn.className = "closeComment";
    const comInp = document.createElement("input");
    comInp.className = "comInput";
    const comList = document.createElement("ul");
    comList.className = "commentList";
    comList.textContent = "";
    // const counter = document.createElement("span");
    // counter.textContent = `280`;
    // counter.className = "tweetButt";
    // comInp.textContent = this.title;
    comPage.innerHTML = `<div class='title'>${this.title}</div> <br> <div class='authors'>${"By: "}${this.authors} </div>`;
    comPage.appendChild(closeComBtn);
    // comInp.appendChild(counter);
    comPage.appendChild(comInp);
    comPage.appendChild(submitComBtn);
    comPage.appendChild(comList);

    // comInp.addEventListener("comInp", () => {
    //   if (comInp.value.length > 280) {
    //     comInp.value = comInp.value.slice(0, 280);
    //   }
    //   counter.textContent = `${280 - comInp.value.length}`;
    // });

    function addComment() {
      let template = comments
        .map((comment) => `<li>${comment}</li>`)
        .join("\n");
      comList.innerHTML = template;
    }

    addComment();

    // submitComBtn.addEventListener("click", () => {
    //   this.comments.push(comInp.value);
    //   comInp.value = "";
    //   addComment();
    //   counter.textContent = `${280 - input.value.length}`;
    //   console.log(comments);
    // });

    // closeComBtn.addEventListener("click", () => {
    //   comInp.value = "";
    //   comPage.classList.add("hidden");
    //   counter.textContent = "";
    // });
    // li.append(comPage);

    // const addComBtn = document.querySelector(".addComBtn");

    // addComBtn.addEventListener("click", () => {
    //   const formB = document.createElement("form");
    //   formB.className = "comForm";
    //   formB.addEventListener("submit", (event) => handleFormSubmit(event, formB));

    //   formB.innerHTML = `
    //     <label>
    //       Comment:
    //       <input placeholder="Write your comment here" type="text" name="comment" required>
    //     </label>
    //     <br>
    //     <button type="submit">Submit</button>
    //     <button id="exit">X</button>
    //   `;

    //   document.body.append(formB);

    //   const closeAddCom = document.getElementById("exit");
    //   closeAddCom.addEventListener("click", () => {
    //     formB.remove();
    //   });
    //   formB.addEventListener("submit", handleFormSubmit);
    // });

    // function handleFormSubmit(event, formB) {
    //   event.preventDefault();

    //   const comments = formB.elements.comments.value;
    //   const book = new Book(authors, language, subject, title);
    //   bookshelf.addBook(book);
    //   const sortFn = (a, b) => a.title.localeCompare(b.title);
    //   bookshelf.sortVisibleBooks(sortFn);
    //   const bookList = document.querySelector(".books");
    //   bookList.append(book.render());
    //   formA.remove();
    // }

    // const comDiv = document.createElement("div");
    // comDiv.className = "commDiv";
    // // comDiv.textContent = newComment;
    // li.append(comDiv);

    return li;
  };
}

// const submitComBtn = document.querySelector(".submitComment");
// submitComBtn.addEventListener("click", () => {
//   const newComment = document.querySelector("#commentClear").value;
//   document.getElementById("commentClear").value = "";
//   counter.textContent = `${280 - input.value.length}`;
//   document.querySelector("#commentPage").classList.add("hidden");
//   console.log();
// });

// const closeComment = document.querySelector(".closeComment");
// closeComment.addEventListener("click", () => {
//   const commentClear = document.querySelector("#commentClear");
//   commentClear.value = "";
//   document.querySelector("#commentPage").classList.add("hidden");
// });

const addBookBtn = document.querySelector(".addBookBtn");

// listener for the add book button. will submit this form that handles all the info

addBookBtn.addEventListener("click", () => {
  const formA = document.createElement("form");
  formA.className = "bookForm";
  formA.addEventListener("submit", (event) => handleFormSubmit(event, formA));

  formA.innerHTML = `
    <label>
      Title:
      <input type="text" name="title" required>
    </label>
    <br>
    <label>
      Authors:
      <input type="text" name="authors" required>
    </label>
    <br>
    <label>
      Subject:
      <input type="text" name="subject" required>
    </label>
    <br>
    <label>
      Language:
      <input type="text" name="language" required>
    </label>
    <br>
    <button type="submit">Submit</button>
    <button id="close">X</button>
  `;

  document.body.append(formA);

  const closeAddBook = document.getElementById("close");
  closeAddBook.addEventListener("click", () => {
    formA.remove();
  });
  formA.addEventListener("submit", handleFormSubmit);
  bookshelf.renderBooks();
});

function handleFormSubmit(event, formA) {
  event.preventDefault();

  const title = formA.elements.title.value;
  const authors = formA.elements.authors.value;
  const subject = formA.elements.subject.value;
  const language = formA.elements.language.value;
  const book = new Book(authors, language, subject, title);
  bookshelf.addBook(book);
  const sortFn = (a, b) => a.title.localeCompare(b.title);
  bookshelf.sortVisibleBooks(sortFn);
  const bookList = document.querySelector(".books");
  bookList.append(book.render());
  formA.remove();
}

// bookshelf constructor, here is where we get our list of books and how we see them all rendered on the page.

function Bookshelf(htmlElement, books = []) {
  this.books = books;
  this.htmlElement = htmlElement;
  this.visibleBooks = books;

  this.seed = function (data) {
    data.forEach((bookInfo) => {
      const book = new Book(
        bookInfo.author,
        bookInfo.language,
        bookInfo.subject,
        bookInfo.title,
        bookInfo.comments
      );
      this.addBook(book);
    });

    this.visibleBooks = this.books;
    this.sortVisibleBooks((a, b) => a.title.localeCompare(b.title));

    this.render();
  };

// setting up sorting for when you add a book into the array, you will then see it in its alphabetical location

  this.addBook = function (book) {
    this.books.push(book);
  };

// pushing the new book you added

  this.render = function () {
    const ul = document.createElement("ul");
    const books = this.visibleBooks.map((b) => b.render());
    ul.replaceChildren(...books);
    this.htmlElement.replaceChildren(ul);
  };

  this.countFavoriteBooks = function () {
    return this.books.reduce(
      (count, book) => (book.isFavorite ? count + 1 : count),
      0
    );
  };

  // math for setting up the favorite count

  this.filterVisibleBooks = function (criteria) {
    this.visibleBooks = this.books.filter(criteria);
    this.render();
  };

  this.sortVisibleBooks = function (compareFn) {
    this.visibleBooks.sort(compareFn);
    this.render();
  };
}

// if you are reading this, you deserve a break! =P