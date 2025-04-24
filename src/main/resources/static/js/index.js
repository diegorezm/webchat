const usernameModal = document.getElementById("username-modal");
const usernameInput = document.getElementById("username-input");
const usernameSubmit = document.getElementById("username-submit");
const chatContainer = document.querySelector(".container");
const usernamePlaceholder = document.getElementById("username");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainerElement = document.getElementById("message-container");
const onlineStatus = document.getElementById("online-status");
const charCount = document.getElementById("char-count");

let username = localStorage.getItem("username");
let ws;

if (!username || username.trim() === "") {
  usernameModal.showModal();
} else {
  usernamePlaceholder.innerHTML = `- ${username}`;
  connectToWebsocket();
}

usernameSubmit.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (username !== "") {
    localStorage.setItem("username", username);
    usernameModal.style.display = "none";
    chatContainer.style.display = "flex";
    usernamePlaceholder.innerHTML = `- ${username}`;
    connectToWebsocket();
  } else {
    alert("Please enter a valid username.");
  }
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    const chatMessageDTO = {
      author: username,
      content: message,
    };
    ws.send(JSON.stringify(chatMessageDTO));
    messageInput.value = "";
    charCount.textContent = "0/256";
  }
});

messageInput.addEventListener("input", () => {
  const text = messageInput.value;
  const count = text.length;
  charCount.textContent = `${count}/256`;

  if (count > 256) {
    messageInput.value = text.substring(0, 256);
    charCount.textContent = "256/256";
  }
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});

function connectToWebsocket() {
  ws = new WebSocket(`ws://localhost:8080/chat`);

  ws.onopen = () => {
    console.log("Connected to WebSocket");
    onlineStatus.textContent = "Online";
    onlineStatus.classList.remove("text-red-500");
    onlineStatus.classList.add("text-green-500");
  };

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    displayMessage(data.message);
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket");
    onlineStatus.textContent = "Offline";
    onlineStatus.classList.remove("text-green-500");
    onlineStatus.classList.add("text-red-500");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

function displayMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", "rounded-lg", "p-3", "max-w-[70%]", "h-fit", "overflow-x-auto");

  if (message.author === username) {
    messageDiv.classList.add("self-end", "bg-blue-500", "text-white");
    messageDiv.textContent = `${message.content}`;
  } else {
    messageDiv.classList.add("bg-gray-700", "text-gray-200", "self-start");
    messageDiv.textContent = `${message.author}: ${message.content}`;
  }

  messageContainerElement.appendChild(messageDiv);
  messageContainerElement.scrollTop = messageContainerElement.scrollHeight;
}
