// Toggle on click event for all bs-toggle-btn__image elements
document.querySelectorAll('.bs-toggle-btn__image').forEach((btn) => {
    btn.addEventListener('click', function() {
        const toggleBtnImg = btn.querySelector('img');
        if (toggleBtnImg.src.includes('on')) {
            if (confirm('비활성화 하시겠습니까?')) {
                toggleBtnImg.src = toggleBtnImg.src.replace('on', 'off');
            }
        } else if (toggleBtnImg.src.includes('off')) {
            if (confirm('활성화 하시겠습니까?')) {
                toggleBtnImg.src = toggleBtnImg.src.replace('off', 'on');
            }
        }
    });
});