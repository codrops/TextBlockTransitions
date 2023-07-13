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
    .to(currentWords, {
        duration: 0.01,
        opacity: 0,
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    })
    .fromTo(upcomingtWords, {
        opacity: 0
    }, {
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        opacity: 1,
        stagger: {
            each: 0.009,
            from: 'random',
            
        }
    })

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});