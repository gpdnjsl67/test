// 햄버거버튼 클릭 시 메뉴 효과
function menuEffect() {
    let leftMenu = document.querySelector('.flex-box-01');
    let menuBtn = document.querySelector('.menu-btn');
    let nav = document.querySelector('nav');

    menuBtn.addEventListener('click', function() {
        leftMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });
}
menuEffect();

// 좌측 하위메뉴 슬라이드
function subMenusToggle() {
    $('ul.sub-menus').slideUp();
    $('li.include-sub-menus a').on('click', function() {
        $('ul.sub-menus').slideToggle();
        $('.sub-menus-arrow').toggleClass('active');
    });
}
subMenusToggle();