function CallError(pageType, errorID) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "error.asp",
        data: {
            pageType: pageType,
            errorID: errorID
        },
        cache: true,
        async: false,
        success: function (data) {
            document.getElementById(errorID).innerHTML = data;
            document
                .getElementById(errorID)
                .style
                .display = 'block';
        },
        complete: function (object) {}
    });
}
var itemDealLoading = true;
function CallItemDealList(svrID, itemFullName, itemOrder, inclusion, curpage) {
    if (itemDealLoading == false) {
        return;
    }
    document
        .getElementById('precautions')
        .style
        .display = 'none';
    if (svrID != '-1') {
        if (CallValidationSubmitSearch(false) == false) {
            return;
        }
    }
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "itemDealList.asp",
        data: {
            svrID: svrID,
            itemFullName: itemFullName,
            itemOrder: itemOrder,
            inclusion: inclusion,
            curpage: curpage
        },
        cache: true,
        async: false,
        beforeSend: function () {
            itemDealLoading = false;
            document
                .getElementById('inProgressMsg')
                .style
                .display = 'block';
        },
        error: function (XHR, textStatus, errorThrown) {
            CallError('normal', 'itemContents');
        },
        success: function (data) {
            if (data == 'checkOutMsg') {
                CallNotService();
                return;
            }
            document.getElementById('itemContents').innerHTML = data;
            document
                .getElementById('itemContents')
                .style
                .display = 'block';
            document
                .getElementById('divItemDealList')
                .style
                .display = 'block';
            document
                .getElementById('divItemDealView')
                .style
                .display = 'none';
            document
                .getElementById('searchResult')
                .style
                .display = 'block';
        },
        complete: function (object) {
            itemDealLoading = true;
            document
                .getElementById('inProgressMsg')
                .style
                .display = 'none';
        }
    });
}
function CallItemDealView(svrID, mapID, ssi, curpage) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "itemDealView.asp",
        data: {
            svrID: svrID,
            mapID: mapID,
            ssi: ssi,
            curpage: curpage
        },
        cache: true,
        async: false,
        beforeSend: function () {
            document
                .getElementById('inProgressMsg')
                .style
                .display = 'block';
        },
        error: function (XHR, textStatus, errorThrown) {
            CallError('normal', 'itemContents');
        },
        success: function (data) {
            if (data == 'checkOutMsg') {
                CallNotService();
                return;
            }
            document.getElementById('divItemDealView').innerHTML = data;
            document
                .getElementById('divItemDealView')
                .style
                .display = 'block';
            document
                .getElementById('divItemDealList')
                .style
                .display = 'none';
            document
                .getElementById('searchResult')
                .style
                .display = 'none';
        },
        complete: function (object) {
            document
                .getElementById('inProgressMsg')
                .style
                .display = 'none';
        }
    });
}