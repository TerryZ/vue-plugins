import 'babel-polyfill'

if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat

/**
 * MouseEvent path property polyfill
 */
if (!('path' in Event.prototype)) {
  Object.defineProperty(Event.prototype, 'path', {
    get: function () {
      const path = []
      let currentElem = this.target
      while (currentElem) {
        path.push(currentElem)
        currentElem = currentElem.parentElement
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) { path.push(document) }
      if (path.indexOf(window) === -1) { path.push(window) }
      return path
    }
  })
}

// shim layer with setTimeout fallback
/*
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
*/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
  var lastTime = 0
  var vendors = ['ms', 'moz', 'webkit', 'o']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () { callback(currTime + timeToCall) },
        timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())
