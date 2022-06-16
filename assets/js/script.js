var roadmapTab = document.getElementsByClassName('roadmap-tab');

window.onload = function() {
    Array.prototype.forEach.call(roadmapTab, function(item){
        var items = item.parentElement.children;
        var contents = item.parentElement.parentElement.lastElementChild.children;
        item.addEventListener('click', function(){
            if (!item.classList.contains('active')) {
                item.classList.add('active');
                for (i=0;i<items.length;i++) {
                    if (items[i]==item && !contents[i].classList.contains('active')) {
                        contents[i].classList.add('active');
                    }
                    if (items[i]!=item && items[i].classList.contains('active')) {
                        items[i].classList.remove('active');
                        contents[i].classList.remove('active');
                    }
                }
            }
        });
    });
};

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);

    var toast = document.getElementById("message");
    toast.innerHTML = "Copied!";
    toast.style.display = "inline-block";
    setTimeout(function(){
        toast.style.display = "none";
      }, 1000);
}

window.onscroll = function() {headerFunction()};

var header = document.getElementById("stickyHeader");
var sticky = header.offsetTop;

function headerFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function myFunction(x) {
    document.getElementById("myDropdown").classList.add("show");
}

$('.close').click(function() {
    document.getElementById("myDropdown").classList.remove("show");
});

$('.dropdown-menu-item').click(function() {
    document.getElementById("myDropdown").classList.remove("show");
});


$(document).ready(function() {
    $('.chat-character').hover(
        function() {
            $(".chat-character").not(this).css('opacity', 0.5);
        }, function() {
            $(".chat-character").css('opacity', 1);
        }
    );
});


//Canvas Old Movie Effect

var viewWidth,
    viewHeight,
    canvas = document.getElementById("canvas"),
    ctx;

// change these settings
var patternSize = 64,
    patternScaleX = 3,
    patternScaleY = 1,
    patternRefreshInterval = 4,
    patternAlpha = 25; // int between 0 and 255,

var patternPixelDataLength = patternSize * patternSize * 4,
    patternCanvas,
    patternCtx,
    patternData,
    frame = 0;

window.onload = function() {
    initCanvas();
    initGrain();
    requestAnimationFrame(loop);
};

// create a canvas which will render the grain
function initCanvas() {
    viewWidth = canvas.width = canvas.clientWidth;
    viewHeight = canvas.height = canvas.clientHeight;
    ctx = canvas.getContext('2d');

    ctx.scale(patternScaleX, patternScaleY);
}

// create a canvas which will be used as a pattern
function initGrain() {
    patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    patternCtx = patternCanvas.getContext('2d');
    patternData = patternCtx.createImageData(patternSize, patternSize);
}

// put a random shade of gray into every pixel of the pattern
function update() {
    var value;

    for (var i = 0; i < patternPixelDataLength; i += 4) {
        value = (Math.random() * 255) | 0;

        patternData.data[i    ] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
    }

    patternCtx.putImageData(patternData, 0, 0);
}

// fill the canvas using the pattern
function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillRect(0, 0, viewWidth, viewHeight);
}

function loop() {
    if (++frame % patternRefreshInterval === 0) {
        update();
        draw();
    }

    requestAnimationFrame(loop);
}

var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var arrow = this.children;
      console.log(arrow[1].className);
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          document.querySelector('.' + arrow[1].className).style.transform = 'rotate(-45deg)';
      } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          document.querySelector('.' + arrow[1].className).style.transform = 'rotate(135deg)';
      } 
  });
}

//Countdown Timer
$(function() {
/*
    // test(現在時刻から５秒後）
    var targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + 5);
*/

/*
    // 2022 6/13 09:00(UTC)
    var targetDate = new Date( 1655110800000 );
*/

    // 2022 6/13 10:00(UTC)
    var targetDate = new Date( 1655114400000 );

    var now   = new Date();
    var secondsLeft = parseInt( (targetDate.getTime() - now.getTime())/1000 );
    if( secondsLeft < 0 ){
        secondsLeft = 0;
    }

    window.days = parseInt( secondsLeft / 86400);
    window.hours = parseInt((secondsLeft % 86400)/3600);
    window.minutes = parseInt((secondsLeft%3600)/60);
    window.seconds = secondsLeft%60;

    startCountdown();
});
var interval;

function startCountdown() {
    $('#input-container').hide();
    $('#countdown-container').show();
    
    displayValue('#js-days', window.days);
    displayValue('#js-hours', window.hours);
    displayValue('#js-minutes', window.minutes);
    displayValue('#js-seconds', window.seconds);

    interval = setInterval(function() {
        if (window.seconds > 0) {
            window.seconds--;
            displayValue('#js-seconds', window.seconds);
        } else {
        // Seconds is zero - check the minutes
            if (window.minutes > 0) {
                window.minutes--;
                window.seconds = 59;
                updateValues('minutes');
            } else {
                // Minutes is zero, check the hours
                if (window.hours > 0)  {
                    window.hours--;
                    window.minutes = 59;
                    window.seconds = 59;
                    updateValues('hours');
                } else {
                    clearInterval(interval);
                    $('#js-countdown').addClass('remove');
                    $('#js-next-container').addClass('bigger');
                    $('#connect_btn').css('opacity', '1');
                    $('.connect-btn').click(function(e) {
                        $(this).attr("href", "./mintprocess.html");
                    });
                }
            }
        }
    }, 1000);
}

function updateValues(context) {
    if (context === 'days') {
        displayValue('#js-days', window.days);
        displayValue('#js-hours', window.hours);
        displayValue('#js-minutes', window.minutes);
        displayValue('#js-seconds', window.seconds);
    } else if (context === 'hours') {
        displayValue('#js-hours', window.hours);
        displayValue('#js-minutes', window.minutes);
        displayValue('#js-seconds', window.seconds);
    } else if (context === 'minutes') {
        displayValue('#js-minutes', window.minutes);
        displayValue('#js-seconds', window.seconds);
    }
}

function displayValue(target, value) {
    var newDigit = $('<span></span>');
    $(newDigit).text(pad(value))
        .addClass('new');
    $(target).prepend(newDigit);
    $(target).find('.current').addClass('old').removeClass('current');
    setTimeout(function() {
        $(target).find('.old').remove();
        $(target).find('.new').addClass('current').removeClass('new');
    }, 900);
}

function pad(number) {
    return ("0" + number).slice(-2);
}