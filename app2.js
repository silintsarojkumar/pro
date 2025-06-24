const chInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
let userMes;
const API_KEY = "sk-proj-iM9Riu0lQ3dTZSMT5AasT3BlbkFJ9zomwlBLBlsZQLbD9LjJ";

const createchatLi = (message , className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing"? `<p>${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span> <p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi

}
const generateResponce = ()=>{
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA95porxx85ql6ctvE8HkE3ZdGXlmVqTzQ`;
    const requestOptions = {
        method: "POST",
        headers:{
            "Content-type" : "application/json",
        },
        body:JSON.stringify({
           contents:[{parts:[{text:userMes}]}]
        })
    }

    fetch(API_URL, requestOptions).then(res =>res.json()).then(data=>{
        console.log(data);
    }).catch((error)=>{
        console.log(error);
    })
}
const handleChat = () =>{
    
    userMes = chInput.value.trim();
    if(!userMes)return;

    chatbox.appendChild(createchatLi(userMes,"outgoing"));
    setTimeout(()=>{
        chatbox.appendChild(createchatLi("thinking....","incoming"));
        generateResponce();

    },600);

}
sendChatBtn.addEventListener("click",handleChat);
