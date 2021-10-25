"use strict";

var loginBack = document.querySelector('.login-back');
var form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  var formData = new FormData(this);
  var promise = fetch("/src/php/login.php", {
    method: 'POST',
    body: formData
  });
  promise.then(function (res) {
    return res.json();
  }).then(function (data) {
    sigIn(data);
  });
  e.preventDefault();
});

if (localStorage.getItem('user') == 'has entered') {
  loginBack.classList.add('hide');
}

if (loginBack.classList != 'hide') {
  timer = setInterval(function () {
    if (localStorage.getItem('user') == 'exit') {
      loginBack.classList.remove('hide');
    } // console.clear()

  }, 1000);
} else if (loginBack.classList != 'hide') {
  clearInterval(timer);
}

function sigIn(data) {
  var inp = document.querySelectorAll('form input');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (inp[1].value == elem['userPassword'] && inp[0].value == elem['userLogin']) {
        loginBack.classList.add('hide');
        localStorage.setItem('user', 'has entered');
        inp[1].value = '';
        inp[0].value = '';
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}