var guessesLeft = 10;

$(function() {
  updateScore(guessesLeft);
  populateHighScores();
});

window.onload = function(){
    generateNumberToGuess();
}

function generateNumberToGuess(confirmIt) {
    numToGuess = Math.floor(Math.random()*100)+1;
}

function populateHighScores() {
	var scrs = $.cookie('the_cookie');
	cookiearray  = scrs.split(';');
	for(var i=0; i < cookiearray.length; i++){
		s = cookiearray[i].split('=')[0];
		n = cookiearray[i].split('=')[1];
	}
	$('div#highScores').text("");
	for (var i = 0; i < s.length; ++i) {
		$('div#highScores').append("<p>" + s[i][0] + " " + n[i][1] + "</p>");
	}
}

function updateScore(score) {
	$('h2#score').text("");
	if (score == 1) {
		$('h2#score').text(score + " guess left");
	} else {
		$('h2#score').text(score + " guesses left");
	}
}



function addScore(){
	var scrs = $.cookie('the_cookie');
	scrs = scrs + ";" + guessesLeft + "=" + document.getElementById("name").value;
	$.cookie('the_cookie', scrs);
	populateHighScores();
	document.getElementById('newScore').style.display="none";
	document.getElementById('output').style.display="none";
}



function yourGuess() {
    var guess = document.getElementById("guess").value;
    var guesses = document.getElementById("output");
	
	if (isNaN(guess) || guess == "" || guess == " "){
		guesses.innerText = "Bad input!";
	} else if (guessesLeft == 1) {
		guessesLeft = 0;
		updateScore(guessesLeft);
		guesses.innerText = "YOU LOSE";
		document.getElementById('guess').style.display="none";
		document.getElementById('submit').style.display="none";
		document.getElementById('new').style.display="block";
	} else {
		if (guess == numToGuess) {
			guesses.innerText = "CORRECT";
			guessesLeft = guessesLeft - 1;
			updateScore(guessesLeft);
			document.getElementById('guess').style.display="none";
			document.getElementById('submit').style.display="none";
			document.getElementById('new').style.display="block";
			document.getElementById('newScore').style.display="block";
		} else if (guess > numToGuess) {
			guesses.innerText = "Too High!";
			guessesLeft = guessesLeft - 1;
			updateScore(guessesLeft);
		} else {
			guesses.innerText = "Too Low!";
			guessesLeft = guessesLeft - 1;
			updateScore(guessesLeft);
		}
	}
}

function showNumberToGuess() {
    if (document.getElementById('cheat').checked) {
        document.getElementById('numberToGuess').value = numToGuess;
        document.getElementById('cheatShow').style.display = 'inline';
    } else {
        document.getElementById('numberToGuess').value = '';
        document.getElementById('cheatShow').style.display = 'none';
    }
}

function newGame(){
	generateNumberToGuess();
}


/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);