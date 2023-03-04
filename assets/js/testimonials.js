// OOP Version, not used in Task 9

const testLists = document.querySelector('.testimonials-lists');
const buttonFilters = document.querySelectorAll('.btn-filters button');

class Testimonials {
  constructor(author, quote, img) {
    this.author = author;
    this.quote = quote;
    this.img = img;
  }

  templateHtml() {
    return `<div class="testimonial-item">
    <div class="container">
      <section class="head">
        <img src="${this.img}" alt="${this.author}" style="width: 100%" />
      </section>
      <section class="body">
        <p style="font-style: italic">"${this.quote}"</p>
        <h4>- ${this.author}</h4>
      </section>
    </div>
  </div>`;
  }
}

class TestiWithRating extends Testimonials {
  constructor(author, quote, img, rate) {
    super(author, quote, img);
    this.rate = rate;
  }

  getRating() {
    this.rating = '';
    for (let i = 1; i <= this.rate; i++) {
      this.rating += '<li><i class="fa-solid fa-star"></i></li>';
    }
    return this.rating;
  }

  templateHtml() {
    return `<div class="testimonial-item">
    <div class="container">
      <section class="head">
        <img src="${this.img}" alt="${this.author}" style="width: 100%" />
      </section>
      <section class="body">
        <p style="font-style: italic">"${this.quote}"</p>
        <h4>- ${this.author}</h4>
        <ul>
          ${this.getRating()}
        </ul>
      </section>
    </div>
  </div>`;
  }
}

const testimonialsData = [];
const testimonialUser1 = new Testimonials(
  'Arthur Morgan',
  'You know, all that ever mattered to me was loyalty? It was all I knew. It was all I ever believed in',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbHEvZOVCnWjVUfJ77ZEuBiWvCdD7FR8km-Fepv1t7sFF2yhH-EM4-g3ooNmuO8zXFNxM&usqp=CAU'
);

const testimonialUser2 = new Testimonials(
  'Mr. Lambert',
  'I did it for me. I liked it. I was good at it. And, I was really…I was alive.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ngR5IjpqcYm-eaf-HYOmkamoUZiQ_ajFw2ywNbyt_0Qk1xi3EJRSPATuu-r4__JYlsc&usqp=CAU'
);

const testimonialUser3 = new TestiWithRating(
  'Joel Miller',
  'If Somehow The Lord Gave Me A Second Chance...I Would Do It All Over Again.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAOg7XMO92tF7j1gCeUJy6m744bIn9H5PlA&usqp=CAU',
  5
);

const testimonialUser4 = new TestiWithRating(
  'Klaus Mikaelson',
  'Perhaps one day, in a year or even in a century. You’ll turn up at my door and let me show you what the world has to offer.',
  'data:image/jpeg;base64,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',
  3
);

const testimonialUser6 = new TestiWithRating(
  'Jesse Pinkman',
  'We make poison for people who don’t care. We probably have the most un-picky customers in the world.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP_nn7N8K-999PtaTL50rP45-5GdkAjuRCA&usqp=CAU',
  4
);

const testimonialUser7 = new TestiWithRating(
  'Saul Goodman',
  'Getting Arrested — That Makes People Look Guilty, Even The Innocent Ones And Innocent People Get Arrested Every Day.',
  'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/08/Better_Call_Saul_Breaking_Bad_Saul_Flask.jpg?q=50&fit=crop&w=1500&dpr=1.5',
  3
);

testimonialsData.push(testimonialUser1, testimonialUser2, testimonialUser3, testimonialUser4, testimonialUser6, testimonialUser7);

const filterTestimonials = (datas, rate) => {
  const filteredDatas = datas.filter((item) => item.rate === rate);
  return filteredDatas;
};

const updateUI = (datas) => {
  testLists.innerHTML = '';
  datas.map((index, id) => {
    testLists.innerHTML += datas[id].templateHtml();
  });
};

updateUI(testimonialsData);

buttonFilters.forEach((element) => {
  element.addEventListener('click', () => {
    // console.log(element.textContent);
    let filteredTestimonials = filterTestimonials(testimonialsData, Number(element.textContent));
    if (element.textContent.toLowerCase() === 'all') {
      updateUI(testimonialsData);
    } else if (filteredTestimonials.length === 0) {
      testLists.innerHTML = '<h2>Data not found!</h2>';
    } else {
      updateUI(filteredTestimonials);
    }
  });
});
