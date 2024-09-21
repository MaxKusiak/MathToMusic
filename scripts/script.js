let tonality = 0, func = 0, mode = 0, proMode = 0, timeSignatureIndex = 0, volume = 0, a = 0, b = 0, t = 0; //canPlay = false;
let gammaInd = -1;
let globalI = 0, sign = 0, i = 0, timeSignature = 0, timeSignatureDifference = 0;
let numbers = 0, numbers1 = 0, numbers2 = 0, answer = 0, timeSignatureCalc = 0;
let gamma = "", melodyString = "", notes = "", melodyTimeString = "", errorString = "";
let step = 0;
let isBassAvailable = true;
let time = 0, melodyTime = 0;
let temp = [0, 0, 0, 0, 0, 0, 0, 0];
// let allNotes = [196, 207, 220, 233.08, 246.96,        // мала 5
//     261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88,   // перша 12
//     523.25, 554.36, 587.32, 622.26, 659.26, 698.46, 739.98, 784, 830.6, 880, 932.32];  // друга 11
let allNotes = [55, 56, 57, 58, 59,        // мала 5
                60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,   // перша 12
                72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82];  // друга 11
let modes = [[0, 2, 4, 5, 7, 9, 11, 12, 14, 16],  
             [0, 2, 3, 5, 7, 8, 10, 12, 14, 15]];
let mainTones = ["G", "", "A", "", "B", "C", "", "D", "", "E", "F", ""];
let mainTonesD1 = ["", "G#", "", "A#", "", "B#", "C#", "", "D#", "", "E#", "F#"];
let mainTonesB1 = ["", "AB", "", "BB", "CB", "", "DB", "", "EB", "FB", "", "GB"];
let mainTonesD2 = ["", "GIS", "", "AIS", "", "BIS", "CIS", "", "DIS", "", "EIS", "FIS"];
let mainTonesB2 = ["", "AS", "", "BES", "CES", "", "DES", "", "ES", "FES", "", "GES"];
let notesInLetters = ["0G", "0G#", "0A", "0A#", "0B", "1C", "1C#", "1D", "1D#", "1E", "1F", "1F#", "1G", "1G#", "1A", "1A#", "1B", "2C", "2C#", "2D", "2D#", "2E", "2F", "2F#", "2G", "2G#", "2A", "2A#"];
let signatureNumbers = [0.25, 0.5, 1, 2, 0.75, 1.25, 1.5, 1.75];
let functions = [x => x**2, x => x**0.5, x => 1/x];
let m = [];

document.querySelector(".volume").addEventListener("change", (event) => {
    document.querySelector(".volumeShow").innerHTML = `Volume: ${event.target.value}`;
});

for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

function drawGraph(number1, number2, step){
    let y = functions[func - 1];

    let z = 40; 
    let c = document.querySelector('canvas');
    let ctx = c.getContext('2d');
    
    c.width = c.width;

    // ctx.translate(c.width / 2, c.height - 6);
    ctx.translate(c.width / 2, c.height / 2);
    
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -c.height);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, c.height);
    // ctx.moveTo(-5, 0);
    // ctx.lineTo(5, 0);
    ctx.moveTo(-c.width / 2, 0);
    ctx.lineTo(c.width / 2, 0);
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(-5, -1*z);
    // ctx.lineTo(5, -1*z);
    // ctx.moveTo(1*z, -5);
    // ctx.lineTo(1*z, 5);
    // ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    a = -(number1 + step * t);
    b = -y(number1 + step * t);
    // if(func == 3 && y(j) < 0 && y(j + 0.1) > 0){
    //     t++;
    //     a = -(number1 + step * (t + 1));
    //     b = -y(number1 + step * (t + 1));
    // }
    // a = -(number1 + step * (t + 1));
    // b = -y(number1 + step * (t + 1));
    if(step > 0){
        for (let j = number1; j <= (number2 + step * t) - 0.1; j = parseFloat((j + 0.1).toFixed(1))) {
                ctx.moveTo(j*z + a*z, -(y(j)*z + b*z));
                ctx.lineTo((j + 0.1)*z + a*z, -(y(j + 0.1)*z + b*z));
        }
    }else if(step < 0){
        for (let j = number1; j >= (number2 + step * t) + 0.1; j = parseFloat((j - 0.1).toFixed(1))) {
                ctx.moveTo(j*z + a*z, -(y(j)*z + b*z));
                ctx.lineTo((j - 0.1)*z + a*z, -(y(j - 0.1)*z + b*z));
        }
    }
    t++;
    ctx.stroke();
}

// робить такти
function superCut(index) {
    timeSignatureCalc += signatureNumbers[index];
    if (timeSignatureCalc > timeSignature) {
        timeSignatureIndex = signatureNumbers.indexOf(timeSignature - (timeSignatureCalc - signatureNumbers[index]));
        melodyTime += temp[timeSignatureIndex];
        melodyTimeString += String(timeSignatureIndex);
        timeSignatureCalc = 0;
    } else if (timeSignatureCalc == timeSignature) {
        melodyTime += temp[index];
        melodyTimeString += String(index);
        timeSignatureCalc = 0;
    } else {
        melodyTime += temp[index];
        melodyTimeString += String(index);
    }
}

// function sendInputs() {
//     // proMode = parseInt(document.querySelector(".proMode").value);
//     func = parseInt(document.querySelector(".func").value);
//     gamma = document.querySelector(".gamma").value;
//     mode = parseInt(document.querySelector(".mode").value);
//     time = parseInt(document.querySelector(".time").value) * 1000;
//     if(time < 0){
//         errorString += "Time can't be less than zero.<br>";
//     }else if(Number.isNaN(time)){
//         errorString += "Time must be a number.<br>";
//     }
//     numbers = parseFloat(document.querySelector(".numbers").value);
//     if(Number.isNaN(numbers)){
//         errorString += "Lower limit of the input data must be a number.<br>";
//     }
//     step = parseFloat(document.querySelector(".step").value);
//     if(Number.isNaN(step)){
//         errorString += "Step must be a number.<br>";
//     }
//     sign = parseInt(document.querySelector(".sign").value);
//     if(Number.isNaN(sign)){
//         errorString += "Sign must be a number.<br>";
//     }
//     timeSignature = parseInt(document.querySelector(".timeSignature").value);
//     volume = parseInt(document.querySelector(".volume").value);
//     temp[2] = parseInt(60000 / parseInt(document.querySelector(".temp").value));
//     if(Number.isNaN(temp[2])){
//         errorString += "Temp must be a number.<br>";
//     }else{
//         temp[0] = parseInt(temp[2] / 4);
//         temp[1] = parseInt(temp[2] / 2);
//         temp[3] = temp[2] * 2;
//         temp[4] = temp[0] + temp[1];
//         temp[5] = temp[2] + temp[0];
//         temp[6] = temp[2] + temp[1];
//         temp[7] = temp[2] + temp[1] + temp[0];
//     }
//     if(errorString != ""){
//         canPlay = false;
//         document.querySelector(".errorText").innerHTML = errorString;
//         errorString = "";
//     }else{
//         canPlay = true;
//         document.querySelector(".errorText").innerHTML = "";
//     }
//     console.log(func, gamma, mode, time, numbers, step, sign, timeSignature, volume, temp[2]);
// };


// збирає значення з інпутів
document.querySelector(".button").addEventListener('click', () => {
    func = parseInt(document.querySelector(".func").value);
    gamma = document.querySelector(".gamma").value;
    mode = parseInt(document.querySelector(".mode").value);
    time = parseInt(document.querySelector(".time").value) * 1000;
    if(time < 0){
        errorString += "Time can't be less than zero.<br>";
    }else if(Number.isNaN(time)){
        errorString += "Time must be a number.<br>";
    }
    numbers = parseFloat(document.querySelector(".numbers").value);
    if(Number.isNaN(numbers)){
        errorString += "Lower limit of the input data must be a number.<br>";
    }
    numbers1 = numbers;
    step = parseFloat(document.querySelector(".step").value);
    if(Number.isNaN(step)){
        errorString += "Step must be a number.<br>";
    }
    sign = parseInt(document.querySelector(".sign").value);
    if(Number.isNaN(sign)){
        errorString += "Sign must be a number.<br>";
    }else if(sign < 0){
        errorString += "Sign can't be less than zero.<br>";
    }
    timeSignature = parseInt(document.querySelector(".timeSignature").value);
    volume = parseInt(document.querySelector(".volume").value);
    temp[2] = parseInt(60000 / parseInt(document.querySelector(".temp").value));
    if(Number.isNaN(temp[2])){
        errorString += "Temp must be a number.<br>";
    }else if(temp[2] < 1){
        errorString += "Temp can't be less than one.<br>";
    }else{
        temp[0] = parseInt(temp[2] / 4);
        temp[1] = parseInt(temp[2] / 2);
        temp[3] = temp[2] * 2;
        temp[4] = temp[0] + temp[1];
        temp[5] = temp[2] + temp[0];
        temp[6] = temp[2] + temp[1];
        temp[7] = temp[2] + temp[1] + temp[0];
    }
    // console.log(func, gamma, mode, time, numbers, step, sign, timeSignature, volume, temp[2]);
    if(errorString != ""){
        // canPlay = false;
        document.querySelector(".errorText").style.display = "flex";
        document.querySelector(".errorText").innerHTML = errorString;
        errorString = "";
    }else{
        // canPlay = true;
        document.querySelector(".errorText").style.display = "none";
        document.querySelector(".errorText").innerHTML = "";
        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/",
            instruments: ["acoustic_grand_piano", "synth_drum"],
            onprogress: function (state, progress) {
                console.log(state, progress);
            },
            onsuccess: function () {
                MIDI.programChange(0, MIDI.GM.byName["acoustic_grand_piano"].number);
                play();
            }
        });
    }
});

// починає грати мелодію
function playNoteWithDelay(note, duration) {
    return new Promise((resolve) => {
        MIDI.noteOn(0, note, 127, 0);  // Увімкнути ноту
        setTimeout(() => {
            MIDI.noteOff(0, note);  // Вимкнути ноту після тривалості
            resolve();  // Завершити після вимкнення
        }, duration);  // Затримка в мілісекундах
    });
}
async function playNotesInSequence() {
    for (let i = 0; i < melodyTimeString.length; i++){
        // setTimeout(() => {
        //     MIDI.noteOn(0, allNotes[modes[mode - 1][parseInt(notes[i])]], 127, 0);
        //     MIDI.noteOff(0, allNotes[modes[mode - 1][parseInt(notes[i])]], temp[parseInt(melodyTimeString[i])] / 1000);
        // }, delay);
        // delay = 1000;
        // m.push(allNotes[modes[mode - 1][parseInt(notes[i])]]);
        await playNoteWithDelay(allNotes[modes[mode - 1][parseInt(notes[i])]], temp[parseInt(melodyTimeString[i])]);  // Очікування завершення програвання кожної ноти
        drawGraph(numbers1, numbers2, step);
    }
    // console.log(m);
}

// починає обробляти мелодію
function play() {
    MIDI.setVolume(0, volume);
    
    m = [];
    melodyTimeString = "";
    notes = "";
    melodyTime = 0;
    gammaInd = -1;
    globalI = 0;
    modes = [[0, 2, 4, 5, 7, 9, 11, 12, 14, 16],  
             [0, 2, 3, 5, 7, 8, 10, 12, 14, 15]];
    t = 0;

    if (mainTones.indexOf(gamma) != -1) {
        gammaInd = mainTones.indexOf(gamma);
    } else if (mainTonesB1.indexOf(gamma) != -1) {
        gammaInd = mainTonesB1.indexOf(gamma);
    } else if (mainTonesB2.indexOf(gamma) != -1) {
        gammaInd = mainTonesB1.indexOf(gamma);
    } else if (mainTonesD1.indexOf(gamma) != -1) {
        gammaInd = mainTonesD1.indexOf(gamma);
    } else if (mainTonesD2.indexOf(gamma) != -1) {
        gammaInd = mainTonesD2.indexOf(gamma);
    } else {
        console.log("Error");
    }
    modes[mode - 1] = modes[mode - 1].map(item => { return item + gammaInd });

    if (timeSignature != 4) {
        timeSignature += 1;
    } else {
        timeSignature -= 1;
    }
    if (func == 2) {
        if (numbers < 0) {
            numbers = -numbers;
            numbers1 = numbers;
        }
        if (step < 0) {
            step = -step;
        }
    } else if (func == 3) {
        if (numbers == 0 && step > 0) {
            numbers = 1;
            numbers1 = 1;
        } else if (numbers == 0 && step < 0) {
            numbers = -1;
            numbers2 = -1;
        }
    }

    while (melodyTime < time) {
        if (func == 1) {
            if (sign == 0) {
                melodyString = String(Math.pow(numbers, 2));
            } else {
                melodyString = Math.pow(numbers, 2).toFixed(sign);
            }
        } else if (func == 2) {
            melodyString = Math.abs(Math.pow(numbers, 0.5)).toFixed(sign);
        } else if (func == 3) {
            if (numbers == 0) {
                numbers += step;
            }
            melodyString = Math.abs(1 / numbers).toFixed(sign);
        }
        if (sign == 0) {
            melodyString += ".";
        }
        melodyString = melodyString.slice(0, melodyString.indexOf('.') + sign + 1);
        i = 0;
        while (melodyString.endsWith("0")) {
            melodyString = melodyString.slice(0, -1);
            i += 1;
        }
        if (melodyString.endsWith(".") && sign != 0) {
            melodyString += "0";
        }
        melodyString = melodyString.replace(".", "");
        for (let i = 0; i < melodyString.length; i++) {
            if (globalI % 2 == 1) {
                if (melodyString[i] == '0' || melodyString[i] == '1') {
                    superCut(0);
                } else if (melodyString[i] == '2' || melodyString[i] == '3' || melodyString[i] == '4' || melodyString[i] == '5') {
                    superCut(1);
                } else if (melodyString[i] == '6' || melodyString[i] == '7' || melodyString[i] == '8') {
                    superCut(2);
                } else if (melodyString[i] == '9') {
                    superCut(3);
                }
                if (melodyTime >= time) {
                    break;
                }
            } else {
                notes += melodyString[i];
            }
            globalI += 1;
        }
        numbers += step;
    }
    numbers2 = numbers;
    drawGraph(numbers1, numbers2, step);
    playNotesInSequence();
};