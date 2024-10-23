$(document).ready(function() {
    $('.bs-tab').each(function() {
        var $tab = $(this);

        $tab.find('.bs-tab__link').click(function() {
            var tab_id = $(this).data('tab');

            // 해당 탭 그룹 내에서만 current 클래스를 제거
            $tab.find('.bs-tab__link').removeClass('bs-tab__link--current');
            $tab.find('.bs-tab__panel').removeClass('bs-tab__panel--current');

            // 클릭한 탭과 해당 패널에 current 클래스 추가
            $(this).addClass('bs-tab__link--current');
            $tab.find("#" + tab_id).addClass('bs-tab__panel--current'); // 수정된 부분
        });
    });
});