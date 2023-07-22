document.addEventListener("DOMContentLoaded", function () {
    const whatsappBtn = document.querySelector(".whatsapp-btn");
    whatsappBtn.classList.add("appeared");

    setTimeout(function () {
        const instagramBtn = document.querySelector(".instagram-btn");
        instagramBtn.style.display = "block";
        instagramBtn.classList.add("appeared");
    }, 2000); // 
});