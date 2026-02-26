(function () {
  'use strict';

  function getAnswers() {
    try {
      var s = sessionStorage.getItem('aoo_answers');
      return s ? JSON.parse(s) : null;
    } catch (_) { return null; }
  }

  function findCol(bank, patterns) {
    var keys = Object.keys(bank || {});
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i].toLowerCase();
      for (var j = 0; j < keys.length; j++) {
        if (keys[j].toLowerCase().indexOf(p) !== -1) return keys[j];
      }
    }
    return null;
  }

  function fitScore(bank, answers) {
    var score = 0;
    var total = 6;
    var weight = 1 / total;

    var purposeCol = findCol(bank, ['purpose', 'course']) || 'Purpose';
    var courseCol = findCol(bank, ['course']) || 'Course';
    var coCol = findCol(bank, ['co-applicant', 'guarantor']);

    var purpose = (bank[purposeCol] || bank.Purpose || '').toLowerCase();
    var course = (bank[courseCol] || bank.Course || '').toLowerCase();

    if (answers.q1) {
      if (answers.q1 === 'India' && (purpose.indexOf('india') !== -1 || course.indexOf('india') !== -1)) score += weight;
      else if (answers.q1 === 'Abroad' && (purpose.indexOf('abroad') !== -1 || course.indexOf('abroad') !== -1)) score += weight;
      else if (answers.q1 === 'Not sure') score += weight;
    }
    if (answers.q2) {
      var level = (bank[courseCol] || course).toLowerCase();
      var q2 = (answers.q2 || '').toLowerCase();
      if (level.indexOf('bachelor') !== -1 || level.indexOf('graduate') !== -1 || level.indexOf('postgraduate') !== -1 || level.indexOf('diploma') !== -1 || level.indexOf('executive') !== -1 || level.indexOf('vocational') !== -1 || level.indexOf('10+2') !== -1 || level.indexOf('school') !== -1) score += weight;
      else score += weight * 0.5;
    }
    if (answers.q3) score += weight;
    if (answers.q4 && coCol && bank[coCol]) {
      var co = (bank[coCol] || '').toLowerCase();
      var q4 = (answers.q4 || '').toLowerCase();
      if ((q4.indexOf('parent') !== -1 && co.indexOf('parent') !== -1) || (q4.indexOf('sibling') !== -1 && co.indexOf('sibling') !== -1) || (q4.indexOf('guardian') !== -1 && co.indexOf('guardian') !== -1) || (q4.indexOf('relative') !== -1 && co.indexOf('relative') !== -1)) score += weight;
      else score += weight * 0.5;
    } else if (answers.q4) score += weight;
    var collCol = findCol(bank, ['security', 'collateral']);
    if (answers.q5 && collCol && bank[collCol]) {
      var coll = (bank[collCol] || '').toLowerCase();
      if (answers.q5 === 'Not sure') score += weight;
      else if ((answers.q5 === 'Yes' && (coll.indexOf('collateral') !== -1 || coll.indexOf('security') !== -1)) || (answers.q5 === 'No' && (coll.indexOf('collateral-free') !== -1 || coll.indexOf('without') !== -1))) score += weight;
      else score += weight * 0.5;
    } else if (answers.q5) score += weight;
    if (answers.q6) score += weight;
    return Math.round(score * 100) / 100;
  }

  function getCardFields(bank) {
    var nameCol = findCol(bank, ['bank_name', 'bank name', 'bank']);
    var schemeCol = findCol(bank, ['scheme_name', 'scheme name', 'scheme']);
    var amountCol = findCol(bank, ['quantum', 'loan amount', 'max']);
    var rateCol = findCol(bank, ['interest rate', 'interest_rate']);
    var collCol = findCol(bank, ['security', 'collateral']);
    var bankName = (nameCol && bank[nameCol] ? String(bank[nameCol]).trim() : '') || (bank.bank_name || '').trim();
    var schemeName = (schemeCol && bank[schemeCol] ? String(bank[schemeCol]).trim() : '') || (bank.Scheme_name || '').trim();
    var displayName = bankName + (schemeName ? ' – ' + schemeName : '') || 'Bank';
    return {
      name: displayName,
      amount: amountCol && bank[amountCol] ? String(bank[amountCol]).trim() : '',
      rate: rateCol && bank[rateCol] ? String(bank[rateCol]).trim() : '',
      collateral: collCol && bank[collCol] ? String(bank[collCol]).trim() : ''
    };
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  var answers = getAnswers();
  if (!answers) {
    document.getElementById('results-container').innerHTML = '<p class="text-secondary">No answers found. <a href="questions.html">Answer the questions</a> first.</p>';
    return;
  }

  var sheetName = (answers.q1 === 'India' || answers.q1 === 'Not sure') ? 'Education_Loans_India' : 'Education_Loans_Abroad';
  Promise.all([window.fetchSheet(sheetName), window.getConfig ? window.getConfig() : Promise.resolve({})]).then(function (results) {
    var data = results[0] || [];
    var config = results[1] || {};
    var container = document.getElementById('results-container');
    if (!data || data.length === 0) {
      container.innerHTML = '<p class="text-secondary">No data available.</p>';
      return;
    }
    var initialCount = 10;
    var cfgVal = config['results.initial_count'] || config['results.initial_display'];
    if (cfgVal != null) {
      var n = parseInt(String(cfgVal), 10);
      if (!isNaN(n) && n >= 0) initialCount = n;
    }
    var withScore = data.map(function (b) {
      return { bank: b, score: fitScore(b, answers) };
    });
    withScore.sort(function (a, b) { return b.score - a.score; });
    var total = withScore.length;
    var showInitially = initialCount <= 0 ? total : Math.min(initialCount, total);
    function renderCards(slice) {
      var html = '';
      slice.forEach(function (x) {
        var f = getCardFields(x.bank);
        var scorePct = (x.score * 100).toFixed(0);
        html += '<div class="card result-card-modern" data-testid="result-card" data-fit="' + escapeHtml(scorePct) + '">';
        html += '<div class="result-card-top">';
        html += '<h3 class="result-card-name">' + escapeHtml(f.name || 'Bank') + '</h3>';
        html += '<div class="result-card-right"><span class="result-card-fit-badge" aria-label="Fit score ' + scorePct + ' percent">Fit ' + scorePct + '%</span></div>';
        html += '</div>';
        html += '<div class="result-card-details">';
        if (f.amount) html += '<div class="result-card-row"><span class="result-card-label">Loan amount</span><span class="result-card-value">' + escapeHtml(f.amount) + '</span></div>';
        if (f.rate) html += '<div class="result-card-row"><span class="result-card-label">Interest rate</span><span class="result-card-value">' + escapeHtml(f.rate) + '</span></div>';
        if (f.collateral) html += '<div class="result-card-row"><span class="result-card-label">Collateral required</span><span class="result-card-value">' + escapeHtml(f.collateral) + '</span></div>';
        html += '</div>';
        html += '</div>';
      });
      return html;
    }
    var initialSlice = withScore.slice(0, showInitially);
    container.innerHTML = renderCards(initialSlice);
    if (total > showInitially) {
      var remaining = total - showInitially;
      var loadMoreWrap = document.createElement('div');
      loadMoreWrap.className = 'results-load-more';
      loadMoreWrap.setAttribute('data-testid', 'results-load-more');
      var loadMoreBtn = document.createElement('button');
      loadMoreBtn.type = 'button';
      loadMoreBtn.className = 'btn btn-primary';
      loadMoreBtn.setAttribute('data-testid', 'see-remaining-banks');
      loadMoreBtn.textContent = 'See the remaining ' + remaining + ' bank' + (remaining === 1 ? '' : 's');
      loadMoreBtn.addEventListener('click', function () {
        container.innerHTML = renderCards(withScore);
      });
      loadMoreWrap.appendChild(loadMoreBtn);
      container.parentNode.insertBefore(loadMoreWrap, container.nextSibling);
    }
  }).catch(function () {
    document.getElementById('results-container').innerHTML = '<p class="text-secondary">Data temporarily unavailable. Please try again.</p><button type="button" class="btn btn-primary" onclick="location.reload()">Retry</button>';
  });
})();
