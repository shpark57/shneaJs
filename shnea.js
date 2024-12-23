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
    ,isSnakeCase  : (str) =>  {
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
     * 배열의 객체들 중에서 주어진 조건(객체)에 맞는 항목을 조회하는 함수.
     * @param arr
     * @param conditions
     * @returns {*|*[]}
     */
    ,queryObjectsByConditions : (arr, conditions, mode = 'find') => {
        // 조건을 검사하는 함수
        const conditionChecker = (element) =>
            Object.keys(conditions).every(key => element[key] === conditions[key]);

        // 입력 모드에 따라 다른 동작 수행
        switch (mode) {
            case 'find':
                // 첫 번째로 조건을 만족하는 객체를 반환
                return arr.find(conditionChecker);

            case 'filter':
                // 조건을 만족하는 모든 객체를 배열로 반환
                return arr.filter(conditionChecker);

            case 'map':
                // 조건을 만족하는 객체들의 인덱스를 배열로 반환
                return arr.map((element, index) => conditionChecker(element) ? index : -1)
                    .filter(index => index !== -1);

            default:
                return []
        }
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
    },
    /**
     * 전화번호 유효성 검사
     * @param phoneNumber
     * @returns {boolean}
     */
    isValidPhoneNumber: (phoneNumber) => {
        // 허용된 전화번호 형식 정규식 배열
        const phoneRegexes = [
            /^010-\d{4}-\d{4}$/,   // 휴대전화 번호 (010-XXXX-XXXX)
            /^02-\d{3,4}-\d{4}$/,  // 서울 지역번호 (02-XXXX-XXXX)
            /^0\d{2}-\d{3,4}-\d{4}$/  // 기타 지역번호 (0XX-XXXX-XXXX 또는 0XX-XXX-XXXX)
        ];

        // 하나의 정규식이라도 만족하면 true 반환
        return phoneRegexes.some(regex => regex.test(phoneNumber));
    },

    /**
     * 전화번호 포맷
     * @param phoneNumber
     * @returns {*|string}
     */
    formatPhoneNumber : (phoneNumber) => {
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
    ,compressImage: function(file, maxSizeInBytes, origin_nm, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            let img = new Image();
            img.onload = function() {
                let canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;
                let ratio = 1;
                const step = 0.02; // 압축 단계를 2%씩 줄임

                let compressedSize = file.size;

                // 압축 단계별로 크기를 확인하여 maxSizeInBytes에 가까워질 때까지 반복
                while (compressedSize > maxSizeInBytes && ratio > 0.1) {
                    ratio -= step; // 압축 단계 줄임
                    width *= ratio;
                    height *= ratio;

                    canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, width, height);

                    // Blob 생성하여 크기 확인
                    canvas.toBlob(function(blob) {
                        compressedSize = blob.size; // 정확한 Blob 크기
                    }, file.type);
                }

                // 최종 Blob 변환 후 콜백 호출
                canvas.toBlob(function(blob) {
                    const compressedFile = new File([blob], origin_nm, { type: blob.type });
                    callback(compressedFile);
                }, file.type);

                // 메모리 해제
                img = null;
                canvas = null;
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
    /**
     * 입력된 날짜 값을 파싱하여 지정된 형식으로 변환하는 함수.
     *
     * @param {string | number | Date} input - 파싱할 날짜 값 (문자열, 숫자 또는 Date 객체).
     * @param {string} format - 출력할 날짜 형식 (기본값: 'yyyy-MM-dd HH:mm:ss').
     * @returns {string} 지정된 형식으로 변환된 날짜 문자열 또는 잘못된 입력인 경우 오류 메시지.
     */
    ,parseDate: (input, format = 'yyyy-MM-dd HH:mm:ss') => {
        let date;
        if (input instanceof Date) {
            date = input;
        } else if (typeof input === 'string' || typeof input === 'number') {
            const str = input.toString().replace(/[-: ]/g, '');
            const length = str.length;

            if (length !== 8 && length !== 14) {
                return "잘못된 날짜입니다.";
            }

            const year = str.slice(0, 4);
            const month = str.slice(4, 6) - 1;
            const day = str.slice(6, 8);
            const hour = length === 14 ? str.slice(8, 10) : 0;
            const minute = length === 14 ? str.slice(10, 12) : 0;
            const second = length === 14 ? str.slice(12, 14) : 0;

            date = new Date(year, month, day, hour, minute, second);
        } else {
            return "잘못된 날짜입니다.";
        }

        const map = {
            'yyyy': date.getFullYear(),
            'MM': ('0' + (date.getMonth() + 1)).slice(-2),
            'dd': ('0' + date.getDate()).slice(-2),
            'HH': ('0' + date.getHours()).slice(-2),
            'mm': ('0' + date.getMinutes()).slice(-2),
            'ss': ('0' + date.getSeconds()).slice(-2)
        };

        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => map[matched]);
    }

    /**
     * 배열을 트리 구조로 변환
     * @param array
     * @param idField
     * @param parentField
     * @param sortField
     * @returns {*[]}
     */
    , arrayToTree : (array, idField = 'id', parentField = 'upper_id', sortField = 'sort')  => {
        const nodes = {};
        const roots = [];

        // 모든 노드를 id를 키로 하는 객체에 저장
        array.forEach(item => {
            nodes[item[idField]] = {...item, children: []};
        });

        // 각 노드를 그 부모의 children 배열에 추가
        array.forEach(item => {
            if (shnea.isEmpty(item[parentField])) {
                // parentField가 빈 문자열이면 루트 노드
                roots.push(nodes[item[idField]]);
            } else if (nodes[item[parentField]]) {
                // 부모 노드를 찾아서 children에 추가
                nodes[item[parentField]].children.push(nodes[item[idField]]);
            }
        });

        // 각 노드의 children 배열을 sortField 기준으로 정렬
        const sortChildren = (node) => {
            node.children.sort((a, b) => a[sortField] - b[sortField]);
            node.children.forEach(child => sortChildren(child));
        };

        // 루트 노드들도 sortField 기준으로 정렬
        roots.sort((a, b) => a[sortField] - b[sortField]);
        roots.forEach(root => sortChildren(root));

        return roots
    }

    /**
     * 트리를 배열로 변환
     * @param tree
     * @param idField
     * @param parentField
     * @param sortField
     * @returns {*[]}
     */
    , treeToArray : (tree, idField = 'id', parentField = 'upper_id', sortField = 'sort') => {
        const result = [];

        // 트리를 순회하면서 배열로 변환
        const traverse = (node) => {
            const { children, ...rest } = node;  // children을 제외한 나머지 필드 가져오기
            result.push(rest);  // 나머지 필드를 배열에 추가
            node.children.sort((a, b) => a[sortField] - b[sortField]).forEach(child => traverse(child));
        };

        tree.forEach(root => traverse(root));
        return result
    }

    /**
     * 배열을 통계 데이터로 변환
     * @param array
     * @param headerField
     * @param categoryField
     * @param valueField
     * @param includeTotal
     * @param includeAverage
     * @returns {*[]}
     */
    , arrayToStats : (array, headerField = 'date', categoryField = 'category', valueField = 'value', includeTotal = false, includeAverage = false) => {
        const stats = {};
        const allCategories = Array.from(new Set(array.map(item => item[categoryField])));

        array.forEach(item => {
            const headerValue = item[headerField];
            if (!stats[headerValue]) {
                stats[headerValue] = {};
                allCategories.forEach(category => {
                    stats[headerValue][category] = 0;
                });
            }
            stats[headerValue][item[categoryField]] += item[valueField];
        });

        // 모든 헤더 값에 대해 모든 카테고리가 존재하도록 보장
        for (const headerValue in stats) {
            allCategories.forEach(category => {
                if (!stats[headerValue][category]) {
                    stats[headerValue][category] = 0;
                }
            });
        }

        // 배열로 변환하여 반환
        const result = Object.entries(stats).map(([header, categories]) => ({
            [headerField]: header,
            ...categories
        }));

        // 토탈 및 평균 값 계산
        if (includeTotal  || includeAverage) {
            const total = { [headerField]: '합계' };
            const average = { [headerField]: '평균' };
            allCategories.forEach(category => {
                const totalValue = array
                    .filter(item => item[categoryField] === category)
                    .reduce((sum, item) => sum += item[valueField], 0);
                const totalCount = array.filter(item => item[categoryField] === category).length;
                if (includeTotal) total[category] = totalValue;
                if (includeAverage) average[category] = totalCount > 0 ? totalValue / totalCount : 0;
            });
            if (includeTotal) result.push(total);
            if (includeAverage) result.push(average);
        }

        return result;
    },
    /**
     * 문자열 길이 검사
     * @param password
     * @param length
     * @returns {boolean}
     */
    checkLength: (password , length) => {
        return password.length >= length;
    },

    /**
     * 대소문자 포함 검사
     * @param password
     * @returns {boolean}
     */
    checkUpperLowerCase: (password) => {
        return /[a-z]/.test(password) && /[A-Z]/.test(password);
    },

    /**
     * 특수문자 포함 검사
     * @param password
     * @returns {boolean}
     */
    checkSpecialChar: (password) => {
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    },

    /**
     * 반복 문자 및 문자열 검사
     * @param password
     * @returns {boolean}
     */
    checkRepeatedChars: (password) => {
        const regex = /(.{1,3})\1{2,}/g;
        return !regex.test(password);
    },

    /**
     * 비밀번호 체크 함수
     * level 1 : 8자 이상
     * level 2 : 8자 이상, 대소문자 포함
     * level 3 : 8자 이상, 대소문자 포함, 반복 문자 금지
     * level 4 : 8자 이상, 대소문자 포함, 특수문자 포함 (default)
     * level 5 : 8자 이상, 대소문자 포함, 특수문자 포함, 반복 문자 금지
     * @param password
     * @param level
     * @returns {Object}
     */
    checkPassword: (password, level = 4) => {
        const result = {
            isValid: true,
            reason: ""
        };

        if (!shnea.checkLength(password, 8)) {
            result.isValid = false;
            result.reason = "비밀번호 길이는 8자 이상이어야 합니다.";
            return result;
        }

        if (level >= 2 && !shnea.checkUpperLowerCase(password)) {
            result.isValid = false;
            result.reason = "비밀번호는 대소문자를 모두 포함해야 합니다.";
            return result;
        }

        if (level >= 3 && !shnea.checkRepeatedChars(password)) {
            result.isValid = false;
            result.reason = "비밀번호는 반복 문자를 포함할 수 없습니다.";
            return result;
        }

        if (level >= 4 && !shnea.checkSpecialChar(password)) {
            result.isValid = false;
            result.reason = "비밀번호는 특수문자를 포함해야 합니다.";
            return result;
        }

        if (level >= 5 && !shnea.checkRepeatedChars(password)) {
            result.isValid = false;
            result.reason = "비밀번호는 반복 문자를 포함할 수 없습니다.";
            return result;
        }

        return result;
    },
    multiSortByKeys: (array, keys) => {
        if (!Array.isArray(array)) {
            throw new Error('첫 번째 인자는 배열이어야 합니다.');
        }
        if (!keys || (typeof keys !== 'string' && !Array.isArray(keys))) {
            throw new Error('두 번째 인자는 문자열 또는 배열이어야 합니다.');
        }

        // 키를 배열 형태로 정리
        if (typeof keys === 'string') {
            keys = [{ key: keys, order: 'asc' }];
        } else if (!Array.isArray(keys)) {
            keys = [keys];
        } else {
            keys = keys.map((k) => (typeof k === 'string' ? { key: k, order: 'asc' } : k));
        }

        // 정렬 함수
        return [...array].sort((a, b) => {
            for (const { key, order = 'asc' } of keys) {
                if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
                if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            }
            return 0;
        });
    },
      // 30. 날짜의 차이 구하기
      dateDifference : (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        // 시간을 00:00:00으로 설정
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(d1 - d2);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      },

      // 31. 특정 날짜가 속한 달의 마지막 날 반환
      getLastDayOfMonth : (date) =>  {
        const d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
      },

      // 32. 날짜가 몇째 주인지 반환
      getWeekOfMonth : (date, type = 1) => {
        const d = new Date(date);
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        const dayOffset = firstDay.getDay();
        const weekOfMonth = Math.ceil((d.getDate() + dayOffset) / 7);

        if (type === 2) {
          const startOfYear = new Date(d.getFullYear(), 0, 1);
          const dayOfYear = Math.floor((d - startOfYear) / (1000 * 60 * 60 * 24));
          return Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);
        }

        return weekOfMonth;
      },

      // 33. 특정 날짜의 요일 반환
      getDayOfWeek : (date , type = null) => {
        var days = [];
        if(type == 'ko'){
            days = ['일', '월', '화', '수', '목', '금', '토'];
        }else if (type == 'en'){
            days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        }else{
            days = [0, 1, 2, 3, 4, 5, 6];
        }

        return days[new Date(date).getDay()];
      },

      // 34. 특정 날짜로부터 X일 더한 날짜 반환
      addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
      },

      // 35. 주말 조정 날짜 반환
      getAdjustedWeekendDate : (date, type = 1) => {
          const d = new Date(date);
          const day = d.getDay();

          // 토요일(6)일 경우
          if (day === 6) {
            return type === 1 ? d.addDays(- 1) : d.addDays(+ 2);
          }

          // 일요일(0)일 경우
          if (day === 0) {
            return type === 1 ? d.addDays(- 2) : d.addDays(+ 1);
          }

          // 주말이 아닌 평일은 그대로 반환
          return d;
      },

      // 36. 두 날짜 사이의 모든 날짜 반환
      getDatesBetween : (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dates = [];

        while (start <= end) {
          dates.push(new Date(start));
          start.setDate(start.getDate() + 1);
        }

        return dates;
      },

      // 37. 조건에 맞는 객체 조회
       /**
         * 배열에서 여러개의 특정 키 벨류로 객체,배역,index 찾기
         * ex ) Utils.queryObjectsByConditions((GLOBAL.bascVlu.list, {{id : '42' , useYn : 'Y'}, 'find')
         * ex ) Utils.queryObjectsByConditions((GLOBAL.bascVlu.list, {id : '42' , useYn : 'Y'}, 'filter')
         * ex ) Utils.queryObjectsByConditions((GLOBAL.bascVlu.list, {id : '42' , useYn : 'Y'}, 'index')
         * @param arr
         * @param conditionsㅉ
         * @param mode  default find
         * @returns {*|*[]}
         */
        queryObjectsByConditions : (arr, conditions, mode = 'find') => {
            // 조건을 검사하는 함수
            const conditionChecker = (element) =>
                Object.keys(conditions).every(key => element[key] === conditions[key]);

            // 입력 모드에 따라 다른 동작 수행
            switch (mode) {
                case 'find':
                    // 첫 번째로 조건을 만족하는 객체를 반환
                    return arr.find(conditionChecker);

                case 'filter':
                    // 조건을 만족하는 모든 객체를 배열로 반환
                    return arr.filter(conditionChecker);

                case 'index':
                    // 조건을 만족하는 객체들의 인덱스를 배열로 반환
                    return arr.map((element, index) => conditionChecker(element) ? index : -1)
                        .filter(index => index !== -1);

                default:
                    return []
            }
        },
    /**
     *
     * 38. 그룹화된 데이터에 대해 동적 키로 카운트 및 다양한 통계 계산을 수행하는 함수
     * 사용법
     * const groupBy = ['DEPTNAME', 'DEPTNO']; // 그룹화 기준
     * const keyToCount = 'USERTYPE'; // 동적으로 개수를 셀 키
     * const operations = [
     *     { field: 'value', type: 'sum' },
     *     { field: 'value', type: 'avg' },
     *     { field: 'value', type: 'max' },
     *     { field: 'value', type: 'min' },
     * ];
     *
     * const result = shnea.calculateByDynamicKey(list, groupBy, keyToCount, operations);
     */
    calculateByDynamicKey :  (data, groupBy, keyToCount, operations = []) =>{
        // 그룹화 처리
        const groupedData = data.reduce((groups, item) => {
            // 그룹 키 생성 (groupBy 필드값을 결합하여 고유 키 생성)
            const groupKey = groupBy.map(key => item[key] || 'undefined').join('|');

            // 그룹이 없다면 초기화
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    count: 0, // 총 항목 수 카운트 초기화
                    // 그룹화된 필드값 저장
                    ...groupBy.reduce((obj, key) => {
                        obj[key] = item[key];
                        return obj;
                    }, {}),
                };

                // 통계 초기화
                operations.forEach(({ field, type }) => {
                    if (type === 'sum' || type === 'avg') {
                        groups[groupKey][`sum_${field}`] = 0; // 합계 초기화
                    }
                    if (type === 'max') {
                        groups[groupKey][`max_${field}`] = -Infinity; // 최대값 초기화
                    }
                    if (type === 'min') {
                        groups[groupKey][`min_${field}`] = Infinity; // 최소값 초기화
                    }
                });
            }

            // 동적 키 값 가져오기
            const keyValue = item[keyToCount];

            // 동적 키의 카운트 초기화 및 증가
            if (!groups[groupKey][keyValue]) {
                groups[groupKey][keyValue] = 0;
            }
            groups[groupKey][keyValue] += 1; // 카운트 증가

            // 통계 연산 수행
            operations.forEach(({ field, type }) => {
                const value = parseFloat(item[field]) || 0; // 숫자 값으로 변환

                if (type === 'sum' || type === 'avg') {
                    groups[groupKey][`sum_${field}`] += value; // 합계 증가
                }
                if (type === 'max') {
                    groups[groupKey][`max_${field}`] = Math.max(groups[groupKey][`max_${field}`], value); // 최대값 계산
                }
                if (type === 'min') {
                    groups[groupKey][`min_${field}`] = Math.min(groups[groupKey][`min_${field}`], value); // 최소값 계산
                }
            });

            // 총 카운트 증가
            groups[groupKey].count += 1;

            return groups;
        }, {});

        // 평균 계산 (평균은 총 합계를 항목 수로 나누어 계산)
        Object.values(groupedData).forEach(group => {
            operations.forEach(({ field, type }) => {
                if (type === 'avg') {
                    group[`avg_${field}`] =
                        group.count > 0 ? group[`sum_${field}`] / group.count : 0;
                }
            });
        });

        // 결과를 배열로 변환 (객체에서 배열로 변환하여 반환)
        return Object.values(groupedData);
    },
    /**
     * 39. 데이터를 조인하고 그룹화 및 통계를 계산하는 함수
     * @param {Array} data1 - 기준 데이터 배열
     * @param {Array} data2 - 조인할 데이터 배열
     * @param {string} joinKey - 두 데이터 배열을 조인할 키
     * @param {Object} options - 옵션 객체
     *        - groupBy: 그룹화 기준 키 배열
     *        - aggregations: 통계 연산 정보 배열 [{ type, field, alias }]
     *           - type: 통계 유형 ('sum', 'count', 'average', 'max', 'min')
     *           - field: 계산 대상 필드
     *           - alias: 결과 필드 이름 (선택)
     * @returns {Array} - 조인된 데이터와 통계 결과를 포함한 배열
     */
    queryData : (data1, data2, joinKey, options = {}) => {
        const { groupBy, aggregations } = options;

        // 1. Join - data1 기준으로 data2 데이터를 연결
        const joinedData = data1.map(item1 => {
            const relatedItems = data2.filter(item2 => item2[joinKey] === item1[joinKey]);
            const details = relatedItems.map(item2 => ({ ...item1, ...item2 }));
            return { ...item1, details };
        });

        // 2. 통계 연산 추가
        joinedData.forEach(entry => {
            const { details } = entry;

            // Grouping 처리
            const groupedData = groupBy
                ? details.reduce((groups, item) => {
                    const groupKey = groupBy.map(key => item[key] || 'undefined').join('|');
                    if (!groups[groupKey]) groups[groupKey] = [];
                    groups[groupKey].push(item);
                    return groups;
                }, {})
                : { all: details };

            // Aggregations
            const groupStats = Object.entries(groupedData).map(([groupKey, items]) => {
                const aggregated = { groupKey };

                aggregations.forEach(({ type, field, alias }) => {
                    const values = items.map(item => parseFloat(item[field]) || 0);

                    if (type === 'sum') {
                        aggregated[alias || `sum_${field}`] = values.reduce((acc, val) => acc + val, 0);
                    } else if (type === 'count') {
                        aggregated[alias || `count_${field}`] = values.length;
                    } else if (type === 'avg') {
                        const sum = values.reduce((acc, val) => acc + val, 0);
                        aggregated[alias || `avg_${field}`] = values.length > 0 ? sum / values.length : 0;
                    } else if (type === 'max') {
                        aggregated[alias || `max_${field}`] = Math.max(...values);
                    } else if (type === 'min') {
                        aggregated[alias || `min_${field}`] = Math.min(...values);
                    }
                });

                return aggregated;
            });

            entry.stats = groupStats;
        });

        return joinedData;
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

String.prototype.isValidPhoneNumber = function() {
    return shnea.isValidPhoneNumber(this);
}
String.prototype.formatPhoneNumber = function() {
    return shnea.formatPhoneNumber(this);
}

String.prototype.isValidEmail = function() {
    return shnea.isValidEmail(this);
}
String.prototype.isValidSSN = function() {
    return shnea.isValidSSN(this);
}

String.prototype.secToTime = function() {
    return shnea.secToTime(this);
}
Number.prototype.secToTime = function() {
    return shnea.secToTime(this);
}
Array.prototype.findIndexByKeyValue = function(key, value) {
    return shnea.findIndexByKeyValue(this, key, value);
};
Array.prototype.findIndexByKey = function(key) {
    return shnea.findIndexByKey(this, key);
};
String.prototype.parseDate = function(format = 'yyyy-MM-dd HH:mm:ss') {
    return shnea.parseDate(String(this), format);
}
Number.prototype.parseDate = function(format = 'yyyy-MM-dd HH:mm:ss') {
    return shnea.parseDate(Number(this), format);
}
Date.prototype.parseDate = function(format = 'yyyy-MM-dd HH:mm:ss') {
    return shnea.parseDate(this, format);
}
Array.prototype.arrayToStats = function(headerField = 'date', categoryField = 'category', valueField = 'value', includeTotal = false, includeAverage = false) {
    return shnea.arrayToStats(this, headerField, categoryField, valueField, includeTotal, includeAverage);
}
Array.prototype.treeToArray = function(idField = 'id', parentField = 'upper_id', sortField = 'sort') {
    return shnea.treeToArray(this, idField, parentField, sortField);
}
Array.prototype.arrayToTree = function(idField = 'id', parentField = 'upper_id', sortField = 'sort') {
    return shnea.arrayToTree(this, idField, parentField, sortField);
}
Array.prototype.queryObjectsByConditions = function(conditions, mode = 'find') {
    return shnea.queryObjectsByConditions(this, conditions, mode);
}
String.prototype.checkPassword = function(level = 4) {
    return shnea.checkPassword(this, level);
}
String.prototype.checkLength = function(length) {
    return shnea.checkLength(this, length);
}
String.prototype.checkUpperLowerCase = function() {
    return shnea.checkUpperLowerCase(this);
}
String.prototype.checkSpecialChar = function() {
    return shnea.checkSpecialChar(this);
}
String.prototype.checkRepeatedChars = function() {
    return shnea.checkRepeatedChars(this);
}
Array.prototype.multiSortByKeys = function(keys, order = 'asc') {
    return shnea.multiSortByKeys(this, keys, order);
};
Array.prototype.calculateByDynamicKey = function(groupBy, keyToCount, operations = []) {
    return shnea.calculateByDynamicKey(this, groupBy, keyToCount, operations);
};
Array.prototype.queryData = function( data2, joinKey, options = {}) {
    return shnea.queryData(this, data2, joinKey, options);
};

Date.prototype.dateDifference = function(date) {
    return shnea.dateDifference(this, date);
}
Date.prototype.getLastDayOfMonth = function() {
    return shnea.getLastDayOfMonth(this);
}
Date.prototype.getWeekOfMonth = function(type = 1) {
    return shnea.getWeekOfMonth(this, type);
}
Date.prototype.getDayOfWeek = function(type = null) {
    return shnea.getDayOfWeek(this , type);
}
Date.prototype.addDays = function(days) {
    return shnea.addDays(this, days);
}
Date.prototype.getAdjustedWeekendDate = function(type = 1) {
    return shnea.getAdjustedWeekendDate(this, type);
}
Date.prototype.getDatesBetween = function(endDate) {
    return shnea.getDatesBetween(this, endDate);
}


