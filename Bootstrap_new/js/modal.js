const fadeDuration = 300; // or fadeTime, animationDuration

// 모달창 열기
function modalOpen(modalBox, overlay) {
    modalBox.fadeIn(fadeDuration);
    overlay.fadeIn(fadeDuration);
    modalBox.find('.bs-modal__content').scrollTop(0);
    $('body').css('overflow', 'hidden');
}

// 모달창 닫기
function modalClose(modalBox, overlay) {
    modalBox.fadeOut(fadeDuration);
    overlay.fadeOut(fadeDuration);
    modalBox.fadeOut(fadeDuration, function () {
        modalBox.find('.bs-modal__content').scrollTop(0);
    });
    $('body').css('overflow', 'auto');
}