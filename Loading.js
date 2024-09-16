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










    // Function to check if images are already cached
    function areImagesCached() {
      return localStorage.getItem('imagesLoaded') === 'true';
  }

  // Function to mark images as loaded
  function setImagesAsLoaded() {
      localStorage.setItem('imagesLoaded', 'true');
  }

  // Function to remove the loading banner
  function removeLoadingBanner() {
      const banner = document.getElementById('loading-screen');
      banner.style.display = 'none';
  }



      const images = document.querySelectorAll('.image');
      let imagesLoaded = 0;

      // Check when each image is loaded
      images.forEach((image) => {
          if (image.complete) {
              imagesLoaded++;
          } else {
              image.addEventListener('load', () => {
                  imagesLoaded++;
                  if (imagesLoaded === images.length) {
                      setImagesAsLoaded();
                      removeLoadingBanner();
                  }
              });

              image.addEventListener('error', () => {
                  // Handle image load errors
                  console.error('Image failed to load.');
              });
          }
      });

      // If all images were already loaded
      if (imagesLoaded === images.length) {
          setImagesAsLoaded();
      }
  }

  // Call the function on page load
  window.addEventListener('DOMContentLoaded', handleImageLoading);
