// input file 커스텀 - 파일명 붙이기
const fileTarget = $('.bs-file-upload__input');

fileTarget.on('change', function () { 
  var files = $(this)[0].files;
  var fileArr = [];
  for (var i = 0; i < files.length; i++) {
    fileArr.push(files[i].name);
}
  
// 파일명 노출방법1: 배열 값 사이에 공백 추가
var fileList = fileArr.join(', '); // 배열 값을 쉼표와 공백으로 연결
$(this).siblings('.bs-file-upload__description').text(fileList);

});