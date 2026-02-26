(function () {
  'use strict';

  function restoreAnswers() {
    try {
      var s = sessionStorage.getItem('aoo_answers');
      if (!s) return;
      var answers = JSON.parse(s);
      ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'].forEach(function (key) {
        var val = answers[key];
        var el = document.getElementById(key);
        if (el && val) {
          el.value = val;
        }
      });
    } catch (_) {}
  }

  restoreAnswers();

  document.getElementById('questions-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var answers = {
      q1: document.getElementById('q1').value,
      q2: document.getElementById('q2').value,
      q3: document.getElementById('q3').value,
      q4: document.getElementById('q4').value,
      q5: document.getElementById('q5').value,
      q6: document.getElementById('q6').value
    };
    try {
      sessionStorage.setItem('aoo_answers', JSON.stringify(answers));
    } catch (_) {}
    window.location.href = 'results.html';
  });
})();
