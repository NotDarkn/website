document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        document.getElementById('finish').disabled = !Array.from(document.querySelectorAll('input[type="checkbox"]')).every(checkbox => checkbox.checked);
    });
});

document.getElementById('finish').addEventListener('click', function() {
    document.getElementById('checkboxes').style.display = 'none';
    document.getElementById('icraze').style.display = 'block';
});