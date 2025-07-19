function validacao() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

//função login
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 


    firebase.auth().signInWithEmailAndPassword("email", "password")
        .then((userCredential) => {
            //login bem-sucedido
            const user = userCredential.user;

            //Armazena informações do usuário
            localStorage.setItem('userLoggedIn', 'trun');
            localStorage.setItem('userEmail', user.email);

            //Redirencionar para home
            window.location.href = "index.html";
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao fazer login:" + errorMessage);
    });
}
//
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("login-button").addEventListener("click", loginUser);
});