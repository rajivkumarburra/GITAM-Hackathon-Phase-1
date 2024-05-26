
function toggleForm() {
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const formTitle = document.getElementById("form-title");
    
    if (signupForm.style.display === "none") {
        signupForm.style.display = "block";
        signinForm.style.display = "none";
        formTitle.innerText = "Sign Up";

    } 
    else {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
        formTitle.innerText = "Sign In";
    }
}
document.getElementById('btn').addEventListener('click', function () {
    window.location.href = '/home';
});