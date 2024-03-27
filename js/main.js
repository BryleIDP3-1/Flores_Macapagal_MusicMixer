document.addEventListener('DOMContentLoaded', function() {
console.log("JS file connected");


// DOM element selections
const btns = document.querySelectorAll('.btn'),
    dropSquares = document.querySelectorAll('.drop-square'),
    fruitIcons = document.querySelectorAll('.fruits img'),
    bunnyDJIcon = document.getElementById('bunnyDJ');

// global variables
let draggedFruit = null;
const selectedFruits = new Set(),
    volumeControl = document.getElementById('volumeControl');

// function to check if all icons are in drop zone
function allIconsInDropZone() {
    let allInDropZone = true;
    fruitIcons.forEach(icon => {
        if (!icon.parentNode.classList.contains('drop-square')) {
             allInDropZone = false;
        }
    });
    return allInDropZone;
    }

// button event listeners
    btns.forEach(button => {
    button.addEventListener('click', () => {
    button.classList.toggle('button-clicked');
    });
    });

// drag and drop functions
    function dragStart() {
    console.log('started dragging this fruit:', this);
    draggedFruit = this;
    }

    function dragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
    this.classList.remove('hide');
    }

// global variable to keep track of dragged items count
let draggedFruitsCount = 0;

// drop function
    function drop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    const initialParent = draggedFruit.parentNode;


    if (this.childElementCount === 0) {
        this.appendChild(draggedFruit);
        playAudio(draggedFruit.id, this);
        draggedFruitsCount++; // Increment count
        const bunnyDJImg = document.getElementById('bunnyDJ');
        bunnyDJImg.setAttribute('src', `images/Bunny_Icon-animated.svg`);

        // Check if more than one element is dragged
        if (draggedFruitsCount > 1) {
            draggedFruitsCount = 0; // Reset count
            const audioElements = document.querySelectorAll('.drop-square audio');
            audioElements.forEach(audio => {
                audio.currentTime = 0; // Restart audio
            });
        }
    } else {
        console.log('Oops! There is already one fruit!');
        initialParent.appendChild(draggedFruit);
    }
    draggedFruit.classList.remove('hide');
}

// audio related functions
    function playAudio(selectedFruit, selectedDropzone) {
        if (selectedDropzone.childElementCount === 1) {
            const audio = new Audio(`audio/${selectedFruit}.mp3`);
            audio.loop = true;
            audio.play();
            selectedDropzone.appendChild(audio);
            selectedFruits.add(audio);
        }
    }

    function pauseAudio() {
        selectedFruits.forEach(audio => {
            audio.pause();
        });
        const bunnyDJImg = document.getElementById('bunnyDJ');
        bunnyDJImg.setAttribute('src', `images/Bunny_Icon.svg`);
    }

// button event listeners
const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
        location.reload();
    });

    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
    selectedFruits.forEach(audio => {
        audio.play();
    });
    const bunnyDJImg = document.getElementById('bunnyDJ');
    bunnyDJImg.setAttribute('src', `images/Bunny_Icon-animated.svg`);
    });

    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.addEventListener('click', () => {
        pauseAudio();
    });

    volumeControl.addEventListener('input', function() {
        selectedFruits.forEach(audio => {
            audio.volume = this.value;
        });
    });

// drag and drop event listeners
    fruitIcons.forEach(fruit => fruit.addEventListener("dragstart", dragStart));

    dropSquares.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", drop);
    });
});
