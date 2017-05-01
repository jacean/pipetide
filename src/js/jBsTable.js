$(function () {

    var defaultOptions = {
        config: {
            url: '', //请求后台的URL（*）
            method: 'get', //请求方式（*）
            // ajax:"ajaxRequest",
            toolbar: '', //工具按钮用哪个容器
            striped: true, //是否显示行间隔色
            cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true, //是否显示分页（*）
            sortable: false, //是否启用排序
            sortOrder: "asc", //排序方式
            queryParams: function (params) {
                return params;
            }, //传递参数（*）
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 10, //每页的记录行数（*）
            pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
            search: false, //是否显示表格搜索，服务端分页此搜索没用
            strictSearch: false, //模糊搜索
            showRefresh: true, //是否显示刷新按钮         
            clickToSelect: true, //是否启用点击选中行
            height: "", //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "uid", //每一行的唯一标识，一般为主键列
            showToggle: true, //是否显示详细视图和列表视图的切换按钮
            cardView: false, //是否显示详细视图
            detailView: false, //是否显示父子表
            showExport: false, //是否显示导出
            //exportDataType:"all"
            showColumns: true, //是否显示所有的列
            columns: "",
            /***************** 事件 *****************/
            onClickRow: function (row, $element) {
                // alert($element);
            },
            onLoadError: function (data) {
                alert(data);
            },
            onDblClickRow:function(row, $element,field){
                
            }
        },
        button: [{
            dom: "id",
            type: "click",
            event: function () {}
        }]


    }

    var defaultDom = {

    }
    var jBsTable = function (_dom, _options) {
        this.$table = _dom;
        this.options={};
        this.options.button= $.extend(defaultOptions.button, _options.button);
        this.options.config= $.extend(defaultOptions.config, _options.config);
        this.init();
    }
    jBsTable.prototype = {
        init: function () {
            var _me = this;
            _me.$table.bootstrapTable('destroy');
            _me.$table.bootstrapTable(_me.options.config);
        },
        //      
        //  dom,event,function
        //
        setBtnEvent: function () {
            var _me = this;
            var _bts = _me.options.button;
            for (var i = 0, len = _bts.length; i < len; i++) {
                $(_bts[i].dom).on(_bts[i].type, _bts[i].event);
            }
        }
    }
    _jUI = {
        jBsTable: function (selector, options) {
            $(selector).each(function () {
                $(this).data('jBsTable', new jBsTable($(this), options));
            });
            return $(selector);
        }
    }
    if (typeof window.jUI == "undefined") {
        window.jUI = {};
    }
    $.extend(window.jUI, _jUI);
});