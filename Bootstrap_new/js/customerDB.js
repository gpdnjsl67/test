// 전체 리스트가 들어 있는 부모 요소를 선택
document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.querySelector('.customer-history__list'); // 전체 리스트의 부모 요소를 선택합니다.
    
    historyList.addEventListener('click', function(event) {
        // 클릭된 요소가 'customer-history__del-btn' 클래스인지 확인
        if (event.target.closest('.customer-history__del-btn')) {
            const deleteButton = event.target.closest('.customer-history__del-btn');
            
            // 부모 .customer-history__item을 찾아서 삭제
            const listItem = deleteButton.closest('.customer-history__item');
            if (listItem) {
                listItem.remove();
            }
        }
    });
});
