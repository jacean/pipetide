var ctrl_search_init = function () {
    //阻止默认提交事件
    $("form").submit(function (e) {
        e.preventDefault();
    });
    //用select2初始化select选择
    $("#search_val_length").select2({
        width: "100%",
        minimumResultsForSearch: Infinity,
        data: data_select_search
    });
    $("#search_val_validated").select2({
        width: "100%",
        minimumResultsForSearch: Infinity,
        data: data_select_validated
    });
    $("#search_activity_antibacterial_select").select2({
        width: "80px",
        minimumResultsForSearch: Infinity,
        data: data_select_antibacterial
    });


    //初始化表单
    jUI.jBsTable("#seq_data_table", {
        config: {
            url: "ajax_data_search.php",
            toolbar: '#toolbar', //工具按钮用哪个容器
            sidePagination: "server",
            uniqueId: "uid",
            columns: data_table_field,
            queryParams: function (params) {
                var temp = {
                    limit: params.limit, //页面大小
                    offset: params.offset, //页码
                    uid: $("#search_val_uid").val(),
                    title: $("#search_val_title").val(),
                    length: $("#search_val_length").val(),
                    sequence: $("#search_val_sequence").val(),
                    activity: (function () {
                        var act = "";
                        $(
                            "input[name='search_val_activity_cb']:checked"
                        ).each(
                            function () {
                                if ($(this).attr("id") ==
                                    "search_activity_antibacterial"
                                ) {
                                    var select = $(
                                        "#search_activity_antibacterial_select"
                                    ).val();
                                    switch (select) {
                                        case "all":
                                            act += "Gram,"; //TODO:也有没说明具体性质的序列应该是Antibacterial or gram
                                            break;
                                        case "gram-":
                                            act += "Gram-,";
                                            break;
                                        case "gram+":
                                            act += "Gram+,";
                                            break;
                                        case "gram+&-":
                                            act +=
                                                "anti-Gram+ & Gram-,";
                                            break;
                                        case "unknown":
                                            act += "Antibacterial,";
                                    }
                                } else {
                                    act += $(this).val() + ",";
                                }

                            });
                        act = act == "" ? "" : act.substr(0, act.length -
                            1);
                        return act;
                    })(),
                    validated: $("#search_val_validated").val(),
                    fromdb: $("#search_val_fromdb").val(),
                    source: $("#search_val_source").val()
                };
                return temp;
            },
            onDblClickRow: function (row, $element) {
                //进入到详情页
                //alert(row['uid']);
                // var uid = row['uid'];
                // window.location.href = "detail.html?uid=" + uid;;
            },
            onClickCell: function (field, value, row, $element) {
                // console.log(value);
                if (field == "uid") {
                    // window.location.href = "detail.html?uid=" + value;;//避免弹窗阻止
                    var a = $("<a href='detail.html?uid=" + value+"' target='_blank'></a>").get(0);

                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    a.dispatchEvent(e);
                }
            }

        },
        button: {

        }
    });
    //每次都是加载script，所以需要这时候绑定事件
    $("#search_submit").click(function () {
        $("#seq_data_table").data("jBsTable").refresh();
    });


    function exportTableData() {
        var type = $("#search_export_type").val(), data;
        var $table = $("#seq_data_table");
        if (type != "all") {
            if (type == "basic") {
                data = $table.bootstrapTable("getData");//服务端分页，所以当前加载的就是全部了
            }
            if (type == "selected") {
                data = $table.bootstrapTable("getAllSelections");
            }
            if (data.length > 0) {
                data = data.map(function (d) { return { title: d.title, sequence: d.sequence, uid: d.uid } });
                $.ajax({
                    type: "post",
                    url: "ajax_data_write.php",
                    data: {
                        sequ: data,
                        isAll: false
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.status == "ok") {
                            window.open(res.result, 'target', '');
                        } else {
                            alert("服务器处理失败");
                        }
                    },
                    error: function (e) {
                        alert("error:" + e.responseText);
                    }
                });
            } else {
                alert("未选中序列可供导出");
            }
        } else {
            //这样一来一回平白增加了不少流量,太大了不允许交互
            $.ajax({
                type: "post",
                url: "ajax_data_write.php",
                data: { isAll: true },
                success: function (res) {
                    if (res.status == "ok") {
                        window.open(res.result, 'target', '');
                    } else {
                        alert("服务器处理失败");
                    }
                },
                error: function (e) {
                    console.log(e);
                    alert("error:" + e.responseText);
                },
                dataType: "json"
            });
        }
    }
    $("#search_export_result").click(function () {
        exportTableData();
    });
    $("#search_page_select").click(function(){
        var $table = $('#seq_data_table'),
        $page = $('#search_page_num');
        $table.bootstrapTable('selectPage', +$page.val());
    });
}