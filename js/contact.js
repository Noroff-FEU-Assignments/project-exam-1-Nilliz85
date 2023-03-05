/*-------------------- Contact Form --------------------*/

/*---------- Get Element ----------*/
const form = document.getElementById("contactform");

/*--- Event Listener (will also prevent form from submitting) ---*/
form.addEventListener("submit", function (event) {
  event.preventDefault();

  /*---------- Get Input Values ----------*/
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  /*---------- Validate Input Values ----------*/
  let isValid = true;

  /*--- Name ---*/
  const nameError = document.getElementById("nameError");
  if (name.length < 5) {
    nameError.textContent = "Name must be at least 5 characters long";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  /*--- Email ---*/
  const emailError = document.getElementById("emailError");
  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  /*--- Email Validation Function ---*/
  function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  /*--- Subject ---*/
  const subjectError = document.getElementById("subjectError");
  if (subject.length < 15) {
    subjectError.textContent = "Subject must be at least 15 characters long";
    isValid = false;
  } else {
    subjectError.textContent = "";
  }

  /*--- Message ---*/
  const messageError = document.getElementById("messageError");
  if (message.length < 25) {
    messageError.textContent = "Message must be at least 25 characters long";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  /*--- Submits Form If Valid ---*/
  if (isValid) {
    form.submit();
  }
});
