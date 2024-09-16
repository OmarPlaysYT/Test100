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

    // Function to simulate a delayed banner removal after 5 seconds
    function delayedRemoveBanner() {
        setTimeout(() => {
            const banner = document.getElementById('loadingBanner');
            banner.style.display = 'none';
        }, 5000); // Wait for 5 seconds before hiding the banner
    }

    // Main function to handle image loading
    function handleImageLoading() {
        // If images are cached, still wait 5 seconds before removing the banner
        if (areImagesCached()) {
            delayedRemoveBanner();
            return;
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
                        delayedRemoveBanner(); // Delay removing banner even after loading
                    }
                });

                image.addEventListener('error', () => {
                    console.error('Image failed to load.');
                });
            }
        });

        // If all images were already loaded at page load
        if (imagesLoaded === images.length) {
            setImagesAsLoaded();
            delayedRemoveBanner(); // Always delay for 5 seconds
        }
    }

    // Call the function on page load
    window.addEventListener('DOMContentLoaded', handleImageLoading);


