/*
 *        .þÛÛþ þ    þ þÛÛþ.     þ    þ þÛÛÛþ.  þÛÛÛþ .þÛÛþ. þ    þ
 *       .þ   Û Ûþ.  Û Û   þ.    Û    Û Û    þ  Û.    Û.   Û Ûþ.  Û
 *       Û    Û Û Û  Û Û    Û    Û   þ. Û.   Û  Û     Û    Û Û Û  Û
 *     .þþÛÛÛÛþ Û  Û Û þÛÛÛÛþþ.  þþÛÛ.  þþÛÛþ.  þÛ    Û    Û Û  Û Û
 *    .Û      Û Û  .þÛ Û      Û. Û   Û  Û    Û  Û.    þ.   Û Û  .þÛ
 *    þ.      þ þ    þ þ      .þ þ   .þ þ    .þ þÛÛÛþ .þÛÛþ. þ    þ
 *
 * 
 * Author: Martin Stransky <stransky@anakreon.cz>
 *
 * Based on MDN touch screen tutorial:
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 */
 
// Touch-screen configuration
var ongoingTouchId = -1;
var ongoingTouchX;
var ongoingTouchY;
var ongoingTouchDx;
var ongoingTouchDy;

function handleStart(event) {
  // prevent default handlers (mouse for instance)
  event.preventDefault();
  
  // Store the touch which just started  
  var touch = event.changedTouches[0];
  ongoingTouchId = touch.identifier;
  ongoingTouchX = touch.pageX;
  ongoingTouchY = touch.pageY;
  ongoingTouchDx = 0;
  ongoingTouchDy = 0;
}

function handleMove(event) {
  event.preventDefault();
  
  var touches = event.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    if (ongoingTouchId == touches[i].identifier) {
      var touch = touches[i];

      ongoingTouchDx = touch.pageX-ongoingTouchX;
      ongoingTouchDy = touch.pageY-ongoingTouchY;
      ongoingTouchX = touch.pageX;
      ongoingTouchY = touch.pageY;

      // we handle only one touch event
      break;
    }
  }
}

function handleEnd(event) {
  event.preventDefault();
  var touches = event.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    if (ongoingTouchId == touches[i].identifier) {
      ongoingTouchId = -1;
      break;
    }
  }
}

function touchInit() {
  var canvas = document.getElementById("webgl-canvas");
  
  // start of the touch
  canvas.addEventListener("touchstart", handleStart, false);
  
  // finger movement
  canvas.addEventListener("touchmove", handleMove, false);
  
  // finger is lifted
  canvas.addEventListener("touchend", handleEnd, false);
  // finger left screen area
  canvas.addEventListener("touchleave", handleEnd, false);  
  // event has been canceled
  canvas.addEventListener("touchcancel", handleEnd, false);
}
