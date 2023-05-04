// 매체 +버튼 클릭 시 서치바 추가
function addMedia() {
    let addMediaBtn = document.querySelector('.add-media-btn');
    let mediaSearchList = document.querySelector('.media-search-row');
    
    addMediaBtn.addEventListener('click', () => {
        let addDiv = document.createElement("div");
    
        addDiv.classList.add('media-search','d-grid','grid-gap-5px');
        
        addDiv.innerHTML = 
        `
            <input class="search bg-ltgray-1 width-100per" type="search" placeholder="매체를 입력하세요.">                        
            <input type="text" class="input-text">
            <a href="javascript:void(0);" class="btn-primary width-40px media-del-btn" onclick="delMedia(this);"><i class="fa-solid fa-x icon-btn-small"></i></a>
        `
    
        mediaSearchList.append(addDiv);
    });
}
addMedia();

// 매체 del버튼 클릭 시 서치바 삭제
function delMedia(e) {
    let mediaSearchBar = document.getElementsByClassName('media-search');
    if(mediaSearchBar.length > 1) {
        e.parentNode.remove();
        e.parentNode.innerHTML='';
    }
}

// 외부연동사용여부 셀렉 값에 따른 input 보여주기
function interlockSelect() {
    let selectedElement = document.getElementById("interlock-status");
    let interlockTxt = document.querySelectorAll('.interlock-txt');
    let interVal = selectedElement.options[selectedElement.selectedIndex].value;

    if(interVal == '미사용') {
        for(let i = 0; i < interVal.length; i++) {
            interlockTxt[i].classList.add('hide');
        }
    } else if (interVal == '사용') {
        for(let i = 0; i < interVal.length; i++) {
            interlockTxt[i].classList.remove('hide');
        }
    }
}

// 블랙리스트 li 숫자 카운팅
let blackItems;
let blackCounting;
let telCountingTxt = document.querySelector('.bl-tel-counting');
let ipCountingTxt = document.querySelector('.bl-ip-counting');

function blacklistCounting(obj1, obj2) {
    blackItems = document.querySelectorAll(obj1);
    blackCounting = blackItems.length;

    obj2.innerText = blackCounting;
}
blacklistCounting('.blacklist-tels>li', telCountingTxt);
blacklistCounting('.blacklist-ips>li', ipCountingTxt);

// 전화번호 유효성 검사
function telValidator(args) {
    const msg = '유효하지 않은 전화번호입니다.';
    
    if (/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(args)) {
        return true;
    }
    alert(msg);
    return false;
}

// 아이피 유효성검사
function checkIpForm(ip_addr){
    var filter = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if (filter.test(ip_addr) == true){
        return true;
    } else{
        alert("유효하지 않은 IP 주소입니다.");
        return false;
    }
}

// 블랙리스트 추가
let blTelList = document.querySelector('.blacklist-tels');
let blTelInput = document.querySelector('.blacklist-tel-input');
let blTelAddBtn = document.querySelector('.blacklist-add-btn-tel');

// 블랙리스트 - 전화번호 차단
blTelAddBtn.addEventListener('click', () => {
    let blTelInputVal = blTelInput.value
    
    let addLi = document.createElement("li");
    addLi.classList.add('blacklist-tel-item');
    
    addLi.innerHTML = 
    `
    <div class="left-section">
    <span class="blacklist-tel-num fs-13 c-ltgray-1">${blTelInputVal}</span>
    </div>
    <div class="right-section">
        <a class="blacklist-tel-del-btn" href="javascript:void(0);" onclick="delBlacklist(this);"><i class="fa-solid fa-circle-xmark icon-btn-medium"></i></a>
    </div>
    `

    if(telValidator(blTelInputVal)) {
        blTelList.prepend(addLi);
        blTelInput.value = '';
    } else {
        blTelInput.value = '';
        blTelInput.focus();
    }

    blacklistCounting('.blacklist-tels>li', telCountingTxt);
});

// 블랙리스트 - IP 차단
let blIpList = document.querySelector('.blacklist-ips');
let blIpInput = document.querySelector('.blacklist-ip-input');
let blIpAddBtn = document.querySelector('.blacklist-add-btn-ip');

blIpAddBtn.addEventListener('click', () => {
    let blIpInputVal = blIpInput.value
    
    let addLi = document.createElement("li");
    
    addLi.innerHTML = 
    `
    <div class="left-section">
    <label><input type="checkbox" class="checkbox-btn-primary" value="">
        <span class="fs-13 c-ltgray-1">${blIpInputVal}</span>
    </label>
    </div>
    <div class="right-section">
        <label class="radio-btn-sq"><input type="radio" name="text1" value=""><span class="width-100per t-align-center">24시간</span></label>
        <label class="radio-btn-sq ml-5"><input type="radio" name="text1" value=""><span class="width-100per t-align-center">48시간</span></label>
        <label class="radio-btn-sq ml-5"><input type="radio" name="text1" value=""><span class="width-100per t-align-center">BLOCK</span></label>
        <a class="ml-5" href="javascript:void(0);" onclick="delBlacklist(this);"><i class="fa-solid fa-circle-xmark icon-btn-medium"></i></a>
    </div>
    `

    if(checkIpForm(blIpInputVal)) {
        blIpList.prepend(addLi);
        blIpInput.value = '';
    } else {
        blIpInput.value = '';
        blIpInput.focus();
    }

    blacklistCounting('.blacklist-ips>li', ipCountingTxt);
});


// 블랙리스트 전화번호 del버튼 클릭 시 li 삭제
function delBlacklist(e) {
    e.parentNode.parentNode.remove();
    e.parentNode.parentNode.innerHTML='';
}

// 매체 검색
function filter() {
    let searchInput = document.getElementById("media-search").value.toUpperCase();
    let items = document.getElementsByClassName("media-item");

    for(let i = 0; i < items.length; i++){
      let mediaName = items[i].getElementsByClassName("name");

      if(mediaName[0].innerHTML.toUpperCase().indexOf(searchInput) > -1) {
        items[i].style.display = "flex";
      } else {
        items[i].style.display = "none";
      }
    }
}

//
const buttons = document.querySelectorAll(".more-btn-slide");

buttons.forEach((button) => {
    button.addEventListener("click", function() {
        const targetId = button.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);

        if (targetElement.style.display === "none") {
            targetElement.style.display = "grid";
            button.firstChild.style.transform = "rotate(180deg)";
        } else {
            targetElement.style.display = "none";
            button.firstChild.style.transform = "rotate(0deg)";
        }

        console.log(button.firstChild);
    });
});