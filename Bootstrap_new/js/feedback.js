$(document).ready(function () {
    $(".feedback-comment__edit").on("click", function () {
        let commentRow = $(this).closest(".feedback-comment__row");
        
        commentRow.find(".feedback-comment__text__input")
            .addClass("feedback-comment__text__input--active")
            .prop("disabled", false); // disabled 해제

        commentRow.find(".feedback-comment__btns")
            .addClass("feedback-comment__btns--active");
    });

    $(".feedback-comment__save-btn, .feedback-comment__cancel-btn").on("click", function (e) {
        e.preventDefault(); // a 태그 기본 동작 방지
        let commentRow = $(this).closest(".feedback-comment__row");

        commentRow.find(".feedback-comment__text__input")
            .removeClass("feedback-comment__text__input--active")
            .prop("disabled", true); // 다시 disabled 설정

        commentRow.find(".feedback-comment__btns")
            .removeClass("feedback-comment__btns--active");
    });
});

function autoResize(textarea) {
    textarea.style.height = 'auto'; // 높이 초기화
    const computedStyle = window.getComputedStyle(textarea);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    
    // 실제 내용 높이 = scrollHeight - padding 값
    textarea.style.height = (textarea.scrollHeight - paddingTop - paddingBottom) + 'px';
}