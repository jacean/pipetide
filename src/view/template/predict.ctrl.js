var ctrl_predict_init = function (dom) {
    //阻止默认提交事件
    $("form").submit(function (e) {
        e.preventDefault();
    });

    /**
     * 设置预测小模块显示值
     */
    var $t = $(dom);
    var text = $t.data('text'), value = $t.data('value'), label = $t.data('label');
    $("#testType").text(text);
    $("#testType").data('value', value);
    $("#testLabel").text(label);

    //初始化上传文件按钮
    jUI.jUpload("#uploadFile");

    //初始化按钮事件
    $("#seqeSubmit").click(function () {
        // submitForm("seqeForm", "IMP_PUP");
        if ($("#seqe").val().trim() == "") {
            // console.log(1);
            return;
        }
        // $(this).attr("disabled",true);
        addLoading();
        submitForm("seqeForm", $("#testType").data("value"));

    });
    $("#fileSubmit").click(function () {
        // $(this).attr("disabled",true);
        addLoading();
        submitForm("fileForm", $("#testType").data("value"));

    });

    //隐藏结果面板            
    $("#resultPanel").hide();

    function setResultPanel(title, status) {

    }

    function addLoading() {

        var loadHtml = "<div class='loading'>" +
            "<span > </span>" +
            "<span > </span>" +
            "<span > </span>" +
            "<span > </span>" +
            "<span > </span>" +
            "</div>";
        $("#resultPanel").show().removeClass("panel-success panel-danger").addClass("panel-default");
        $("#resultTitle").html("正在执行");
        $("#resultInfo").html("");
        $("#resultInfo").append(loadHtml);
        $("#seqeSubmit").attr("disabled", true);
        $("#seqeSubmit").addClass("j-btn-disable");
        $("#fileSubmit").addClass("j-btn-disable");
        $("#fileSubmit").attr("disabled", true);
    }

    function removeLoading() {
        $(".loading").remove();
        $("#seqeSubmit").attr("disabled", false);
        $("#fileSubmit").attr("disabled", false);
        $("#seqeSubmit").removeClass("j-btn-disable");
        $("#fileSubmit").removeClass("j-btn-disable");
    }

    function submitForm(formid, exec) {
        var fd = new FormData(document.getElementById(formid));
        fd.append("exec", exec);
        fd.append("type", formid);
        $.ajax({
            cache: true,
            type: "POST",
            url: '../server/uploadclassnew.php',
            data: fd,
            async: true,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            error: function (request) {
                $("#resultPanel").show().removeClass("panel-default panel-success").addClass(
                    "panel-danger");
                $("#resultTitle").html("提交失败");
                $("#resultInfo").html(request.responseText);
                removeLoading();
            },
            success: function (data) {
                if (data.status == "ok") {
                    $("#resultPanel").show().removeClass("panel-default panel-danger").addClass(
                        "panel-success");
                    $("#resultTitle").html("执行成功");
                    var str = data.result;
                    // $("#resultInfo").html(str.replace(/\r\n/g,"</br>"));
                    var strArr = str.split('\r\n');
                    var len = strArr.length;
                    var tempStr = "";
                    for (var i = 0; i < len; i++) {
                        tempStr += "<p>" + strArr[i] + "</p>"
                    }
                    tempStr += "<a href='" + data.data + "'>click this to download result file</a>";
                    $("#resultInfo").html(tempStr);                    
                    $("#resultInfo").append("<div id='predict_result_table'></div>");
                    var predictStr = data.predict;
                    console.log(predictStr);
                    var predictArr = predictStr.split("\n"), predictObject = [], predictHead = [];
                    var predictDesc = predictArr[0].split(",");

                    //当原本宽度不够大的时候，百分比不会扩充
                    var allw=$("#predict_result_table").width();
                    // var widthp = parseInt(100 / predictDesc.length);
                    var widthp = parseInt(allw / predictDesc.length);                    
                    // var left = 100;
                    var left = allw;
                    for (var i = 0, l = predictDesc.length - 1; i < l; i++) {
                        left -= widthp;
                        predictHead.push({
                            field: predictDesc[i],
                            title: predictDesc[i],
                            width: widthp + 'px'
                        });
                    }
                    predictHead.push({
                        field: predictDesc[i],
                        title: predictDesc[i],
                        width: left + 'px'
                    });
                    for (var i = 1, l = predictArr.length; i < l; i++) {
                        var arr = predictArr[i].split(","), obj = {};
                        if (arr.length < 2) { continue; }
                        for (var j = 0, c = predictDesc.length; j < c; j++) {
                            obj[predictDesc[j]] = arr[j];
                        }
                        predictObject.push(obj);
                    }
                    console.log(predictObject);
                    jUI.jBsTable("#predict_result_table", {
                        config: {
                            data: predictObject,
                            sidePagination: "client",
                            columns: predictHead,
                            queryParams: function (params) {
                                var temp = {
                                    limit: params.limit, //页面大小
                                    offset: params.offset, //页码
                                };
                                return temp;
                            }
                        }
                    });

                } else {
                    $("#resultPanel").show().removeClass("panel-default panel-success").addClass(
                        "panel-danger");
                    $("#resultTitle").html("执行失败");
                    var str = data.result;
                    // $("#resultInfo").html(str.replace(/\r\n/g,"</br>"));
                    var strArr = str.split('\r\n');
                    var len = strArr.length;
                    var tempStr = "";
                    for (var i = 0; i < len; i++) {
                        tempStr += "<p>" + strArr[i] + "</p>"
                    }
                    $("#resultInfo").html(tempStr);
                }
                removeLoading();
            },
            dataType: "json"
        });
    }
}