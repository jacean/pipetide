;
(function () {

    /**
     * 
     * jUpload
     */
    var jUpload = function (dom, options) {
        this.$main = dom;
        this.oldID = this.$main.attr("id");;
        this.newID = this.oldID + "_jUpload"
        this.options = options;
        this.init();
    };

    jUpload.prototype = {
        init: function () {
            var self = this;
            this.$main.hide();
            var uploadHtml = '<input id="' + this.newID + '" type="text" disabled="disabled"  class="j-upload-input"/\>' +
                '<input type="button" class="j-upload-btn" onclick="' +
                "$('#" + self.oldID + "').click();"
                + '" value="上传"/\>';
            $(uploadHtml).insertBefore(this.$main);
            $("#" + self.oldID).change(function () {
                $('#' + self.newID).val($(this).val());
            });
        },
        clickUpload: function () {
            $("#" + this.oldID).click();
        }
    };
    _jUI = {
        jUpload: function (selector, options) {
            $(selector).each(function () {
                $(this).data('jUpload', new jUpload($(this), options));
            });
            return $(selector);
        }
    }
    if(typeof window.jUI=="undefined"){
        window.jUI={};
    }
    $.extend(window.jUI, _jUI);

})();