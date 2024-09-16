// Function to check if images are already cached
function areImagesCached() {
    return localStorage.getItem('imagesLoaded') === 'true';
}

// Function to mark images as loaded in localStorage
function setImagesAsLoaded() {
    localStorage.setItem('imagesLoaded', 'true');
}

// Main function to handle image loading and the loading screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    // If images are already cached, skip the loading screen
    if (areImagesCached()) {
        loadingScreen.style.display = 'none'; // Immediately hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
        return;
    }

    // Function to hide the loading screen after 3.3 seconds
    function hideLoadingScreen() {
        setTimeout(function() {
            loadingScreen.classList.add('hide-loading'); // Add class for animation
            mainContent.style.display = 'block'; // Show the main content

            // Remove the loading screen after the CSS animation finishes (1 second)
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 3300); // Match this with the CSS animation duration (1s)
        }, 3300); // Display loading screen for 3.3 seconds
    }

    // Check when each image is loaded
    images.forEach((image) => {
        if (image.complete) {
            imagesLoaded++;
        } else {
            image.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    setImagesAsLoaded(); // Mark images as loaded
                    hideLoadingScreen();  // Hide loading screen after 3.3 seconds
                }
            });

            image.addEventListener('error', () => {
                console.error('Image failed to load.');
            });
        }
    });

    // If all images were already loaded at page load, hide the loading screen
    if (imagesLoaded === images.length) {
        setImagesAsLoaded();
        hideLoadingScreen();
    }
}

// Call the function when the window is fully loaded
window.addEventListener("load", handleLoadingScreen);
