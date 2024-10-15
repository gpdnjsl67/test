// $(document).ready(function() {
    $('.aside-menu__sub-menu-link').click(function(e) {
        e.preventDefault(); // 링크 기본 동작 방지

        // 서브 메뉴 토글
        $(this).find('.gnb-sub-menu-list').stop(true, true).slideToggle(300);

        // active 클래스 토글
        $(this).toggleClass('active');
    });

    // 호버 시에도 작동하게 하려면 아래 코드 사용
    $('.aside-menu__item--dropdown').hover(function() {
        $(this).find('.aside-menu__sub-menu-list').stop(true, true).slideDown(300);
        $(this).addClass('active');
    }, function() {
        $(this).find('.aside-menu__sub-menu-list').stop(true, true).slideUp(300);
        $(this).removeClass('active');
    });
    
// });