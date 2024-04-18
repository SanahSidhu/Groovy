// Lazy loading images script
document.addEventListener('DOMContentLoaded', function() {

    var lazyloadImages = document.querySelectorAll("img.lazyload");    

    var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                
                var image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove("lazyload");
                imageObserver.unobserve(image);
            }
        });
    });

    lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
    });
});