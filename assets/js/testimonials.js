const testLists = document.querySelector('.testimonials-lists');
const buttonFilters = document.querySelectorAll('.btn-filters button');

const testimonials = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.npoint.io/4db6420debd6d3437062', true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject('Error loading data!');
    }
  };
  xhr.onerror = () => {
    reject('Network error!');
  };
  xhr.send();
});

const generateHtml = (data) => {
  const getRating = () => {
    let rating = '';
    for (let i = 1; i <= data.rate; i++) {
      rating += '<li><i class="fa-solid fa-star"></i></li>';
    }
    return rating;
  };

  let html = `<div class="testimonial-item">
    <div class="container">
      <section class="head">
        <img src="${data.img}" alt="${data.author}" style="width: 100%" />
      </section>
      <section class="body">
        <p style="font-style: italic">"${data.quote}"</p>
        <h4>- ${data.author}</h4>
        <ul>
          ${getRating()}
        </ul>
      </section>
    </div>
  </div>`;

  return html;
};

const filterTestimonials = (buttonValue) => {
  testimonials
    .then((response) => {
      let filtered = response.filter((index) => index.rate == buttonValue);
      return filtered;
    })
    .then((response) => {
      updateUI(response);
    })
    .catch((err) => console.log(err));
};

const updateUI = (data) => {
  testLists.innerHTML = '';
  if (data.length <= 0) {
    testLists.innerHTML = `<h2>Data Not Found!</h2>`;
  } else {
    data.map((index) => (testLists.innerHTML += generateHtml(index)));
  }
};

const getAllTestimonials = () => {
  testimonials
    .then((response) => {
      updateUI(response);
    })
    .catch((err) => console.log(err));
};

getAllTestimonials();

buttonFilters.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.textContent.toLowerCase() === 'all') {
      getAllTestimonials();
    } else {
      filterTestimonials(element.textContent);
    }
  });
});
