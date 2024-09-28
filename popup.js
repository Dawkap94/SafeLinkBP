document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and parsed");

  const checkButton = document.getElementById('checkButton');
  if (!checkButton) {
    console.error('The check button is not found.');
    return;
  }

  checkButton.addEventListener('click', function() {
    console.log("Button clicked");
    const url = document.getElementById('urlInput').value;
    if (!url) {
      console.log("No URL provided");
      return;
    }
    const apiUrl = `http://127.0.0.1:5000/check_safety?url=$${encodeURIComponent(url)}`;
    console.log("Sending request to:", apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Received response:", data);
        document.getElementById('response').innerText = JSON.stringify(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
