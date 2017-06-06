var data_check_field = [{
    checkbox: true,
    width: "2%",
}, {
    field: 'uid',
    title: 'uid',
}, {
    field: 'title',
    title: 'title',
    editable: true
}, {
    field: 'sequence',
    title: 'sequence',
}, {
    field: 'length',
    title: 'length',
}, {
    field: 'fromdb',
    title: 'from database',
    editable: true
}, {
    field: 'activity',
    title: 'activity',
    editable: true
}, {
    field: 'source',
    title: 'source',
    editable: true
}, {
    field: 'dblink',
    title: 'database link',
    editable: true
}, {
    field: 'target',
    title: 'target',
    editable: true
}, {
    field: 'validated',
    title: 'validated',
    editable: true
}, {
    field: 'desctext',
    title: 'descrpition',
    editable: true
}];


var ctrl_check_init = function () {
    //初始化表单
    jUI.jBsTable("#check_sequ_table", {
        config: {
            url: "ajax_data_check.php",
            toolbar: '#check_toolbar', //工具按钮用哪个容器
            sidePagination: "server",
            uniqueId: "uid",
            columns: data_check_field,
            queryParams: function (params) {
                var temp = {
                    limit: params.limit, //页面大小
                    offset: params.offset, //页码
                };
                return temp;
            },
            onDblClickRow: function (row, $element) {
                //进入到详情页
                //alert(row['uid']);
                var uid = row['uid'];
                // window.location.href = "detail.html?uid=" + uid;;
            },
            onEditableSave: function (field, row, oldValue, $el) {
                // console.log(JSON.stringify(row));
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "ajax_update_check.php",
                    data: { row: row, field: field, type: "update" },//其他地方有delete
                    success: function (data) {
                        if (data.status == "ok") {
                            //alert("编辑成功");
                            // $("#check_sequ_table").data("jBsTable").refresh();

                        } else {
                            alert("error:" + data.result);
                        }
                    },
                    error: function (e) {
                        alert("Error" + e.responseText);
                    },
                    complete: function () {

                    }

                });
            }

        },
        button: {

        }
    });


    $("#check_export_save").click(function () {
        var type = $("#check_export_type").val(), data;
        var $table = $("#check_sequ_table");
        if (type != "all") {
            if (type == "basic") {
                data = $table.bootstrapTable("getData");//服务端分页，所以当前加载的就是全部了
            }
            if (type == "selected") {
                data = $table.bootstrapTable("getAllSelections");
            }
            if (data.length > 0) {
                data = data.map(function (d) { return d.uid });
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "ajax_update_check.php",
                    data: { row: data, type: "save" },//其他地方有delete
                    success: function (data) {
                        if (data.status == "ok") {
                            //alert("编辑成功");
                            $("#check_sequ_table").data("jBsTable").refresh();

                        } else {
                            alert("error:" + data.result);
                        }
                    },
                    error: function (e) {
                        alert("Error" + e.responseText);
                    },
                    complete: function () {

                    }

                });
            } else {
                alert("没有选中项可供保存");
            }
        } else {
            $.ajax({
                type: "post",
                dataType: "json",
                url: "ajax_update_check.php",
                data: { type: "save" },//其他地方有delete
                success: function (data) {
                    if (data.status == "ok") {
                        //alert("编辑成功");
                        $("#check_sequ_table").data("jBsTable").refresh();

                    } else {
                        alert("error:" + data.result);
                    }
                },
                error: function (e) {
                    alert("Error" + e.responseText);
                },
                complete: function () {

                }

            });
        }


    });
    $("#check_export_del").click(function () {
        var type = $("#check_export_type").val(), data;
        var $table = $("#check_sequ_table");
        if (type != "all") {
            if (type == "basic") {
                data = $table.bootstrapTable("getData");//服务端分页，所以当前加载的就是全部了
            }
            if (type == "selected") {
                data = $table.bootstrapTable("getAllSelections");
            }
            if (data.length > 0) {
                data = data.map(function (d) { return d.uid });
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "ajax_update_check.php",
                    data: { row: data, type: "delete" },//其他地方有delete
                    success: function (data) {
                        if (data.status == "ok") {
                            //alert("编辑成功");
                            $("#check_sequ_table").data("jBsTable").refresh();

                        } else {
                            alert("error:" + data.result);
                        }
                    },
                    error: function (e) {
                        alert("Error" + e.responseText);
                    },
                    complete: function () {

                    }

                });
            } else {
                alert("没有选中项可供保存");
            }
        } else {
            $.ajax({
                type: "post",
                dataType: "json",
                url: "ajax_update_check.php",
                data: { type: "delete" },//其他地方有delete
                success: function (data) {
                    if (data.status == "ok") {
                        //alert("编辑成功");
                        $("#check_sequ_table").data("jBsTable").refresh();

                    } else {
                        alert("error:" + data.result);
                    }
                },
                error: function (e) {
                    alert("Error" + e.responseText);
                },
                complete: function () {

                }

            });
        }

    });
}
