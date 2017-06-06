;
! function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';
    /**
     * 右上角显示用户信息，独立于页面之外吧
     * 1、原始界面未登录，右上角出现登录提示
     * 2、登录选择界面，登录和注册
     * 3、登录界面
     * 4、注册界面
     * 5、登录后的右上角信息展示
     */
    var defaultOptions = {
        data: {
            name: "guest",
            level: "guest",
            status: "LOG_WAIT"
        },
        event: {
            in: function (data, J) {
                console.log("login");
                /**
                 * ajax与后台交互，进行登录操作
                 * 密码在前台即做md5加密
                 */
                $.ajax({
                    type: "post",
                    url: "ajax_user_info.php",
                    data: data,
                    success: function (res) {
                        if (res.status == "ok") {
                            console.log("return response");
                            console.log(res.result);
                            J.refresh(J.LOGSTATUS[2], res.result);
                            //slide刷新，添加管理员修改的界面
                            if (res.result.level == "admin") {
                                var admin_slide_data = $.extend({}, data_slide_data);
                                admin_slide_data.body.unshift({
                                    text: "check submit",
                                    value: "check",
                                    type: "tab"
                                });
                                ctrl_slide_init();
                            } else {

                            }

                        } else {
                            alert(res.result);
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    },
                    dataType: "json"
                });


            },
            out: function (data, J) {
                console.log("logout");
                ctrl_slide_init();//如果事管理员退出的话就要重新刷新侧栏？？？
            },
            up: function (data, J) {
                console.log("sign up");
                /**
                 * 注册的时候可能需要用ajax实时和后台拿数据看是不是已经存在了这个邮箱账户
                 */
                $.ajax({
                    type: "post",
                    url: "ajax_user_info.php",
                    data: data,
                    success: function (res) {
                        if (res.status == "ok") {
                            console.log("return up response");
                            console.log(res.result);
                            //level?注册成功的用户都是普通用户
                            J.refresh(J.LOGSTATUS[2], res.result);

                        } else {
                            alert(res.result);
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    },
                    dataType: "json"
                });
            }
        }
    };
    var WindowText = {
        main: "Antimicrobial Peptide Online Forecasting Platform",
        sub: "Welcome to"
    }

    var btnConfig = [{
        text: "log in",
        value: "login",
        show: true
    }, {
        text: "log out",
        value: "logout",
        show: true
    }, {
        text: "sign up",
        value: "signup",
        show: true
    }];

    var UserNotify = function (_options) {
        //因为选项里包含多个对象，extend无法深度合并，所以单独处理
        if (_options == "undefined") _options = {};
        this.LOGSTATUS = ["LOG_WAIT", "LOG_SHOW", "LOG_END"];
        this.data = $.extend(defaultOptions.data, _options.data);
        this._data = defaultOptions.data;
        this.event = $.extend(defaultOptions.event, _options.event);

        this.template = {};
        this.template.container = '' +
            '<div class="login-container login-window-container">' +
            '<div class="login-mask"></div>' +
            '<div class="login-container-inbox">' +
            '</div>' +
            '</div>' +
            '';
        this.template.mainwindow = '' +
            '<div class="login-window " data-jrole="window-main">' +
            '<div class="login-box-icon"></div>' +
            '<div class="login-box-text">' +
            '<p class="login-sub-text">Welcome to</p>' +
            '<p class="login-main-text">Antimicrobial Peptide Online Forecasting Platform</p>' +
            '</div>' +
            '<div>' +
            '<button class="login-btn-main" data-jrole="btn-show-in">Log in</button>' +
            '<p class="login-btn-sub" data-jrole="btn-show-up">Sign up</p>' +
            '</div>' +
            '</div>' +
            '';
        this.template.notify = '' +
            '<div class="login-container login-notify-container">' +
            '<div class="login-notify-inbox">' +
            '<div class="login-notify-group"><span class=" login-notify-child login-notify-name">sign in</span></div>' +
            '<div class="login-notify-group"><span class="login-notify-child login-notify-level">guest</span></div>' +
            '<div class="login-notify-group"><span class=" login-notify-child login-notify-out">log out</span></div>' +
            '</div>' +
            '</div>' +
            '';
        this.template.inwindow = '' +
            '<div class="login-window " data-jrole="window-in">' +
            '<div class="login-input-group">' +
            '<label for="log-in-email" class="login-label">Email </label>' +
            '<input type="email" style="display:none">' +
            '<input type="email" class="login-input" id="log-in-email" placeholder="Email" autocomplete="off">' +
            '</div>' +
            '<div class="login-input-group">' +
            '<label for="log-in-pwd" class="login-label">Password</label>' +
            '<input type="password" style="display:none">' +
            '<input type="password" class="login-input" id="log-in-pwd" placeholder="Password" autocomplete="off">' +
            '</div>' +
            '<button type="" class="login-btn-main " data-jrole="btn-log-in">Log in</button>' +
            '<p class="login-btn-sub " data-jrole="btn-show-up">Sign up</p>' +
            '</div>' +
            '';
        this.template.upwindow = '' +
            '<div class="login-window " data-jrole="window-up">' +
            '<div class="login-input-group">' +
            '<label for="log-up-email" class="login-label">Email </label>' +
            '<input type="email" style="display:none">' +
            '<input type="email" class="login-input" id="log-up-email" placeholder="Email" autocomplete="off">' +
            '</div>' +
            '<div class="login-input-group">' +
            '<label for="log-up-pwd" class="login-label">Password</label>' +
            '<input type="password" style="display:none">' +
            '<input type="password" class="login-input" id="log-up-pwd" placeholder="Password" autocomplete="off">' +
            '</div>' +
            '<div class="login-input-group">' +
            '<label for="log-up-pwd2" class="login-label">Password</label>' +
            '<input type="password" style="display:none">' +
            '<input type="password" class="login-input" id="log-up-pwd2" placeholder="Password" autocomplete="off">' +
            '</div>' +
            '<button type="" class="login-btn-main " data-jrole="btn-log-up">Sign up</button>' +
            '<p class="login-btn-sub " data-jrole="btn-show-in">Log in</p>' +
            '</div>' +
            '';
        this.init();
    }
    UserNotify.prototype = {
        init: function () {
            var _me = this;
            _me.setContainer();
            _me.changeStatus(_me.data.status);
        },
        refresh: function (status, info) {
            this.changeStatus(status, info);
        },
        destroy: function () {

        },
        changeStatus: function (status, info) {
            this.hideAll();
            if (status == this.LOGSTATUS[0]) {
                this.setLogWait(this._data);//默认的未登录提示信息
            }
            if (status == this.LOGSTATUS[1]) {
                this.setLogShow();
            }
            if (status == this.LOGSTATUS[2]) {
                this.setLogEnd(info);//登陆后后台饭回来的数据
            }
            window.isLog = status;
        },
        setLogWait: function (info) {
            var _me = this;
            //未登录【guest,(hide),sign in】,status[0]
            $(".login-notify-container").show();

            $(".login-notify-name").text(info.name);
            $(".login-notify-level").text(info.level);
            $(".login-notify-out").text("sign in");

            $(".login-notify-level").parent().hide();

            $(".login-notify-out").click(function () {
                _me.changeStatus(_me.LOGSTATUS[1]);
            });
        },
        setLogShow: function () {
            var _me = this;
            _me.showWindow("main");
        },
        setLogEnd: function (info) {
            var _me = this;
            $(".login-notify-container").show();
            $(".login-notify-name").text(info.name);
            $(".login-notify-level").text(info.level);
            //已登录【wanjq,admin,log out】
            $(".login-notify-out").text("log out");
            $(".login-notify-level").parent().show();
            $(".login-notify-out").click(function () {
                _me.changeStatus(_me.LOGSTATUS[0]);
            });

        },
        setContainer: function () {
            /**
             * 将所有模板代码全部插入，写入固定标签信息，绑定事件
             */
            var template, _me = this;
            var info = _me.data;
            var tip = WindowText;
            $("body").remove(".login-container");
            $('body').append(_me.template.container);
            $('body').append(_me.template.notify);
            $('.login-container-inbox').append(this.template.mainwindow);
            $('.login-container-inbox').append(this.template.inwindow);
            $('.login-container-inbox').append(this.template.upwindow);
            $(".login-sub-text").text(tip.sub);
            $(".login-main-text").text(tip.main);

            _me.bindEvent();

        },
        showWindow: function (type) {
            $('body').addClass("body-mask");
            $(".login-window-container").show();
            $("[data-jrole^='window']").hide();
            $("[data-jrole*='-" + type + "']").show();
        },
        hideAll: function () {
            $("body").removeClass("body-mask");
            $(".login-notify-container").hide();
            $(".login-window-container").hide();
        },
        maskClick: function () {
            var _me = this;
            _me.changeStatus(_me.LOGSTATUS[0]);
        },
        bindEvent: function () {
            var _me = this;
            $(".login-mask").click(function () {
                _me.maskClick();
            });
            $("[data-jrole^='btn']").click(function () {
                var role = $(this).data("jrole");
                _me.handle(role);
            });
            //邮箱验证
            $("input[type='email']").change(function () {
                if (!_me.checkValid($(this).val(), "email")) {
                    alert("违法的邮箱格式");
                };
            });
            //密码验证
            $("input[type='password']").change(function () {
                if (!_me.checkValid($(this).val(), "password")) {
                    alert("密码支持6位及以上数字字母下划线");
                }; //数字字母下划线
            });
        },
        handle: function (role) {
            var _me = this;
            role = role.split("-");
            var dom = role[0],
                type = role[1];
            if (dom == "window") {
                console.log(event);
            }
            if (dom == "btn") {
                var event = role[2];
                if (type == "log") {
                    _me.logHandle(event);
                }
                if (type == "show") {
                    _me.showWindow(event);
                }

            }
        },
        logHandle: function (type) {
            var _me = this;
            var data = {};
            //需要设置页面信息，所以必须得在函数内部
            if (type == "in") {
                //进行验证？？？
                if (!_me.checkValid($("#log-in-email").val(), "email")) {
                    alert("违法的邮箱格式");
                    return;
                };

                data.email = $("#log-in-email").val();
                data.pwd = ($("#log-in-pwd").val());
                data.option = "in";
                data.type = "notify";
                _me.event.in(data, _me);
            }
            if (type == "up") {
                //进行验证？？？
                if (!_me.checkValid($("#log-up-email").val(), "email")) {
                    alert("违法的邮箱格式");
                    return;
                };
                if (!_me.checkValid($("#log-up-pwd").val(), "password")) {
                    alert("密码支持6位及以上数字字母下划线");
                    return;
                }; //数字字母下划线
                if ($("#log-up-pwd2").val() != $("#log-up-pwd").val()) {
                    alert("两次密码不匹配");
                    return;
                }
                data.email = $("#log-up-email").val();
                data.pwd = ($("#log-up-pwd").val());
                data.option = "up";
                data.type = "notify";
                _me.event.up(data, _me);
            }
            if (type == "out") {
                data = _me.data;
                data.option = "out"
                _me.event.out(data, _me);
            }
            console.log(data);
        },
        checkValid: function (str, type) {
            //type可以是空判断，邮箱判断之类
            return Util.checkStrValid(str, type);
        }
    }

    var _jUI = {
        usernotify: function (options) {
            return new UserNotify($(this), options);
        }
    }
    if (typeof window.jUI == "undefined") {
        window.jUI = {};
    }
    $.extend(window.jUI, _jUI);


});