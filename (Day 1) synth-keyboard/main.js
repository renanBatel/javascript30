const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const notes   = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const synth   = {
                    playing: [],
                    type:    'sine'
                }

function frequency(note) {

    const fixed = {
        key:        'A',
        level:        4,
        frequency:  440
    };
    
    let key, level;
    if(note.length == 2) {
        key   = note.charAt(0);
        level = note.charAt(1);
    } else {
        key   = note.substr(0, 2);
        level = note.charAt(2);
    }

    let gap = notes.indexOf(key) - notes.indexOf(fixed.key);
    
    if(level != fixed.level) {
        gap += notes.length * (level - fixed.level);
    }

    return fixed.frequency * Math.pow(Math.pow(2, 1/12), gap);
}

function Note(audioCtx, type, note) {

    this._note            = note;
    this._frequency       = frequency(note);
    this._oscillator      = audioCtx.createOscillator();
    this._oscillator.type = type;
    this._oscillator.frequency.setValueAtTime(this._frequency, audioCtx.currentTime);
    this._oscillator.connect(audioCtx.destination);

    this.play = () => this._oscillator.start();
    this.stop = () => this._oscillator.stop();

    this.getNote = () => this._note;
}

function getSource(event) {
    let key    = event.key.toLowerCase();
        
    if(key == '\\')
        key = '\\\\';
    else if(key == 'dead')
        key = '~';
    
    let source = document.querySelector('.key[data-key="' + key + '"]');

    if (source)
        return source;
    else
        return;
}

function changeWaveType(type) {
    const source = document.querySelector('a.synth-button[data-wave="' + type + '"]');
    const active = document.querySelector('a.synth-button[data-wave="' + synth.type + '"]');
    synth.type   = type;

    active.classList.remove('active');
    source.classList.add('active');
}

window.addEventListener('keydown', (event) => {
    if(!event.repeat) {
        source = getSource(event);

        if(source) {         
            const note   = new Note(audioCtx, synth.type, source.getAttribute('data-note'));

            synth.playing.push(note);
            
            note.play();

            source.classList.add('pressed');
        }        
    }
});

window.addEventListener('keyup', (event) => {
    if(!event.repeat) {
        
        source = getSource(event);

        if(source) {
            let index = synth.playing.map((e)  => { return e._note; }).indexOf(source.getAttribute('data-note'));
            
            let note = synth.playing[index];

            note.stop();
            synth.playing.splice(index, 1);

            source.classList.remove('pressed');
        }
    }
});