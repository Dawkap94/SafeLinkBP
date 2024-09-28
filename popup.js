document.getElementById("check_button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: checkPageSafety,
    });
  });
});

function checkPageSafety() {
  const url = window.location.href;
  console.log("Checking safety for:", url);

  fetch(`http://localhost:5000/check_safety?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.safe) {
        alert("This site is safe!");
      } else {
        alert("Warning! This site may not be safe.");
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
