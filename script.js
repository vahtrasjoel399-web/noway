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
setInterval(updateClock, 10000);
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


// ===== INDEX PAGE: Boot Sequence =====
(function () {
  var startBtn = document.getElementById('startBtn');
  if (!startBtn) return;

  startBtn.addEventListener('click', function () {
    var screenOverlay = document.getElementById('screenOverlay');
    var hintText = document.getElementById('hintText');
    var bootOverlay = document.getElementById('bootOverlay');
    var bootText = document.getElementById('bootText');
    var bootFill = document.getElementById('bootFill');

    // Hide the screen overlay (logo + button) and hint
    if (screenOverlay) screenOverlay.classList.add('hidden');
    if (hintText) hintText.style.opacity = '0';

    // After a short delay, start the boot sequence
    setTimeout(function () {
      bootOverlay.classList.add('active');

      var bootLines = [
        'NOWAY BIOS v2.4.1',
        'Copyright (C) 2026 Noway Technologies',
        '',
        'Checking memory... 640K OK',
        'Detecting hardware...',
        'CPU: Noway Processor @ 4.2GHz',
        'GPU: Noway Graphics Accelerator',
        'Storage: 1TB SSD detected',
        '',
        'Loading NOWAY OS...',
        'Initializing desktop environment...',
        '',
        'Welcome to Noway.'
      ];

      var lineIndex = 0;
      var progressSteps = bootLines.length;

      function showNextLine() {
        if (lineIndex >= bootLines.length) {
          // Boot complete, navigate
          bootFill.style.width = '100%';
          setTimeout(function () {
            navigateTo('desktop.html');
          }, 600);
          return;
        }

        var span = document.createElement('span');
        span.textContent = bootLines[lineIndex];
        span.style.animationDelay = '0s';
        bootText.appendChild(span);

        var progress = ((lineIndex + 1) / progressSteps) * 100;
        bootFill.style.width = progress + '%';

        lineIndex++;
        setTimeout(showNextLine, 200 + Math.random() * 200);
      }

      setTimeout(showNextLine, 500);
    }, 1200);
  });
})();


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
