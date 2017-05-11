;
/**
 * 原始函数扩展
 */
! function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Util=factory();
    }
}(this, function () {
    var Util = {
        getObject: function (objects, key, value) {
            if (!this.is(objects, "array")) {
                objects = [objects];
            }
            var res = [];
            for (var i = 0, l = objects.length; i < l; i++) {
                for (k in objects[i]) {
                    if (key == k && value == objects[i][k]) {
                        res.push(objects[i]);
                        break;
                    }
                }
            };
            return res;
        },
        getType: function (o) {
            return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
        },
        isType: function (obj, type) {
            return (type === "Undefined" && obj === void 0) ||
                (type === "Number" && isFinite(obj)) ||
                this.getType(obj) === type.toLowerCase();
        },
        isUndefined: function (o) {
            return typeof o == "undefined";
        },
        alert: function (msg) {
            var _j_alert = window.alert;

            var _msg = "";
            if (typeof msg == "object") {
                //array,object
                _msg = JSON.stringify(msg);
            } else {
                _msg = msg;
            }
            _j_alert(_msg);

        },
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        /**
         * type:空，邮箱，数字，电话号之类
         * empty,email,phone
         */
        checkStrValid: function (str, type) {
            type = type.toLowerCase();
            //如果输入就是undefined和""的话，那就匹配这两个，其他的之后走上正规
            if (type == "undefined" && typeof str == "undefined") {
                return true;
            }
            if (type == "" && this.isEmpty(str)) {
                return true;
            }
            //if(this.isNovalue(str))return false;
            //为了每个函数都能被单独调用，所以判断放在函数内部

            if (type == "phone") {
                return this.isPhone(str);
            }
            if (type == "email") {
                return this.isEmail(str);
            }
            if (type == "password") {
                return this.isPwd(str);
            }

        },
        isEmpty: function (str) {
            str = this.trim(str);
            return str === "";
        },
        isNovalue: function (str) {
            return this.isUndefined(str) || this.isEmpty(str);
        },
        isPhone: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
            return reg.test(str); //true
        },
        isEmail: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            // var reg = /^([a-zA-Z_0-9-])+@([a-zA-Z_0-9-])+(\.[a-zA-Z_0-9-])+$/;
            var reg = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+/ ;
            return reg.test(str);
        },
        isFloat2: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            var reg = /^\d*\.?\d{0,2}$/;
            return reg.test(str);
        },
        isID: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            reg = /^(\d{14}|\d{17})(\d|[xX])$/;
            return reg.test(str);
        },
        isPwd: function (str) {
            // 6-20个字母、数字、下划线 
            if (this.isNovalue(str)) {
                return false;
            }
            var reg = /^(\w){6,20}$/;
            return reg.test(str);
        },
        isPwdStrong:function(){
            //只能包含数字、字母、下划线、特殊字符(!@#$%&^*_)
            var reg =/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%_^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%_^&*]+$)(?![\d!@#$%_^&*]+$)[a-zA-Z\d!@#$%_^&*]+$/;
            return reg.test("str");
        },
        isNum: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            var reg = /^[0-9]{1,}$/;
            return reg.test(str);
        },
        hasChinese: function (str) {
            if (this.isNovalue(str)) {
                return false;
            }
            var reg = /[\u4E00-\u9FA5\uf900-\ufa2d]/g;
            return reg.test(str);
        }

    }
    return Util;
});
/*
(function () {
   
    var _j_alert = window.alert;
    window.alert = function (msg) {
        var _msg = "";
        if (typeof msg == "object") {
            //array,object
            _msg = JSON.stringify(msg);
        } else {
            _msg = msg;
        }
        _j_alert(_msg);
    }
})();
*/