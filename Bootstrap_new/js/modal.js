// 모달창 열기
function modalOpen(modalBox, overlay) {
    modalBox.fadeIn(300);
    overlay.fadeIn(300);
    $('body').css('overflow', 'hidden');
}

// 모달창 닫기
function modalClose(modalBox, overlay) {
    modalBox.fadeOut(300);
    overlay.fadeOut(300);
    $('body').css('overflow', 'auto');
}