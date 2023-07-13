import { preloadFonts } from '../utils.js';

// Splitting.js
// Calling the Splitting function to split the text into individual words/characters, 
const splittingOutput = Splitting();

// .content__text elements
const texts = [...document.querySelectorAll('.content__text')];

// Let's define the position of the current text
let currentTextPos = 0;

// Check if there's an animation in progress
let isAnimating = false;

// Add class current to the "current" one
texts[currentTextPos].classList.add('content__text--current');

// Set perspective
texts.forEach(text => {
    gsap.set(text, {perspective: 1000})
});

// switch between texts
const switchTexts = () => {

    if ( isAnimating ) return false;
    isAnimating = true;
    
    const upcomingTextPos = currentTextPos ? 0 : 1;

    // All current text words
    const currentWords = splittingOutput[currentTextPos].words;
    
    // All upcoming text words
    const upcomingtWords = splittingOutput[upcomingTextPos].words;

    gsap
    .timeline({
        defaults: {
            duration: 0.05,
            ease: 'expo'
        },
        onComplete: () => {
            // Update currentTextPos
            currentTextPos = upcomingTextPos;
            isAnimating = false;
        }
    })
    .fromTo(currentWords, {
        willChange: 'transform, opacity',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
    }, {
        duration: 0.5,
        ease: 'power1.in',
        z: () => gsap.utils.random(-700,-400),
        opacity: 0,
        xPercent: () => gsap.utils.random(-50, 50),
        yPercent: () => gsap.utils.random(-10,10),
        rotationX: () => gsap.utils.random(-90,90),
        stagger: {
            each: 0.006,
            from: 'random'
        },
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    }, 0)
    
    .fromTo(upcomingtWords, {
        willChange: 'transform, opacity',
        z: () => gsap.utils.random(400,700),
        opacity: 0,
        xPercent: () => gsap.utils.random(-50,50),
        yPercent: () => gsap.utils.random(-10,10),
        rotationX: () => gsap.utils.random(-90,90)
    }, {
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        duration: .8,
        ease: 'expo',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        stagger: {
            each: 0.006,
            from: 'random'
        }
    }, '>-=0.45')

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});