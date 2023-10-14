import axios from 'axios';
import { serviceModal } from './js/api-search';

const list = document.querySelector('.js-list');

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books/';

async function makeList() {
  const result = axios.get('top-books');
  const resultVal = await result.then(data => data.data);
  const dta = await resultVal.map(val => val.list_name);
  const markupLi = markup(dta);
  list.insertAdjacentHTML('beforeend', markupLi);
}

function markup(val) {
  return val
    .map(element => {
      return `<li class="li">${element}</li>`;
    })
    .join('');
}

makeList();

// ------------------------------------------------------------------ //

const listOfBookFromCategory = document.querySelector(
  '.listOfBookFromCategory'
);

list.addEventListener('click', e => {
  const nameOfCategory = e.target.textContent;

  async function makeRequest() {
    const categoryList = axios.get(`category?category=${nameOfCategory}`);
    const resReq = await categoryList.then(data => data.data);
    // const date = await resReq.map(cal => cal);
    const markupListBook = markupBookOfcategory(resReq);
    listOfBookFromCategory.innerHTML = markupListBook;
  }

  makeRequest();
});

function markupBookOfcategory(val) {
  return val
    .map(elem => {
      return `      <li>
    <img src="${elem.book_image}" alt="" />
    <h1>${elem.title}</h1>
  </li>`;
    })
    .join('');
}

//-----------------------------------------------------//

async function topFive() {
  const result1 = axios.get('top-books');
  const resultVal1 = await result1.then(data => data.data);
  const dta = await resultVal1.map(e => e.books);
  const booksTopFive = dta.map(e => e);
  const markupForTopFive = markupTopFive(booksTopFive);
  listOfBookFromCategory.innerHTML = await markupForTopFive;
}

function markupTopFive(val) {
  return val
    .map(element => {
      return element.map(
        e => `<ul>
               <li class="item" data-id="${e._id}"> 
                 <img src="${e.book_image}" alt="">
                 <h1>${e.title}</h1>
                 <h2>${e.author}</h2>
               </li>             
              </ul>`
      );
    })
    .join('');
}

topFive();

//---------------------------------------------------------------//
const modal = document.querySelector('.modal');
const picture = document.querySelector('.js-modal-picture');
const modalInfo = document.querySelector('.js-modal-info');
const overlay = document.querySelector('.js-overlay-modal');
const addBtn = document.querySelector('js-modal-btn');

const closeBtn = document.querySelector('.js-modal-close');
const LS_KEY = 'book-inf';

listOfBookFromCategory.addEventListener('click', e => {
  const touch = e.target.closest('li');
  const touchId = touch.dataset.id;
  // picture.innerHTML = '';
  // modalInfo.innerHTML = '';
  // async function forModal() {
  //   const result = axios.get(`${touchId}`);
  //   const resultVal = await result.then(data => data.data);
  //   console.log(resultVal);
  //   const modalMake = makeModal(resultVal);
  //   modal.classList.add('active');
  //   return modalMake;
  // }
  forModal(touchId);
  // overlay.classList.add('active');
  // document.body.style.overflow = 'hidden';
});

async function forModal(touchId) {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  picture.innerHTML = '';
  modalInfo.innerHTML = '';
  const result = await serviceModal(touchId);
  console.log(result);
  const modalMake = makeModal(result);
  modal.classList.add('active');
  return modalMake;
}

function makeModal({
  author,
  book_image,
  book_image_width,
  book_image_height,
  description,
  title,
  amazon_product_url,
  buy_links,
}) {
  const content = `<img class="modal-picture-content" src="${book_image}" alt="${title}"  width="${book_image_width}" height="${book_image_height}" />`;
  const text = `<h2 class= "modal-title">${title}</h2>
        <h3 class="modal-author">${author}</h3>
        <p class="modal-description">${description}</p>
        <div class="modal-icons">
            <a
              href="${amazon_product_url}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amazon"
            >
              <img
                src="./images/modal/amazon.png"
                alt="Amazon"
                width="62"
                height="19"
              />
      
            </a>
          
            <a
              href="${buy_links[1].url}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book"
              ><img
                src="./images/modal/book.png"
                alt="Book"
                width="33"
                height="32"
            /></a>
            </div>`;

  picture.insertAdjacentHTML('beforeend', content);
  modalInfo.insertAdjacentHTML('beforeend', text);
}

list.addEventListener('click', e => {
  const nameOfCategory = e.target.textContent;
  if (nameOfCategory === 'All categories') {
    topFive();
  }
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

//на кнопку я повісила слухача і далі тотрібно у функціі прописати логіку з рендерингу сторінки та локал сторідж

addBtn.addEventListener('click', () => {})





