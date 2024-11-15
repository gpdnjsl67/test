$('.aside-menu__item--dropdown').on('click', function(e) {
    e.stopPropagation(); // 다른 클릭 이벤트 방지
    $(this).toggleClass('aside-menu__item--current');
    $(this).find('.aside-menu__sub-menu-list').stop(true, true).slideToggle(300);
}).on('mouseleave', function() {
    if (!$(this).hasClass('aside-menu__item--current')) {
        $(this).find('.aside-menu__sub-menu-list').stop(true, true).slideUp(300);
    }
});