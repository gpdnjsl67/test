$(document).ready(function() {
    // 페이지 로드 시 bs-box-list__items 요소를 숨김
    $('.bs-box-list__items').hide();
});

document.addEventListener("DOMContentLoaded", function() {
    // ===== 매체 추가, 삭제 기능 ===== //
    const addRowButton = document.querySelector(".event-media__add-btn");
    const mediaContentContainer = document.querySelector(".event-media__content");

    // 새로운 row 추가 함수
    function addMediaRow() {
        const mediaRowTemplate = mediaContentContainer.querySelector(".event-media__row");
        const newMediaRow = mediaRowTemplate.cloneNode(true);

        // 입력 필드 초기화
        newMediaRow.querySelector(".bs-search-bar").value = "";
        newMediaRow.querySelector(".bs-field__text").value = "";

        mediaContentContainer.appendChild(newMediaRow);
    }

    // 특정 row 삭제 함수
    function deleteMediaRow(rowElement) {
        const mediaRows = mediaContentContainer.querySelectorAll(".event-media__row");

        if (mediaRows.length > 1) {
            rowElement.remove();
        } else {
            alert("최소 하나의 매체가 필요합니다.");
        }
    }

    // 추가 버튼 이벤트
    addRowButton.addEventListener("click", function(event) {
        event.preventDefault();
        addMediaRow();
    });

    // 삭제 버튼 이벤트 (이벤트 위임)
    mediaContentContainer.addEventListener("click", function(event) {
        if (event.target.closest(".event-media__del-btn")) {
            event.preventDefault();
            const rowToDelete = event.target.closest(".event-media__row");
            deleteMediaRow(rowToDelete);
        }
    });

    // ===== 차단 (전화번호, 아이피) ===== //
    function updateCount(container) {
        const countEl = container.querySelector('.block-phone-box__counting, .block-ip-box__counting');
        const listItems = container.querySelectorAll('.block-phone-box__list__item, .block-ip-box__list__item');
        if (countEl) countEl.textContent = listItems.length;
    }

    function addItem(container) {
        const inputEl = container.querySelector('.block-box__input');
        const listEl = container.querySelector('.block-phone-box__list, .block-ip-box__list');
        
        // Validate input based on whether it's a phone or IP box
        const isPhoneBox = container.classList.contains('block-phone-box');
        const isValidInput = isPhoneBox ? /^[0-9]+$/.test(inputEl.value) : inputEl.value.trim() !== '';

        if (inputEl && inputEl.value.trim() !== '' && isValidInput) {
            const newItem = document.createElement('li');
            newItem.className = 'block-box__list__item ' + (isPhoneBox ? 'block-phone-box__list__item' : 'block-ip-box__list__item');
            newItem.innerHTML = `
                <span class="block-box__added-item ${isPhoneBox ? 'block-box__phone-number' : 'block-box__ip-address'}">${inputEl.value}</span>
                <a href="#" class="block-box__del-btn bs-fa-icon bs-fa-icon--big"><i class="fas fa-times-circle"></i></a>
            `;

            // Add the new item at the top of the list
            listEl.prepend(newItem);

            // Clear the input field and update the count
            inputEl.value = '';
            updateCount(container);
        } else {
            // alert("전화번호를 확인해 주세요.");
        }
    }

    function deleteItem(event, container) {
        if (event.target.closest('.block-box__del-btn')) {
            const item = event.target.closest('.block-phone-box__list__item, .block-ip-box__list__item');
            if (item) {
                item.remove();
                updateCount(container);
            }
        }
    }

    // Initialize functionality for containers with 'block-box' class
    const containers = document.querySelectorAll('.block-box');
    containers.forEach(container => {
        const addButton = container.querySelector('.block-box__add-btn');

        // Add item on 'Add' button click
        addButton.addEventListener('click', function () {
            addItem(container);
        });

        // Delete item on 'Delete' button click
        container.addEventListener('click', function (event) {
            deleteItem(event, container);
        });
    });
});

