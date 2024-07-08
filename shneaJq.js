


/**
 * 그리드 행병합
 * @param colIdx
 * @param isStats
 * @returns {*}
 */
$.fn.rowspan = function(colIdx, isStats) {
    return this.each(function(){
        var that;
        $('tr', this).each(function(row) {
            $('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {

                if ($(this).html() == $(that).html()
                    && (!isStats
                        || isStats && $(this).prev().html() == $(that).prev().html()
                    ) && $(that).html() != ''
                ) {
                    rowspan = $(that).attr("rowspan") || 1;
                    rowspan = Number(rowspan)+1;

                    $(that).attr("rowspan",rowspan);

                    // do your action for the colspan cell here
                    $(this).hide();

                    //$(this).remove();
                    // do your action for the old cell here

                } else {
                    that = this;
                }

                // set the that if not already set
                that = (that == null) ? this : that;
            });
        });
    });
};

/**
 * 그리드 열병합
 * @param rowIdx
 * @returns {*}
 */
$.fn.colspan = function(rowIdx) {
    return this.each(function(){

        var that;
        $('tr', this).filter(":eq("+rowIdx+")").each(function(row) {
            $(this).find('td').filter(':visible').each(function(col) {
                if ($(this).html() == $(that).html() ) {
                    colspan = $(that).attr("colSpan") || 1;
                    colspan = Number(colspan)+1;

                    $(that).attr("colSpan",colspan);
                    $(this).hide(); // .remove();
                } else {
                    that = this;
                }

                // set the that if not already set
                that = (that == null) ? this : that;

            });
        });
    });
}

/**
 * 동적 모달 열기
 * @param options
 */
function openDynamicModal(options) {
    // 기본 옵션 설정
    const defaultOptions = {
        width: 400,                 // 다이얼로그의 기본 너비
        height: 300,                // 다이얼로그의 기본 높이
        title: 'Default Title',     // 다이얼로그의 기본 제목
        content: '',                // 다이얼로그의 기본 내용
        modal: true,                // 다이얼로그를 모달로 설정
        backgroundOpacity: 0.5,     // 모달 배경의 투명도
        backgroundColor: 'black',   // 모달 배경의 색상
        buttons: null,              // 다이얼로그의 버튼 설정
        openCallback: null,         // 다이얼로그 열기 시 호출될 콜백 함수
        closeCallback: null         // 다이얼로그 닫기 시 호출될 콜백 함수
    };

    // 사용자 옵션과 기본 옵션 병합
    const settings = $.extend({}, defaultOptions, options);

    // 고유 ID 생성
    const uniqueId = Math.random().toString(36).substr(2, 9);

    // 다이얼로그 생성
    $('<div id='+uniqueId+'>').dialog({
        title: settings.title,
        width: settings.width,
        height: settings.height,
        modal: settings.modal,
        buttons: settings.buttons,
        open: function () {
            // 모달 배경의 스타일 설정
            $(".ui-widget-overlay").css({
                opacity: settings.backgroundOpacity,
                filter: `Alpha(Opacity=${settings.backgroundOpacity * 100})`,
                backgroundColor: settings.backgroundColor
            });

            // 다이얼로그 내용 추가
            var div = $('<div>' + settings.content + '</div>');
            $(this).append(div);

            // 열기 콜백 함수 호출
            if (typeof settings.openCallback === 'function') {
                settings.openCallback.call(this);
            }
        },
        close: function (e) {
            // 다이얼로그 내용 비우기 및 파괴
            $(this).empty();
            $(this).dialog('destroy');

            // 닫기 콜백 함수 호출
            if (typeof settings.closeCallback === 'function') {
                settings.closeCallback.call(this);
            }
        },
    });
}




