const wrapElements = (elems, wrapType, wrapClass) => {
    elems.forEach(word => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        
        // Get a reference to the parent
        const parent = word.parentNode;

        // Insert the wrapper before the word in the DOM tree
        parent.insertBefore(wrapEl, word);

        // Move the word inside the wrapper
        wrapEl.appendChild(word);
    });
};

export {
    wrapElements
};