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
        mainContent.style.display = 'block';  // Show the main content immediately
        loadingScreen.classList.add('hide-loading'); // Let CSS animation handle the transition
        return;
    }

    // Function to show main content after a delay of 3.3 seconds
    function showContentAfterDelay() {
        setTimeout(function() {
            mainContent.style.display = 'block';  // Show the main content
            loadingScreen.classList.add('hide-loading'); // Trigger CSS animation to move the loading screen away
            // No forced hiding of loading screen, let the CSS `hide-loading` class animate it away
        }, 3300); // Display loading screen for 3.3 seconds
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
