function studentData(){
    let name = document.getElementById('name').value;
    let  attendence = document.getElementById('attendence').value;

    let error = document.getElementById('err');
 
    if (name == "") {
        error.textContent = "Please enter name";
        return false;
    }
    if (attendence == "") {
        error.textContent = "please enter attendence";
        return false;
    }
    return true;
}