//DOM Related Variables

const inputEl = document.getElementById("link-input");
const convertBtn = document.createElement("button");
const qrContainer = document.querySelector(".qr__container.hidden");
const qrImgContainer = document.getElementById("img-container");
const qrImg = document.getElementById("qr-img"); 
const downloadBtn = document.getElementById("download-btn");
const printBtn = document.getElementById("print-btn");
const errorWrapper = document.getElementById("error-wrapper");
const errorContainer = document.querySelector(".error__container.hidden");
const errorEl = document.getElementById("error-msg");
const message = document.createElement("h1");

//==============================//

const storedLink = sessionStorage.getItem("storedLink");

function createQRCode(userInput) {
    //* Since the input has a minLength of 8, this (kind of) also prevents the user from writing an URL that doesn't start with "https://". Furtherly improving error handling.

    if (userInput === "" || userInput.length <= 8 || !userInput.toLowerCase().startsWith("https://")) { 
        const err = "You need to paste/write a valid link!";
        
        handleError(err);
    } 

    else {
        if (qrContainer.contains(message)) { qrContainer.removeChild(message); }

        const userLink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + userInput;
        
        sessionStorage.setItem("storedLink", userLink);

        qrImg.src = userLink;
        (qrContainer.classList).remove("hidden");
    }
}

async function downloadQRCode() {
    const qrImgURL = qrImg.src;

    try {
        const res = await fetch(qrImgURL);

        if (!res.ok) { handleError(res.statusText); }

        const blob = await res.blob();
        const createdURL = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = createdURL;
        link.download = "qr-code.png"; //The downloaded img will be named this
    
        link.click(); 
    }

    catch(err) { handleError(err.message); }
}

function printQRCode() {
    const printingArea = qrImgContainer.innerHTML;
    (document.body).innerHTML = printingArea;
    
    window.print();
    (window.location).reload(); //* On function exiting, the page will reload
}

async function handleError(err) {
    console.log(err);

    errorEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${err} <i <i class="fa-solid fa-triangle-exclamation"></i>`;
    (errorWrapper.classList).remove("hidden");
    
    setTimeout(() => { (errorWrapper.classList).add("hidden"); }, 3500);
}

inputEl.addEventListener( "change", (e => createQRCode(e.target.value)) );

inputEl.addEventListener("click", (e) => { e.target.value = ""; }); //Empties the bar to improve UX (by the user not having to manually delete the link)

downloadBtn.addEventListener("click", downloadQRCode);

printBtn.addEventListener("click", printQRCode);

if (storedLink) { 
    inputEl.value = sessionStorage.getItem("storedLink"); 
    createQRCode(inputEl.value);
    
    inputEl.value = "";
    message.textContent = "Your previous QR Code:";

    (message.classList).add("message");
    qrContainer.insertAdjacentElement("afterbegin", message);
}