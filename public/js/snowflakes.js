document.addEventListener('DOMContentLoaded', function() {
    // Number of snowflakes you want
    const numSnowflakes = 50;
  
    // Get the container element where the snowflakes will be added
    const container = document.getElementById('snowflake-container');
  
    if (container) {
      for (let i = 0; i < numSnowflakes; i++) {
        // Create a new div element
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake'; // Add the "snowflake" class
  
        // Append the snowflake to the container
        container.appendChild(snowflake);
      }
    } else {
      console.error('The snowflakes-container element was not found in the HTML.');
    }
  });