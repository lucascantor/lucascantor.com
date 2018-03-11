document.getElementById('contactForm').addEventListener('submit', sendDataToLambda);

function sendDataToLambda(e) {
  e.preventDefault();

  var formEmail = document.querySelector('.form-email').value;
  var formSubject = "lucascantor.com contact from "+formEmail;
  var formMessage = document.querySelector('.form-message').value;

  var endpoint = 'https://zs5c80k81f.execute-api.us-east-1.amazonaws.com/prod/ContactFormLambda';

  var body = {
    email: formEmail,
    subject: formSubject,
    message: formMessage
  }

  var lambdaRequest = new Request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  fetch(lambdaRequest)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  // Confirm submitted and disable submit button
  document.getElementById('messageSubmit').value='Sent ✔';
  document.getElementById('messageSubmit').disabled = true;
}