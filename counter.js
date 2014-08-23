/* globals window */

(function (window, document) {
  
  'use stric';
  
  var keyCodes = {
    ENTER: 13, // Start
    F: 70 // FullScreen
  };
  
  var timestamp = 1800000; // 30 min
  var timer = null;
  var content = document.querySelector('.content');
  var timer_wrapper = document.getElementById("timer");
  var outputs = [];
  
  var fullScreen = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen;
  
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
    content.classList.add('is-complete');
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
  
  document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
      case keyCodes.ENTER:
        if (!timer) {
          start();
        }
        break;
      case keyCodes.F:
        fullScreen.call(document.body);
        break;
    }
  }, false);
  
  init();
  
})(window, window.document);