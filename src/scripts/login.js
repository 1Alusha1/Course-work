let loginBack = document.querySelector('.login-back');
let form = document.querySelector('form')

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
if (loginBack.classList != 'hide') {
    timer = setInterval(() => {
        if (localStorage.getItem('user') == 'exit') {
            loginBack.classList.remove('hide');
        }
        // console.clear()
    }, 1000)

}
else if (loginBack.classList != 'hide') {
    clearInterval(timer)
}

function sigIn(data) {
    let inp = document.querySelectorAll('form input');



    for (let elem of data) {
        if (inp[1].value == elem['userPassword'] && inp[0].value == elem['userLogin']) {
            loginBack.classList.add('hide')
            localStorage.setItem('user', 'has entered')
            inp[1].value = '';
            inp[0].value = '';
        }
    }
}


