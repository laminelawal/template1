const navBar = document.querySelector('.nav');

//Here im handling the general hover mouse to nav
const handleHover = (e, opacity) => {
  //Here im cheking if the target hovered is contening the current class
  if (e.target.classList.contains('nav__link')) {
    //Here if containing the prev class then store this value to the variable
    const link = e.target;
    // Here im taking all Links by the target container and tking all links in a array
    const allLinks = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.logo_title');
    // Here cheking if the link overed it is not same to the other then patting the
    // opacity to other.
    allLinks.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

//Here im passing the function to the event listener
navBar.addEventListener('mouseover', e => handleHover(e, 0.5));
navBar.addEventListener('mouseout', e => handleHover(e, 1));
/**_____________________________________________________ */

//Here section area
const section = document.querySelectorAll('.section');
// section.forEach(e => (e.style.borderTop = '2px solid #444444'));

/*Here im taking all section movements So any time the isINtersecting is 
true so any time the target is the section index in removing the hidden class
*/
const handleSectionMove = (entries, observer) => {
  //Here im destructing the entries of the sections
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  //Here  im unobserving the target that already get the action, so it
  // will no continue to repet it self
  observer.unobserve(entry.target);
};
/* Here if the section is in the 15% of height to show */
const controlSection = new IntersectionObserver(handleSectionMove, {
  root: null,
  threshold: 0.15,
});

section.forEach(e => {
  controlSection.observe(e);
  e.classList.add('section-hidden');
});
/**_____________________________________________________ */

//The sticky nav im controling if the header is finsihed on scroll
//so to show the nav
const header = document.querySelector('.header');

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};
const controlHeaderIntersection = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

controlHeaderIntersection.observe(header);
/**_____________________________________________________ */
const allLazyImg = document.querySelectorAll('.features__icon img');

const handleLazy = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
};
const lazyControl = new IntersectionObserver(handleLazy, {
  root: null,
  threshold: 0.15,
});

allLazyImg.forEach(el => lazyControl.observe(el));
/**_____________________________________________________ */

const allTabsContent = document.querySelectorAll('.tabs__content');
const tabsContainer = document.querySelector('.tabs__container');
const tabs = document.querySelectorAll('.tabs');

allTabsContent.forEach(e => {
  const color = e.innerHTML;
  e.style.background = color;
});

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.tabs');
  if (!clicked) return;
  console.log(clicked);

  tabs.forEach(e => e.classList.remove('tabs__active'));
  allTabsContent.forEach(e => e.classList.remove('tabs__content--active'));

  clicked.classList.add('tabs__active');
  document
    .querySelector(`.tabs__container--${clicked.dataset.color}`)
    .classList.add('tabs__content--active');
});
/**_____________________________________________________ */

//SLIDER VARIABLES
const slides = document.querySelectorAll('.slides');
const slider = document.querySelector('.sldier__container');
const btnRight = document.querySelector('.slides__btnRight');
const btnLeft = document.querySelector('.slides__btnLeft');
const dotsContainer = document.querySelector('.dots_cont');
let curSlide = 0;
let maxLength = slides.length;
console.log(maxLength);
// slider.style.transform = 'scale(0.3) translateX(-450px)';
// console.log(slides);
slides.forEach(e => {
  const ecolor = e.innerHTML;
  e.style.background = ecolor;
});
slides.forEach((e, i) => {
  console.log(e, i);
  e.style.transform = `translateX(${100 * i}%)`;
});
const createDots = () => {
  slides.forEach((_, i) => {
    /**HEre im creating the button dots base of sldies index dinamically */
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="btn dots_dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = slide => {
  document
    .querySelectorAll('.dots_dot')
    .forEach(e => e.classList.remove('dots--active'));

  document
    .querySelector(`.dots_dot[data-slide="${slide}"]`)
    .classList.add('dots--active');
};
const gotToslide = slide => {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${100 * (i - slide)}%)`;
    console.log(e, i);
  });
};

const nextSLide = () => {
  if (curSlide === maxLength - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotToslide(curSlide);
  activateDot(curSlide);
};
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxLength - 1;
  } else {
    curSlide--;
  }
  gotToslide(curSlide);
  activateDot(curSlide);
};
function init() {
  gotToslide(0);
  createDots();
  activateDot(curSlide);
}
btnRight.addEventListener('click', nextSLide);
btnLeft.addEventListener('click', prevSlide);

dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots_dot')) {
    /**Here im converting the ncurrent number here cause when u click the dots
     * it is changing the  curSlide global number to string so we have to keep
     * it as a numbers
     * Try the commented code to see the difference
     */
    // const {slide} = e.target.dataset;
    curSlide = Number(e.target.dataset.slide);
    gotToslide(curSlide);
    activateDot(curSlide);
    // gotToslide(slide);
    // activateDot(slide);
  }
});
init();
