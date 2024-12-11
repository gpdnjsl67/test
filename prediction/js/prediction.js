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
    document.querySelector("#prediction__table").addEventListener("click", function (event) {
        const targetRow = event.target.closest(".bs-table__row--main, .bs-table__row--sub");

        // 행 이벤트 제외 요소
        if (event.target.closest(".bs-selector__checkbox, .bs-toggle-btn__image, .campaign-name")) {
            event.stopPropagation();
            return;
        }

        if (targetRow?.classList.contains("bs-table__row--main")) {
            handleMainRowClick(targetRow);
        } else if (targetRow?.classList.contains("bs-table__row--sub")) {
            handleSubRowClick(targetRow);
        }
    });
});
