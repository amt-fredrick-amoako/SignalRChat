"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    var li = document.createElement("li");
    document.getElementById("messageList").appendChild(li);

    li.textContent = `${user} says ${message}`;
});

connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
}).catch(err => {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", event => {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch(err => {
        return console.error(err.toString());
    });

    event.preventDefault();
});