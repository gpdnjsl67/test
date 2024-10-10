// $(document).ready(function() {
    $('.gnb-item-dropdown .gnb-link').click(function(e) {
        e.preventDefault(); // 링크 기본 동작 방지

        // 서브 메뉴 토글
        $(this).find('.gnb-sub-menu-list').stop(true, true).slideToggle('fast');
        // $(this).find('.gnb-sub-menu-list').show();

        // active 클래스 토글
        $(this).toggleClass('active');
        console.log('test');
    });

    // 호버 시에도 작동하게 하려면 아래 코드 사용
    /*
    $('.gnb-item-dropdown').hover(function() {
        $(this).find('.gnb-sub-menu-list').stop(true, true).slideDown('fast');
        $(this).addClass('active');
    }, function() {
        $(this).find('.gnb-sub-menu-list').stop(true, true).slideUp('fast');
        $(this).removeClass('active');
    });
    */
// });