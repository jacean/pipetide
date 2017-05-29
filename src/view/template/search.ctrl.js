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
        width:"80px",
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
                var uid = row['uid'];
                window.location.href = "detail.html?uid=" + uid;;
            }

        },
        button: {

        }
    });
    //每次都是加载script，所以需要这时候绑定事件
    $("#search_submit").click(function () {
        $("#seq_data_table").data("jBsTable").refresh();
    });

}