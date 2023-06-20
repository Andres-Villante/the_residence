const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const closeIcon = document.querySelector('.close-icon');

menuIcon.addEventListener('click', function () {
    sidebar.classList.add('active');
});

closeIcon.addEventListener('click', function () {
    sidebar.classList.remove('active');
});
