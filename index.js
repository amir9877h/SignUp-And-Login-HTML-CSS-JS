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
    const loginPasswordInput = document.querySelector('#login-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordConfirmInput.type = 'text';
        loginPasswordInput.type = 'text';
        status = 'visibility';
    } else {
        passwordInput.type = 'password';
        passwordConfirmInput.type = 'password';
        loginPasswordInput.type = 'password'
        status = 'visibility_off';
    }

    visibilityPasswordBtn.forEach((btn) => {
        btn.innerHTML = status;
    });
};

visibilityPasswordBtn.forEach((btn) => {
    btn.addEventListener('click', visibilityPasswordCallback);
});


// ------------------------------- Validating

const nameChecker = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

const emailChecker = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

// const passwordChecker = (password) => {
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     return passwordRegex.test(password);
// };
const passwordChecker = (password) => {
    const errors = [];

    // Check length
    if (password.length < 8) {
        errors.push("Password should be at least 8 characters long");
    }

    // Check for lowercase
    if (!/[a-z]/.test(password)) {
        errors.push("Password should contain at least one lowercase letter");
    }

    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
        errors.push("Password should contain at least one uppercase letter");
    }

    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push("Password should contain at least one special character");
    }

    // Check for digit
    if (!/\d/.test(password)) {
        errors.push("Password should contain at least one digit");
    }

    // Check for newline character
    if (/[\n\r]/.test(password)) {
        errors.push("Password should not contain newline characters");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

const showPasswordErrors = () => {
    const passwordInput = document.querySelector('#password');
    const passwordConfirmInput = document.querySelector('#password-confirm');

    const passwordCheckerResult = passwordChecker(passwordInput.value);
    while (passwordConfirmInput.parentElement.nextSibling.tagName == 'SPAN') {
        passwordConfirmInput.parentElement.nextSibling.remove();
    }
    if (!passwordCheckerResult.isValid) {

        passwordInput.parentElement.classList.add('invalid');
        passwordCheckerResult.errors.forEach((error) => {
            const span = document.createElement('span');
            span.innerHTML = error;
            span.classList.add('invalid');
            passwordConfirmInput.parentNode.parentNode.insertBefore(span, passwordConfirmInput.parentElement.nextSibling)
        });

    } else {
        passwordInput.parentElement.classList.remove('invalid');
    }
    showPasswordConfirmErrors();
}

const showPasswordConfirmErrors = () => {
    const passwordInput = document.querySelector('#password');
    const passwordConfirmInput = document.querySelector('#password-confirm');

    if (passwordInput.value !== passwordConfirmInput.value) {
        if (passwordConfirmInput.parentElement.nextSibling.textContent != 'Password Conflict!') {
            passwordConfirmInput.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Password Conflict!';
            span.classList.add('invalid');
            passwordConfirmInput.parentNode.parentNode.insertBefore(span, passwordConfirmInput.parentElement.nextSibling)
        }
    } else if (passwordConfirmInput.parentElement.nextSibling.textContent == 'Password Conflict!' || passwordConfirmInput.parentElement.classList.contains('invalid')) {
        passwordConfirmInput.parentElement.nextSibling.remove();
        passwordConfirmInput.parentElement.classList.remove('invalid');
    }
}

const signUpBtn = document.querySelector('#signup-btn');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const fullName = document.querySelector('#full-name');
    const email = document.querySelector('#email-address');
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#password-confirm');

    if (!nameChecker(fullName.value)) {
        if (fullName.parentElement.nextSibling.tagName != 'SPAN') {
            fullName.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Invalid name';
            span.classList.add('invalid');
            fullName.parentNode.parentNode.insertBefore(span, fullName.parentElement.nextSibling)
        }
    } else {
        fullName.parentElement.classList.remove('invalid');
        fullName.parentElement.nextSibling.remove();
    }

    if (!emailChecker(email.value)) {
        if (email.parentElement.nextSibling.tagName != 'SPAN') {
            email.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Invalid email';
            span.classList.add('invalid');
            email.parentNode.parentNode.insertBefore(span, email.parentElement.nextSibling)
        }
    } else {
        email.parentElement.classList.remove('invalid');
        email.parentElement.nextSibling.remove();
    }
    const passwordCheckerResult = passwordChecker(password.value);
    if (!passwordCheckerResult.isValid) {
        if (passwordConfirm.parentElement.nextSibling.tagName != 'SPAN') {
            password.parentElement.classList.add('invalid');
            passwordCheckerResult.errors.forEach((error) => {
                const span = document.createElement('span');
                span.innerHTML = error;
                span.classList.add('invalid');
                passwordConfirm.parentNode.parentNode.insertBefore(span, passwordConfirm.parentElement.nextSibling)
            });
        }
    }

    if (password.value !== passwordConfirm.value) {
        if (passwordConfirm.parentElement.nextSibling.tagName != 'SPAN' || passwordConfirm.parentElement.nextSibling.textContent != 'Password Conflict!') {
            passwordConfirm.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Password Conflict!';
            span.classList.add('invalid');
            passwordConfirm.parentNode.parentNode.insertBefore(span, passwordConfirm.parentElement.nextSibling)
        }
    } else if (passwordConfirm.parentElement.nextSibling.textContent == 'Password Conflict!') {
        passwordConfirm.parentElement.nextSibling.remove();
    }
});


const passwordInput = document.querySelector('#password');
const passwordConfirmInput = document.querySelector('#password-confirm');

passwordInput.addEventListener('input', showPasswordErrors);
passwordConfirmInput.addEventListener('input', showPasswordConfirmErrors);

// login Validate

const loginEmailInput = document.querySelector('#login-email');
const loginPasswordInput = document.querySelector('#login-password');
const loginBtn = document.querySelector('#signin-btn');

loginEmailInput.addEventListener('input', (e) => {
    if (!emailChecker(loginEmailInput.value)) {
        if (loginEmailInput.parentElement.nextSibling.tagName != 'SPAN') {
            loginEmailInput.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Invalid email';
            span.classList.add('invalid');
            loginEmailInput.parentNode.parentNode.insertBefore(span, loginEmailInput.parentElement.nextSibling)
        }
    } else {
        loginEmailInput.parentElement.classList.remove('invalid');
        loginEmailInput.parentElement.nextSibling.remove();
    }
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!emailChecker(loginEmailInput.value)) {
        if (loginEmailInput.parentElement.nextSibling.tagName != 'SPAN') {
            loginEmailInput.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Invalid email';
            span.classList.add('invalid');
            loginEmailInput.parentNode.parentNode.insertBefore(span, loginEmailInput.parentElement.nextSibling)
        }
    } else {
        loginEmailInput.parentElement.classList.remove('invalid');
        loginEmailInput.parentElement.nextSibling.remove();
    }
    if (loginPasswordInput.value != '123456') {
        if (loginPasswordInput.parentElement.nextSibling.tagName != 'SPAN') {
            loginPasswordInput.parentElement.classList.add('invalid');
            const span = document.createElement('span');
            span.innerHTML = 'Password is Incorrect!';
            span.classList.add('invalid');
            loginPasswordInput.parentNode.parentNode.insertBefore(span, loginPasswordInput.parentElement.nextSibling)
        }
    } else {
        loginPasswordInput.parentElement.classList.remove('invalid');
        loginPasswordInput.parentElement.nextSibling.remove();
    }
});