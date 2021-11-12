const list = document.querySelector('.list ul');
const getStudentBtn = document.querySelector('.get-student button');
const getGroup = document.querySelector('.get-student select');
const bH = document.querySelector('.b-h');

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
            console.log(data)
        }
    );
})

// для закрытия модальных окнон
function closeModalDel(form, bg, hr) {
    let closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', function () {
        form.classList.add('hide');
        bg.classList.remove('bg');
        hr.style.cssText = `background:#45a5a9;`;
    });
}

// уведомления
const notification = function chips(message, error, timeRemove = 3000) {
    let chipsC = document.createElement('div');
    chipsC.className = 'chips-container';

    let chipsI = document.createElement('div');
    chipsI.className = 'chips-inner';

    chipsI.innerHTML = message;

    if (error == 1) {
        chipsC.style.cssText = `background: rgba(235, 32, 18, 0.438);
        border-bottom: 2px solid rgb(177, 45, 5);`
    } else if (error == 0) {
        chipsC.style.cssText = ` background: rgba(18, 228, 64, 0.438);
        border-bottom: 2px solid rgb(16, 150, 45);`
    }

    chipsC.appendChild(chipsI);
    document.body.appendChild(chipsC);

    setTimeout(() => {
        chipsC.remove();
    }, timeRemove);

}
// создает список всех учащихся
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
            };
            console.log(str);
        } else {
            continue
        }
        countStudent.innerHTML = `Количество студентов: ${count++}`
    }
    list.innerHTML = str;
    delStudent()
}
// функция отвечает за показ окна на удаления студентов 
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

    // удаляем стили с инпутов
    for (let i = 0; i < inp.children.length - 1; i++) {

        if (inp.children[i].type == 'submit') {
            continue;
        }
        else {
            inp.children[i].style.cssText = `border:1px solid none;`
        }
    };

    inp.addEventListener('submit', function (e) {

        if (checkEmptyInput(inp.children)) {

            fetch(`/src/php/remove.php/?groupName=${getGroup.value}&studentId=${elems}&cause="${inp[0].value}&date="${inp[1].value}`);

            form.classList.add('hide');
            bH.classList.remove('bg');
            notification('студент отчислен', 0)
        }
        else {
            // если инпуты пусты красим их границу в крассный
            for (let i = 0; i < inp.children.length - 1; i++) {

                if (inp.children[i].type == 'submit') {
                    continue;
                }
                else {
                    inp.children[i].style.cssText = `border:1px solid red;`
                }
            };
            notification('заполнены не все поля', 1)
            animateCancel(btn);
        };
        e.preventDefault();
    });
}
