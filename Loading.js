window.addEventListener("load", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
  
    // Display loading screen for 1-2 seconds
    setTimeout(function() {
      loadingScreen.classList.add('hide-loading'); // Add the class to animate
      mainContent.style.display = 'block'; // Show the main content
  
      // Remove the loading screen after animation is done
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 1000); // Match this time with the CSS animation duration (1s)
    }, 3300); // Show the loading screen for 1.5 seconds
  });





