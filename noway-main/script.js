// ===== SHARED: Clock Update =====
function updateClock() {
  var el = document.getElementById('taskbarClock');
  if (!el) return;
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  m = m < 10 ? '0' + m : m;
  el.textContent = h + ':' + m + ' ' + ampm;
}
setInterval(updateClock, 1000);
updateClock();


// ===== SHARED: Smooth Page Navigation =====
function navigateTo(url) {
  var overlay = document.getElementById('pageTransition');
  if (!overlay) {
    window.location.href = url;
    return;
  }
  overlay.classList.add('active');
  setTimeout(function () {
    window.location.href = url;
  }, 400);
}

// Fade in on page load
window.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('pageTransition');
  if (overlay) {
    overlay.classList.add('active');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.remove('active');
      });
    });
  }
});


// ===== INDEX PAGE: Screen click → zoom → boot → desktop =====
(function () {
  var screenOverlay = document.getElementById('screenOverlay');
  if (!screenOverlay) return;

  screenOverlay.addEventListener('click', function () {
    var computerContainer = document.getElementById('computerContainer');
    var hintText          = document.getElementById('hintText');
    var bootOverlay       = document.getElementById('bootOverlay');
    var pageTransition    = document.getElementById('pageTransition');
    var screenVideo      = document.getElementById('screenVideo');
    var screenVideoClick = document.getElementById('screenVideoClick');

    // Prevent double-click
    screenOverlay.style.pointerEvents = 'none';
    if (hintText) hintText.style.opacity = '0';

    // Instantly swap: hide idle, show preloaded Trim 1
    screenVideo.style.opacity = '0';
    screenVideoClick.style.opacity = '1';
    screenVideoClick.play();

    // When Trim 1 finishes — zoom in
    screenVideoClick.addEventListener('ended', function startZoom() {
      screenVideoClick.removeEventListener('ended', startZoom);

      computerContainer.classList.add('zooming');

      // Fade to black near end of zoom
      setTimeout(function () {
        pageTransition.classList.add('active');
      }, 1400);

      // Show XP screen
      setTimeout(function () {
        computerContainer.style.display = 'none';
        pageTransition.classList.remove('active');
        bootOverlay.classList.add('active');

        var bootXp = document.getElementById('bootXp');
        bootXp.style.display = 'flex';
        requestAnimationFrame(function () {
          bootXp.classList.add('visible');
        });

        setTimeout(function () {
          navigateTo('desktop.html');
        }, 3500);
      }, 2000);
    });
  });
})();


// ===== DESKTOP PAGE: Shut Down =====
function shutDown() {
  var overlay = document.getElementById('shutdownOverlay');
  if (!overlay) return;

  // Show overlay
  overlay.style.display = 'flex';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      overlay.classList.add('visible');
    });
  });

  // After "shutting down" text shows — play CRT off effect
  setTimeout(function () {
    overlay.classList.add('crt-off');
    // Navigate after animation finishes
    setTimeout(function () {
      navigateTo('index.html');
    }, 750);
  }, 2800);
}

// ===== DESKTOP PAGE: Icon Interactions =====
(function () {
  var icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      icons.forEach(function (i) { i.classList.remove('selected'); });
      icon.classList.add('selected');
    });
  });
})();
