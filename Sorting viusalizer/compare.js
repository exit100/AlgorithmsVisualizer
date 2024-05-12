var inp_as = document.getElementById('a_size'), array_size = 20;
var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");

var clickedTextArray = [];

var div_sizes = [];
var div_sizes2 = [];
var divs = [];
var divs2 = [];
var margin_size;
var cont = document.getElementById("bar_graph");
var array = document.getElementById("sec_Array");

//Array generation and updation.

inp_gen.addEventListener("click", generate_array);
inp_gen.addEventListener("click", generate_array1);

inp_as.addEventListener("input", update_array_size);

function generate_array() {
    cont.innerHTML = "";


    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size = 0.2;
        divs[i].style = " margin:0% " + margin_size + "%; background-color:orange; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function generate_array1() {

    array.innerHTML = ""

    for (var i = 0; i < array_size; i++) {
        div_sizes2[i] = div_sizes[i];
        divs2[i] = document.createElement("div");
        array.appendChild(divs2[i]);
        margin_size = 0.2;
        divs2[i].style = " margin:0% " + margin_size + "%; background-color:orange; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size() {
    array_size = 20;
    generate_array();
    generate_array1();
}
window.onload = update_array_size();

function storeText(text) {
    clickedTextArray.push(text);
    updateNames();

}
function updateNames() {
    for (var i = 0; i < 2; i++) {
        document.getElementById("name1").innerText = clickedTextArray[i];
        document.getElementById("name2").innerText = clickedTextArray[++i];
    }
}


function disable_buttons() {
    for (var i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled = true;
        inp_as.disabled = true;
        inp_gen.disabled = true;
        inp_aspeed.disabled = true;
    }
}

function runalgo() {
    temp()

}
function temp() {
    i = 0;
    var startTime = performance.now();
    if (clickedTextArray[i] === 'Bubble Sort') {

        Bubble(divs, div_sizes);
        var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
        window.setTimeout(function () {
            var endTime = performance.now(); // Record end time

            var timeTaken = endTime - startTime; // Calculate elapsed time in milliseconds
            var timeInSeconds = timeTaken;
            var timeInSeconds = timeInSeconds / 1000;
            document.getElementById("Time1").innerText = timeInSeconds.toFixed(2);


        }, c_delay += delay_time);
        i++;
        if (clickedTextArray[i] === 'Bubble Sort') {
            var startTime = performance.now();
            Bubble(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Selection Sort') {
            var startTime = performance.now();
            Selection_sort(divs2, div_sizes2);

        }
        else if (clickedTextArray[i] === 'Insertion Sort') {
            var startTime = performance.now();
            Insertion(divs2, div_sizes2);

        }
        else if (clickedTextArray[i] === 'Merge Sort') {
            var startTime = performance.now();
            Merge(divs2, div_sizes2);

        } else {
            var startTime = performance.now();
            Quick(divs2, div_sizes2);
        }


    }

    else if (clickedTextArray[i] === 'Selection Sort') {
        Selection_sort(divs, div_sizes);
        var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
        window.setTimeout(function () {
            var endTime = performance.now(); // Record end time

            var timeTaken = endTime - startTime; // Calculate elapsed time in milliseconds
            var timeInSeconds = timeTaken;
            var timeInSeconds = timeInSeconds / 1000;
            document.getElementById("Time1").innerText = timeInSeconds.toFixed(2);


        }, c_delay += delay_time);
        i++;
        if (clickedTextArray[i] === 'Bubble Sort') {
            var startTime = performance.now();
            Bubble(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Selection Sort') {
            var startTime = performance.now();
            Selection_sort(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Insertion Sort') {
            var startTime = performance.now();
            Insertion(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Merge Sort') {
            var startTime = performance.now();
            Merge(divs2, div_sizes2);

        } else {
            var startTime = performance.now();
            Quick(divs2, div_sizes2);
        }


    }

    else if (clickedTextArray[i] === 'Insertion Sort') {
        Insertion(divs, div_sizes);
        var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
        window.setTimeout(function () {
            var endTime = performance.now();
            var timeTaken = endTime - startTime;
            var timeInSeconds = timeTaken;
            var timeInSeconds = timeInSeconds / 1000;
            document.getElementById("Time1").innerText = timeInSeconds.toFixed(2);


        }, c_delay += delay_time);
        i++;
        if (clickedTextArray[i] === 'Bubble Sort') {
            var startTime = performance.now();
            Bubble(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Selection Sort') {
            var startTime = performance.now();
            Selection_sort(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Insertion Sort') {
            var startTime = performance.now();
            Insertion(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Merge Sort') {
            var startTime = performance.now();
            Merge(divs2, div_sizes2);

        } else {
            var startTime = performance.now();
            Quick(divs2, div_sizes2);
        }


    }

    else if (clickedTextArray[i] === 'Merge Sort') {
        Merge(divs, div_sizes);
        var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
        window.setTimeout(function () {
            var endTime = performance.now(); // Record end time

            var timeTaken = endTime - startTime; // Calculate elapsed time in milliseconds
            var timeInSeconds = timeTaken;
            var timeInSeconds = timeInSeconds / 1000;
            document.getElementById("Time1").innerText = timeInSeconds.toFixed(2);


        }, c_delay += delay_time);
        i++;
        if (clickedTextArray[i] === 'Bubble Sort') {
            var startTime = performance.now();
            Bubble(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Selection Sort') {
            var startTime = performance.now();
            Selection_sort(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Insertion Sort') {
            var startTime = performance.now();
            Insertion(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Merge Sort') {
            var startTime = performance.now();
            Merge(divs2, div_sizes2);

        } else {
            var startTime = performance.now();
            Quick(divs2, div_sizes2);
        }


    }
    else if (clickedTextArray[i] === 'Quick Sort') {
        Quick(divs, div_sizes);
        var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
        window.setTimeout(function () {
            var endTime = performance.now(); // Record end time

            var timeTaken = endTime - startTime; // Calculate elapsed time in milliseconds
            var timeInSeconds = timeTaken;
            var timeInSeconds = timeInSeconds / 1000;
            document.getElementById("Time1").innerText = timeInSeconds.toFixed(2);


        }, c_delay += delay_time);
        i++;
        if (clickedTextArray[i] === 'Bubble Sort') {
            var startTime = performance.now();
            Bubble(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Selection Sort') {
            var startTime = performance.now();
            Selection_sort(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Insertion Sort') {
            var startTime = performance.now();
            Insertion(divs2, div_sizes2);
        }
        else if (clickedTextArray[i] === 'Merge Sort') {
            var startTime = performance.now();
            Merge(divs2, div_sizes2);

        } else {
            var startTime = performance.now();
            Quick(divs2, div_sizes2);
        }


    }
    var delay_time = 10000 / (Math.floor(array_size / 10) * speed);
    window.setTimeout(function () {
        var endTime = performance.now(); // Record end time

        var timeTaken = endTime - startTime; // Calculate elapsed time in milliseconds
        var timeInSeconds = timeTaken;
        var timeInSeconds = timeInSeconds / 1000;
        document.getElementById("Time2").innerText = timeInSeconds.toFixed(2);


    }, c_delay += delay_time);
}