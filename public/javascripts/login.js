function validate() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let error = document.getElementById('err');
 

    if (username == "") {
        error.textContent = "Please enter username";
        return false;
    }
    if (!((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(username))) {
        error.textContent = "please enter valid username address";
        return false;
    }
    if (password == "") {
        error.textContent = "please enter password";
        return false;
    }
    if (!(password.length >= 6)) {
        error.textContent = "password must be six characters long";
        return false;
    }
    return true;
}