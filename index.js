const letters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z", "enter", "shift", "capslock", "enter",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", '`', 'tab', 'backspace',
    "[", "]", "/", "\\", ",", ".", " ", "'", "\"",
    "!", "@", "#", "$", "%", "^", "&", "&", "*", "(", ")", "<", ">",
]

let seconds = 00;
let minutes = 00;
const appendMinutes = document.getElementById("minutes")
const appendSeconds = document.getElementById("seconds")
let time_interval;
let timer_running = false;

const sample_texts = [
    "These quotes are famous enough to be recognized by most native English speakers. Some come from written English (plays, books, or poems), others come from movies, and still others come from famous figures in history. Any of these can be quoted in a conversation, in whole or in part, They are so famous that the longer quotes are more often referred to with only the first part of the quote because people know the rest. Once you know an English quote, you will see it referred to in many places. Famous quotes are often changed slightly to make jokes, since everyone will understand both the original quote and the changed version. They can also be used as jokes when you quote them in an unexpected context.",
    "I rolled back onto the lawn and pressed my forehead to the ground again and made the noise that Father calls groaning. I make this noise when there is too much information coming into my head from the outside world. It is like when you are upset and you hold the radio against your ear and you tune it halfway between two stations so that all you get is white noise and then you turn the volume right up so that this is all you can hear and then you know you are safe because you cannot hear anything else."
]

// const sample_texts = ["My name is Sahadevan, moolamkuzhiyil Sahadevan"];

document.getElementById("untyped").innerText = sample_texts[Math.floor(Math.random() * sample_texts.length)]
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    start_timer();
    if (check_completions()) { return; }
    let char = event.key;
    if (!letters.includes(char.toLowerCase())) { return; }
    document.getElementById(char.toLowerCase())?.classList.add("clicked");
    untyped_text = document.getElementById("untyped").innerText;
    typed_text = document.getElementById("typed").innerText;
    error_text = document.getElementById("error").innerText;
    if (char.toLowerCase() === "shift") { return; }
    if (char.toLowerCase() === "backspace") {
        if (error_text.length > 0) {
            document.getElementById("error").innerText = error_text.substring(0, error_text.length - 1);
            document.getElementById("untyped").innerText = error_text.substring(error_text.length - 1) + untyped_text;
        }
        else {

            document.getElementById("typed").innerText = typed_text.substring(0, typed_text.length - 1);
            document.getElementById("untyped").innerText = typed_text.substring(typed_text.length - 1) + untyped_text;
        }
    }
    else if (untyped_text[0] === char) {
        if (error_text.length > 0) {
            document.getElementById("error").innerText = document.getElementById("error").innerText + untyped_text[0];
            document.getElementById("untyped").innerText = untyped_text.substring(1);
        }
        else {
            document.getElementById("typed").innerText = typed_text + untyped_text.substring(0, 1);
            document.getElementById("untyped").innerText = untyped_text.substring(1);
        }
    }
    else {
        document.getElementById("error").innerText = document.getElementById("error").innerText + untyped_text[0];
        document.getElementById("untyped").innerText = untyped_text.substring(1);
    }
    check_completions();
}, false);

document.addEventListener('keyup', (event) => {
    let char = event.key.toLowerCase();
    if (!letters.includes(char)) { return; }
    document.getElementById(event.key.toLowerCase())?.classList.remove("clicked");
}, false);


const refresh_button = document.getElementById('refresh');

refresh_button.addEventListener('click', (event) => {
    document.getElementById("untyped").innerText = sample_texts[Math.floor(Math.random() * sample_texts.length)];
    document.getElementById("typed").innerText = "";
    document.getElementById("error").innerText = "";
    reset_timer();
})


function refreshTime() {
    seconds++;
    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

function start_timer() {
    if (timer_running) { return; }
    timer_running = true;
    time_interval = setInterval(refreshTime, 1000);
}

function stop_timer() {
    clearInterval(time_interval);
    timer_running = false;
}

function reset_timer() {
    stop_timer();
    seconds = 00;
    minutes = 00;
    appendMinutes.innerHTML = "00";
    appendSeconds.innerHTML = "00";
}

function check_completions() {
    untyped_text = document.getElementById("untyped").innerText;
    error_text = document.getElementById("error").innerText;
    if (error_text.length == 0 && untyped_text.length == 0) {
        stop_timer();
        return true;
    }
    return false;
}