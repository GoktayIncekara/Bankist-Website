'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

message.classList.add('cookie-message');
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'> Got it! </button>";
header.prepend(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  //console.log('Section 1 coordinates: ', s1coords);
  //console.log('Button coordinates ', e.target.getBoundingClientRect());
  //console.log('CURRENT SCROLL X/Y ', window.pageXOffset, window.pageYOffset);

  /* console.log(
    'HEIGHT/WIDTH OF THE VIEWPORT ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); */

  /* window.scroll(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); */

  /* window.scroll({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  }); */

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Put the event all the items (bad practice if we have a lot of items)
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  });
}); */

//Event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

//Operations section
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const element = e.target.closest('.operations__tab');
  if (!element) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  element.classList.add('operations__tab--active');

  const operation = element.dataset.tab;
  const content = document.querySelector(`.operations__content--${operation}`);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  content.classList.add('operations__content--active');
});

//Nav fade
const handleHover = function (e) {
  e.preventDefault();
  //const element = e.target.closest('.nav__item'); (there is no child to accidentally click)
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    siblings.forEach(n => {
      if (n !== link) n.style.opacity = this;
    });
  }
};

//Passing argument into handler regular way
/* navLinks.addEventListener('mouseover', e => handleHover(e, 0.5));
navLinks.addEventListener('mouseout', e => handleHover(e, 1)); */

//Passing argument into handler another way
//When you bind the method with an "object", this keyword will be that object which is "0.5 or 1".
navLinks.addEventListener('mouseover', handleHover.bind(0.5));
navLinks.addEventListener('mouseout', handleHover.bind(1));

//Sticky Nav
const initialCoords = nav.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
