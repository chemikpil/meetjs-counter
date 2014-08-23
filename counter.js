/* globals window */

(function (window, document) {
  
  'use stric';
  
  var timestamp = 1800000; // 30 min
  var timer_wrapper = document.getElementById("timer");
  var output = [];
  
  var init = function () {
    var localTime = getTimeObject(timestamp);
    var element = document.createElement('span');
    var divider = element.cloneNode();
    
    element.classList.add('number-block');
    divider.classList.add('divider');
    divider.textContent = ':';
    
    for (var key in localTime) {
      output.push(divider.cloneNode(true));
      for (var i = 0, l = localTime[key].length; i < l; i++) {
        element.textContent = localTime[key][i];
        output.push(element.cloneNode(true));
      }
    }
    
    generateHTML();
  };
  
  var generateHTML = function () {
    for (var i = 1, l = output.length; i < l; i++) {
      timer_wrapper.appendChild(output[i]);
    }
  };
  
  var getTimeObject = function (t) {
      var seconds = Math.floor((t /= 1000) % 60) + '';
      var minutes = Math.floor((t /= 60) % 60) + '';
    
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
      
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    
    return {
      minutes: minutes,
      seconds: seconds 
    };
  };
  
  init();
  
})(window, window.document);