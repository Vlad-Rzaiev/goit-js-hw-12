import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import xmarkSvg from './img/xmark.svg';
import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { gallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

searchForm.addEventListener('submit', ev => {
  ev.preventDefault();

  gallery.innerHTML = '';

  const userInputValue = ev.target.elements.search.value.trim().toLowerCase();

  if (userInputValue === '') {
    iziToast.show({
      message: 'Input field can not be empty. Please enter your message.',
      messageColor: '#ffffff',
      iconUrl: xmarkSvg,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  getImages(userInputValue)
    .then(images => {
      if (images.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#ffffff',
          iconUrl: xmarkSvg,
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
      }

      return renderGallery(images.hits);
    })
    .catch(error =>
      iziToast.show({
        message: `${error}`,
        messageColor: '#ffffff',
        iconUrl: xmarkSvg,
        backgroundColor: '#ef4040',
        position: 'topRight',
      })
    )
    .finally(() => hideLoader());

  searchForm.reset();
});
