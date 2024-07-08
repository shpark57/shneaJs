// Description: shnea 라이브러리
var shnea = (() => ({
    /**
     * 문자열을 카멜케이스로 변환
     * @param str
     * @returns {string}
     */
    toCamelCase: (str) =>  {
        return str.toLowerCase().replace(/[-_\s]+(.)?/g, (match, char) => char ? char.toUpperCase() : '');
    }
    /**
     * 문자열을 스네이크케이스로 변환
     * @param str
     * @param separator
     * @returns {string}
     */
    ,toSnakeCase: (str, separator = '_') =>  {
        return str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();
    }
    /**
     * 문자열이 카멜케이스인지 확인
     * @param str
     * @returns {boolean}
     */
    ,isCamelCase  : (str) =>  {
        return /^[a-z]+([A-Z][a-z]*)+$/.test(str);
    }
    /**
     * 문자열이 스네이크케이스인지 확인
     * @param str
     * @returns {boolean}
     */
    ,istrakeCase  : (str) =>  {
        return /^[a-z]+(_[a-z]+)*$/.test(str);
    }

    /**
     * 주민등록번호 유효성 검사
     * @param ssn
     * @returns {boolean}
     */
    ,isValidSSN: (ssn) =>  {

        // 하이픈을 제거하고 숫자만 남기기
        ssn = ssn.replace('-', '');

        // 주민등록번호 형식 검사 정규식 (YYMMDD-#######)
        const regex = /^\d{13}$/;
        if (!regex.test(ssn)) {
            return false;
        }


        // 가중치를 이용한 검증
        const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        let sum = 0;

        for (let i = 0; i < 12; i++) {
            sum += parseInt(ssn[i]) * weights[i];
        }

        const checkDigit = (11 - (sum % 11)) % 10;

        // 마지막 자리 숫자와 비교
        return checkDigit === parseInt(ssn[12]);
    }
    /**
     * 주민등록번호 마스킹
     * @param ssn
     * @returns {*}
     */
    ,maskSSN : (ssn) => {
        ssn = ssn.replace('-', '');
        return ssn.replace(/(\d{6})(\d{1})\d{6}/, '$1-$2******');
    }
    /**
     * 배열에서 특정 키의 value 값으로 인덱스 찾기
     * @param arr
     * @param key
     * @param value
     * @returns {*|*[]}
     */
    ,findIndexByKeyValue : (arr, key, value) => {
        if (!key) { return [];}
        return arr.map((element, index) => element[key] === value ? index : -1).filter(index => index !== -1);
    }

    /**
     * 배열에서 특정 키로 인덱스 찾기
     * @param arr
     * @param key
     * @returns {*|*[]}
     */
    ,findIndexByKey : (arr, key) => {
        if (!key) { return [];}
        return arr.map((item, index) => item.hasOwnProperty(key) ? index : -1)
            .filter(index => index !== -1);
    }

    /**
     * 초를 시간:분:초로 변환
     * @param sec
     * @returns {string}
     */
    ,secToTime : (sec = 0) => {
        const padWithZeros = (num) => num.toString().padStart(2, '0');

        const days = Math.floor(sec / 86400);
        const hours = Math.floor((sec % 86400) / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const secs = sec % 60;

        const formattedTime = `${padWithZeros(hours)}:${padWithZeros(minutes)}:${padWithZeros(secs)}`;
        return days > 0 ? `${days}d ${formattedTime}` : formattedTime;
    }

    /**
     * 하나의 이모지를 유니코드로 변환
     * @param emoji
     * @returns {string}
     */
    ,emojiToUnicode : (emoji) => {
        return Array.from(emoji).map(char => {
            let hex = char.codePointAt(0).toString(16).toUpperCase();
            return '&#x' + hex + ';';
        }).join('');
    }
    /**
     * 이모지를 유니코드로 변환
     * @param str
     * @returns {*}
     */
    ,extractAndReplaceEmojis : (str) => {
        const emojiRegex = /([\u203C-\u3299\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F])/g;
        return str.replace(emojiRegex, match => shnea.emojiToUnicode(match));
    }
    /**
     * 유니코드를 이모지로 변환
     * @param str
     * @returns {*}
     */
    ,decodeUnicodeToEmoji : (str) => {
        return str.replace(/&#x([A-F0-9]+);/g, (match, hex) => {
            return String.fromCodePoint(parseInt(hex, 16));
        });
    }
    /**
     * HTML 태그 제거
     * @param str
     * @returns {*}
     */
    ,removeHtmlTags : (str) => {
        return str.replace(/<[^>]*>?/g, '');
    }

    /**
     * null 또는 빈 값 또는 초기값 체크
     * @param value
     * @returns {boolean}
     */
    , isEmpty : (value) => {
        if (!value) {
            return true; // falsey 값 (0, '', false, null, undefined, NaN) 체크
        } else if (Array.isArray(value) && value.length === 0) {
            return true; // 빈 배열 체크
        } else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
            return true; // 빈 객체 체크
        } else if (value === 'null') {
            return true; // 문자열 "null" 체크
        }
        return false; // 초기값이 아닌 경우
    }

    /**
     * 전화번호 포맷
     * @param phoneNumber
     * @returns {*|string}
     */
    ,formatPhoneNumber : (phoneNumber) => {
        if (!phoneNumber) {
            return '';
        }
        // 숫자가 아닌 문자 제거
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        // 휴대전화 번호 포맷 (010-XXXX-XXXX)
        if (phoneNumber.startsWith('010') && phoneNumber.length === 11) {
            return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        // 서울 지역번호(02) 포맷 (02-XXXX-XXXX)
        if (phoneNumber.startsWith('02') && phoneNumber.length === 9) {
            return phoneNumber.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
        }
        // 기타 지역번호 포맷 (0XX-XXXX-XXXX)
        if (phoneNumber.length === 10 && phoneNumber.startsWith('0')) {
            return phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        }
        // 기타 포맷 (0XX-XXXX-XXXX)
        if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
            return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        return phoneNumber; // 포맷에 맞지 않는 경우 원본 반환
    }
    /**
     * 이메일 유효성 검사
     * @param email
     * @returns {boolean}
     */
    ,isValidEmail : (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * 이미지를 MAX 사이즈보다 작게 조절
     * @param file
     * @param maxSizeInBytes
     * @param origin_nm
     * @param callback
     */
    ,compressImage : function(file, maxSizeInBytes, origin_nm, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;
                let ratio = 1;

                const step = 0.02; // 압축 단계 2프로씩 줄임.  0.1 (10%)씩 줄일 경우 100KB 근처까지도 떨어짐.
                let compressedSize = file.size;
                const blob = canvas.toDataURL(file.type);
                // 압축 단계별로 크기를 확인하여 maxSizeInBytes에 가까워질 때까지 반복
                while (compressedSize > maxSizeInBytes && ratio > 0) {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    const blob = canvas.toDataURL(file.type);
                    compressedSize = blob.length * (3 / 4); // Base64로 인코딩된 크기 계산

                    ratio -= step; // 압축 단계를 줄임

                    width *= ratio;
                    height *= ratio;
                }

                // 최종 압축된 이미지를 Blob으로 변환하여 콜백 함수 호출
                canvas.toBlob(function(blob) {
                    var file = new File([blob], origin_nm, { type : blob.type});
                    callback(file);
                }, file.type);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
    /**
     * 조절된 이미지를 편하게 불러오기 위한 함수
     * @param file
     * @param maxSizeInBytes
     * @param origin_nm
     * @returns {Promise<unknown>}
     */
    ,getCompressImage : async function (file, maxSizeInBytes, origin_nm){
        return new Promise((resolve, reject) => {
            shnea.compressImage(file, maxSizeInBytes, origin_nm, function(file) {
                resolve(file);
            });
        });
    }

    /**
     * URL 이미지를 파일로 변환
     * @param imageUrl
     * @param origin_nm
     * @param callback
     */
    ,urlImgToFile : function(imageUrl, origin_nm , callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";

        xhr.onload = function () {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var file = new File([blob], origin_nm, { type : blob.type});
                callback(file);
            }
        };
        xhr.send();
    }
    /**
     * 불러온 이미지를 편하게 불러오기위한 함수
     * @param imageUrl
     * @param origin_nm
     * @returns {Promise<unknown>}
     */
    ,getFileFromUrl : async function (imageUrl,origin_nm ) {
        return new Promise((resolve, reject) => {
            shnea.urlImgToFile(imageUrl, origin_nm, function(file) {
                resolve(file);
            });
        });
    }

}))();


/**
 * 문자열을 카멜케이스로 변환
 * @returns {string}
 */
String.prototype.toCamelCase = function() {
    return shnea.toCamelCase(this);
};

/**
 * 문자열을 스네이크케이스로 변환
 * @param separator
 * @returns {string}
 */
String.prototype.toSnakeCase = function(separator = '_') {
    return shnea.toSnakeCase(this, separator);
};

/**
 * 초를 시간:분:초로 변환
 * @returns {string}
 */
String.prototype.secToTime = function() {
    return shnea.secToTime(this);
}

/**
 * 하나의 이모지를 유니코드로 변환
 * @returns {string}
 */
String.prototype.emojiToUnicode = function() {
    return shnea.emojiToUnicode(this);
}

/**
 * 이모지를 유니코드로 변환
 * @returns {string}
 */
String.prototype.extractAndReplaceEmojis = function() {
    return shnea.extractAndReplaceEmojis(this);
}

/**
 * 유니코드를 이모지로 변환
 * @returns {string}
 */
String.prototype.decodeUnicodeToEmoji = function() {
    return shnea.decodeUnicodeToEmoji(this);
}

/**
 * HTML 태그 제거
 * @returns {string}
 */
String.prototype.removeHtmlTags = function() {
    return shnea.removeHtmlTags(this);
}

String.prototype.formatPhoneNumber = function() {
    return shnea.formatPhoneNumber(this);
}

String.prototype.isValidEmail = function() {
    return shnea.isValidEmail(this);
}
/**
 * 주민등록번호 유효성 검사
 * @returns {boolean}
 */
String.prototype.isValidSSN = function() {
    return shnea.isValidSSN(this);
}

/**
 * 초를 시간:분:초로 변환
 * @returns {string}
 * (1).secToTime() 또는  var num = 1; num.secToTime() 와 같이 사용해야함
 * 1.secToTime() 는 에러 발생
 */
Number.prototype.secToTime = function() {
    return shnea.secToTime(this);
}


/**
 * 배열에서 특정 키의 값으로 인덱스 찾기
 * @param key
 * @param value
 * @returns {(number|number)[]|*[]}
 */
Array.prototype.findIndexByKeyValue = function(key, value) {
    return shnea.findIndexByKeyValue(this, key, value);
};

/**
 * 배열에서 특정 키로 인덱스 찾기
 * @param key
 * @returns {(number|number)[]|*[]}
 */
Array.prototype.findIndexByKey = function(key) {
    return shnea.findIndexByKey(this, key);
};
