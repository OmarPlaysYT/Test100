// Utility function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Utility function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Function to check if images are already cached (via cookies)
function areImagesCached() {
    return getCookie('imagesLoaded') === 'true';
}

// Function to mark images as loaded in cookies
function setImagesAsLoaded() {
    setCookie('imagesLoaded', 'true', 7); // Set the cookie to expire in 7 days (adjust as needed)
}

// Main function to handle image loading and loading screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    // If images are cached (cookie is set), skip the loading screen logic
    if (areImagesCached()) {
        loadingScreen.classList.add('hide-loading'); // Let CSS animation handle the transition
        return;
    }

    // Function to show the loading screen for a set duration (3.3 seconds)
    function showLoadingScreen() {
        setTimeout(function() {
            loadingScreen.classList.add('hide-loading'); // Trigger CSS animation to move the loading screen away
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
                    setImagesAsLoaded();  // Mark images as loaded in cookies
                    showLoadingScreen();  // Trigger the animation after the delay
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
        showLoadingScreen();
    } else {
        showLoadingScreen();  // Start the countdown even if images are still loading
    }
}

// Call the function when the window is fully loaded
window.addEventListener("load", handleLoadingScreen);
