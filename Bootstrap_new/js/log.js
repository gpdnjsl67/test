$(function() {
    // 시작 날짜 선택기
    $('#log-start-date').datepicker({
        dateFormat: 'yy-mm-dd', // 날짜 형식
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 텍스트
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        changeYear: true, //option값 년 선택 가능
        changeMonth: true, //option값 월 선택 가능
        onSelect: function(selectedDate) {
            // 선택된 날짜로부터 1일 후부터 선택 가능하도록 설정
            var minDate = new Date(selectedDate);
            minDate.setDate(minDate.getDate());
            // 끝 날짜 선택기에 최소 날짜 설정
            $('#log-end-date').datepicker('option', 'minDate', minDate);
        },
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 0);
        }
    });

    // 끝 날짜 선택기
    $('#log-end-date').datepicker({
        dateFormat: 'yy-mm-dd', // 날짜 형식
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 텍스트
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        changeYear: true, //option값 년 선택 가능
        changeMonth: true, //option값 월 선택 가능
        onSelect: function(selectedDate) {
            // 선택된 날짜로부터 1일 전까지 선택 가능하도록 설정
            var maxDate = new Date(selectedDate);
            maxDate.setDate(maxDate.getDate());
            // 시작 날짜 선택기에 최대 날짜 설정
            $('#log-start-date').datepicker('option', 'maxDate', maxDate);
        },
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 0);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('#log-filter-list--1 .bs-selector__radio');
    const logTables = document.querySelectorAll('.log__table');
    const logFilterList1 = document.getElementById('log-filter-list--1');
    const logFilterList2 = document.getElementById('log-filter-list--2');
    const logFilterList3 = document.getElementById('log-filter-list--3');

    // 테이블 숨기기 및 표시 함수
    const updateLogTableVisibility = () => {
        logTables.forEach((table) => table.style.display = 'none'); // 모든 테이블 숨기기

        // 선택된 라디오 버튼 찾기
        const selectedRadio = Array.from(radioButtons).find(radio => radio.checked);
        if (selectedRadio) {
            // 라디오 버튼의 순서를 기반으로 해당 테이블 표시
            const index = Array.from(radioButtons).indexOf(selectedRadio) + 1; // 1부터 시작
            const targetTable = document.querySelector(`.log__table[data-table-value="${index}"]`);
            if (targetTable) {
                targetTable.style.display = 'block';
            }

            // log-filter-list--2, log-filter-list--3 가시성 제어 및 grid-column 조정
            if (index === 1) {
                logFilterList2.style.display = 'block';
                logFilterList3.style.display = 'block';
                logFilterList1.style.gridColumn = ''; // 원래 상태 유지
            } else {
                logFilterList2.style.display = 'none';
                logFilterList3.style.display = 'none';
                logFilterList1.style.gridColumn = '1 / 4'; // grid-column 확장
            }
        }
    };

    // 초기화: 처음 상태 업데이트
    updateLogTableVisibility();

    // 라디오 버튼 변경 시 업데이트
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', updateLogTableVisibility);
    });
});