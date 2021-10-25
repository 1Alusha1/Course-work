"use strict";

var icon = document.querySelectorAll('.icon img'); // делает красиов туда сюда

var animateCancel = function cencel(btn) {
  var count = 0;
  var timer = setInterval(function () {
    if (count % 2 == 0) {
      btn.style.cssText = "transform: translate(20px);";
    } else {
      btn.style.cssText = "transform: translate(-20px);";
    }

    count++;

    if (count == 6) {
      clearInterval(timer);
    }
  }, 200);
}; // проверка на пустые поля,принимает группу инпутов


var checkEmptyInput = function flag(groupInp) {
  var flag = false;

  for (var i = 0; i < groupInp.length - 1; i++) {
    if (groupInp[i].value != '' && groupInp[i].type != 'submit') {
      flag = true;
    } else {
      flag = false;
    }
  }

  return flag;
}; // добавления студента


icon[0].addEventListener('click', function () {
  var student = document.querySelector('.addStudent');
  var addStudent = document.querySelector('.addStudent form');
  var btn = addStudent.querySelector('.addStudent form input[type="submit"]');
  student.classList.remove('hide');
  bH.classList.add('bg');

  for (var i = 1; i < addStudent.children.length - 1; i++) {
    addStudent.children[i].style.cssText = "border:1px solid none;";
  }

  ;
  addStudent.addEventListener('submit', function (e) {
    if (checkEmptyInput(addStudent.children) == true) {
      var formData = new FormData(this);
      fetch("/src/php/add.php", {
        method: 'POST',
        body: formData
      });

      for (var _i = 1; _i < addStudent.children.length - 1; _i++) {
        if (addStudent.children[_i].type == 'submit') {
          continue;
        } else {
          addStudent.children[_i].value = '';
        }

        ;
      }

      ;
      student.classList.add('hide');
      bH.classList.remove('bg');
    } else {
      for (var _i2 = 1; _i2 < addStudent.children.length - 1; _i2++) {
        if (addStudent.children[_i2].type == 'submit') {
          continue;
        } else {
          addStudent.children[_i2].style.cssText = "border:1px solid red;";
        }

        ;
      }

      ;
      animateCancel(btn);
    }

    ;
    e.preventDefault();
  });
  close(student, bH);
}); // вывод отчисленных студентов

icon[1].addEventListener('click', function () {
  var dStudent = document.querySelector('.deletedStudent');
  var delForm = document.querySelector('.deletedStudent form');
  var formVal = document.querySelector('.deletedStudent form select');
  dStudent.classList.remove('hide');
  bH.classList.add('bg');
  delForm.addEventListener('submit', function (e) {
    var promise = fetch("/src/php/remove.php/?dGroup=".concat(formVal.value));
    promise.then(function (res) {
      return res.json();
    }).then(function (data) {
      createList(data, 0);
    });
    dStudent.classList.add('hide');
    bH.classList.remove('bg');
    e.preventDefault();
  });
  close(dStudent, bH);
});
icon[3].addEventListener('click', function () {
  localStorage.setItem('user', 'exit');
});