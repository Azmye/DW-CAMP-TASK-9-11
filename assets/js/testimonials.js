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

const getAllTestimonials = async () => {
  testLists.innerHTML = '';
  const response = await testimonials;
  console.log(response);
  response.map((index) => (testLists.innerHTML += generateHtml(index)));
};

getAllTestimonials();

const filterTestimonials = async (elementValue) => {
  testLists.innerHTML = '';
  const response = await testimonials;

  let filteredTesti = response.filter((index) => index.rate === Number(elementValue));

  if (elementValue.toLowerCase() == 'all') {
    getAllTestimonials();
  } else if (filteredTesti.length === 0) {
    testLists.innerHTML = '<h2>Data not found!</h2>';
  } else {
    console.log(filteredTesti);
    filteredTesti.map((index) => (testLists.innerHTML += generateHtml(index)));
  }
};

buttonFilters.forEach((element) => {
  element.addEventListener('click', () => {
    filterTestimonials(element.textContent);
  });
});
