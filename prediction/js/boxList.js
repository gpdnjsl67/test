$(document).ready(function() {
    $('.bs-box-list__title-arrow').click(function() {
        // 토글: bs-list가 열려 있으면 슬라이드 업, 닫혀 있으면 슬라이드 다운
        $(this).closest('.bs-box-list__title').next('.bs-box-list__items').slideToggle(300);

        // bs-list가 보이는지 여부에 따라 bs-list-box-title-arrow에 'active' 클래스를 토글
        $(this).toggleClass('active');
    });

    // 체크 상태에 따라 클래스 토글하는 함수
    function toggleCheckedClass(item) {
        const checkbox = item.find('.bs-selector__checkbox');
        if (checkbox.prop('checked')) {
            item.addClass('bs-box-list__item--checked');
        } else {
            item.removeClass('bs-box-list__item--checked');
        }
    }

    // 초기 로드 시 체크 상태에 따른 클래스 설정
    $('.bs-box-list .bs-box-list__item').each(function() {
        toggleCheckedClass($(this));
    });

    // 클릭 이벤트 처리
    $('.bs-box-list').on('click', '.bs-box-list__item', function() {
        const checkbox = $(this).find('.bs-selector__checkbox');
        
        // 체크박스 상태 토글 후 클래스 업데이트
        checkbox.prop('checked', !checkbox.prop('checked'));
        toggleCheckedClass($(this));
    });
});
