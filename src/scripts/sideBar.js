let icon = document.querySelectorAll('.icon img');

// добавления студента
icon[0].addEventListener('click', function () {
    let student = document.querySelector('.addStudent');
    let addStudent = document.querySelector('.addStudent form');
    let btn = addStudent.querySelector('.addStudent form input[type="submit"]')

    // анимация открытия
    student.style.cssText = `width:800px; padding: 60px 70px 0 70px;`

    setTimeout(() => {
        student.style.cssText = `width:800px;height:610px; padding: 60px 70px 0 70px;`
    }, 500)
    bH.classList.add('bg');

    for (let i = 1; i < addStudent.children.length - 1; i++) {
        addStudent.children[i].style.cssText = `border:1px solid none;`
    };

    // форма добавления
    addStudent.addEventListener('submit', function (e) {

        // проверка на пустые поля
        if (checkEmptyInput(addStudent.children) == true) {

            let formData = new FormData(this);

            fetch(`/src/php/add.php`, {
                method: 'POST',
                body: formData
            })

            for (let i = 1; i < addStudent.children.length - 1; i++) {
                if (addStudent.children[i].type == 'submit') {
                    continue;
                }
                else {
                    addStudent.children[i].value = '';
                };
            };
            notification('студент зачислен',0);
            hideModal(student)
        }
        else {
            for (let i = 1; i < addStudent.children.length - 1; i++) {

                if (addStudent.children[i].type == 'submit') {
                    continue;
                }
                else {
                    addStudent.children[i].style.cssText = `border:1px solid red;`
                };
            };
            notification('введены не все данные',1);
            animateCancel(btn)
        };
        e.preventDefault();

    })
    close(student, bH);
})
// вывод отчисленных студентов
icon[1].addEventListener('click', function () {
    let dStudent = document.querySelector('.deletedStudent');
    let delForm = document.querySelector('.deletedStudent form')
    let formVal = document.querySelector('.deletedStudent form select');


    // анимация открытия
    dStudent.style.cssText = `width:800px; padding: 60px 70px 0 70px;`

    setTimeout(() => {
        dStudent.style.cssText = `width:800px;height:170px; padding: 60px 70px 0 70px;`
    }, 500)
    bH.classList.add('bg');


    // запрос на сервер
    delForm.addEventListener('submit', function (e) {

        let promise = fetch(`/src/php/remove.php/?dGroup=${formVal.value}`);

        promise.then(
            res => {
                return res.json();
            }).then(
                data => {
                    createList(data, 0)
                })

        hideModal(dStudent)
        e.preventDefault();

    })
    close(dStudent, bH);
})

icon[2].addEventListener('click',function(){
    let howDoesItWork = document.querySelector('.howDoesItWork');
    let text = document.querySelector('.howDoesItWork p');
    let closeHowDoesItWork = document.querySelector('.close-howDoesItWork');

    text.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vel omnis accusantium aut rerum atque tenetur vero, tempora quibusdam! Animi facere iusto voluptatum. Nemo vel dolores magnam accusamus debitis libero quidem voluptatum suscipit esse non doloribus consequuntur, eaque temporibus officiis, ipsum, voluptates sequi repellat perspiciatis est ullam? Laudantium, doloremque cupiditate voluptates quaerat, libero repellat tempore magnam impedit non a eos veritatis soluta commodi vero tenetur quod ab, dicta praesentium necessitatibus. Minima aut at ut fugiat et. Deserunt ad consectetur obcaecati excepturi, voluptate eos illum exercitationem laudantium sit veritatis animi nobis molestias fugiat! Tempora quae cumque tempore illum exercitationem voluptatum officia harum, reiciendis doloremque nesciunt optio! Eveniet libero asperiores excepturi earum consectetur facere, nesciunt, aperiam repudiandae eius, natus amet omnis corporis hic corrupti fugit quasi voluptatem in laborum? Porro eum consequatur ea culpa corrupti quae omnis, ipsum est nostrum accusamus obcaecati eos incidunt consectetur, enim eaque? Veritatis culpa adipisci nisi maiores sapiente aliquam, ab, rerum quidem neque iure fuga impedit veniam ratione voluptatibus, voluptates et quibusdam natus alias quisquam ipsam distinctio. Illum autem omnis magni ea hic, aliquam molestias, rerum sed deserunt facere totam porro nostrum optio dolore, enim reprehenderit recusandae commodi sequi. Repellendus qui error animi iusto. Sit, officia aperiam?';

    howDoesItWork.style.cssText = `width:800px; padding: 60px 70px 70px 70px;`

    setTimeout(() => {
        howDoesItWork.style.cssText = `width:800px;height:350px; padding: 60px 70px 70px 70px;`
    }, 500)
    bH.classList.add('bg');

    closeHowDoesItWork.addEventListener('click',function(){
        hideModal(howDoesItWork);
        text.innerHTML = '';
    })

    close(howDoesItWork, bH);
    
})

icon[3].addEventListener('click', function () {
    localStorage.setItem('user', 'exit');
})


// делает красиов туда сюда
const animateCancel = function cencel(btn) {
    let count = 0;
    let timer = setInterval(() => {
        if (count % 2 == 0) {
            btn.style.cssText = `transform: translate(20px);`
        }
        else {
            btn.style.cssText = `transform: translate(-20px);`
        }
        count++;
        if (count == 6) {
            clearInterval(timer)
        }
    }, 200)
}

// скрывает модальное окно по нажатию на кнопку
function close(form) {
    let closeBtn = form.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        let parentElem = closeBtn.parentElement.previousSibling.parentElement;
        hideModal(parentElem)
    })
}

// проверка на пустые поля,принимает группу инпутов
const checkEmptyInput = function flag(groupInp) {
    let flag = false;

    for (let i = 0; i < groupInp.length - 1; i++) {
        if (groupInp[i].value != '' && groupInp[i].type != 'submit') {
            flag = true
        }
        else {
            flag = false;
        }
    }
    return flag;
}
// скрытие модальных окон
function hideModal(parent) {
    parent.style.cssText = `width:800px;height:20px; padding: 60px 70px 0 70px;`

    setTimeout(() => {
        parent.style.cssText = `width:0px;height:0px; padding: 0px 0px 0 0px;`
        bH.classList.remove('bg')
    }, 500)
}