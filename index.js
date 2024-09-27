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