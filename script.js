// United Respite Care — landing page behaviour

// 1) Selectable chips (Who needs care? / What kind of support?)
document.querySelectorAll('.chip').forEach(function (chip) {
  chip.addEventListener('click', function () {
    var group = chip.getAttribute('data-group');
    if (group === 'who') {
      document.querySelectorAll('.chip[data-group="who"]').forEach(function (c) {
        if (c !== chip) c.setAttribute('aria-pressed', 'false');
      });
      var on = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', on ? 'false' : 'true');
    } else {
      var pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
    }
  });
});

function selectedChips(group) {
  return Array.prototype.slice
    .call(document.querySelectorAll('.chip[data-group="' + group + '"][aria-pressed="true"]'))
    .map(function (c) { return c.getAttribute('data-value'); });
}

// 2) Form submission
var form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: (document.getElementById('f-name') || {}).value || '',
      phone: (document.getElementById('f-phone') || {}).value || '',
      email: (document.getElementById('f-email') || {}).value || '',
      city: (document.getElementById('f-city') || {}).value || '',
      who: selectedChips('who').join(', '),
      support: selectedChips('support').join(', '),
      message: (document.getElementById('f-msg') || {}).value || ''
    };
    if (!data.name.trim() || !data.phone.trim() || !data.city) {
      alert('Please add your name, phone number and city so we can reach you.');
      return;
    }
    var action = form.getAttribute('action') || '';
    var usingFormspree = action.indexOf('formspree.io') !== -1 && action.indexOf('YOUR_FORM_ID') === -1;
    if (usingFormspree) {
      var fd = new FormData();
      Object.keys(data).forEach(function (k) { fd.append(k, data[k]); });
      fetch(action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) { if (r.ok) { showThanks(); } else { fallbackMailto(data); } })
        .catch(function () { fallbackMailto(data); });
    } else {
      fallbackMailto(data);
      showThanks();
    }
  });
}

function fallbackMailto(d) {
  var subject = 'Care consultation request — ' + (d.name || 'Website');
  var body =
    'Name: ' + d.name + '\n' + 'Phone: ' + d.phone + '\n' + 'Email: ' + d.email + '\n' +
    'City: ' + d.city + '\n' + 'Who needs care: ' + d.who + '\n' +
    'Support needed: ' + d.support + '\n' + 'Message: ' + d.message + '\n';
  window.location.href = 'mailto:info@unitedrespitecare.ca?subject=' +
    encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function showThanks() {
  var live = document.getElementById('form-live');
  var t = document.getElementById('thanks-panel');
  if (live) live.hidden = true;
  if (t) { t.hidden = false; t.setAttribute('tabindex','-1'); t.focus(); t.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}

var resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', function () {
    var live = document.getElementById('form-live');
    var t = document.getElementById('thanks-panel');
    if (t) t.hidden = true;
    if (live) live.hidden = false;
  });
}

// 3) Testimonial video: custom play overlay
(function () {
  var vid = document.getElementById('testimonial-video');
  var btn = document.getElementById('video-play-btn');
  if (!vid || !btn) return;
  btn.addEventListener('click', function () {
    btn.classList.add('is-hidden');
    vid.play();
    vid.focus();
  });
  // If the user pauses, bring the overlay back only if playback hasn't started far in
  vid.addEventListener('play', function () { btn.classList.add('is-hidden'); });
  vid.addEventListener('ended', function () { btn.classList.remove('is-hidden'); });
})();
