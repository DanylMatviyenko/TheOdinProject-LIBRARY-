/*jshint esversion: 6*/
const myLibrary = findLibrary('library');
const bookTable = document.querySelector('.books-table');
const addButton = document.querySelector('.new-book');
const BOOK_INPUT = document.querySelectorAll('.book-info input');
const EMPTY_INSTANCE = bookTable.querySelector('.empty');
addButton.addEventListener('click', addBook);


class RemoveBookClass {
	handleEvent(event) {
		myLibrary.splice(event.currentTarget.dataset.index, 1);
		buildLibrary();
	}
}
const removeBook = new RemoveBookClass();
class ChangeReadStatus {
	handleEvent(event) {
		myLibrary[event.currentTarget.dataset.index].read = myLibrary[event.currentTarget.dataset.index].read === false ? true : false;
		buildLibrary();
	}
}
const readStatus = new ChangeReadStatus();

function BookConstructor(title,author,pages,read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBook() {
	const BOOK = new BookConstructor(BOOK_INPUT[0].value,BOOK_INPUT[1].value,parseInt(BOOK_INPUT[2].value), 
		BOOK_INPUT[3].value === 'yes' ? true: false);
	for(let book of BOOK_INPUT) {
		book.value = '';
	}
	myLibrary.push(BOOK);
	buildLibrary();
}

function buildLibrary() {
	bookTable.querySelector('tbody').innerHTML = '';
	let index = 0;
	for(let book of myLibrary) {
		const newBookTr = document.createElement('tr');
		newBookTr.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.pages}</td>
		<td>${book.read === false ? 'not read yet' : 'readed'}</td>
		<td><button type="button" data-index=${index} class="delete-book button-base">Delete book</button></td>
		<td><button type="button" data-index=${index} class="read-status button-base">Change read status</button></td>
		`;
		bookTable.querySelector('tbody').append(newBookTr);
		document.querySelector(`.delete-book[data-index="${index}"]`).addEventListener('click', removeBook);
		document.querySelector(`.read-status[data-index="${index}"]`).addEventListener('click', readStatus);
		++index;
	}
	saveBook(myLibrary);
	if(!bookTable.querySelector('tbody').innerHTML) {
		bookTable.querySelector('tbody').append(EMPTY_INSTANCE);
	}
}

function saveBook (library) {
	localStorage.setItem('library', JSON.stringify(library)); 
}

function findLibrary(key) {
	if(!localStorage.getItem(key)) {
		return [];
	}
	return JSON.parse(localStorage.getItem(key));
}
buildLibrary();

