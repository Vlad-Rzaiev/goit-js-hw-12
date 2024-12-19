export function getImages(userInputValue) {
  const searchParams = new URLSearchParams({
    key: '47679134-c77d37d01e499358209d43473',
    q: userInputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 200,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
