
export function validation() {
    // @ts-ignore
    let a = document.getElementById('mdp').value;
    // @ts-ignore
    let b = document.getElementById('pwd').value;
    if (a != b) {
        console.log('mot de passe incorrect')
        return false
    } else {
        console.log('validation est correcte');
        // @ts-ignore
        document.f.submit();
    }
}
export function validate() {
  let msg;
  // @ts-ignore
  let str = document.getElementById("mdp").value;
  if (str.match(/[0-9]/g) && str.match(/[A-Z]/g) && str.match(/[a-z]/g) && str.match(/[^a-zA-Z\d]/g) && str.length >= 10) 
    msg = "<p style='color:green'>Mot de passe fort.</p>";
  else 
    msg = "<p style='color:red'>Mot de passe faible.</p>";
  
  // @ts-ignore
  document.getElementById("msg").innerHTML = msg;
}

/*
// 👇 pass the form into the function as a parameter
function checkPassword(form) {
  // 👇 get passwords from the field using their name attribute
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  // 👇 check if both match using if-else condition
  if (password != confirmPassword) {
    alert("Error! Password did not match.");
    return false;
  } else {
    alert("Password Match. Congratulations!");
    return true;
  }
}

 */