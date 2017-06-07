var ctrl_slide_init = function (data) {
    //初始化左边栏
    var _data;
    if (typeof data == "undefined") {
        _data = data_slide_data;
    } else {
        _data = data;
    }
    jUI.jSlide("#slideContainer", {
        data: _data,
        event: data_slide_event,
        selected: false
    });
}