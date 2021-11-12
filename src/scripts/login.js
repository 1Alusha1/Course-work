let loginBack = document.querySelector('.login-back');
let form = document.querySelector('form');
let inp = document.querySelectorAll('form input');

form.addEventListener('submit', function (e) {
    let formData = new FormData(this)
    let promise = fetch(`/src/php/login.php`, {
        method: 'POST',
        body: formData
    })
    promise.then(
        res => {
            return res.json();
        }
    ).then(
        data => {
            sigIn(data)
        }
    )
    e.preventDefault();
})

if (localStorage.getItem('user') == 'has entered') {
    loginBack.classList.add('hide');
}


// проверка надимал ли пользоваель на кнопку входа
if (loginBack.classList != 'hide') {
    timer = setInterval(() => {
        if (localStorage.getItem('user') == 'exit') {
            loginBack.classList.remove('hide');

            for (let i = 0; i < inp.length - 1; i++) {
                inp[i].style.cssText = `border:1px solid none;`
            };
        }
        // console.clear()
    }, 1000)

}
else if (loginBack.classList != 'hide') {
    clearInterval(timer)
}

// проверка кректности пароля
function sigIn(data) {

    for (let elem of data) {
        if (inp[1].value == elem['userPassword'] && inp[0].value == elem['userLogin']) {

            inp[0].style.cssText = ``
            inp[1].style.cssText = ``

            loginBack.classList.add('hide');
            localStorage.setItem('user', 'has entered');

            inp[1].value = '';
            inp[0].value = '';
        }
        else {
            for (let i = 0; i < inp.length - 1; i++) {
                if (inp[i].type == 'submit') {
                    continue;
                }
                else {
                    inp[i].style.cssText = `border:1px solid red;`
                };
            };
        };
    };
}
