var ctrl_add_init = function () {
    //阻止默认提交事件
    $("form").submit(function (e) {
        e.preventDefault();
    });
    //添加分类显示的模块
    // $("#tabContainer").html($("#addMoudle").html());
    $("#tabContainer").load("template/add.tpl.html", function (r, s) {
        if (s == "success") {
            $("#add_activity_antibacterial_select").select2({
                minimumResultsForSearch: Infinity,
                data: data_select_antibacterial
            });
            $("#submit_add_moudle").click(function () {
                if(window.isLog!="LOG_END"){
                    alert("please submit after log in!");
                    return;
                }
                submitAddMoudle();
            });
        }
    });

    function submitAddMoudle() {
        //addmoudle模块上传事件
        var sequence = $("#add_val_sequence").val();
        var title = $("#add_val_title").val();
        if (sequence == "" || title == "") {
            alert("请输入序列及序列标题");
            return;
        }
        if (!(/^[A-Za-z]+$/.test(sequence))) { //只能提交英文字母
            alert("请输入合法序列");
            return;
        }
        //            var fd = new FormData(document.getElementById("form_add_moudle"));
        var fd = new FormData();
        fd.append("title", $("#add_val_title").val());
        fd.append("sequence", $("#add_val_sequence").val());

        var activity = (function () {
            var act = "";
            $("input[name='add_val_activity_cb']:checked").each(
                function () {
                    if ($(this).attr("id") ==
                        "add_activity_antibacterial") {
                        var select = $(
                            "#add_activity_antibacterial_select"
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
                                act += "anti-Gram+ & Gram-,";
                                break;
                            case "unknown":
                                act += "Antibacterial,";
                        }
                    } else {
                        act += $(this).val() + ",";
                    }

                });
            act = act == "" ? "" : act.substr(0, act.length - 1);
            return act;
        })();
        fd.append("activity", activity); //DONE:选项值
        fd.append("validated", $("#add_val_validated").val());
        fd.append("source", $("#add_val_source").val());
        fd.append("target", $("#add_val_target").val());
        fd.append("desctext", $("#add_val_desctext").val());
        $.ajax({
            cache: true,
            type: "POST",
            url: 'ajax_data_add.php',
            data: fd,
            async: false,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            error: function (request) {
                alert("提交失败！");
            },
            success: function (data) {
                if (data.status == "ok") {
                    alert("添加成功！" + data.result);
                } else {
                    alert("添加失败:" + data.result);
                }

            },
            dataType: "json"
        });

    }

    // /*上传附件addmodlue，稍后改*/
    // $('input[id=add_val_file]').change(function () {
    //     $('#add_val_file_show').val($(this).val());
    // });
}