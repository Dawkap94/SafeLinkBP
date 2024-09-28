document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const checkButton = document.getElementById("checkButton");
  if (!checkButton) {
    console.error("The check button is not found.");
    return;
  }

  checkButton.addEventListener("click", function () {
    console.log("Button clicked");
    const url = document.getElementById("urlInput").value;
    if (!url) {
      console.log("No URL provided");
      return;
    }
    const apiUrl = `http://127.0.0.1:5000/check_safety?url=$${encodeURIComponent(
      url
    )}`;
    console.log("Sending request to:", apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received response:", data);

        const responseElement = document.getElementById("response");

        // Clear previous content
        responseElement.innerHTML = "";

        if (data.safe === true) {
          responseElement.style.backgroundColor = "#d4edda"; // light green
        } else if (data.safe === false) {
          responseElement.style.backgroundColor = "#f8d7da"; // light red
        } else {
          responseElement.style.backgroundColor = ""; // Reset background color if safe is not defined
        }

        const omittedElements = [
          "link",
          "headers",
          "referrer-policy",
          "set-cookie",
        ];

        // Recursive function to display nested values
        function displayData(data, parentElement) {
          Object.keys(data).forEach((key) => {
            if (omittedElements.includes(key)) return;
            const value = data[key];

            // Create a new paragraph or div element for each key-value pair
            const itemElement = document.createElement("div");

            if (typeof value === "object" && value !== null) {
              // If the value is an object or array, display the key and recurse
              const nestedTitle = document.createElement("strong");
              nestedTitle.innerText = `${key}:`;
              itemElement.appendChild(nestedTitle);

              // Recursively display nested values
              displayData(value, itemElement);
            } else {
              // If the value is a primitive type, check if it's true or false
              let displayValue;
              if (value === true) {
                displayValue = "✔"; // Display checkmark for true
              } else if (value === false) {
                displayValue = "✗"; // Display cross for false
              } else {
                displayValue = value; // Display the value as is
              }

              // Set the text to key: value (with symbols for true/false)
              itemElement.innerText = `${key}: ${displayValue}`;
            }

            // Append the created element to the parent
            parentElement.appendChild(itemElement);
          });
        }

        // Start displaying data
        displayData(data, responseElement);

        if (data.safe) {
        }

        // document.getElementById("response").innerText = JSON.stringify(
        //   data,
        //   null,
        //   2
        // );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
