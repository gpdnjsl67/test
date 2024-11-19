// header, footer html 파일 include
window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // HTML을 삽입
                    el.outerHTML = this.responseText;

                    // 삽입된 요소에서 <script> 태그를 찾아 실행
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = this.responseText;
                    var scripts = tempDiv.getElementsByTagName('script');

                    for (var i = 0; i < scripts.length; i++) {
                        var script = document.createElement('script');
                        if (scripts[i].src) {
                            // src가 있는 경우 외부 스크립트 로드
                            script.src = scripts[i].src;
                        } else {
                            // src가 없는 경우 스크립트 내용을 실행
                            script.innerHTML = scripts[i].innerHTML;
                        }
                        document.body.appendChild(script); // 스크립트 실행
                    }
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

// 사파리 vh 대응
function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

// 연필 아이콘 옆 text 입력 필드 활성화 토글 함수
function toggleInputDisable(event) {
    const textInputField = event.target.closest('a').previousElementSibling; // a 태그의 이전 sibling인 input 요소 선택
    if (textInputField.hasAttribute('disabled')) {
        textInputField.removeAttribute('disabled'); // disabled 속성 제거
    } else {
        textInputField.setAttribute('disabled', 'disabled'); // 다시 비활성화
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.aside-menu__link'); // 모든 메뉴 링크 선택

    const updateCurrentClass = (event) => {
        // 기존 활성화된 클래스 제거
        document
            .querySelectorAll('.aside-menu__item--current, .aside-menu__sub-menu-item--current')
            .forEach(item => item.classList.remove('aside-menu__item--current', 'aside-menu__sub-menu-item--current'));

        // 클릭된 링크의 부모 요소에 활성화 클래스 추가
        const clickedLink = event.target.closest('.aside-menu__link'); // 클릭된 a 태그
        const parentItem = clickedLink.closest('.aside-menu__item'); // 가장 가까운 메뉴 아이템
        if (parentItem) {
            parentItem.classList.add('aside-menu__item--current'); // 클래스 추가
        }

        // 서브메뉴일 경우 서브메뉴 클래스도 추가
        const subMenuItem = clickedLink.closest('.aside-menu__sub-menu-item');
        if (subMenuItem) {
            subMenuItem.classList.add('aside-menu__sub-menu-item--current');
        }
    };

    // 모든 메뉴 링크에 클릭 이벤트 등록
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            updateCurrentClass(event);
        });
    });
});
