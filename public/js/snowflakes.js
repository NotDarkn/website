// ChatGPT code
const numSnowflakes = 50; // Adjust the number of snowflakes as needed

for (let i = 0; i < numSnowflakes; i++) {
    createSnowflake();
}

function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    document.querySelector(".snowflakes").appendChild(snowflake);
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 2}s`;
}