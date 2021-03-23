function validateData(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let c_password = document.getElementById('c_password').value;
    let address = document.getElementById('address').value;
    let qualification = document.getElementById('qualification').value;
    let department = document.getElementById('department').value;
    let error = document.getElementById('error');

    if(name == ""){
        error.textContent = "please enter name";
        return false;
    }else if(!(name.length >= 2)){
        error.textContent = "name length must be 2 or more";
        return false;
    }

    if(email == ""){
        error.textContent = "please enter email";
        return false;
    }else if(!((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){
        error.textContent = "please enter valid email";
        return false;
    }

    if(password == ""){
        error.textContent = "please enter password";
        return false;
    }else if(!(password.length >= 6)){
        error.textContent = "password minimum length is 6 characters";
        return false;
    }

    if(c_password == ""){
        error.textContent = "please enter c_password";
        return false;
    }else if(!(c_password.length >= 6)){
        error.textContent = "c_password minimum length is 6 characters";
        return false;
    }else if(password != c_password){
        error.textContent = "password and c_password must be same";
        return false;
    }

    if(address == ""){
        error.textContent = "please enter address";
        return false;
    }

    if(qualification == ""){
        error.textContent = "please enter qualification";
        return false;
    }

    if(department == ""){
        error.textContent = "please enter department";
        return false;
    }
    return true;
}
