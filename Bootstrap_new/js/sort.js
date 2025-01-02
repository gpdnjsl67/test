// 모든 sort__item 요소를 가져옵니다.
const sortItems = document.querySelectorAll('.sort__item');

// 각 sort__item에 클릭 이벤트를 추가합니다.
sortItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.textContent;

        // 현재 상태를 확인합니다.
        if (item.classList.contains('sort__item--active')) {
            if (text.endsWith('↑')) {
                // '↑'를 '↓'로 변경
                item.textContent = text.slice(0, -1) + '↓';
            } else if (text.endsWith('↓')) {
                // '↓' 제거 및 클래스 초기화
                item.textContent = text.slice(0, -1);
                item.classList.remove('sort__item--active');
            }
        } else {
            // 초기 상태에서 '↑' 추가 및 클래스 추가
            item.textContent = text + '↑';
            item.classList.add('sort__item--active');
        }
    });
});