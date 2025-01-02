document.addEventListener("DOMContentLoaded", function() {
    // ===== 매체 추가, 삭제 기능 ===== //

    // 특정 컨테이너에 row 추가 함수
    function addMediaRow(areaClass) {
        const mediaContentContainer = document.querySelector(`.${areaClass}__content`);
        const mediaRowTemplate = mediaContentContainer.querySelector(`.${areaClass}__row`);
        const newMediaRow = mediaRowTemplate.cloneNode(true);

        // 입력 필드 초기화
        newMediaRow.querySelector(".bs-field__text").value = "";

        mediaContentContainer.appendChild(newMediaRow);
    }

    // 특정 컨테이너에서 row 삭제 함수
    function deleteMediaRow(areaClass, rowElement) {
        const mediaContentContainer = document.querySelector(`.${areaClass}__content`);
        const mediaRows = mediaContentContainer.querySelectorAll(`.${areaClass}__row`);

        if (mediaRows.length > 1) {
            rowElement.remove();
        } else {
            alert("최소 하나의 값이 필요합니다.");
        }
    }

    // 이벤트 설정 함수
    function initializeMediaControls(areaClass) {
        const addRowButton = document.querySelector(`.${areaClass}__add-btn`);
        const mediaContentContainer = document.querySelector(`.${areaClass}__content`);

        // 추가 버튼 이벤트
        addRowButton.addEventListener("click", function(event) {
            event.preventDefault();
            addMediaRow(areaClass);
        });

        // 삭제 버튼 이벤트 (이벤트 위임)
        mediaContentContainer.addEventListener("click", function(event) {
            if (event.target.closest(`.${areaClass}__del-btn`)) {
                event.preventDefault();
                const rowToDelete = event.target.closest(`.${areaClass}__row`);
                deleteMediaRow(areaClass, rowToDelete);
            }
        });
    }

    // 초기화 (여러 요소에 대해 적용 가능)
    initializeMediaControls("adv-area");
    initializeMediaControls("adv-age");
});