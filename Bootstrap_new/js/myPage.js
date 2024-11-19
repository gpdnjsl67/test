// 비밀번호 변경 모달창 페이지 넘기기 함수
document.querySelector('.change-password__btn').addEventListener('click', function() {
    // 첫 번째 페이지와 버튼 숨기기
    document.querySelector('.change-password__first-page').classList.add('hidden');
    document.querySelector('.change-password__btn').classList.add('hidden');

    // 두 번째 페이지와 버튼 표시
    document.querySelector('.change-password__second-page').classList.remove('hidden');
    document.querySelector('.go-to-login__btn').classList.remove('hidden');
});