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
        type: "window",
        data: {
            main: "Antimicrobial Peptide Online Forecasting Platform",
            sub: "Welcome to"
        },
        event: { in: function (data) {
                console.log("login");
                /**
                 * ajax与后台交互，进行登录操作
                 * 密码在前台即做md5加密
                 */


            },
            out: function (data) {
                console.log("logout");
            },
            up: function (data) {
                console.log("sign up");
                /**
                 * 注册的时候可能需要用ajax实时和后台拿数据看是不是已经存在了这个邮箱账户
                 */
            }
        }
    };

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

        this.type = typeof _options.type == "undefined" ? defaultOptions.type : _options.type;
        this.data = $.extend(defaultOptions.data, _options.data);
        this.event = $.extend(defaultOptions.event, _options.event);

        this.template = {};
        this.template.container = '' +
            '<div class="login-container">' +
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
            '<div class="login-notify-container">' +
            '<div class="login-notify-inbox">' +
            '<div class="login-notify-group"><span class=" login-notify-child login-notify-name">wanjq</span></div>' +
            '<div class="login-notify-group"><span class="login-notify-child login-notify-level">admin</span></div>' +
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
            var type = _me.type,
                info = _me.data;
            if (type == "window") {
                _me.setWindow(info);
            }
            if (type == "notify") {
                _me.setNotify(info);
            }
            this.bindEvent();
        },
        setNotify: function () {

        },
        setWindow: function (info) {
            var _me = this;
            _me.setContainer();
            _me.setMainWindow(info);
            _me.setInWindow();
            _me.setUpWindow();
            _me.showWindow("main");
        },
        setContainer: function () {
            var template = this.template.container;
            $('body').append(template);
        },
        setMainWindow: function (info) {
            var template = this.template.mainwindow;
            $('.login-container-inbox').append(template);
            $(".login-sub-text").text(info.sub);
            $(".login-main-text").text(info.main);
        },
        setInWindow: function () {
            var template = this.template.inwindow;
            $('.login-container-inbox').append(template);
        },
        setUpWindow: function () {
            var template = this.template.upwindow;
            $('.login-container-inbox').append(template);
        },
        setNotifyContent: function (info) {
            var template = this.template.notify;
            $('.login-container-inbox').append(template);
            $(".login-notify-name").text(info.name);
            $(".login-notify-level").text(info.level);
            $(".login-notify-out").text(info.out);
        },
        showWindow: function (type) {
            $('body').addClass("body-mask");
            $(".login-container").show();
            $("[data-jrole^='window']").hide();
            $("[data-jrole*='-" + type + "']").show();
        },
        hideWindow: function () {
            $("body").removeClass("body-mask");
            $(".login-container").hide();
        },
        maskClick: function () {
            var _me = this;
            this.hideWindow();
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
                if(!_me.checkValid($(this).val(), "email")){
                    alert("违法的邮箱格式");
                };
            });
            //密码验证
            $("input[type='password']").change(function () {
                if(!_me.checkValid($(this).val(), "password")){
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
            if (type == "in") {
                data.email = $(".log-in-email").val();
                data.pwd = md5($(".log-in-pwd").val());
                _me.event.in(data);
            }
            if (type == "up") {
                data.email = $(".log-in-email").val();
                data.pwd = md5($(".log-in-pwd").val());
                _me.event.up();
            }
            if (type == "out") {
                _me.event.out();
            }
        },
        checkValid: function (str, type) {
            //type可以是空判断，邮箱判断之类
            return Util.checkStrValid(str, type);
        }
    }

    var _jUI = {
        usernotify: function (options) {
            new UserNotify($(this), options);
        }
    }
    if (typeof window.jUI == "undefined") {
        window.jUI = {};
    }
    $.extend(window.jUI, _jUI);


});