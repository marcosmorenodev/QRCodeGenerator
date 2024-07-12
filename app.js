//DOM Related Variables

const inputEl = document.getElementById("link-input");
const convertBtn = document.createElement("button");
const qrContainer = document.querySelector(".qr__container.hidden");
const qrImg = document.getElementById("qr-img"); 
const downloadBtn = document.getElementById("download-btn");
const errorContainer = document.querySelector(".error__container.hidden");
const errorEl = document.getElementById("error-msg");

//==============================

function createQRCode(userInput) {
    console.log(userInput)
    //Since the input has a minLength of 8, this (kind of) prevents the user from writing an URL that doesn't start with "https://"

    if (userInput === "" || userInput.length <= 8 || !userInput.toLowerCase().startsWith("https://")) { 
        const err = "You need to paste a link or paste a longer one!";
        
        handleError(err);
    } 

    else {
        const userLink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + userInput;
        
        inputEl.value = "";
        qrImg.src = userLink;
        qrContainer.classList.remove("hidden");
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
        link.download = "qr-code.png";
    
        link.click(); 
    }

    catch(err) { handleError(err.message); }
}

async function handleError(err) {
    errorEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${err} <i <i class="fa-solid fa-triangle-exclamation"></i>`;
    errorContainer.classList.remove("hidden");
    
    setTimeout(() => { errorContainer.classList.add("hidden"); }, 4000);
    console.log(err);
}

inputEl.addEventListener( "change", (e => createQRCode(e.target.value)) );

inputEl.addEventListener("click", (e) => { e.target.value = ""; }); //Empties the bar to improve UX (by the user not having to manually delete the link)

downloadBtn.addEventListener("click", downloadQRCode);