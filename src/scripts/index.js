const list = document.querySelector('.list ul');
const getStudentBtn = document.querySelector('.get-student button');
const getGroup = document.querySelector('.get-student select');
const bH = document.querySelector('.b-h');



function createList(data, deleted) {
    let countStudent = document.querySelector('.count-student');
    let str = ``;
    let count = 1;

    for (let i = 0; i < data.length; i++) {
        if (data[i]['deleted'] == deleted) {
            if (deleted == 1) {
                str += `<li data-study="${data[i]['deleted']}" data-id="${data[i]['id']}" ><div class="list-wrap">${data[i]['StudentName']} ${data[i]['surName']} ${data[i]['lastName']} ${data[i]['dateOfBirth']} ${data[i]['homeAddress']} ${data[i]['yearОfAdmission']} ${data[i]['typeOfTraining']} ${data[i]['studentGroup']} ${data[i]['studentNumber']}
            <div class="list-del">
                <p>Отчислить</p><input type="checkbox" class="checkbox"></div>
            </div></li><hr>`
            } else {
                str += `<li data-study="${data[i]['deleted']}" data-id="${data[i]['id']}" ><div class="list-wrap">${data[i]['StudentName']} ${data[i]['surName']} ${data[i]['lastName']} ${data[i]['dateOfBirth']} ${data[i]['homeAddress']} ${data[i]['yearОfAdmission']} ${data[i]['typeOfTraining']} ${data[i]['studentGroup']} ${data[i]['studentNumber']} ${data[i]['ExpulsionDate'].slice(1)} ${data[i]['ReasonForExpulsion'].slice(1)}</li><hr>`
            }
        } else {
            continue
        }
        countStudent.innerHTML = `Количество студентов: ${count++}`
    }

    list.innerHTML = str;
    delStudent()
}

function delStudent() {
    let checkbox = document.querySelectorAll('[type="checkbox"]')
    let remove = document.querySelector('.remove');

    let hr = document.querySelectorAll('.list hr');
    let li = document.querySelectorAll('li');

    remove.children[0].addEventListener('click', () => {
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                shwoModalDel(li[i].getAttribute('data-id'), hr[i]);
                hr[i].style.cssText = `background:red;`
            }
        };
    });
}
// показ модального окна для отчисления
function shwoModalDel(elems, hr) {
    let form = document.querySelector('.remove_form');
    let inp = form.querySelector('.remove_form-wrap form');
    let btn = inp.querySelector('.remove_form-wrap form input[type="submit"]')

    bH.classList.add('bg');
    form.classList.remove('hide');
    closeModalDel(form, bH, hr);

    for (let i = 0; i < inp.children.length - 1; i++) {

        if (inp.children[i].type == 'submit') {
            continue;
        }
        else {
            inp.children[i].style.cssText = `border:1px solid none;`
        }
    };

    inp.addEventListener('submit', function (e) {

        if (checkEmptyInput(inp.children) == true) {

            fetch(`/src/php/remove.php/?groupName=${getGroup.value}&studentId=${elems}&cause="${inp[0].value}&date="${inp[1].value}`);

            form.classList.add('hide');
            bH.classList.remove('bg');
        }
        else {

            for (let i = 0; i < inp.children.length - 1; i++) {

                if (inp.children[i].type == 'submit') {
                    continue;
                }
                else {
                    inp.children[i].style.cssText = `border:1px solid red;`
                }
            };

            animateCancel(btn);
        };
        e.preventDefault();
    });
}
// для закрытия модальных окнон

function close(form, bH, hr) {

    let closeBtn = form.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        form.classList.add('hide');
        bH.classList.remove('bg')
    })
}

// для закрытия модальных окнон
function closeModalDel(form, bg, hr) {
    let closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', function () {
        form.classList.add('hide');
        bg.classList.remove('bg');
        hr.style.cssText = `background:#45a5a9;`;
    });
}

// конопка для вывода списка студентов
getStudentBtn.addEventListener('click', function () {
    let remove = document.querySelector('.remove button');
    remove.classList.remove('hide')


    let promise = fetch(`/src/php/getJSON.php/?group=${getGroup.value}`);
    promise.then(
        res => {
            return res.json();
        }
    ).then(
        data => {
            createList(data, 1)
        }
    );
})