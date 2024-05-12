function Bubble(divs, div_sizes) {

  c_delay = 0;
  for (var i = 0; i < array_size - 1; i++) {

    for (var j = 0; j < array_size - i - 1; j++) {

      if (div_sizes[j] > div_sizes[j + 1]) {
        div_update(divs[j], div_sizes[j], "red");//Color update
        div_update(divs[j + 1], div_sizes[j + 1], "red");//Color update

        var temp = div_sizes[j];
        div_sizes[j] = div_sizes[j + 1];
        div_sizes[j + 1] = temp;

        div_update(divs[j], div_sizes[j], "red");//Height update
        div_update(divs[j + 1], div_sizes[j + 1], "red");//Height update

      }
      else {
        div_update(divs[j], div_sizes[j], "red");//Color update
        div_update(divs[j + 1], div_sizes[j + 1], "red");//Color update
      }
      div_update(divs[j], div_sizes[j], "orange");//Color update
    }
    div_update(divs[j], div_sizes[j], "green");//Color update
  }



  div_update(divs[0], div_sizes[0], "green");//Color update

  enable_buttons();



}
let startTime;
let elapsedTime = 0;
let timerInterval;

function startStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000); // Update every second
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  updateDisplay();
}

function updateDisplay() {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  document.getElementById('stopwatch').innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
}

