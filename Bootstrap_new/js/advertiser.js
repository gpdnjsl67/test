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

$(document).ready(function() {
    // 페이지 로드 시 bs-box-list__items 요소를 숨김
    $('#modal__edit-policy .bs-box-list__items').hide();
});

// 대상 요소 선택
const modalEditPolicy = document.querySelector('#modal__edit-policy');
const addButton = modalEditPolicy.querySelector('.edit-policy__add-btn');
const boxListWrapper = modalEditPolicy.querySelector('.bs-box-list-wrapper');

// 탭 추가 기능
addButton.addEventListener('click', () => {
    // 첫 번째 bs-box-list를 복사
    const firstBoxList = boxListWrapper.querySelector('.bs-box-list');
    if (!firstBoxList) return; // 복사 대상이 없으면 종료

    const newBoxList = firstBoxList.cloneNode(true); // 깊은 복사

    // 새로운 내용으로 초기화 (예: 텍스트 초기화, 입력 필드 비우기 등)
    const titleText = newBoxList.querySelector('.bs-box-list__title-text span:nth-child(2)');
    if (titleText) titleText.textContent = '새로운 제목';

    const inputFields = newBoxList.querySelectorAll('input, textarea');
    inputFields.forEach((field) => {
        field.value = ''; // 입력 필드 초기화
    });

    // 삭제 버튼이 없는 경우 추가
    let deleteButton = newBoxList.querySelector('.edit-policy__del-btn');
    if (!deleteButton) {
        const actionContainer = newBoxList.querySelector('.d-flex.bs-gap.ai-center.jc-end');
        if (actionContainer) {
            deleteButton = document.createElement('span');
            deleteButton.className = 'edit-policy__del-btn bs-field__btn bs-btn bs-btn--gray bs-box-list__title-arrow w-rem-4 padding-bs';
            deleteButton.innerHTML = '<span class="bs-fa-icon bs-fa-icon--big"><i class="fas fa-times"></i></span>';
            actionContainer.insertBefore(deleteButton, actionContainer.firstChild);
        }
    }

    // 삭제 버튼 이벤트 추가
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm('해당 탭을 삭제하시겠습니까?')) {
                newBoxList.remove();
            }
        });
    }

    // bs-box-list-wrapper에 추가
    boxListWrapper.appendChild(newBoxList);

    // jQuery 이벤트가 새로 추가된 요소에서도 동작하도록 초기화
    $(newBoxList).find('.bs-box-list__title-arrow').click(function() {
        $(this).closest('.bs-box-list__title').next('.bs-box-list__items').slideToggle(300);
        $(this).toggleClass('active');
    });
});

// 삭제 기능 - 초기 bs-box-list의 삭제 버튼에 이벤트 추가
const initialDeleteButtons = boxListWrapper.querySelectorAll('.edit-policy__del-btn');
initialDeleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
        const boxList = event.target.closest('.bs-box-list');
        if (boxList) boxList.remove();
    });
});
