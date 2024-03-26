console.log("JS file connected");

const btn = document.querySelectorAll('.btn');
const fruitsBox = document.querySelector(".fruit-box");

btn.forEach(button => {
    button.addEventListener('click', function(e) {
        button.classList.toggle('button-clicked');
        button.querySelector('i').classList.toggle('icon-clicked');
    });
});

let draggedTool = null; // Define a variable to store the dragged tool

let dropSquare = document.querySelectorAll('.drop-square');
let fruitIcons = document.querySelectorAll('.fruits img');

function dragStart() {
    console.log('started dragging this piece:', this);
    draggedTool = this; // Store the dragged tool
    setTimeout(() => {
        this.classList.add('hide');
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
    this.classList.remove('hide');
}

function drop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    const initialParent = draggedTool.parentNode;

    // NEW TEST CODE FOR CONSISTENT AUDIO PLAY
    document.querySelectorAll('audio').forEach(function(audio) {
        if (audio !== draggedTool.querySelector('audio')) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    // NEW TEST CODE FOR CONSISTENT AUDIO PLAY

    if (this.childElementCount === 0) {
        this.appendChild(draggedTool);
        playAudio(draggedTool.id); // Play audio when dropped onto a drop square
    } else {
        console.log('Oops! There is already one musical tool!');
        initialParent.appendChild(draggedTool);
    }
    draggedTool.classList.remove('hide');
    //styles for animation svg = disabled on default
    //when element is dropped in drop zone = css animation starts
}

function playAudio(selectedInstrument) {
    console.log(selectedInstrument);
    let instrument = document.createElement("audio");
    instrument.src = `audio/${selectedInstrument}.mp3`;
    instrument.preload = "auto";
    instrument.loop = true;
    instrument.play();
}

fruitIcons.forEach(tool => tool.addEventListener("dragstart", dragStart));

dropSquare.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
});

// ***NEW EASY FUNCTION FOR RESET BUTTON***
function fullReset() {
	location.reload();
}

const resetGame = document.getElementById("resetBtn");
resetGame.addEventListener("click", fullReset);