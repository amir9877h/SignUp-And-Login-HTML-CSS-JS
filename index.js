let LOGIN_FLAG = false;

const signupContainer = document.querySelector('.container');
const loginContainer = document.querySelector('.login-container');

const changeMode = () => {
    // if (LOGIN_FLAG) {
    //     signupContainer.style.display = 'none';
    //     loginContainer.style.display = 'flex';
    // } else {
    //     signupContainer.style.display = 'flex';
    //     loginContainer.style.display = 'none';
    // }
    signupContainer.classList.toggle('active');
    loginContainer.classList.toggle('active');
}

changeMode();

const changeBtn = document.querySelectorAll('.change a');

changeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        LOGIN_FLAG = !LOGIN_FLAG;
        changeMode();
    });
});

const visibilityPasswordBtn = document.querySelectorAll('.right input + span');

const visibilityPasswordCallback = () => {
    let status;
    const passwordInput = document.querySelector('#password');
    const passwordConfirmInput = document.querySelector('#password-confirm');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordConfirmInput.type = 'text';
        status = 'visibility';
    } else {
        passwordInput.type = 'password';
        passwordConfirmInput.type = 'password';
        status = 'visibility_off';
    }

    visibilityPasswordBtn.forEach((btn) => {
        btn.innerHTML = status;
    });
};

visibilityPasswordBtn.forEach((btn) => {
    btn.addEventListener('click', visibilityPasswordCallback);
});