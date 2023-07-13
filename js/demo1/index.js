import { preloadFonts } from '../utils.js';

// Use Splitting.js to split text into words/characters.
const splittingOutput = Splitting();

// Get all elements with class '.content__text' into an array.
const texts = [...document.querySelectorAll('.content__text')];

// Set the position of the currently displayed text.
let currentTextPos = 0;

// Boolean to prevent text switching during an ongoing animation.
let isAnimating = false;

// Apply the class for the currently displayed text.
texts[currentTextPos].classList.add('content__text--current');

// Function to switch between texts.
const switchTexts = () => {
    
    // If an animation is ongoing, do nothing.
    if ( isAnimating ) return false;
    // Set isAnimating to true as we start the animation.
    isAnimating = true;
    
    // Calculate the position of the upcoming text.
    const upcomingTextPos = currentTextPos ? 0 : 1;

    // Get the words of the current and upcoming texts.
    const currentWords = splittingOutput[currentTextPos].words;
    const upcomingtWords = splittingOutput[upcomingTextPos].words;
    const upcomingWordsTotal = upcomingtWords.length;

    // Define the animation using GSAP.
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
        opacity: 0,
        onComplete: () => {
            texts[currentTextPos].classList.remove('content__text--current');
        }
    })
    .fromTo(upcomingtWords, {
        willChange: 'transform, opacity',
        transformOrigin: pos => pos <= upcomingWordsTotal/2 ? '100% 100%' : '0% 100%',
        opacity: 0,
        yPercent: 30,
        rotation: pos => pos <= upcomingWordsTotal/2 ? -3 : 3
    }, {
        duration: 0.8,
        onStart: () => {
            texts[upcomingTextPos].classList.add('content__text--current');
        },
        opacity: 1,
        yPercent: 0,
        rotation: 0,
        stagger: {
            each: 0.02,
            from: 'center'
        }
    }, 0)

};

// Run the 'switchTexts' function when an element with the class '.trigger' is clicked.
document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});