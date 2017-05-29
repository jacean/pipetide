;
(function () {

    /**
     * data is object by json
     * 
     */
    /*
    
    
    */
    var jSlide = function (dom, options) {
        this.$main = dom;
        this.options = options;
        this.data = options.data;
        this.event = options.event;
        this.init();
    }

    jSlide.prototype = {
        init: function () {
            var self = this;
            if (!this.createElement()) {
                return;
            }
            this.bindGroupEvent();
            this.bindLinkEvent();
            this.bindTabEvent();


            var event = self.event;
            /**
             * 控制显示隐藏
             */
            var control = $('.slide-control');
            control.click(function () {
                if (control.hasClass("slide-head-show")) {
                    control.removeClass('slide-head-show');
                    control.addClass('slide-head-hide');
                    control.removeClass('glyphicon glyphicon-chevron-left');
                    control.addClass('glyphicon glyphicon-chevron-right');
                    $('.slide-container').css('opacity', '0');
                    event.hide();
                } else {
                    control.removeClass('slide-head-hide');
                    control.addClass('slide-head-show');
                    control.removeClass('glyphicon glyphicon-chevron-right');
                    control.addClass('glyphicon glyphicon-chevron-left');
                    event.show();
                    $('.slide-container').css({ 'opacity': 1 });
                }
            })
            if (self.options.selected) {
                var $tabs = self.$main.find("[data-type='tab']");
                if ($tabs.length > 0) $tabs[0].click();
            }

        },
        createElement: function () {
            var self = this;
            var data = self.data;
            if (typeof data != "object") {
                return false;
            }

            function createOption(option) {
                if (typeof option == "string") {
                    return '<div class="slide-option ">' + option + '</div>';
                }
                if (typeof option == "object") {
                    return '<div class="slide-option" data-text="' + option.text + '" data-type="' + option.type + '" ' +
                        (option.type == "tab" ? 'data-label="' + option.label + '" ' : "") +
                        ' data-value="' + option.value + '">' +
                        option.text +
                        '</div>';
                }

            }

            function createGroup(groupObject) {
                var optionsArr = groupObject.options;
                var groupHtml = '<div class="slide-group slide-option">'; //既是group又是option
                groupHtml += '<div class="slide-group-header ">' +
                    groupObject.header +
                    '</div>';
                var len = optionsArr.length;
                for (var i = 0; i < len; i++) {
                    if (typeof optionsArr[i] == "string") {
                        groupHtml += createOption(optionsArr[i]);
                    }
                    if (typeof optionsArr[i] == "object" && !(optionsArr[i] instanceof Array)) {
                        // groupHtml += createGroup(optionsArr[i]);
                        if (optionsArr[i].type == "group") {
                            groupHtml += createGroup(optionsArr[i]);
                        } else {
                            groupHtml += createOption(optionsArr[i]);
                        }
                    }
                };
                groupHtml += '</div>';
                return groupHtml;
            };

            function createBody(bodyArr) {
                var len = bodyArr.length;
                var bodyHtml = '<div class="slide-body">';
                for (var i = 0; i < len; i++) {
                    if (typeof bodyArr[i] == "string") {
                        bodyHtml += createOption(bodyArr[i]);
                    }
                    if (typeof bodyArr[i] == "object" && !(bodyArr[i] instanceof Array)) {
                        if (bodyArr[i].type == "group") {
                            bodyHtml += createGroup(bodyArr[i]);
                        } else {
                            bodyHtml += createOption(bodyArr[i]);
                        }
                    }
                };
                bodyHtml += '</div>';
                return bodyHtml;
            }

            function createHeader(headerObject) {
                var headerHtml = '<div class="slide-header">';

                if (typeof headerObject == "string") {
                    headerHtml += '<div class="slide-header-content">' + headerObject + '</div>';
                }
                if (typeof headerObject == "object") {
                    headerHtml += '<div class="slide-header-content">' + headerObject.main + '</div>' +
                        '<div class="slide-header-label">' + headerObject.label + '</div>';
                }
                headerHtml += '</div>';
                return headerHtml;
            }

            function createFooter(footerArr) {
                var footerHtml = '<div class="slide-footer">';
                var len = footerArr.length;
                for (var i = 0; i < len; i++) {
                    footerHtml += '<div>' +
                        footerArr[i] +
                        '</div>';
                };
                footerHtml += '</div>';
                return footerHtml;
            }
            //add hide button 2017.5.1
            var Html = "<div class='slide-control slide-head-show glyphicon glyphicon-chevron-left'></div>"
            Html += ' <div class="slide-container">';
            if (data instanceof Array) {
                /**是数组，表示只传入了body */
                Html += createBody(data);
            } else {
                /**传进来的是对象 */
                if (typeof data.header != "undefined") {
                    Html += createHeader(data.header);
                }
                Html += createBody(data.body);
                if (typeof data.footer != "undefined") {
                    Html += createFooter(data.footer);
                }
            }
            Html += '</div>';
            self.$main.append(Html);
            return true;
        },
        /**
         * 点击隐藏组选项
         */
        bindGroupEvent: function () {
            var self = this;
            var $groupDom = self.$main.find(".slide-group-header");
            $groupDom.each(function () {
                $(this).click(function () {
                    // alert(this)
                    var $option = $(this).parent().find('.slide-option');
                    $option.toggle("normal");
                });
            });
        },
        bindTabEvent: function () {
            var self = this;
            var event = self.event;
            var $tab = self.$main.find("[data-type='tab']");
            $tab.each(function () {
                $(this).click(function () {
                    var $t = $(this);
                    event.tabEvent(this);
                });
            });
        },
        bindLinkEvent: function () {
            var self = this;
            var $link = self.$main.find("[data-type='link']");
            $link.each(function () {
                $(this).click(function () {
                    window.open($(this).data('value'));

                })
            });
        }
    }
    _jUI = {
        jSlide: function (selector, options) {
            $(selector).each(function () {
                $(this).data('jSlide', new jSlide($(this), options));
            });
            return $(selector);
        }
    }
    if (typeof window.jUI == "undefined") {
        window.jUI = {};
    }
    $.extend(window.jUI, _jUI);

})();