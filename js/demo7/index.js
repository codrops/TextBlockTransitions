import { wrapElements, preloadFonts } from '../utils.js';

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

wrapElements(splittingOutput.map(output => output.words).flat(), 'span', 'word-wrap');

// switch between texts
const switchTexts = () => {

    if ( isAnimating ) return false;
    isAnimating = true;
    
    const upcomingTextPos = currentTextPos ? 0 : 1;

    // All current text words
    const currentWords = splittingOutput[currentTextPos].words;
    
    // All upcoming text words
    const upcomingtWords = splittingOutput[upcomingTextPos].words;
    const upcomingWordsTotal = upcomingtWords.length;

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
        xPercent: 0
    }, {
        duration: .15,
        ease: 'power1.in',
        xPercent: -100,
        stagger: {
            each: 0.01,
            from: 'start'
        },
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    })
    .fromTo(currentWords.map(word => word.parentNode), {
        xPercent: 0
    }, {
        duration: .15,
        ease: 'power1.in',
        xPercent: 100,
        stagger: {
            each: 0.01,
            from: 'start'
        },
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    }, 0)
    .addLabel('currentPanel', '>-=0.2')

    .fromTo(upcomingtWords, {
        xPercent: 100
    }, {
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        duration: 0.6,
        ease: 'expo',
        xPercent: 0,
        stagger: {
            each: 0.01,
            from: 'start'
        }
    }, 'currentPanel')
    .fromTo(upcomingtWords.map(word => word.parentNode), {
        xPercent: -100
    }, {
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        duration: 0.6,
        ease: 'expo',
        xPercent: 0,
        stagger: {
            each: 0.01,
            from: 'start'
        }
    }, 'currentPanel')

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});