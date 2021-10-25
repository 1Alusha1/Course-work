"use strict";

var list = document.querySelector('.list ul');
var getStudentBtn = document.querySelector('.get-student button');
var getGroup = document.querySelector('.get-student select');
var bH = document.querySelector('.b-h');

function createList(data, deleted) {
  var countStudent = document.querySelector('.count-student');
  var str = "";
  var count = 1;

  for (var i = 0; i < data.length; i++) {
    if (data[i]['deleted'] == deleted) {
      if (deleted == 1) {
        str += "<li data-study=\"".concat(data[i]['deleted'], "\" data-id=\"").concat(data[i]['id'], "\" ><div class=\"list-wrap\">").concat(data[i]['StudentName'], " ").concat(data[i]['surName'], " ").concat(data[i]['lastName'], " ").concat(data[i]['dateOfBirth'], " ").concat(data[i]['homeAddress'], " ").concat(data[i]['yearОfAdmission'], " ").concat(data[i]['typeOfTraining'], " ").concat(data[i]['studentGroup'], " ").concat(data[i]['studentNumber'], "\n            <div class=\"list-del\">\n                <p>\u041E\u0442\u0447\u0438\u0441\u043B\u0438\u0442\u044C</p><input type=\"checkbox\" class=\"checkbox\"></div>\n            </div></li><hr>");
      } else {
        str += "<li data-study=\"".concat(data[i]['deleted'], "\" data-id=\"").concat(data[i]['id'], "\" ><div class=\"list-wrap\">").concat(data[i]['StudentName'], " ").concat(data[i]['surName'], " ").concat(data[i]['lastName'], " ").concat(data[i]['dateOfBirth'], " ").concat(data[i]['homeAddress'], " ").concat(data[i]['yearОfAdmission'], " ").concat(data[i]['typeOfTraining'], " ").concat(data[i]['studentGroup'], " ").concat(data[i]['studentNumber'], " ").concat(data[i]['ExpulsionDate'].slice(1), " ").concat(data[i]['ReasonForExpulsion'].slice(1), "</li><hr>");
      }
    } else {
      continue;
    }

    countStudent.innerHTML = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432: ".concat(count++);
  }

  list.innerHTML = str;
  delStudent();
}

function delStudent() {
  var checkbox = document.querySelectorAll('[type="checkbox"]');
  var remove = document.querySelector('.remove');
  var hr = document.querySelectorAll('.list hr');
  var li = document.querySelectorAll('li');
  remove.children[0].addEventListener('click', function () {
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        shwoModalDel(li[i].getAttribute('data-id'), hr[i]);
        hr[i].style.cssText = "background:red;";
      }
    }

    ;
  });
} // показ модального окна для отчисления


function shwoModalDel(elems, hr) {
  var form = document.querySelector('.remove_form');
  var inp = form.querySelector('.remove_form-wrap form');
  var btn = inp.querySelector('.remove_form-wrap form input[type="submit"]');
  bH.classList.add('bg');
  form.classList.remove('hide');
  closeModalDel(form, bH, hr);

  for (var i = 0; i < inp.children.length - 1; i++) {
    if (inp.children[i].type == 'submit') {
      continue;
    } else {
      inp.children[i].style.cssText = "border:1px solid none;";
    }
  }

  ;
  inp.addEventListener('submit', function (e) {
    if (checkEmptyInput(inp.children) == true) {
      fetch("/src/php/remove.php/?groupName=".concat(getGroup.value, "&studentId=").concat(elems, "&cause=\"").concat(inp[0].value, "&date=\"").concat(inp[1].value));
      form.classList.add('hide');
      bH.classList.remove('bg');
    } else {
      for (var _i = 0; _i < inp.children.length - 1; _i++) {
        if (inp.children[_i].type == 'submit') {
          continue;
        } else {
          inp.children[_i].style.cssText = "border:1px solid red;";
        }
      }

      ;
      animateCancel(btn);
    }

    ;
    e.preventDefault();
  });
} // для закрытия модальных окнон


function close(form, bH, hr) {
  var closeBtn = form.querySelector('.close-btn');
  closeBtn.addEventListener('click', function () {
    form.classList.add('hide');
    bH.classList.remove('bg');
  });
} // для закрытия модальных окнон


function closeModalDel(form, bg, hr) {
  var closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', function () {
    form.classList.add('hide');
    bg.classList.remove('bg');
    hr.style.cssText = "background:#45a5a9;";
  });
} // конопка для вывода списка студентов


getStudentBtn.addEventListener('click', function () {
  var remove = document.querySelector('.remove button');
  remove.classList.remove('hide');
  var promise = fetch("/src/php/getJSON.php/?group=".concat(getGroup.value));
  promise.then(function (res) {
    return res.json();
  }).then(function (data) {
    createList(data, 1);
  });
});