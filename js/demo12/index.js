import { preloadFonts } from '../utils.js';

// Splitting.js
// Calling the Splitting function to split the text into individual words/characters, 
const splittingOutput = Splitting();

// .content__text elements
const texts = [...document.querySelectorAll('.content__text')];

// Cache all .char elements at the beginning. Each text contains multiple words, each word contains multiple chars.
const chars = texts.map(text => {
    // Get the words for each text
    const words = text.querySelectorAll('.word');
    // For each word, get the chars
    return [...words].map(word => word.querySelectorAll('.char'));
});

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
splittingOutput.map(output => output.words).flat().forEach(word => {
    gsap.set(word, {transformStyle: 'preserve-3d'})
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

    const tl = gsap.timeline({
        onComplete: () => {
            // Update currentTextPos
            currentTextPos = upcomingTextPos;
            isAnimating = false;
        }
    });
    currentWords.forEach((_, wordIndex) => {
        const wordTimeline = gsap.timeline()
        .fromTo(chars[currentTextPos][wordIndex], {
            willChange: 'transform',
            transformOrigin: '0% 50%',
            opacity: 1, 
            rotationY: 0,
            z: 0,
        }, {
            duration: .3,
            ease: 'sine.in',
            opacity: 0, 
            rotationY: -45,
            z: 30,
            stagger: {
                each: 0.05,
                from: 'end'
            },
        });
        tl.add(wordTimeline, (currentWords.length-(wordIndex-1))*0.02);
    });
    
    tl.add(() => {
        texts[currentTextPos].classList.remove('content__text--current');
    })
    tl.add(() => {
        texts[upcomingTextPos].classList.add('content__text--current');
    }, '>-=0.6')
    .addLabel('previous', '>');

    upcomingtWords.forEach((_, wordIndex) => {
        const wordTimeline = gsap.timeline()
        .fromTo(chars[upcomingTextPos][wordIndex], {
            willChange: 'transform',
            transformOrigin: '0% 50%',
            opacity: 0, 
            rotationY: 90,
            z: -60
        }, {
            duration: .6,
            ease: 'back.out(4)',
            opacity: 1, 
            rotationY: 0,
            z: 0,
            stagger: {
                each: 0.05,
                from: 'start'
            },
        });
        tl.add(wordTimeline, `previous+=${(upcomingtWords.length-(wordIndex-1))*0.02}`);
    });

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});