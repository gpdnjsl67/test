document.addEventListener("DOMContentLoaded", function () {
    // 테이블 내 행 이벤트
    function toggleRowState(row, targetClass, action = "toggle") {
        while (row && row.classList.contains(targetClass)) {
            if (action === "toggle") {
                row.classList.toggle("bs-table__row--active");
            } else if (action === "add") {
                row.classList.add("bs-table__row--active");
            } else if (action === "remove") {
                row.classList.remove("bs-table__row--active");
            }
            row = row.nextElementSibling;
        }
    }

    // 메인 행 클릭 이벤트 핸들러
    function handleMainRowClick(mainRow) {
        let nextRow = mainRow.nextElementSibling;
        let subRowOpen = false;

        // 하위 sub 행 활성 상태 확인
        while (nextRow && nextRow.classList.contains("bs-table__row--sub")) {
            if (nextRow.classList.contains("bs-table__row--active")) {
                subRowOpen = true;
            }
            nextRow = nextRow.nextElementSibling;
        }

        // 하위 sub 및 sub-sub 행 상태 업데이트
        nextRow = mainRow.nextElementSibling;
        while (nextRow) {
            if (nextRow.classList.contains("bs-table__row--sub")) {
                nextRow.classList[subRowOpen ? "remove" : "add"]("bs-table__row--active");
            }
            if (nextRow.classList.contains("bs-table__row--sub-sub")) {
                nextRow.classList.remove("bs-table__row--active");
            }
            nextRow = nextRow.nextElementSibling;
        }
    }

    // sub 행 클릭 이벤트 핸들러
    function handleSubRowClick(subRow) {
        // sub-sub 행 상태 토글
        toggleRowState(subRow.nextElementSibling, "bs-table__row--sub-sub");
    }

    // 이벤트 위임을 통한 성능 최적화
    document.querySelector("#advertise__table").addEventListener("click", function (event) {
        const targetRow = event.target.closest(".bs-table__row--main, .bs-table__row--sub");

        // 클릭한 대상이 체크박스 또는 토글 버튼이면 종료
        if (event.target.closest(".bs-selector__checkbox, .bs-toggle-btn__image")) {
            event.stopPropagation();
            return;
        }

        if (targetRow?.classList.contains("bs-table__row--main")) {
            handleMainRowClick(targetRow);
        } else if (targetRow?.classList.contains("bs-table__row--sub")) {
            handleSubRowClick(targetRow);
        }
    });

    // =========== 공통 함수: 클래스를 토글하는 함수 =========== //
    function toggleAdvItem(buttonSelector, itemSelector, offClass, onMessage, offMessage) {
        document.querySelector(buttonSelector).addEventListener('click', function() {
            const advItem = document.querySelector(itemSelector);

            // 현재 offClass가 있는지 확인
            const isOff = advItem.classList.contains(offClass);

            // 클래스 상태에 따라 다른 confirm 메시지 표시
            const message = isOff ? onMessage : offMessage;

            // confirm 메시지 띄우기
            if (confirm(message)) {
                // confirm에 '확인' 선택 시 offClass를 토글
                advItem.classList.toggle(offClass);
            }
        });
    }

    // 광고 종료 버튼 클릭에 따라 활성화/비활성화
    toggleAdvItem('.adv__toggle-btn', '.adv__item', 'adv__item--off', '광고를 활성화 하시겠습니까?', '광고를 비활성화 하시겠습니까?');

    // 광고 스케줄 종료 버튼 클릭에 따라 활성화/비활성화
    toggleAdvItem('.adv-schedule__toggle-btn', '.adv-schedule', 'adv-schedule--off', '활성화 하시겠습니까?', '비활성화 하시겠습니까?');

    // =========== 오늘 날짜 출력 =========== //
    const todayDateInput = document.getElementById("todayDate");
    const todayDate = new Date(); // 오늘 날짜 가져오기
    const year = todayDate.getFullYear(); // 연도
    const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
    const day = String(todayDate.getDate()).padStart(2, "0"); // 일

    const formattedDate = `${year}.${month}.${day}`; // YYYY.MM.DD 형식

    todayDateInput.textContent = formattedDate;
});


// Helper function to toggle cell selection state
function toggleCellState(cell, state) {
    cell.classList.toggle('adv-schedule__table__cell--clicked', state);
}

// Helper function to check if all cells in a collection are selected
function areAllCellsSelected(cells) {
    return Array.from(cells).every(cell => cell.classList.contains('adv-schedule__table__cell--clicked'));
}

// Helper function to handle selection toggle for a group of cells
function toggleCellsSelection(cells, state) {
    cells.forEach(cell => toggleCellState(cell, state));
}

// 셀 클릭 및 드래그 선택 이벤트
let isDragging = false;

document.querySelectorAll('.adv-schedule__table__cell:not(.adv-schedule__table__head)').forEach(cell => {
    // 클릭 시 셀 상태 토글
    cell.addEventListener('mousedown', (event) => {
        isDragging = true;
        const toggleState = !cell.classList.contains('adv-schedule__table__cell--clicked');
        toggleCellState(cell, toggleState);
        event.preventDefault(); // 기본 텍스트 선택 방지
    });

    // 마우스를 올릴 때 드래그 상태라면 셀 상태 토글
    cell.addEventListener('mouseover', () => {
        if (isDragging) {
            const toggleState = !cell.classList.contains('adv-schedule__table__cell--clicked');
            toggleCellState(cell, toggleState);
        }
    });
});

// 드래그 해제 시 상태 초기화
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 각 행의 헤더 클릭 이벤트 - 전체 선택/해제
document.querySelectorAll('#adv-schedule__week .adv-schedule__table__row .adv-schedule__table__head').forEach(header => {
    header.addEventListener('click', () => {
        const rowCells = header.parentElement.querySelectorAll('.adv-schedule__table__cell:not(.adv-schedule__table__head)');
        const allSelected = areAllCellsSelected(rowCells);
        toggleCellsSelection(rowCells, !allSelected);
    });
});

// 전체 선택/해제 버튼 클릭 이벤트
document.querySelector('.adv-schedule__table--all-check').addEventListener('click', () => {
    const allCells = document.querySelectorAll('.adv-schedule__table__cell:not(.adv-schedule__table__head)');
    const allSelected = areAllCellsSelected(allCells);
    toggleCellsSelection(allCells, !allSelected);
});

// 숫자 헤더 셀 클릭 이벤트 - 해당 열의 셀 전체 선택/해제
document.querySelectorAll('.adv-schedule__table__header .adv-schedule__table__cell').forEach((headerCell, columnIndex) => {
    headerCell.addEventListener('click', () => {
        const columnCells = document.querySelectorAll(`#adv-schedule__week .adv-schedule__table__row .adv-schedule__table__cell:nth-child(${columnIndex + 1})`);
        const columnCellsFiltered = Array.from(columnCells).filter(cell => !cell.classList.contains('adv-schedule__table__head'));
        
        const allSelected = areAllCellsSelected(columnCellsFiltered);
        toggleCellsSelection(columnCellsFiltered, !allSelected);
    });
});