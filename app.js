const faders = document.querySelectorAll('.fade-in');
const sectiontitle = document.querySelectorAll('.section-title');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px" // Adjust this value to control when the fade-in effect starts
};

const appearOnScroll = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('appear');
        } else {
            entry.target.classList.remove('appear');
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

//click hamburger menu to show nav
const hamburger = document.querySelector('.hamburgermenu');
const navLinks = document.querySelector('.menusmall');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});