//hamburger menu on click add class active
document.querySelector('.hamburgermenu').addEventListener('click', function() {
  document.querySelector('.hamburgermenu').classList.toggle('active');
  document.querySelector('.menusmall').classList.toggle('active');
});