//=============== 부트스트랩 JavaScript start ===============//
// xmp 태그 생성 후 내용 자동 삽입, a 버튼 추가
function createXmp() {
    let expContent = document.querySelectorAll('.exp-cont');
    let $xmp;
    let $addXmp;
    let $button
    let $addButton

    for (let i = 0; i < expContent.length; i++) {
        $xmp = document.createElement('xmp');
        $xmp.innerHTML = expContent[i].innerHTML;
        $addXmp = expContent[i].append($xmp);
    }
}
createXmp();

// 소스 복사
let copyText = () => {
    // 임시의 textarea 생성
    let $textarea = document.createElement("textarea");
    
    // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
    let text = document.querySelectorAll('xmp');

    for (let i = 0; i < text.length; i++) {
        text[i].addEventListener('click', function() {
            // body 요소에 존재해야 복사가 진행됨
            document.body.appendChild($textarea);
            
            $textarea.value = text[i].innerText;
            remove();
        });
    }

    function remove() {
        $textarea.select();
        
        // 복사 후 textarea 지우기
        document.execCommand('copy');
        document.body.removeChild($textarea);

        alert("소스가 복사되었습니다.")
    }
}
copyText();

// 버튼 클릭 시 페이지 최상단으로 이동
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.top-btn').fadeIn(200);
        } else {
            $('.top-btn').fadeOut(200);
        }
    });

    $('.top-btn').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
});

// 제목 클릭 시 exp-box 슬라이드 토글 효과
function rollUpDown() {
    let $title = document.querySelectorAll('.boot-title');
    let $box = document.querySelectorAll('exp-box');

    for (let i = 0; i < $title.length; i++) {
        $title[i].addEventListener('click', function() {
            $title[i].nextElementSibling.classList.toggle("active");
        });  
    }
}
rollUpDown();
//=============== 부트스트랩 JavaScript end ===============//


// input focus 시
function focusF(obj) {
    obj.parentNode.style.outline = "2px solid #4271d9";
}

// input blur 시
function blueF(obj) {
    obj.parentNode.style.outline = "none";
}

// input 옆 버튼 클릭 시 disable된 input값 활성/비활성화
function editBtnFocusOnOff(obj) {
    if (obj.previousElementSibling.disabled == true) {
        obj.previousElementSibling.disabled = false;
        obj.previousElementSibling.focus();

        obj.previousElementSibling.addEventListener('blur', function() {
            this.disabled = true;
        });
    } else {
        obj.previousElementSibling.disabled = true;
        obj.previousElementSibling.blur();
    }
}

// 체크박스 선택 시 bgcolor 변경
function checkedBox() {
    let checkbox = document.querySelectorAll('ul.item-list-1 input.checkbox-btn-primary');

    function checked(e) {
        if (e.target.checked) {
            e.target.parentNode.parentNode.parentNode.classList.add('checked');
        } else {
            e.target.parentNode.parentNode.parentNode.classList.remove('checked');
        }
    }

    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", checked);
    }
}
checkedBox();

// 매체 로고 클릭 시 효과
function logoOnOff(obj) {
    let mediaImgs = obj.getElementsByTagName('img');
    let mediaImg;

    for (let i = 0; i < mediaImgs.length; i++) {
        mediaImg = mediaImgs[i];
    }

    if (mediaImg.src.indexOf('on') > -1) {
        if(confirm('비활성화 하시겠습니까?')) {
            mediaImg.src = mediaImg.src.replace('on', 'off');
        }
    } else if (mediaImg.src.indexOf('off') > -1) {
        if(confirm('활성화 하시겠습니까?')) {
            mediaImg.src = mediaImg.src.replace('off', 'on');
        }
    }
}

// -- 모달창 열고 닫기 start -- //
function modalEffect(num, display, overflow) {
    let modal = document.querySelectorAll('.modal');
    let overlay = document.querySelector('.overlay');

    modal[num].style.display = display;
    overlay.style.display = display;
    document.body.style.overflow = overflow;
}

// 모달창 opening
function modalOpen(num, obj) {
    modalEffect(num, 'block', 'hidden');
}

// 모달창 closing
function modalClose(num, obj) {
    modalEffect(num, 'none', 'scroll');
}
// -- 모달창 열고 닫기 end -- //

// 이미지로 된 체크박스 클릭 시 on off 이미지 변경
function checkboxImgF(obj) {
    let checkboxImgs = obj.parentNode.getElementsByTagName('img');
    let checkboxImg;

    for (let i = 0; i < checkboxImgs.length; i++) {
        checkboxImg = checkboxImgs[i];
    }

    if (checkboxImg.src.indexOf('on') > -1) {
        checkboxImg.src = checkboxImg.src.replace('on', 'off');
    } else if (checkboxImg.src.indexOf('off') > -1) {
        checkboxImg.src = checkboxImg.src.replace('off', 'on');
    }
}

// 아이템 박스 클릭 시 슬라이드 열고 닫기 효과
function itemBoxUpDown(obj) {
    obj.nextSibling.nextSibling.classList.toggle('slideActive');
    obj.parentNode.querySelector('.item-list-1').classList.toggle('slideActive');
    obj.querySelector('.arrow-btn-slide > i').classList.toggle('slideActive');
    obj.parentNode.classList.toggle('slideActive');      
}

// 파일 불러오기
$(".file").on('change',function(){
    var fileName = $(".file").val();
    $(".upload-name").val(fileName);
});

// 탭 메뉴
$(document).ready(function(){
    $('ul.tabs li').click(function(){ // 선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current'); // 선택 되있던 탭의 current css를 제거하고 
        $('.tab-content').removeClass('current');		

        $(this).addClass('current'); // 선택된 탭에 current class를 삽입해줍니다.
        $("#" + tab_id).addClass('current');
    });
});

// 블랙리스트 추가
// let txtBox = document.querySelector(".blacklist-text-box");
// let btn = document.querySelector(".blacklist-send-btn");
// let txtValue = txtBox.value;
// let addList = document.querySelector(".blacklist .blacklist-num");
// let list = document.querySelector("ul.blacklist")

// function clickEvent() {
//     // let addList = document.createElement('li');
    
//     if(txtBox.value !== '') {
//         addList.innerHTML = txtBox.value;
//         list.appendChild(addList);
//         txtBox.value = '';
//     }
// }
// btn.addEventListener("click", clickEvent);

// 버튼 클릭 시 모달창 오픈, 요소 외 영역 클릭 시 모달창 닫기
function modalOpen(modal, btn) {
    modal.css('display', 'none');

    btn.on('click', function() {
        modal.fadeIn();
    })

    $(document).mouseup(function (e){
        if(modal.has(e.target).length === 0){
            modal.fadeOut();
        }
    });
}
modalOpen($('.event-modal'), $('.modal-open-btn'));

// let example1 = $('#example1');
// new Sortable($(example1), {
//     animation: 150,
//     ghostClass: 'blue-background-class'
// });

function clickBtnSlide(obj) {
    let targeting = obj.parentNode.parentNode.nextElementSibling;
    let applyBtn = obj.parentNode.childNodes[0].nextSibling;
    let arrowBtn = obj.parentNode.lastChild.previousSibling.childNodes;

    if(targeting.style.display == 'block') {
        targeting.style.display = 'none';
        applyBtn.style.display = 'none';
        arrowBtn.style.transform = 'rotate(0)';
    } else {
        targeting.style.display = 'block';
        applyBtn.style.display = 'block';
        arrowBtn.style.transform = 'rotate(180deg)';

    }
}