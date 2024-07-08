# 공통함수 모음 2024-07-08 

`<script src="https://cdn.jsdelivr.net/gh/shpark57/shnea@main/shnea.js"></script>` 로 js 호출 <br/>
`<script src="https://cdn.jsdelivr.net/gh/shpark57/shnea@main/shneaJq.js"></script>` 로 jquery 포함된 함수 호출<br/>
shnea.js는 공통 라이브러리로 사용할 수 있는 자바스크립트 라이브러리입니다. <br/>
shneaJq.js는 jQuery 라이브러리를 사용하여 제작한 라이브러리입니다. <br/>
계속 추가 예정입니다.<br/>

jquery 사용 시 아래 스크립트와 css 추가 필수 <br/>

`<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css">`<br/>
`<script src="https://code.jquery.com/jquery-3.7.1.js"></script>`<br/>
`<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>`<br/>





## shneaJs
    1. 문자열 카멜케이스로 변환
        shnea.toCamelCase("문자열") or "문자열".toCamelCase()
    2. 문자열 스네이크케이스로 변환
        shnea.toSnakeCase("문자열") or "문자열".toSnakeCase()
    3. 문자열 카멜케이스인지 확인
        shnea.isCamelCase("문자열") or "문자열".isCamelCase()
    4. 문자열 스네이크케이스인지 확인
        shnea.isSnakeCase("문자열") or "문자열".isSnakeCase()
    5. 주민등록번호 유효성 검사
        shnea.isValidSSN("주민등록번호") or "주민등록번호".isValidSSN()
    6. 주민등록번호 마스킹
        shnea.maskSSN("주민등록번호") or "주민등록번호".maskSSN()
    7. 배열에서 특정 키의 value  값으로 인덱스 찾기
        shnea.findIndexByKeyValue(array , "key", "value") or array.findIndexByKeyValue("key", "value")
    8. 배열에서 특정 키로 인덱스 찾기
        shnea.findIndexByKey(array , "key") or array.findIndexByKey("key")
    9. 초를 시간:분:초로 변환
        shnea.secToTime("초") or "초".secToTime()
    10. 하나의 이모지를 유니코드로 변환
        shnea.emojiToUnicode("이모지") or "이모지".emojiToUnicode()
    11. 유니코드를 이모지로 변환
        shnea.extractAndReplaceEmojis("유니코드") or "유니코드".extractAndReplaceEmojis()
    12. 유니코드를 이모지로 변환
        shnea.decodeUnicodeToEmoji("유니코드") or "유니코드".decodeUnicodeToEmoji()
    13. HTML 태그 제거
        shnea.removeHtmlTags("HTML 태그가 포함된 내용") or "HTML 태그가 포함된 내용".removeHtmlTags()
    14. null 또는 빈 값 또는 초기값 체크
        shnea.isEmpty("값") 
    15. 전화번호 포맷
        shnea.formatPhoneNumber("전화번호") or "전화번호".formatPhoneNumber()
    16. 이메일 유효성 검사
        shnea.isValidEmail("이메일") or "이메일".isValidEmail()
    




## shneaJq.js
    1. 그리드의 열 병합
        $(테이블 선택자).rowspan(colIdx)
    2. 그리드의 행 병합
        $(테이블 선택자).colspan(rowIdx)
    3. 다이나믹 모달 open 필요없는 요소는 제외 가능.
        openDynamicModal({
                width: 500,
                height: 400,
                title: '모달 타이틀',
                content: '<p>여기에 모달 내용 작성</p>',
                backgroundOpacity: 0.7,
                backgroundColor: 'gray',
                buttons: {
                    "Ok": function () {
                        $(this).dialog("close");
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                },
                openCallback: function () {
                    console.log('Modal opened');
                },
                closeCallback: function () {
                    console.log('Modal closed');
                }
        });
    