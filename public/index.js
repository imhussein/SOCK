const socket = io("http://localhost:5000");

console.log(socket);

socket.on("connect", () => {});

socket.emit("message", {
  data: { message: "This message comes from client" }
});

socket.on("welMessage", data => {
  console.log(data.data.message);
});

document.querySelectorAll("form")[0].addEventListener("submit", function(e) {
  e.preventDefault();
  socket.emit("valueAdded", e.target[0].value);
});

socket.on("valueAdded", data => {
  console.log(data);
  addToDOM(data);
});

function addToDOM(value) {
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = value;
  document.querySelectorAll("ul")[0].appendChild(li);
}
