function CallNotService() {
    top.location.href = 'checkOutMsg.asp';
}
function CallTop30ItemDirectGo(itemType) {
    top.location.href = 'popularItem.asp?Inclusion=' + itemType;
}
function RankArrowChange(rankArrowValue) {
    if (rankArrowValue == null || rankArrowValue == '') {
        return 'rankNoChange';
    }
    switch (rankArrowValue) {
        case 'UP': rankArrowValue = 'rankUp';
            break;
        case 'DOWN': rankArrowValue = 'rankDown';
            break;
        case '-': rankArrowValue = 'rankNoChange';
            break;
        case 'NEW': rankArrowValue = 'new';
            break;
        default: rankArrowValue = 'rankNoChange';
            break;
    }
    return rankArrowValue;
}
function RankArrowNameChange(rankArrowValue) {
    if (rankArrowValue == null || rankArrowValue == '') {
        return '변동없음';
    }
    switch (rankArrowValue) {
        case 'UP': rankArrowValue = '상승';
            break;
        case 'DOWN': rankArrowValue = '하락';
            break;
        case '-': rankArrowValue = '변동없음';
            break;
        case 'NEW': rankArrowValue = 'new';
            break;
        default: rankArrowValue = '변동없음';
            break;
    }
    return rankArrowValue;
}
function RankingValidation(rankingNumber) {
    if (rankingNumber == '0') {
        rankingNumber = '';
    }
    return rankingNumber;
}
function CallTop5ItemView(GLB_DOMAIN_IMGC) {
    var bufferHtml = '';
    var jsonData;
    var existData = false;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "itemTop5BestView.asp",
        async: false,
        error: function (XHR, textStatus, errorThrown) {
            document
                .getElementById('ranking')
                .style
                .display = 'none';
            document
                .getElementById('rankingOutMsg')
                .style
                .display = 'block';
        },
        success: function (data) {
            jsonData = data;
            existData = true;
        },
        complete: function (object) {}
    });
    if (existData == true) {
        if (jsonData[0].ErrorCode != '0') {
            document
                .getElementById('ranking')
                .style
                .display = 'none';
            document
                .getElementById('rankingOutMsg')
                .style
                .display = 'block';
            return;
        }
        if (jsonData.length > 0) {
            $('#rankingDate').text(jsonData[0].NowDate + ' 기준');
        }
        for (var i = 1; i < jsonData.length; i++) {
            for (var j = 1; j <= jsonData[i].data[0].count; j++) {
                bufferHtml = '<span><img src="' + GLB_DOMAIN_IMGC + '/games/ro1/20130212_item_deal/itemDeal/images/icon_' + RankArrowChange(jsonData[i].data[j].rankState) + '.gif"';
                bufferHtml = bufferHtml + ' alt="' + RankArrowNameChange(jsonData[i].data[j].rankState) + '" />' + RankingValidation(jsonData[i].data[j].rankWidth) + '</span>';
                if (top
                        .document
                        .location
                        .href
                            .indexOf('dealSearch') == '-1') {
                    bufferHtml = bufferHtml + '<a href="#itemSearch" onclick="top.document.location.href = \'dealSearch.asp?itemfullname=' + encodeURIComponent(jsonData[i].data[j].itemName) + '\'">' + jsonData[i].data[j].itemName + '</a>';
                } else {
                    bufferHtml = bufferHtml + '<a href=\'#itemSearch\' onclick=\'CallItemDealList(-1, "' + jsonData[i].data[j].itemName + '","","", 1);\'>' + jsonData[i].data[j].itemName + '</a>';
                }
                $('#bestView' + jsonData[i].data[0].equipment + ' li').eq(j - 1).html(bufferHtml);
                bufferHtml = '';
            }
        }
    }
}
function GoToList(obj) {
    document
        .getElementById(obj + 'View')
        .style
        .display = 'none';
    document
        .getElementById(obj + 'List')
        .style
        .display = 'block';
    document
        .getElementById('searchResult')
        .style
        .display = 'block';
}
function ItemFullNameChangeClass(action, cssObj) {
    if (action == 'onblur') {
        var objItemName = document.getElementById('itemFullName');
        if ($.trim(objItemName.value) == '') {
            $('#itemFullName').attr('class', 'item' + cssObj + ' inputMsg');
            objItemName.value = $.trim(objItemName.value)
        }
        return;
    }
    $('#itemFullName').attr('class', 'item' + cssObj);
}
function CallValidationSubmitSearch(ValidationServer) {
    var objSvrID = document.getElementById('svrID');
    var objItemName = document.getElementById('itemFullName');
    if (ValidationServer == true) {
        if ($.trim(objSvrID.value) == '') {
            alert('서버를 선택 해 주세요.');
            objSvrID.focus();
            return false;
        }
    }
    if ($.trim(objItemName.value) == '') {
        alert('아이템 이름을 입력하세요.');
        objItemName.focus();
        return false;
    }
    return true;
}
function ItemDetailLink(searh) {
    var url = 'http://ro.gnjoy.com/guide/runemidgarts/result.asp?runSearch=' + encodeURIComponent(searh);
    window.open(url);
}