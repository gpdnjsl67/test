// $(document).ready(function() {
//     $(".top-article__title").lettering();
// });
  
// $(document).ready(function() {
//     animation();
// }, 1000);
  
// function animation() {
//     var title1 = new TimelineMax();
//     title1.staggerFromTo(".top-article__title span", 0.5, 
//     {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
//     {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
// }

// // 메인 타이틀 클래스 가져오기
// main_animation_text(".top-article__title");

// function main_animation_text(element) {
//     var newText = "";
//     var theText = document.querySelector(element);

//     for (i = 0; i < theText.innerText.length; i++) {
//       newText += "<span>";
//       newText += theText.innerText[i];
//       newText += "</span>";
//     }
//     theText.innerHTML = newText;
//     var targetsDiv = document.querySelectorAll(element + " span");
//     TweenMax.staggerFromTo(
//       targetsDiv,
//       2,
//       {
//         opacity: 0,
//         y: 300,
//         ease: Elastic.easeOut.config(1.2, 0.9),
//       },
//       {
//         opacity: 1,
//         y: 0,
//         ease: Elastic.easeOut.config(1.2, 0.9),
//       },
//       0.15
//     );
// }


// title text gasp 효과
// document.addEventListener("DOMContentLoaded", function(event) {
//     animation_text_1(".top-article__title");
// });
  
// function animation_text_1 (element){
//     var newText = "";
//     var theText = document.querySelector(element);

//     for (i = 0; i < theText.innerText.length; i++) {
//       newText += "<div>";
//       if (theText.innerText[i] == " "){newText += "&nbsp;"}
//       else {newText += theText.innerText[i];}
//       newText += "</div>";
//       console.log(newText);
//     }

//     theText.innerHTML = newText;
//     var targetsDiv = document.querySelectorAll(element+" div");
    
//     TweenMax.staggerFromTo(targetsDiv, 2, {opacity:0, y:90, ease: Elastic.easeOut.config(1.2, 0.5)}, {opacity:1, y:0, ease: Elastic.easeOut.config(1.2, 0.5)}, 0.03);
// }

// let tl = new TimelineMax({});
// tl.staggerFrom(
// 	".top-article__title",
// 	1.5,
// 	{opacity:0, y:90, ease: Elastic.easeOut.config(1.2, 0.5)}, {opacity:1, y:0, ease: Elastic.easeOut.config(1.2, 0.5)},
// 	0.15
// );


// 수량
let minusBtns = document.querySelectorAll('.conuting-box__btn--substract');
let plusBtns = document.querySelectorAll('.conuting-box__btn--add');

// 각 마이너스 버튼에 대한 클릭 이벤트 등록
minusBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const productId = btn.getAttribute('data-product-id'); // 클릭된 버튼의 data-product-id 값 가져오기
        let quantity = parseInt(document.getElementById(productId + '-quantity').textContent); // 현재 수량 가져오기
        quantity = quantity - 1 < 1 ? 1 : quantity - 1; // 수량이 1 미만이 되지 않도록 처리
        document.getElementById(productId + '-quantity').textContent = quantity; // 변경된 수량 출력
    });
});
  
// 각 플러스 버튼에 대한 클릭 이벤트 등록
plusBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const productId = btn.getAttribute('data-product-id'); // 클릭된 버튼의 data-product-id 값 가져오기
        let quantity = parseInt(document.getElementById(productId + '-quantity').textContent); // 현재 수량 가져오기
        quantity = quantity + 1; // 수량 증가
        document.getElementById(productId + '-quantity').textContent = quantity; // 변경된 수량 출력
    });
});