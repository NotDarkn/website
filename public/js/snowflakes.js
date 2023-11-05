// source: https://community.codenewbie.org/alvaro_montoro/creating-a-snowfall-effect-with-html-and-css-2p4
// changes, fixes, and edits made by hell0u/waveeeeee, thank you!!! <3

function createSnowflakes() {
    const numSnowflakes = 50;
    const maxSize = 0.2;
    const maxTranslate = 10;
    const container = document.getElementById('snowflake-container');

    // Function to generate a random number from min to max
    function randomBetween(min, max) {
        return (Math.random() * max) + min;
    }

    if (container) {
        for (let i = 0; i < numSnowflakes; i++) {
            let randomSize = randomBetween(5, 25) + "px";
            let randomLeft = randomBetween(0, window.innerWidth) + "px";
            let randomDuration = randomBetween(3, 10);

            // Create div and apply styles
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.width = randomSize;
            snowflake.style.height = randomSize;
            snowflake.style.left = randomLeft;
            snowflake.style.animationDuration = randomDuration + "s";
            snowflake.style.animationDelay = randomBetween(0, 5) + "s";

            container.appendChild(snowflake);
        }
    } else {
        console.error('The snowflake-container element was not found in the HTML.');
    }
}

createSnowflakes();