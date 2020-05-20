window.addEventListener('DOMContentLoaded', function () {
    $('.menuBtn').on('click', menuIn);
    function menuIn() {
        $(this).toggleClass('active');
    }
});