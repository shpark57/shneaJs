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
        return ssn.replace(/(\d{6})\d{7}/, '$1-*******');
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
        return days > 0 ? `${days} ${formattedTime}` : formattedTime;
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
        return str.replace(emojiRegex, match => emojiToUnicode(match));
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
}))();


/**
 * 문자열을 카멜케이스로 변환
 * @returns {string}
 */
String.prototype.toCamelCase = function() {
    return this.toLowerCase().replace(/[-_\s]+(.)?/g, (match, char) => char ? char.toUpperCase() : '');
};

/**
 * 문자열을 스네이크케이스로 변환
 * @param separator
 * @returns {string}
 */
String.prototype.toSnakeCase = function(separator = '_') {
    return this.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase()
};

/**
 * 초를 시간:분:초로 변환
 * @returns {string}
 */
String.prototype.secToTime = function() {
    const sec = Number(this); // this를 숫자로 변환
    const padWithZeros = (num) => num.toString().padStart(2, '0');

    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    const formattedTime = `${padWithZeros(hours)}:${padWithZeros(minutes)}:${padWithZeros(secs)}`;
    return days > 0 ? `${days} ${formattedTime}` : formattedTime;
}

/**
 * 하나의 이모지를 유니코드로 변환
 * @returns {string}
 */
String.prototype.emojiToUnicode = function() {
    return Array.from(this).map(char => {
        let hex = char.codePointAt(0).toString(16).toUpperCase();
        return '&#x' + hex + ';';
    }).join('');
}

/**
 * 이모지를 유니코드로 변환
 * @returns {string}
 */
String.prototype.extractAndReplaceEmojis = function() {
    const emojiRegex = /([\u203C-\u3299\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F])/g;
    return this.replace(emojiRegex, match => emojiToUnicode(match));
}

/**
 * 유니코드를 이모지로 변환
 * @returns {string}
 */
String.prototype.decodeUnicodeToEmoji = function() {
    return this.replace(/&#x([A-F0-9]+);/g, (match, hex) => {
        return String.fromCodePoint(parseInt(hex, 16));
    });
}

/**
 * HTML 태그 제거
 * @returns {string}
 */
String.prototype.removeHtmlTags = function() {
    return this.replace(/<[^>]*>?/g, '');
}


/**
 * 초를 시간:분:초로 변환
 * @returns {string}
 * (1).secToTime() 또는  var num = 1; num.secToTime() 와 같이 사용해야함
 * 1.secToTime() 는 에러 발생
 */
Number.prototype.secToTime = function() {
    const sec = this; // this를 숫자로 변환
    const padWithZeros = (num) => num.toString().padStart(2, '0');

    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    const formattedTime = `${padWithZeros(hours)}:${padWithZeros(minutes)}:${padWithZeros(secs)}`;
    return days > 0 ? `${days} ${formattedTime}` : formattedTime;
}



/**
 * 배열에서 특정 키의 값으로 인덱스 찾기
 * @param key
 * @param value
 * @returns {(number|number)[]|*[]}
 */
Array.prototype.findIndicesByKey = function(key, value) {
    if (!key) { return [];}
    return this.map((element, index) => element[key] === value ? index : -1).filter(index => index !== -1);
};

/**
 * 배열에서 특정 키로 인덱스 찾기
 * @param key
 * @returns {(number|number)[]|*[]}
 */
Array.prototype.findIndexByKey = function(key) {
    if (!key) { return [];}
    return this.map((item, index) => item.hasOwnProperty(key) ? index : -1).filter(index => index !== -1);
};

