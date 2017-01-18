const container = document.body;

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const keys = ['Major', 'Minor'];
const firstFifth = ['C', 'Major'];
const duration = 7000;

function $(selector) {
    return container.querySelector(selector);
}

function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function randomElement(array) {
    return array[randomIndex(array)];
}

function randomFifth(prevNote, prevKey) {
    while (true) {
        const note = randomElement(notes);
        const key = randomElement(keys);
        if (note !== prevNote || key !== prevKey) {
            return [note, key];
        }
    }
}

function nextFifth(prevNote, prevKey, random) {
    const prevKeyIndex = keys.indexOf(prevKey);
    const keyIndex = (prevKeyIndex + 1) % keys.length;
    const key = keys[keyIndex];

    const prevNoteIndex = notes.indexOf(prevNote);
    const noteIndex = keyIndex == 0 ? (prevNoteIndex + 4) % notes.length : prevNoteIndex;
    const note = notes[noteIndex];

    return [note, key];
}

function stopProgressBar() {
    const bar = $('.progress__bar');
    bar.classList.remove('progress__bar--progressing');
    bar.style['transition-duration'] = null;
}

function startProgressBar() {
    const bar = $('.progress__bar');
    bar.style['transition-duration'] = duration + 'ms';
    bar.classList.add('progress__bar--progressing');
}

function resetProgressBar() {
    requestAnimationFrame(() => {
        stopProgressBar();
        requestAnimationFrame(startProgressBar);
    });
}

function next() {
    const prevNote = $('.note').innerText;
    const prevKey = $('.key').innerText;
    const random = $('.random').checked

    const [note, key] = prevNote === '' ? firstFifth :
        (random ? randomFifth(prevNote, prevKey) : nextFifth(prevNote, prevKey));

    $('.note').innerText = note;
    $('.key').innerText = key;
    resetProgressBar();
}

setInterval(next, duration);
next();
