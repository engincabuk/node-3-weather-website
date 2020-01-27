

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = ""
messageTwo.textContent = ""


weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error
        messageTwo.textContent = "";
      } else {
        console.log(data.location);
        console.log(data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast
      }
    });
  });
});
