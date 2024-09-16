// Function to check if images are already cached
function areImagesCached() {
    return localStorage.getItem('imagesLoaded') === 'true';
}

// Function to mark images as loaded in localStorage
function setImagesAsLoaded() {
    localStorage.setItem('imagesLoaded', 'true');
}

// Main function to handle image loading and loading screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    // If images are cached, skip the loading screen logic
    if (areImagesCached()) {
        loadingScreen.style.display = 'none'; // Hide the loading screen immediately
        mainContent.style.display = 'block';  // Show the main content immediately
        return;
    }

    // Function to show main content and wait for animation (after 3.3 seconds)
    function showContentAfterDelay() {
        setTimeout(function() {
            mainContent.style.display = 'block';  // Show the main content
            // The loading screen will not be hidden here; let your animation handle it
        }, 3300); // Wait for 3.3 seconds
    }

    // Check if all images are loaded
    images.forEach((image) => {
        if (image.complete) {
            imagesLoaded++;
        } else {
            image.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    setImagesAsLoaded();  // Mark images as loaded
                    showContentAfterDelay();  // Show content after the delay
                }
            });

            image.addEventListener('error', () => {
                console.error('Image failed to load.');
            });
        }
    });

    // If all images are already loaded at page load
    if (imagesLoaded === images.length) {
        setImagesAsLoaded();
        showContentAfterDelay();
    }
}

// Call the function when the window is fully loaded
window.addEventListener("load", handleLoadingScreen);
