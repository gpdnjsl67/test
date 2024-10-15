$(document).ready(function() {
    $('.bs-box-list__title-arrow').click(function() {
        // 토글: bs-list가 열려 있으면 슬라이드 업, 닫혀 있으면 슬라이드 다운
        $(this).closest('.bs-box-list__title').next('.bs-box-list__items').slideToggle(300);

        // bs-list가 보이는지 여부에 따라 bs-list-box-title-arrow에 'active' 클래스를 토글
        $(this).toggleClass('active');
    });
});