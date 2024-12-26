# 공통함수 모음 2024-08-01

`<script src="https://cdn.jsdelivr.net/gh/shpark57/shneaJs@main/shnea.js"></script>` 로 js 호출 <br/>
`<script src="https://cdn.jsdelivr.net/gh/shpark57/shneaJs@main/shneaJq.js"></script>` 로 jquery 포함된 함수 호출<br/>
shnea.js는 공통 라이브러리로 사용할 수 있는 자바스크립트 라이브러리입니다. <br/>
shneaJq.js는 jQuery 라이브러리를 사용하여 제작한 라이브러리입니다. <br/>
계속 추가 예정입니다.<br/>

jquery 사용 시 아래 스크립트와 css 추가 필수 <br/>

`<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css">`<br/>
`<script src="https://code.jquery.com/jquery-3.7.1.js"></script>`<br/>
`<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>`<br/>





## shnea.js
    1. 문자열 카멜케이스로 변환
        shnea.toCamelCase("문자열") or "문자열".toCamelCase()         ab_cd_ef -> abCdEf
    2. 문자열 스네이크케이스로 변환
        shnea.toSnakeCase("문자열") or "문자열".toSnakeCase()         abCdEf -> ab_cd_ef
    3. 문자열 카멜케이스인지 확인
        shnea.isCamelCase("문자열") or "문자열".isCamelCase()         
    4. 문자열 스네이크케이스인지 확인
        shnea.isSnakeCase("문자열") or "문자열".isSnakeCase()
    5. 주민등록번호 유효성 검사
        shnea.isValidSSN("주민등록번호") or "주민등록번호".isValidSSN()
    6. 주민등록번호 마스킹
        shnea.maskSSN("주민등록번호") or "주민등록번호".maskSSN()       123456-1234567 -> 123456-1******
    7. 배열에서 특정 키의 value  값으로 인덱스 찾기
        shnea.findIndexByKeyValue(array , "key", "value") or array.findIndexByKeyValue("key", "value")
    8. 배열에서 특정 키로 인덱스 찾기
        shnea.findIndexByKey(array , "key") or array.findIndexByKey("key")
    9. 초를 시간:분:초로 변환
        shnea.secToTime("초") or "초".secToTime()              3661 -> 01:01:01
    10. 하나의 이모지를 유니코드로 변환
        shnea.emojiToUnicode("이모지") or "이모지".emojiToUnicode()       😁 -> \ud83d\ude01
    11. 모든 이모지를 유니코드로 변환
        shnea.extractAndReplaceEmojis("유니코드") or "유니코드".extractAndReplaceEmojis()     😁😁 -> \ud83d\ude01\ud83d\ude01
    12. 유니코드를 이모지로 변환
        shnea.decodeUnicodeToEmoji("유니코드") or "유니코드".decodeUnicodeToEmoji()     \ud83d\ude01 -> 😁
    13. HTML 태그 제거
        shnea.removeHtmlTags("HTML 태그가 포함된 내용") or "HTML 태그가 포함된 내용".removeHtmlTags()           
    14. null 또는 빈 값 또는 초기값 체크
        shnea.isEmpty("값")      값이 null 또는 빈 값이면 true 반환  0,'' 도 빈값으로 판단
    15. 전화번호 포맷
        shnea.formatPhoneNumber("전화번호") or "전화번호".formatPhoneNumber()   01012345678 -> 010-1234-5678
    16. 이메일 유효성 검사
        shnea.isValidEmail("이메일") or "이메일".isValidEmail()               이메일 형식이면 true 반환
    17. 이미지를 MAX 사이즈보다 작게 조절
         file_resize = await shnea.getCompressImage(file , MAX_SIZE , file.name)    
    18. url 경로에서 이미지 추출
        var file = await shnea.getFileFromUrl("https://images.unsplash.com/photo-1707149414369-5989e250c788", "가져온 파일명");
    19.입력된 날짜 값을 파싱하여 지정된 형식으로 변환하는 함수.
        shnea.parseDate("날짜"(string, number ,date) , "yyyy-MM-dd HH:mm:ss"(형식 제외가능) )         20240710101010 -> 2024-07-10 10:10:10       
        "날짜".parseDate("형식"(제외가능))   , 날짜.parseDate("형식"(제외가능)) , date.parseDate("형식"(제외가능))    
    
    20.배열을 트리 구조로 변환         arrayToTree
    21.트리를 배열로 변환             treeToArray
    22.배열을 통계 데이터로 변환       arrayToStats

        const sampleArray = [
            { id: 'a', upper_id: '', category: 'cat1', value: 10, sort: 1, extra: 'extra1', date: '2024-01-01' },
            { id: 'b', upper_id: '', category: 'cat2', value: 20, sort: 2, extra: 'extra2', date: '2024-01-02' },
            { id: 'c', upper_id: '', category: 'cat3', value: 30, sort: 3, extra: 'extra3', date: '2024-01-03' },
            { id: 'aa', upper_id: 'a', category: 'cat1', value: 15, sort: 1, extra: 'extra4', date: '2024-01-04' },
            { id: 'bb', upper_id: 'b', category: 'cat2', value: 25, sort: 2, extra: 'extra5', date: '2024-01-05' },
            { id: 'cc', upper_id: 'c', category: 'cat3', value: 35, sort: 3, extra: 'extra6', date: '2024-01-06' },
            { id: 'aa2', upper_id: 'a', category: 'cat1', value: 18, sort: 2, extra: 'extra7', date: '2024-01-07' },
            { id: 'aa3', upper_id: 'a', category: 'cat1', value: 19, sort: 3, extra: 'extra8', date: '2024-01-08' },
            { id: 'aa4', upper_id: 'a', category: 'cat1', value: 17, sort: 4, extra: 'extra9', date: '2024-01-09' },
            { id: 'aaa', upper_id: 'aa', category: 'cat1', value: 16, sort: 1, extra: 'extra10', date: '2024-01-10' }
        ];
        배열을 트리 구조로 변환
        id,upper_id,children,sort 생략 가능  다른 컬럼을 사용하려면 컬럼명을 명시해주어야함
        shnea.arrayToTree(sampleArray); 
        shnea.arrayToTree(sampleArray , 'id', 'upper_id'); 
        shnea.arrayToTree(sampleArray , 'id', 'upper_id' , 'sort'); 
        sampleArray.arrayToTree();       
        sampleArray.arrayToTree('id', 'upper_id');
        sampleArray.arrayToTree('id', 'upper_id' , 'sort');
                

        트리를 배열로 변환 
        id,upper_id,children,sort 생략 가능  다른 컬럼을 사용하려면 컬럼명을 명시해주어야함
        shnea.treeToArray(sampleArray); 
        shnea.treeToArray(sampleArray , 'id', 'upper_id'); 
        shnea.treeToArray(sampleArray , 'id', 'upper_id' , 'sort'); 
        sampleArray.treeToArray();       
        sampleArray.treeToArray('id', 'upper_id');
        sampleArray.treeToArray('id', 'upper_id' , 'sort');
    
        배열을 통계 데이터로 변환
        headerField,categoryField,valueField,includeTotal,includeAverage 생략 가능  다른 컬럼을 사용하려면 컬럼명을 명시해주어야함
        includeTotal == true 이면 합계를 추가함 , includeAverage == true 이면 평균을 추가함
        shnea.arrayToStats(sampleArray, headerField = 'date', categoryField = 'category', valueField = 'value', includeTotal = false, includeAverage = false);  
        sampleArray.arrayToStats();
        sampleArray.arrayToStats('date' , 'category' , 'value' );
        sampleArray.arrayToStats('date' , 'category' , 'value' , true , true);

    23. 전화번호 유효성 검사
        shnea.isValidPhoneNumber("전화번호") or "전화번호".isValidPhoneNumber()         전화번호 형식이면 true 반환
    24. 문자열 길이 체크
        shnea.checkLength("문자열", "길이") or "문자열".checkLength("길이")              문자열의 길이가 길이보다 작으면 true 반환
    25. 대소문자 포함 검사
        shnea.checkUpperLowerCase("문자열") or "문자열".checkUpperLowerCase()          대문자와 소문자가 모두 포함되어 있으면 true 반환
    26. 특수문자 포함 검사
        shnea.checkSpecialCharacter("문자열") or "문자열".checkSpecialCharacter()      특수문자가 포함되어 있으면 true 반환
    27. 반복 문자 및 문자열 검사 
        shnea.checkRepeatedChars("문자열") or "문자열".checkRepeatedChars()            문자열에 3번이상 반복되는 문자나 문자열이 있다면 true 반환
    28. 패스워드 체크 함수
        shnea.checkPassword("문자열",2) or "문자열".checkPassword(level)                   
        level 1 : 8자 이상
        level 2 : 8자 이상, 대소문자 포함
        level 3 : 8자 이상, 대소문자 포함, 반복 문자 금지
        level 4 : 8자 이상, 대소문자 포함, 특수문자 포함 (default)
        level 5 : 8자 이상, 대소문자 포함, 특수문자 포함, 반복 문자 금지
        결과값 예시 : 
            성공 : {isValid: true, reason: ""}
            실패 : {isValid: false, reason: "비밀번호는 대소문자를 모두 포함해야 합니다."}

    29. 배열 안의 오브젝트 다중 키 기준  정렬 함수
        shnea.multiSortByKeys(array, keys) or "배열".multiSortByKeys(keys)
        const arr = [
        { name: 'John', age: 30, height: 175 },
        { name: 'Jane', age: 25, height: 160 },
        { name: 'Smith', age: 30, height: 180 },
        { name: 'Doe', age: 25, height: 165 }
        ];
        age 기준 내림차순 정렬 : shnea.multiSortByKeys(arr, 'age');    or shnea.multiSortByKeys(arr, {key:'age'});  or shnea.multiSortByKeys(arr, {key:'age' , order : 'asc'});   or  arr.multiSortByKeys('age');  
        age 기준 오름차순 정렬 : shnea.multiSortByKeys(arr, {key:'age' , order : 'desc'});  or shnea.multiSortByKeys(arr, [{key:'age' , order : 'desc'}]);       arr.multiSortByKeys( {key:'age' , order : 'desc'});  
        age, height 기준 내림차순 정렬 : shnea.multiSortByKeys(arr, ['age', 'height']);    shnea.multiSortByKeys(arr, [{key : 'age'}, {key : 'height'}]);  shnea.multiSortByKeys(arr, [{key : 'age'}, {key : 'height'}]); 
        age, height 기준 오름차순 정렬 : shnea.multiSortByKeys(arr, [{key : 'age', order : 'desc'}, {key : 'height', order : 'desc'}]); 
        age 내림차순 height 오름차순 정렬 : shnea.multiSortByKeys(arr, [{key : 'age'}, {key : 'height', order : 'desc'}]);   shnea.multiSortByKeys(arr, ['age', {key : 'height', order : 'desc'}]);


        30. **날짜의 차이 구하기**
        - `shnea.dateDifference(date1, date2)` 또는 `date1.dateDifference(date2)`
        - 두 날짜 사이��� 일 수를 반환
    
        31. **특정 날짜가 속한 달의 마지막 날**
            - `shnea.getLastDayOfMonth(date)` 또는 `date.getLastDayOfMonth()`
            - 특정 날짜가 속한 달의 마지막 날을 반환
    
        32. **날짜가 몇째 주인지**
            - `shnea.getWeekOfMonth(date, type)` 또는 `date.getWeekOfMonth(type)`
            - type 1: 해당 월의 몇째 주인지 반환
            - type 2: 해당 연도의 몇째 주인지 반환
    
        33. **특정 날짜가 무슨 요일인지**
            - `shnea.getDayOfWeek(date)` 또는 `date.getDayOfWeek()`
            - `shnea.getDayOfWeek(date , 'ko')` 또는 `date.getDayOfWeek('ko')`
            - `shnea.getDayOfWeek(date , 'en')` 또는 `date.getDayOfWeek('en')`
            - 특정 날짜의 요일을 반환
            - 0: 일요일, 1: 월요일, 2: 화요일, 3: 수요일, 4: 목요일, 5: 금요일, 6: 토요일
    
        34. **특정 날짜로부터 X일 더해지면 몇 월 며칠인지**
            - `shnea.addDays(date, days)` 또는 `date.addDays(days)`
            - 특정 날짜로부터 X일 더한 날짜를 반환
    
        35. **특정 날짜가 주말이면 금요일 또는 다음 주 월요일의 날짜**
            - `shnea.getAdjustedWeekendDate(date, type)` 또는 `date.getAdjustedWeekendDate(type)`
            - type 1: 주말이면 금요일의 날짜 반환
            - type 2: 주말이면 다음 주 월요일의 날짜 반환
    
        36. **날짜와 날짜 사이의 날짜 모두 반환**
            - `shnea.getDatesBetween(startDate, endDate)` 또는 `startDate.getDatesBetween(endDate)`
            - 두 날짜 사이의 모든 날짜를 배열로 반환

        37. ** 배열의 객체들 중에서 주어진 조건(객체)에 맞는 항목을 조회하는 함수. **
            -queryObjectsByConditions(array, {key1 : value1 , key2 : value2} ,'find') or array.queryObjectsByConditions({key1 : value1 , key2 : value2} , 'filter')

        38. 그룹화된 데이터에 대해 동적 키로 카운트 및 다양한 통계 계산을 수행하는 함수
            - shnea.calculateByDynamicKey(array,  ['DEPTNAME', 'DEPTNO'] , 'USERTYPE', [{ field: 'value', type: 'sum' },{ field: 'value', type: 'avg' },{ field: 'value', type: 'max' },{ field: 'value', type: 'min' }]);
        39.  데이터를 조인하고 그룹화 및 통계를 계산하는 함수  데이터 순서 중요
            - shnea.queryData(data1 ,data2 , '기준키' , { groupBy: [ 'KEY1' , 'KEY2' ],  aggregations: [{ type: 'count', field: 'KEY1', alias: 'count_key1' },{ type: 'sum', field: 'cnt', alias: 'total_cnt' },{ type: 'avg', field: 'cnt', alias: 'avg_cnt' }]})
        40. 타입 체크를 위한 유틸리티 함수
            - shnea.isTypeCheck(value , 'null')  , shnea.isTypeCheck(value , 'num') , shnea.isTypeCheck(value , 'string')  , shnea.isTypeCheck(value , 'object') 등
            - 지원타입 : 'undefined' , 'boolean', 'number' , 'bigint' , 'string' , 'symbol' , 'object' , 'function' , 'ssn' , 'email' , 'phone' , 'null'

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
    