
document.getElementById('genlink').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch('/generate-activation-link', {
    method: 'POST',
    body: formData
  })

    .then(response => response.json())
    .then(data => {
      console.log('activationlink', data)
      document.getElementById('tokenDisplay').innerHTML = `<a href="${data.userActivationLink}">Activation Link</a>`;

    })
    .catch(error => console.error('Error:', error));
});

function redirectactivation() {

  window.location.href = `${userActivationLink}`;

}
