document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const checkButton = document.getElementById("checkButton");
  const showMoreButton = document.getElementById("showMoreBtn");
  const redirectButton = document.getElementById("redirectBtn");

  if (!checkButton) {
    console.error("The check button is not found.");
    return;
  }

  let fetchedData = null;

  checkButton.addEventListener("click", function () {
    console.log("Button clicked");

    const url = document.getElementById("urlInput").value;
    if (!url) {
      console.log("No URL provided");
      return;
    }
    const apiUrl = `https://safelinkbp.bieda.it/check_safety?url=$${encodeURIComponent(
      url
    )}`;
    console.log("Sending request to:", apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        fetchedData = data;
        console.log("Received response:", data);

        const responseElement = document.getElementById("response");

        responseElement.innerHTML = "";

        if (data.safe === true) {
          responseElement.style.backgroundColor = "#d4edda";
          redirectButton.classList.remove("hidden");
        } else if (data.safe === false) {
          responseElement.style.backgroundColor = "#f8d7da";
        } else {
          responseElement.style.backgroundColor = "";
        }

        const omittedElements = [
          "link",
          "headers",
          "referrer-policy",
          "set-cookie",
        ];

        function displayData(data, parentElement) {
          Object.keys(data).forEach((key) => {
            if (omittedElements.includes(key)) return;
            const value = data[key];

            const itemElement = document.createElement("div");

            if (key === "error") {
              itemElement.style.backgroundColor = "#f8d7da";
              itemElement.style.color = "#721c24";
              itemElement.style.fontWeight = 700;
              itemElement.style.padding = "4px";
              itemElement.style.borderRadius = "4px";
            }

            if (typeof value === "object" && value !== null) {
              const nestedTitle = document.createElement("strong");
              nestedTitle.innerText = `${key}:`;
              itemElement.appendChild(nestedTitle);
              displayData(value, itemElement);
            } else {
              let displayValue;
              if (value === true) {
                displayValue = "✔";
              } else if (value === false) {
                displayValue = "✗";
              } else if (value === null) {
                displayValue = "no data";
              } else {
                displayValue = value;
              }

              itemElement.innerText = `${key}: ${displayValue}`;
            }

            parentElement.appendChild(itemElement);
            const showMoreBtn = document.getElementById("showMoreBtn");
            showMoreBtn.classList.remove("hidden");
          });
        }

        displayData(data, responseElement);

        document.getElementById("response_plus").innerText = JSON.stringify(
          data,
          null,
          2
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  showMoreButton.addEventListener("click", function () {
    const responseElement = document.getElementById("response");
    const responsePlusElement = document.getElementById("response_plus");

    if (responseElement) {
      responseElement.classList.toggle("hidden");
    }

    if (responsePlusElement) {
      responsePlusElement.classList.toggle("hidden");
    }
  });

  redirectButton.addEventListener("click", function () {
    if (fetchedData && fetchedData.safe === true) {
      const url = document.getElementById("urlInput").value;
      if (url) {
        console.log(`Redirecting to ${url} because data.safe is true`);
        window.open(url, "_blank"); // Open URL in a new tab
      }
    } else {
      console.log("Cannot redirect, data.safe is not true.");
    }
  });
});
