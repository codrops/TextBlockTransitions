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
        willChange: 'transform',
        transformOrigin: '100% 50%',
        yPercent: 0,
        rotation: 0
    }, {
        duration: .15,
        ease: 'power1.in',
        yPercent: -125,
        rotation: 3,
        stagger: {
            each: 0.02,
            from: 'start'
        },
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    })
    .fromTo(upcomingtWords, {
        willChange: 'transform',
        transformOrigin: '0% 50%',
        yPercent: 125,
        rotation: -3,
    }, {
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        duration: .6,
        ease: 'back',
        yPercent: 0,
        rotation: 0,
        stagger: {
            each: 0.02,
            from: 'start'
        }
    }, '>-=0.6')

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});