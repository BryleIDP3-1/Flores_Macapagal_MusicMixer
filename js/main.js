document.addEventListener('DOMContentLoaded', function() {
console.log("JS file connected");

const btns = document.querySelectorAll('.btn'),
      dropSquares = document.querySelectorAll('.drop-square'),
      fruitIcons = document.querySelectorAll('.fruits img'),
      bunnyDJIcon = document.getElementById('bunnyDJ');

// GLOBAL VARIABLES
let draggedFruit = null;
const selectedFruits = new Set(),
      volumeControl = document.getElementById('volumeControl');

// ICON DROP ZONE CHECKER
function allIconsInDropZone() {
    let allInDropZone = true;
    fruitIcons.forEach(icon => {
        if (!icon.parentNode.classList.contains('drop-square')) {
             allInDropZone = false;
        }
    });
    return allInDropZone;
    }

// DRAG AND DROP FUNCTIONALITIES
    function dragStart() {
        console.log('Started Dragging This Fruit:', this);
        draggedFruit = this;
    }

    function dragOver(e) {
        e.preventDefault();
        console.log('Dragged Over Me');
        this.classList.remove('hide');
    }

let draggedFruitsCount = 0;

// DROP FUNCTION
    function drop(e) {
    e.preventDefault();
    console.log('Dropped Something On Me');
    const initialParent = draggedFruit.parentNode;

    if (this.childElementCount === 0) {
            this.appendChild(draggedFruit);
            playAudio(draggedFruit.id, this);
            draggedFruitsCount++;

        const bunnyDJImg = document.getElementById('bunnyDJ');
            bunnyDJImg.setAttribute('src', `images/Bunny_Icon-animated.svg`);

// COUNT CHECKER FOR AUDIO
        if (draggedFruitsCount > 1) {
                draggedFruitsCount = 0;
                const audioElements = document.querySelectorAll('.drop-square audio');
            audioElements.forEach(audio => {
                audio.currentTime = 0;
            });
        }
    } else {
        console.log('Oops! There Is Already A Fruit Here!');
        initialParent.appendChild(draggedFruit);
    }
        draggedFruit.classList.remove('hide');
    }

// AUDIO FUNCTIONALITIES
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

// BUTTON EVENT LISTENER
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

    btns.forEach(button => {
        button.addEventListener('click', () => {
        button.classList.toggle('button-clicked');
        });
        button.style.cursor = "pointer";
    });

// VOLUME CONTROL EVENT LISTENER
    volumeControl.addEventListener('input', function() {
        selectedFruits.forEach(audio => {
        audio.volume = this.value;
        });
    });

// DRAG AND DROP EVENT LISTENERS
    fruitIcons.forEach(fruit => {
    fruit.addEventListener('dragstart', dragStart);
    fruit.style.cursor = "pointer";
    });

    dropSquares.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", drop);
    });
});