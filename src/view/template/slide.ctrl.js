var ctrl_slide_init = function () {
    //初始化左边栏
    
    jUI.jSlide("#slideContainer", {
        data: data_slide_data,
        event: data_slide_event,
        selected:false
    });
}