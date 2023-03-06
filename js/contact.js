const form = document.querySelector("#contact-form");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const fullName = document.querySelector("#full-name");
const fullNameError = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");


function validateForm() {

    

    if(fullName.value.trim().length > 0) {
        fullNameError.style.display = "none";
    }
    else {
        fullNameError.style.display = "block";
        event.preventDefault();
    }

    if(subject.value.trim().length > 10) {
        subjectError.style.display = "none";
    }
    else {
        subjectError.style.display = "block";
        event.preventDefault();
    }

    if(message.value.trim().length > 0) {
        messageError.style.display = "none";
    }
    else {
        messageError.style.display = "block";
        event.preventDefault();
    }

    if(validateEmail(email.value)) {
        emailError.style.display = "none";
    }
    else {
        emailError.style.display = "block";
        event.preventDefault();
    }
 

}


form.addEventListener("submit", validateForm)


function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}