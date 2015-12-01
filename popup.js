document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_btn');
    link.addEventListener('click', function() {
        document.getElementById('newData').innerHTML = 'html data';

    });
});