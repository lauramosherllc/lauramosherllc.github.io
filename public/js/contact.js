function handleFormSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var data = new FormData(event.target);
  var formData = Object.fromEntries(data.entries());
  fetch(form.action, {
    method: form.method,
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  .then((response) => {
    if (response.ok) {
      contactAlert("ok", "Thanks for your submission!");
      form.reset();
    } else {
      response.json().then((data) => {
        var errMessage = data.errors;
        for (var i = 0; i < errMessage.length; i++) {
          contactAlert("info", errMessage[i].message);
        }
      });
    }
  })
  .catch((error) => {
    contactAlert("error", "Oops! There was a problem submitting your form");
  });
}

function contactAlert(type, message) {
  var contactFormStatus = document.querySelector('#contact-form + .contact-form-status');
  var alert = `
      <svg><use href="#alert-${type}" /></svg>
      <div>${message}</div>
  `;
  const alertNode = document.createElement("div");
  alertNode.classList.add("alert");
  alertNode.classList.add(`alert-${type}`);
  alertNode.innerHTML = alert;
  contactFormStatus.appendChild(alertNode);

  // Display message for 2 seconds
  setTimeout( () => {
    // Fade out (see styles)
    alertNode.style.opacity = '0';
    // and then remove
    setTimeout( () => alertNode.remove(), 1000);
  }, 2000);
}
