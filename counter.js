/* globals window */

(function (window, document) {
  
  'use stric';
  
  var keyCodes = {
    ENTER: 13 // Start
  };
  
  var timestamp = 15000; // 30 min 1800000
  var timer = null;
  var timer_wrapper = document.getElementById("timer");
  var outputs = [];
  
  var init = function () {
    var localTime = getTimeObject(timestamp);
    var element = document.createElement('span');
    var divider = element.cloneNode();
    
    element.classList.add('number-block');
    
    
    for (var key in localTime) {
      for (var i = 0, l = localTime[key].length; i < l; i++) {
        element.textContent = localTime[key][i];
        outputs.push(element.cloneNode(true));
      }
    }
    
    generateHTML();
    start();
  };
  
  var generateHTML = function () {
    var divider = document.createElement('span');
    divider.classList.add('divider');
    divider.textContent = ':';
    
    for (var i = 0, l = outputs.length; i < l; i++) {
      if (i > 0 && i % 2 === 0) {
         timer_wrapper.appendChild(divider.cloneNode(true));
      }
      timer_wrapper.appendChild(outputs[i]);
    }
  };
  
  var start = function () {
    timer = window.setInterval(function () {
      timestamp -= 1000;
      
      var localCounter = getTimeObject(timestamp);
      var i = 0;
      
      if (timestamp <= 300000) {
        timer_wrapper.classList.add('so-close');
      }
      
      for (var key in localCounter) {
        for (var j = 0, l = localCounter[key].length; j < l; j++, i++) {
          outputs[i].textContent = localCounter[key][j];
        }
      }
      
      if (timestamp <= 0) {
        end();
      }
    }, 1000);
  };
  
  var end = function () {
    window.clearInterval(timer);
    document.body.classList.add('is-complete');
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