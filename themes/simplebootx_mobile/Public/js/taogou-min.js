/*!
 * taogou 
 * @version: 1.0.0
 * @date: 2017-01-19 03:15:03
 */
function addErrorTip(a, b) {
    "use strict";
    var c = a.parents(".form-group");
    c.addClass("has-error").find(".tips").show().text(b),
    setTimeout(function() {
        c.find(".tips").hide().text("")
    },
    3e3)
}
function setVerifyPass(a) {
    "use strict";
    var b = a.parents(".form-group");
    b.removeClass("has-error").find(".tips").hide().text(""),
    b.find(".need-verify").attr("data-pass", !0)
}
function resetVerify(a) {
    "use strict";
    var b = a.parents(".form-group");
    b.find(".need-verify").attr("data-pass", !1)
}
function verifyName(a) {
    "use strict";
    var b = a.length;
    return 0 === b ? 5e3: 5 > b || b > 14 ? 5001 : isAlphabet.test(a) ? 5003 : !0
}
function verifyPassword(a) {
    "use strict";
    var b = a.length;
    if (1 === arguments.length) {
        if (0 === b) return 5e3;
        if (6 > b || b > 14) return 5002;
        if (!hasAlphabetAndNumber.test(a)) return 5004
    } else if (arguments.length > 1) {
        var c = arguments[1];
        if (!c) return;
        if (b < c.minLen || b > c.maxLen) return 5012;
        if (c.regular.test(a)) return 5004
    }
    return ! 0
}
function verifyForm(a, b) {
    "use strict";
    switch (a) {
    case 5e3:
        break;
    case 5001:
        addErrorTip(b, "用户名长度：5-14 位");
        break;
    case 5002:
        addErrorTip(b, "密码长度：6-14 位");
        break;
    case 5003:
        addErrorTip(b, "用户名必须为「英文 + 数字」");
        break;
    case 5004:
        addErrorTip(b, "密码必须为「英文 + 数字」");
        break;
    case 5012:
        addErrorTip(b, "密码长度：6 位");
        break;
    default:
        setVerifyPass(b)
    }
}
function createSelectList(a) {
    "use strict";
    for (var b = 0,
    c = a.length,
    d = "<option></option>"; c > b; b++) {
        var e = a[b];
        d += '<option value="' + e.id + '">' + e.name + "</option>"
    }
    return d
}
function postData(a, b) {
    "use strict";
    var c = a.type || "POST",
    d = a.API,
    e = a.eventName || "",
    f = $(".J_XHRDom"),
    g = "object" == typeof b ? JSON.stringify(b) : b;
    xhrObj && xhrObj.abort(),
    xhrObj = $.ajax({
        type: c,
        url: d,
        data: {
            data: g
        }
    }).done(function(a) {
        var b = "object" == typeof a ? a: $.parseJSON(a),
        c = parseInt(b.code, 10);
        switch (c) {
        case 200:
            f.trigger("xhr.done" + e, [b]);
            break;
        default:
            f.trigger("xhr.error" + e, [b])
        }
    }).fail(function() {
        f.trigger("xhr.fail" + e)
    }).always(function() {
        f.trigger("xhr.always" + e)
    }).complete(function(a, b) {
        "error" === b && f.trigger("xhr.complete.error" + e)
    })
}
function addXhrEventListener(a) {
    "use strict";
    var b = a.eventName || "",
    c = a.successFun || void 0,
    d = a.errorFun || void 0,
    e = a.failFun || void 0,
    f = a.successTitle || SQ.MSG.SUCCESS_TITLE;
    $(".J_XHRDom").on("xhr.done" + b,
    function(b, d) { (void 0 === a.showTips || a.showTips) && cmAlert.setType("ok").setTitle(f).setContent(d.msg).show(),
        c ? c(d) : setTimeout(function() {
            location.reload()
        },
        1e3)
    }).on("xhr.fail" + b,
    function() {
        e ? e() : cmAlert.setType("error").setTitle("错误").setContent(SQ.MSG.NETWORK_ERROR).show()
    }).on("xhr.error" + b,
    function(a, b) {
        d ? d(b) : cmAlert.setType("error").setTitle("错误").setContent(b.msg).show()
    })
}
function setDatepicker(a) {
    "use strict";
    if (!a) var a = {
        format: "yyyy-mm-dd",
        startView: 2,
        minView: 2
    };
    if ($.fn.datetimepicker) {
        $.fn.datetimepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今日",
            meridiem: ["上午", "下午"],
            weekStart: 1,
            format: a.format
        };
        var b = $(".J_startDate"),
        c = $(".J_endDate");
        b.length && b.datetimepicker({
            language: "zh-CN",
            autoclose: !0,
            startView: a.startView,
            minView: a.minView,
            minuteStep: a.minuteStep
        }).on("changeDate",
        function() {
            c.val("").datetimepicker("setStartDate", $(this).val())
        }),
        c.length && c.datetimepicker({
            language: "zh-CN",
            autoclose: !0,
            startView: a.startView,
            minView: a.minView,
            minuteStep: a.minuteStep
        })
    }
}
JSON.stringify = JSON.stringify ||
function(a) {
    "use strict";
    var b = typeof a;
    if ("object" !== b || null === a) return "string" === b && (a = '"' + a + '"'),
    String(a);
    var c, d, e = [],
    f = a && a.constructor === Array;
    for (c in a) a.hasOwnProperty(c) && (d = a[c], b = typeof d, "string" === b ? d = '"' + d + '"': "object" === b && null !== d && (d = JSON.stringify(d)), e.push((f ? "": '"' + c + '":') + String(d)));
    return (f ? "[": "{") + String(e) + (f ? "]": "}")
};
var SQ = {},
$body = $("body"),
pageId = $body.attr("id"),
sparator = ",",
AUTORELOADTIME = 1400,
JUMPTIMPE = 900,
isAlphabet = /[^0-9a-zA-Z]/g,
isNum = /^[1-9]\d*$/,
hasAlphabetAndNumber = /[A-Za-z`~!@#$%^&*()_+<>?:"{},.\/;'[\]].*[0-9]|[0-9].*[A-Za-z`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/;
SQ.MSG = {
    DEFAULT_TITLE: "提示",
    SUCCESS_TITLE: "成功",
    ERROR_TITLE: "失败",
    NETWORK_ERROR: "网络通信错误，请重试！"
};
var xhrObj, BOX_NO_LEN = 20,
TEXTAREA_HEIGHT = 1e4; !
function() {
    "use strict";
    var a = navigator.userAgent,
    b = -1 !== a.indexOf("Mac") ? "mac": -1 !== a.indexOf("Windows") ? "windows": "unknow",
    c = -1 !== a.indexOf("Chrome") ? "chrome": "other";
    $(".modal").on("show.bs.modal",
    function() {
        var a = $(window).height(),
        d = $("body").height();
        d > a && $body.addClass(b + "-" + c)
    }).on("hidden.bs.modal",
    function() {
        $body.removeClass(b + "-" + c)
    })
} (),
function() {
    "use strict";
    var a = {},
    b = navigator.userAgent;
    a.os = {},
    /Android/i.test(b) ? (a.os.name = "android", a.os.version = b.match(/(Android)\s([\d.]+)/)[2]) : /Adr/i.test(b) ? (a.os.name = "android", a.os.version = b.match(/(Adr)\s([\d.]+)/)[2]) : /iPod/i.test(b) ? (a.os.name = "ios", a.os.version = b.match(/OS\s([\d_]+)/)[1].replace(/_/g, "."), a.device = "ipod") : /iPhone/i.test(b) ? (a.os.name = "ios", a.os.version = b.match(/(iPhone\sOS)\s([\d_]+)/)[2].replace(/_/g, "."), a.device = "iphone") : /iPad/i.test(b) && (a.os.name = "ios", a.os.version = b.match(/OS\s([\d_]+)/)[1].replace(/_/g, "."), a.device = "ipad"),
    ("android" === a.os.name || "ios" === a.os.name) && $("body").addClass("mobile")
} (),
function() {
    "use strict";
    0 === $(".J_XHRDom").length && $body.append('<div class="J_XHRDom"></div>')
} (),
function() {
    "use strict";
    if ($.fn.datepicker) {
        $.fn.datepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今日",
            format: "yyyy-mm-dd",
            weekStart: 1
        };
        var a = $(".J_startDate"),
        b = $(".J_endDate");
        a.length && a.datepicker({
            language: "zh-CN",
            autoclose: !0
        }).on("changeDate",
        function() {
            if ("true" === b.attr("data-timezone-restrict")) {
                var a = new Date($(this).val()),
                c = new Date(a.getFullYear(), a.getMonth() + 1, 0);
                b.val("").datepicker("setStartDate", a),
                b.val("").datepicker("setEndDate", c)
            }
        }),
        b.length && b.datepicker({
            language: "zh-CN",
            autoclose: !0
        })
    }
} (),
function() {
    "use strict";
    function a(a) {
        window.postData({
            type: "POST",
            API: c,
            eventName: d
        },
        a)
    }
    var b = $(".J_acTbUpdateState"),
    c = void 0 === window.config ? void 0 : window.config.updateStatus,
    d = "common.state";
    if (0 !== b.length) {
        if (!c) return void console.log("window.config:updateStatus is undefined");
        b.on("click",
        function(b) {
            b.preventDefault();
            var c = $(this).attr("data-param");
            c ? a(c) : console.log("J_acTbUpdateState:data-param is null")
        }),
        window.addXhrEventListener({
            eventName: d,
            successFun: function() {
                setTimeout(function() {
                    location.reload()
                },
                1e3)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a) {
        var d = {
            id: a
        };
        window.postData({
            type: "POST",
            API: b,
            eventName: c
        },
        d)
    }
    var b = void 0 === window.config ? void 0 : window.config.deleteById,
    c = "common.del",
    d = $(".J_del");
    if (0 !== d.length) {
        if (!b) return void console.log("common.del:delAPI is undefined");
        d.on("click",
        function(b) {
            b.preventDefault();
            var c = parseInt($(this).attr("data-id"), 10),
            d = $(this).attr("data-msg") || "";
            if (c) {
                var e = new SQ.Confirm({
                    msg: "确认要删除" + d + "吗？",
                    ok: function() {
                        a(c)
                    }
                });
                e.show()
            } else console.log("common.del:id is null")
        }),
        window.addXhrEventListener({
            eventName: c
        })
    }
} (),
function(a) {
    "use strict";
    function b(b) {
        var d, e, o, p = {},
        q = {};
        if ("office" === b) {
            d = m,
            e = window.config.officeList,
            q = {
                provinceId: f.val(),
                cityId: g.val(),
                districtId: h.val(),
                agentId: j.val(),
                regionalManagerId: k.val()
            };
            for (o in q) q.hasOwnProperty(o) && q[o] && "undefined" !== q[o] && "请选择" !== q[o] && (p[o] = q[o]);
            a.addXhrEventListener({
                eventName: m,
                showTips: !1,
                successFun: function(a) {
                    c(a),
                    i.find("option").each(function() {
                        var a = $(this);
                        a.val() === n.organId && (i.prop("disabled", !1), a.prop("selected", !0))
                    })
                }
            }),
            a.postData({
                type: "GET",
                API: e,
                eventName: d
            },
            p)
        }
        if ("regionalManager" === b) {
            q = {
                agentId: j.val()
            };
            for (o in q) q.hasOwnProperty(o) && q[o] && "undefined" !== q[o] && "请选择" !== q[o] && (p[o] = q[o]);
            a.addXhrEventListener({
                eventName: l,
                showTips: !1,
                successFun: function(a) {
                    k.empty().prop("disabled", !1).append(createSelectList(a.data.regionalManagerList)),
                    k.find("option").each(function() {
                        var b = $(this);
                        b.val() === a.regionalManagerId && (k.prop("disabled", !1), b.prop("selected", !0))
                    })
                }
            }),
            a.postData({
                type: "GET",
                API: window.config.searchRegionalManager,
                eventName: l
            },
            p)
        }
    }
    function c(a) {
        var b, c, d, e, f, g = "<option></option>";
        for (a.data.orgList && (b = i, c = a.data.orgList, d = "orgName"), f = c.length, e = 0; f > e; e++) g += '<option value="' + c[e].id + '">' + c[e][d] + "</option>";
        b.empty().append(g).attr("disabled", !1).get(0).selectedIndex = 0
    }
    function d(a) {
        a.empty().attr("disabled", !0)
    }
    if ($.fn.citySelect) {
        var e = $(".filter"),
        f = e.find(".prov"),
        g = e.find(".city"),
        h = e.find(".dist"),
        i = e.find(".office"),
        j = e.find(".agent"),
        k = $(".regionalManager"),
        l = (e.find(".groupId"), e.find(".pkgName"), "common.filter.regionalManager"),
        m = "common.filter.district",
        n = e.attr("data-filterData");
        f.on("change",
        function() {
            d(i)
        }),
        g.on("change",
        function() {
            d(i)
        }),
        h.on("change",
        function() {
            var a = $(this).val();
            "请选择" === a || "" === a ? d(i) : b("office")
        }),
        j.on("change",
        function() {
            var a = $(this).val();
            "请选择" === a || "" === a ? d(k) : b("regionalManager")
        }),
        function() {
            var a = e.find(".form-control"),
            c = e.find("input[type=checkbox]");
            n ? (n = $.parseJSON(n), $("#city").citySelect({
                url: window.cityData,
                prov: n.provinceId,
                city: n.cityId,
                dist: n.districtId,
                required: !1
            }), a.each(function() {
                var a = $(this),
                b = a.attr("name");
                n[b] && a.attr("disabled", !1).val(n[b])
            }), c.each(function() {
                var a = $(this),
                b = a.attr("name");
                n[b] && "checkbox" === a.attr("type") && "true" === n[b] && a.prop("checked", !0)
            }), n.districtId && setTimeout(function() {
                b("office")
            },
            500)) : $("#city").citySelect({
                url: window.cityData,
                prov: "",
                city: "",
                dist: "",
                required: !1
            })
        } ()
    }
} (window),
function() {
    "use strict";
    function a(a) {
        var b, c = this;
        c.config = {};
        for (b in a) a.hasOwnProperty(b) && (c.config[b] = a[b]);
        c._init()
    }
    a.prototype = {
        construtor: a,
        _init: function() {
            this._creatAlert()
        },
        _creatAlert: function() {
            var a = this;
            a.$alert = $('<div class="alert ac-alert"><button type="button" class="close">×</button><h4 class="tit"></h4><p class="msg"></p></div>'),
            a.setType("error"),
            $body.append(a.$alert),
            a.$alertTit = a.$alert.find(".tit"),
            a.$alertMsg = a.$alert.find(".msg"),
            a.$closeBtn = a.$alert.find(".close"),
            a.$closeBtn.on("click",
            function() {
                a.$alert.fadeOut()
            })
        },
        _setPos: function() {},
        setType: function(a) {
            var b = this;
            switch (a) {
            case "ok":
                b.$alert.removeClass().addClass("alert ac-alert alert-success");
                break;
            case "warn":
                b.$alert.removeClass().addClass("alert ac-alert alert-warning");
                break;
            case "error":
                b.$alert.removeClass().addClass("alert ac-alert alert-danger")
            }
            return b
        },
        setTitle: function(a) {
            return this.$alertTit.text(a),
            this
        },
        setContent: function(a) {
            return this.$alertMsg.html(a),
            this
        },
        show: function() {
            var a = this;
            a.$alert.fadeIn();
            var b = a.$alert.hasClass("alert-success") ? 2e3: 1e4;
            return setTimeout(function() {
                a.close()
            },
            b),
            a.$alert
        },
        close: function() {
            var a = this;
            return a.$alert.fadeOut(),
            a.$alert
        }
    },
    SQ.Alert = a
} (),
function() {
    "use strict";
    function a(a) {
        var b, c = this;
        c.config = {};
        for (b in a) a.hasOwnProperty(b) && (c.config[b] = a[b]);
        c._init()
    }
    a.prototype = {
        construtor: a,
        _init: function() {
            var a = this;
            a.okFun = a.config.ok,
            a._creatAlert()
        },
        _creatAlert: function() {
            var a = this,
            b = a.config.msg ? a.config.msg: "请再次确认该操作！",
            c = '<div class="modal fade" id="confirm-modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">确认操作</h4></div><div class="modal-body"><p class="msg"></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary ok">确认</button></div></div></div></div>';
            $("#confirm-modal").length || $body.append(c),
            a.$confirmModal = $("#confirm-modal"),
            a.$ok = a.$confirmModal.find(".ok"),
            a.$confirmModal.find(".msg").text(b),
            a.$ok.on("click",
            function() {
                a.ok()
            })
        },
        show: function() {
            this.$confirmModal.modal()
        },
        hide: function() {
            this.$confirmModal.modal("hide")
        },
        ok: function() {
            var a = this;
            a.okFun && a.okFun()
        }
    },
    SQ.Confirm = a
} (),
function() {
    "use strict";
    function a(a) {
        var b = location.href,
        c = -1 === b.indexOf("?") ? "?": "&",
        d = -1 === b.indexOf("page=") ? !1 : !0,
        e = "page=" + a;
        if (d) {
            var f = b.slice(b.indexOf("page=")),
            g = -1 === f.indexOf("&") ? f.length: f.indexOf("&");
            f = f.slice(0, g),
            b = b.replace(f, e)
        } else b = b + c + e;
        window.location.href = b
    }
    var b = $(".pagebar"),
    c = b.find("a"),
    d = b.find("input[type=text]"),
    e = b.find(".navbar-form");
    c.on("click",
    function(b) {
        b.preventDefault();
        var c = $(this),
        d = c.text();
        d && a(d)
    }),
    e.on("submit",
    function(b) {
        b.preventDefault();
        var c = d.val();
        c && a(c)
    })
} (),
function() {
    "use strict";
    function a(a) {
        a.each(function() {
            var a = $(this);
            if (a.hasClass("active")) {
                var b = a.offset().top + 50,
                c = $(window).height();
                b > c && $(".sidebar").animate({
                    scrollTop: b - c / 2
                },
                150)
            }
        })
    }
    var b = setInterval(function() {
        var c = $(".nav-sidebar").find("li");
        c.length > 0 && (clearInterval(b), a(c))
    },
    500);
    setTimeout(function() {
        clearInterval(b)
    },
    1e4)
} (),
function() {
    "use strict";
    var a = $(".J_tooltip");
    a.each(function() {
        var a = $(this),
        b = a.attr("tipPlacement");
        b || (b = "top");
        var c = a.attr("tipIcon"),
        d = a.attr("tipMsg"),
        e = '<a href="#" data-toggle="tooltip" data-placement="' + b + '" title="' + d + '"><img class="tooltip-icon" src="' + c + '"></a>';
        a.html(a.html() + e)
    }),
    $("[data-toggle='tooltip']").tooltip()
} ();
var cmAlert = new SQ.Alert; !
function() {
    "use strict";
    SQ.ajax = function(a) {
        function b(a) { (i || g === !0) && SQ.alert({
                title: SQ.MSG.ERROR_TITLE,
                type: "alert-danger",
                autoClose: !1,
                content: a.msg || SQ.MSG.NETWORK_ERROR
            })
        }
        var c, d = a || {},
        e = d.type || "POST",
        f = d.url,
        g = d.hasTips,
        h = !1,
        i = !1,
        j = d.autoReload === !0 ? !0 : !1,
        k = "function" == typeof d.success ? d.success: !1,
        l = "function" == typeof d.error ? d.error: !1,
        m = "object" == typeof d.data ? JSON.stringify(d.data) : d.data;
        return "string" == typeof g && -1 !== g.indexOf(",") ? (g = g.split(","), "true" === g[0] && (h = !0), "true" === g[1] && (i = !0)) : g = g === !1 ? !1 : !0,
        "posting" === window.$body.attr("data-xhr") ? void console.log("acAjax: %cAbort! Because XHR is Running", "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;") : (window.$body.attr("data-xhr", "posting"), SQ.ajax.xhrObj && SQ.ajax.xhrObj.abort(), c = "get" === e.toLocaleLowerCase() ? m: {
            data: m
        },
        void(SQ.ajax.xhrObj = $.ajax({
            type: e,
            url: f,
            data: c
        }).done(function(a) {
            var c = "object" == typeof a ? a: $.parseJSON(a),
            d = parseInt(c.code, 10);
            switch (d) {
            case 200:
                k && k(a),
                (h || g === !0) && (SQ.alert({
                    title: SQ.MSG.SUCCESS_TITLE,
                    content: a.msg
                }), j && setTimeout(function() {
                    location.reload()
                },
                window.AUTORELOADTIME));
                break;
            default:
                l && l(a),
                b(a)
            }
        }).fail(function(a) {
            l && l(a),
            b(a)
        }).always(function() {}).complete(function() {
            setTimeout(function() {
                window.$body.attr("data-xhr", "")
            },
            1e3)
        })))
    }
} (),
function() {
    "use strict";
    SQ.alert = function(a) {
        function b() {
            n.fadeIn(),
            h && setTimeout(function() {
                c()
            },
            1500)
        }
        function c() {
            n.fadeOut()
        }
        var d = a || {},
        e = d.type || "alert-success",
        f = d.title || SQ.MSG.DEFAULT_TITLE,
        g = d.content || "",
        h = d.autoClose === !1 ? !1 : !0,
        i = d.hasConfirm === !0 ? !0 : !1,
        j = d.hasMask === !0 ? !0 : !1,
        k = '<button type="button" class="btn btn-warning J_ok">确认</button><button type="button" class="btn btn-default J_cancle" data-mask="off">取消</button>',
        l = "function" == typeof d.ok ? d.ok: !1,
        m = "function" == typeof d.cancle ? d.cancle: !1;
        i && (e = d.type || "alert-warning", g = d.content || "您确定要执行该操作吗？", h = !1, j = !0);
        var n = $(".ac-alert");
        n.length > 0 && n.remove(),
        function() {
            n = $('<div class="alert ac-alert ' + e + '"><button type="button" class="close J_close" data-mask="off">×</button><h4 class="tit">' + f + '</h4><p class="msg">' + g + '</p><div class="btns"></div></div>'),
            i && (n.find(".btns").append(k), n.find(".J_ok").on("click",
            function(a) {
                l && l($(a.target)),
                c()
            }), n.find(".J_cancle").on("click",
            function(a) {
                m && m($(a.target)),
                c()
            })),
            n.find(".J_close").on("click", c),
            $body.append(n),
            b(),
            j && SQ.mask()
        } ()
    }
} (),
function() {
    "use strict";
    SQ.form = {
        clearForm: function(a) {
            if (a) {
                var b = a.find(".ac-form-item"),
                c = a.find("[role=ac-formShift]") || a.find(".J_acFormShift");
                b.each(function() {
                    var a = $(this),
                    b = a.attr("type") || a.get(0).tagName.toLowerCase();
                    "submit" !== b && ("radio" === b || "checkbox" === b ? a.prop("checked", !1) : a.val(""))
                }),
                c.each(function() {
                    var a = $(this),
                    b = a.attr("data-original");
                    if (b) {
                        b = JSON.parse(a.attr("data-original"));
                        var c = a.find(".shift-input"),
                        d = c.find(".control-label"),
                        e = c.find(".ac-form-item");
                        d.text(b.label),
                        e.attr("name", b.name)
                    }
                }),
                a.find(".pic-view .placeholder").show(),
                a.find(".pic-view .pic-list").empty(),
                a.find("#img-upload-queue").empty()
            }
        },
        getFormValue: function(a, b, c) {
            var d = {},
            e = a.find(".ac-form-item");
            return 0 === e.length ? void console.log("acForm: cannot find ac-form-item DOM") : (e.each(function() {
                var a = $(this);
                if (!b || !a.prop("disabled")) {
                    var e = a.attr("name"),
                    f = $.trim(a.val()),
                    g = a.get(0).tagName.toLowerCase();
                    "input" === g && (g = a.attr("type")),
                    a.parents("[data-formHide=true]").length > 0 || (c && console.log("acForm: getFormValue ->> " + e + "," + f), "radio" === g ? a.prop("checked") && (d[e] = f) : "checkbox" === g ? a.prop("checked") && (d[e] = d[e] ? d[e] + window.sparator + f: f) : d[e] = d[e] ? d[e] + window.sparator + f: f ? f: " ")
                }
            }), b && (d = this.filterData(d)), c && console.table(d), d)
        },
        filterData: function(a) {
            var b, c = {};
            for (b in a) if (a.hasOwnProperty(b)) {
                var d = $.trim(a[b]);
                b && "undefined" !== b && "" !== d && "请选择" !== d && (c[b] = d)
            }
            return c
        },
        setFormValue: function(a, b, c) {
            setTimeout(function() {
                function d(a, b) {
                    var c = a,
                    d = c.attr("type");
                    if ("checkbox" === d) for (var f = j.split(window.sparator), g = 0, h = f.length, i = c.val(); h > g; g++) f[g] === i && c.prop("checked", !0);
                    else "radio" === d ? c.val() === j[0] && c.prop("checked", !0) : c.val(l[b]);
                    c.trigger("change"),
                    e(c, l[b])
                }
                function e(a, b) {
                    var c = a;
                    if (c.hasClass("pic-view-value")) {
                        var d = b.split(window.sparator);
                        if (c.length > 1) c.each(function(a) {
                            var b = $(this),
                            e = b.parents(".pic-view"),
                            f = e.find(".placeholder"),
                            g = e.find(".pic-list"),
                            h = '<li class="pic-item"><div class="img"><img src="' + d[a] + '"/><div class="pic-del"></div></div></li>';
                            f.hide(),
                            g.append(h),
                            c.val(d[a])
                        });
                        else if (1 === c.length) {
                            var e = c.parents(".pic-view"),
                            f = e.find(".placeholder"),
                            g = e.find(".pic-list"),
                            h = c.attr("data-viewCount"),
                            i = 0,
                            j = d.length,
                            k = "";
                            if (j > h) return void console.log("acForm: picture`s count is more then viewCount");
                            for (; j > i; i++) {
                                var l = d[i];
                                k += '<li class="pic-item"><div class="img"><img src="' + l + '"/><div class="pic-del"></div></div></li>'
                            }
                            f.hide(),
                            g.append(k),
                            c.val(b)
                        }
                        window.$body.off("click.acForm.delPic").on("click.acForm.delPic", ".pic-del",
                        function() {
                            SQ.form.delPicView($(this).prev())
                        })
                    }
                }
                var f = b ? b: $(".ac-form");
                "true" === f.attr("data-clean") && (SQ.form.clearForm(f), console.log("acForm: Form cleared"));
                var g;
                a = "object" != typeof a ? JSON.parse(a) : a;
                for (g in a) if (a.hasOwnProperty(g)) {
                    var h = b ? b.find("[name=" + g + "]") : $("[name=" + g + "]"),
                    i = g,
                    j = a[g].toString(),
                    k = h.attr("type");
                    if (c && console.log("acForm: setFormValue ->> find [name=" + i + "][" + h.length + "] value=" + j + " in " + b.selector + "[" + b.length + "]"), 0 === h.length && console.log("acForm: setFormValue ->> %ccannot find form items[name=" + g + "]", "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;"), h.length > 1) for (var l = j.split(window.sparator), m = 0, n = h.length; n > m; m++) d(h.eq(m), m);
                    else 1 === h.length && (h.val(j), c && console.log("acForm: setFormValue ->> %cset [name=" + i + "]'s value: " + h.val(), "background:#5cb85c; color:#fff; padding:0 5px; border-radius:3px;"), ("checkbox" === k || "radio" === k) && j === h.val() && h.prop("checked", !0), $("[name=" + i + "]").trigger("change"), e(h, j))
                }
            },
            50)
        },
        setDisable: function(a, b) {
            var c = 0,
            d = a.length,
            e = !0;
            if (d) for (b === !1 && (e = !1); d > c; c++) $("[name=" + a[c] + "]").prop("disabled", e);
            else console.log("acForm: cannot find form name")
        },
        setReadOnly: function(a, b) {
            var c = 0,
            d = a.length;
            if (d) if (b === !1) for (; d > c; c++) $("[name=" + a[c] + "]").removeAttr("readonly");
            else for (; d > c; c++) $("[name=" + a[c] + "]").attr("readonly", "readonly");
            else console.log("acForm: cannot find form name")
        },
        verifyForm: function(a) {
            var b = a.find("[data-verify]");
            b.length > 0 && b.each(function() {
                var a = $(this);
                a.on("focus",
                function() {
                    $(this).removeClass("verify-error").parent().find(".verify-tips").remove()
                }).on("blur",
                function() {
                    var a = $(this);
                    SQ.form.verifyFormItem(a)
                })
            })
        },
        verifyFormItem: function(a) {
            function b(b) {
                var c = $('<div class="verify-tips error"></div>');
                a.addClass("verify-error"),
                c.css({
                    width: 15 * b.length
                }).text(b),
                a.parent().append(c)
            }
            var c, d, e = a.attr("data-verify");
            switch (a.removeClass("verify-error"), a.parent().find(".verify-tips").remove(), e) {
            case "userName":
                c = $.trim(a.val()),
                c && (d = c.length, 5 > d || d > 14 ? b("用户名长度：5-14 位") : window.isAlphabet.test(c) && b("用户名必须为英文或数字"));
                break;
            case "password":
                c = $.trim(a.val()),
                c && (d = c.length, 6 > d || d > 14 ? b("密码长度：6-14 位") : window.hasAlphabetAndNumber.test(c) || b("密码必须为「英文 + 数字」"));
                break;
            case "re-password":
                c = $.trim(a.val());
                var f = a.parents(".ac-form").find('[data-verify="password"]').val();
                c !== f && b("密码输入不一致")
            }
        },
        verifyRequired: function(a) {
            var b = a.find('[data-required="true"]'),
            c = [];
            return b.each(function() {
                var a = {
                    result: !1
                },
                b = $(this).parents(".form-group"),
                d = b.find(".ac-form-item"),
                e = d.attr("type");
                "checkbox" === e && d.each(function() {
                    var b = $(this);
                    b.prop("checked") && (a.result = !0)
                }),
                a.result.result || (a.itemName = d.attr("name"), a.label = b.find(".control-label").text(), a.posTop = d.offset().top),
                c.push(a)
            }),
            c
        },
        showPicView: function(a) {
            function b() {
                var a = '<li class="pic-item"><div class="img"><img src="' + c.url + '" alt="' + c.name + '"/><div class="pic-del"></div></div></li>';
                e.hide(),
                f.append(a)
            }
            if (!a) return void console.log('%cacForm: cannot find "picData" param in showPicView function', "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;");
            var c = a.pics[0],
            d = $(a.domId).parent().parent(),
            e = d.find(".placeholder"),
            f = d.find(".pic-list"),
            g = d.find(".pic-view-value"),
            h = parseInt(g.attr("data-viewCount"), 10),
            i = g.val();
            return i = 0 === i.length ? "": i + window.sparator,
            window.$body.off("click.acForm.delPic").on("click.acForm.delPic", ".pic-del",
            function() {
                SQ.form.delPicView($(this).prev())
            }),
            f.find(".pic-item img").length >= h ? (SQ.alert({
                type: "alert-danger",
                title: "图片上传错误",
                content: "图片张数超过 data-viewCount 设置值"
            }), void console.log("%cacForm: pictures more than data-viewCount set", "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;")) : (g.val(i + c.url), void b())
        },
        delPicView: function(a) {
            for (var b = a.parents(".pic-view"), c = b.find(".pic-view-value"), d = b.find(".placeholder"), e = b.parents(".form-group").find("#imgUploadQueue"), f = b.find(".pic-list"), g = a.attr("src"), h = c.val(), i = "", j = h.replace(g, "").split(","), k = 0, l = j.length; l > k; k++) if (j[k]) {
                var m = k === l - 1 ? "": ",";
                i += j[k] + m
            }
            a.parents(".pic-item").remove(),
            0 === f.find(".pic-item").length && (d.show(), e.empty()),
            c.val(i)
        },
        creatUploadify: function(a) {
            return 0 === $(a).length ? void console.log("%cacForm: cannot find id=" + a + " Element in DOM", "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;") : void $(a).uploadify({
                buttonText: "上传",
                swf: window.config.swf,
                uploader: window.config.upload,
                removeCompleted: !0,
                fileTypeExts: "*.gif;*.jpg;*.png",
                multi: !1,
                onUploadSuccess: function(b, c) {
                    var d;
                    try {
                        d = "string" == typeof c ? JSON.parse(c) : c
                    } catch(e) {
                        d = window.config.uploadDemo
                    }
                    if (200 === d.code) {
                        var f = {
                            domId: a,
                            pics: d.data.entities
                        };
                        SQ.form.showPicView(f)
                    }
                }
            })
        },
        formItemClone: function(a) {
            var b = a || {},
            c = b.selector || ".J_clone",
            d = "function" == typeof b.beforeClone ? b.beforeClone: !1,
            e = "function" == typeof b.beforeInsert ? b.beforeInsert: !1,
            f = "function" == typeof b.cloned ? b.cloned: !1,
            g = $(c);
            if (0 === g.length) return void console.log("%cacForm: cannot find selector=" + c + " Element in DOM", "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;");
            var h = b.isDynamic || g.attr("data-isDynamic") || !0; !
            function() {
                g.find(".ac-form-item").each(function() {
                    var a = $(this),
                    b = a.attr("data-preset");
                    b && "" === a.val() && a.val(b)
                })
            } ();
            var i = g.clone();
            window.$body.on("click.form.clone", ".J_addClone",
            function() {
                var a = $(this).parents(c);
                if (0 !== a.length) {
                    d && d(a);
                    var b = h === !0 ? a.clone() : i.clone();
                    b.find(".J_addClone").removeClass("J_addClone").addClass("J_removeClone").text("-"),
                    b.find(".ac-form-item").each(function() {
                        var a = $(this),
                        b = a.attr("data-preset") || "";
                        a.val(b)
                    }),
                    b.find(".clone-prototype").attr("data-formHide", !1),
                    b.find(".dropdown-toggle").remove(),
                    b.find(".dropdown-menu").remove(),
                    e && e(b),
                    $(c).eq($(c).length - 1).after(b),
                    f && f(a, b)
                }
            }),
            window.$body.on("click.form.clone", ".J_delClonePrototype",
            function(a) {
                a.preventDefault();
                var b = $(this).parents(".form-group");
                b.find(".clone-prototype").attr("data-formHide", !0)
            }),
            window.$body.on("click.form.clone", ".J_removeClone",
            function() {
                $(this).parents(".form-group").remove()
            })
        }
    }
} (),
function() {
    "use strict";
    var a = $(".ac-form");
    0 !== a.length && (a.each(function() {
        var a = $(this),
        b = a.attr("data-formData");
        b && SQ.form.setFormValue(b, a),
        SQ.form.verifyForm(a);
        var c = window.plugins ? window.plugins.My97DatePicker: void 0;
        c && window.$body.append('<script src="' + c + '"></script>'),
        $("#img-upload").length > 0 && SQ.form.creatUploadify("#img-upload"),
        $("#file-upload").length > 0 && SQ.form.creatUploadify("#file-upload");
        var d = a.find("[role=ac-formShift]") || a.find(".J_acFormShift");
        d.each(function() {
            var a = $(this),
            b = a.find(".shift-input"),
            c = b.find(".control-label"),
            d = b.find(".ac-form-item"),
            e = a.find("select"),
            f = {
                label: c.text(),
                name: d.attr("name")
            }; !
            function() {
                c.text(f.label),
                d.attr("name", f.name),
                a.attr("data-original", JSON.stringify(f))
            } (),
            e.on("change",
            function() {
                var a = $(this).find("option:selected").attr("data-shift");
                a ? (a = JSON.parse(a), c.text(a.label), d.attr("name", a.name)) : (c.text(f.label), d.attr("name", f.name))
            })
        });
        var e = a.find("[role=ac-formClone]");
        e.length && SQ.form.formItemClone({
            selector: "[role=ac-formClone]"
        }),
        window.$body.on("change.form", ".J_acSelectLinkage",
        function() {
            var a = $(this),
            b = a.find("option:selected").attr("data-target"),
            c = a.find("option:selected").attr("data-type"),
            d = $(b);
            d.length > 0 && ("show" === c ? d.attr("data-formHide", !1) : d.attr("data-formHide", !0))
        }),
        a.on("submit",
        function(b) {
            if ("default" === a.attr("data-form")) {
                b.preventDefault();
                var c = SQ.form.getFormValue(a, !0),
                d = a.attr("data-api");
                if (d.indexOf("config") >= 0) for (var e = d.split("."), f = 0, g = e.length; g > f; f++) d = 0 === f ? window[e[f]] : d[e[f]];
                c && d && SQ.ajax({
                    url: d,
                    data: c,
                    autoReload: !0,
                    success: function(a) {
                        var b = window.config.successUrl ? window.config.successUrl: a.data ? a.data.successUrl: !1;
                        b && setTimeout(function() {
                            window.location = b
                        },
                        window.JUMPTIMPE)
                    }
                })
            }
        })
    }), $("[data-form]").on("click",
    function() {
        var a = $(this),
        b = a.attr("data-form");
        if ("default" !== b) {
            b = JSON.parse(a.attr("data-form"));
            var c = $(b.target);
            if (0 === c.length) return void console.log("form controller: $targetForm is not found");
            if (c.length > 1) return void console.log("form controller: $targetForm is more then one");
            if ((b.clear || "true" === b.clear) && SQ.form.clearForm(c), b.api) {
                var d = b.api;
                if (b.api.indexOf("config") >= 0) for (var e = b.api.split("."), f = 0, g = e.length; g > f; f++) d = 0 === f ? window[e[f]] : d[e[f]];
                c.attr("data-api", d)
            }
            if (b.data) {
                var h = b.data;
                h = JSON.parse("[tr]" === h ? a.parents("tr").attr("data-formData") : h),
                h && SQ.form.setFormValue(h, c)
            }
        }
    }))
} (),
function() {
    "use strict";
    SQ.mask = function(a) {
        function b() {
            g.fadeIn()
        }
        function c() {
            g.fadeOut(),
            window.onmousewheel = function() {
                return ! 0
            }
        }
        var d = a || {},
        e = d.clock === !1 ? !1 : !0,
        f = d.backgroupColor || "rgba(0,0,0,.4)",
        g = $(".J_mask");
        g.length || !
        function() {
            g = $('<div class="ac-mask"></div>'),
            g.css({
                background: f
            }),
            $body.append(g).on("click", '[data-mask="off"]',
            function() {
                c()
            }),
            b(),
            e && (window.onmousewheel = function() {
                return ! 1
            })
        } ()
    }
} (),
function() {
    "use strict";
    SQ.multipleSelector = function(a) {
        function b() {
            f.on("focus.acMultipleSelector.input",
            function() {
                var a = g.is(":hidden");
                a && g.show()
            }),
            $body.on("click.acMultipleSelector.toggle",
            function(a) {
                var b = $(a.target),
                c = b.hasClass("select-item") || b.parent().hasClass("select-item") || b.hasClass("ac-multiple-selector") || "ac-multipleSelector" === b.attr("role");
                c || g.hide()
            }),
            h.on("change",
            function() {
                var a = $(this),
                b = $(this).parent().text();
                a.prop("checked") ? c(b) : d(b)
            }),
            f.on("change",
            function() {
                var a = $(this),
                b = a.val();
                if (b = b.replace(window.sparator, ","), a.val(b), b) {
                    var c = b.split(",");
                    c.length > 0 && h.each(function() {
                        for (var a = $(this).parent().text(), b = $(this).val(), d = 0, e = c.length; e > d; d++)(a === c[d] || b === c[d]) && $(this).prop("checked", !0)
                    })
                }
            })
        }
        function c(a) {
            var b = f.val(),
            c = SQ.string.without(b, a) + "," + a;
            f.val("" === b ? a: c)
        }
        function d(a) {
            var b = f.val(),
            c = SQ.string.without(b, a);
            f.val(c)
        }
        var e = a || {},
        f = (e.type || "default", a.$self),
        g = f.next(".ac-multiple-selector"),
        h = g.find("input[type=checkbox]");
        return 0 === f.length ? void console.log('%cacMultipleSelector: cannot find "role=ac-multipleSelector"', "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;") : 0 === g.length ? void console.log('%cacMultipleSelector: cannot find ".ac-multiple-selector"', "background:#d9534f; color:#fff; padding:0 5px; border-radius:3px;") : void
        function() {
            f.prop("readonly", !0),
            b()
        } ()
    },
    $("[role=ac-multipleSelector]").each(function() {
        SQ.multipleSelector({
            $self: $(this)
        })
    })
} (),
function() {
    "use strict";
    function a(a) {
        var b = location.href,
        c = -1 === b.indexOf("?") ? "?": "&",
        d = -1 === b.indexOf("page=") ? !1 : !0,
        e = "page=" + a;
        if (d) {
            var f = b.slice(b.indexOf("page=")),
            g = -1 === f.indexOf("&") ? f.length: f.indexOf("&");
            f = f.slice(0, g),
            b = b.replace(f, e)
        } else b = b + c + e;
        window.location.href = b
    }
    var b = $(".pagebar"),
    c = b.find("a"),
    d = b.find("input[type=text]"),
    e = b.find(".navbar-form");
    c.on("click",
    function(b) {
        b.preventDefault();
        var c = $(this),
        d = c.attr("data-page") || c.text();
        d && a(d)
    }),
    e.on("submit",
    function(b) {
        b.preventDefault();
        var c = d.val();
        c && a(c)
    })
} (),
function() {
    "use strict";
    SQ.demo = function(a) {
        {
            var b = a || {};
            b.type || "default",
            "function" == typeof b.foo ? b.foo: !1
        } !
        function() {
            console.log("acDemo: run")
        } ()
    },
    $("[role=ac-demo]").each(function() {
        var a = $(this);
        SQ.demo({
            $self: a
        })
    })
} (),
function() {
    "use strict";
    SQ.suggestion = function(a) {
        function b(a) {
            return 0 === $.trim(a).length ? !1 : q === a ? !1 : !0
        }
        function c(a) {
            var b = {
                keyword: a
            };
            q = a,
            b = JSON.stringify(b),
            g(b)
        }
        function d(a) {
            var b, c = "",
            d = a.length;
            for (0 === d && (c += "<li>抱歉，没有找到相应数据</li>"), b = 0; d > b; b++) c += '<li class="sug-List"><em class="key">' + a[b].key + '</em><em class="value">' + a[b].value + "</em></li>";
            e(),
            r.append(c).show(),
            f()
        }
        function e() {
            r.empty().hide()
        }
        function f() {
            r.find(".sug-List").on("click",
            function() {
                var b = a.isOverride ? "": n.val(),
                c = $(this).find(".value").text(),
                d = b.length > 0 ? b + "," + c: c,
                e = $(this).find(".key").text();
                n.val(d).trigger("change"),
                o && o.val(e).trigger("change")
            })
        }
        function g(a) {
            h && h.abort(),
            h = $.ajax({
                type: "POST",
                url: l,
                data: {
                    data: a
                },
                success: function(a) {
                    d(a.data.sugList)
                },
                error: function() {}
            })
        }
        var h, i, j, k = a || {},
        l = k.url,
        m = k.$self,
        n = k.$target,
        o = k.$keyTarget,
        p = 400,
        q = "",
        r = m.next(".ac-suggestion");
        if (0 === m.length) return void console.log("SQ.suggestion: can not find suggestion bind DOM");
        if (void 0 === l) return void console.log("SQ.suggestion: can not find url");
        if ( - 1 !== l.indexOf("config")) {
            var s = l.split(".");
            l = window[s[0]][s[1]]
        } !
        function() {
            m.on("keyup",
            function() {
                var a = $(this).val();
                i = p,
                0 === a.length && e(),
                b(a) && (void 0 !== j && (clearTimeout(j), j = void 0), j = setTimeout(function() {
                    i -= p,
                    0 >= i && (c(a), clearInterval(j), j = void 0)
                },
                p))
            }).on("focus",
            function() {
                var a = $(this);
                setTimeout(function() {
                    a.get(0).select()
                },
                100)
            }).on("blur",
            function() {
                setTimeout(function() {
                    e()
                },
                p)
            })
        } ()
    },
    SQ.suggestion.creatSuggestion = function() {
        $("[role=ac-suggestion]").each(function(a) {
            var b = $(this),
            c = b.attr("data-url"),
            d = b.attr("data-target"),
            e = b.attr("data-keyTarget"),
            f = $(d),
            g = $(e);
            f = f.length > 1 ? f.eq(a) : f,
            g = g.length > 1 ? g.eq(a) : g;
            var h = "true" === b.attr("data-override") ? !0 : !1;
            SQ.suggestion({
                $self: b,
                $target: f,
                $keyTarget: g,
                isOverride: h,
                url: c
            })
        })
    },
    SQ.suggestion.creatSuggestion()
} (),
function() {
    "use strict";
    var a = $(".ac-table");
    0 !== a.length && (window.$body.on("click.acTabel.selectAll", ".J_acSelectAll",
    function() {
        var a = $(this),
        b = a.prop("checked"),
        c = $("." + a.attr("data-selectTarget"));
        return 0 === c.length ? void console.log("acTable: Cannot find selectTargets") : void c.each(function() {
            $(this).prop("checked", b)
        })
    }),
    function() {
        var a = $("[data-status]");
        a.length > 0 && a.each(function() {
            var a = $(this),
            b = a.parents("tr"),
            c = a.attr("data-status");
            b.find("." + c).fadeIn()
        })
    } (), window.$body.on("click.acTabel.status", ".J_acTbChangeStatus",
    function(a) {
        a.preventDefault();
        var b = $(this),
        c = b.parents("tr"),
        d = b.attr("data-param"),
        e = b.attr("data-tip"),
        f = "true" === b.attr("data-confrim") ? !0 : !1;
        return window.config.statusApi ? (e ? (e = -1 !== e.indexOf("td:") ? c.find("td").eq(e.slice(3)).text() : e, e = "「" + e + "」") : e = "这条", void(d ? f ? SQ.alert({
            hasConfirm: !0,
            content: "确定要删除" + e + "吗？",
            ok: function() {
                SQ.ajax({
                    url: window.config.statusApi,
                    data: d,
                    autoReload: !0
                })
            }
        }) : SQ.ajax({
            url: window.config.statusApi,
            data: d,
            autoReload: !0
        }) : console.log("acTable: Cannot find status"))) : void console.log("acTable: Cannot find status api")
    }), window.$body.on("click.acTabel.del", ".J_acTbDel",
    function(a) {
        a.preventDefault();
        var b = $(this),
        c = b.parents("tr"),
        d = b.attr("data-param"),
        e = b.attr("data-tip");
        return window.config.deleteApi ? (e = e ? -1 !== e.indexOf("td:") ? "确定要删除「" + c.find("td").eq(e.slice(3)).text() + "」吗？": e: "确定要删除这条吗？", void(d ? SQ.alert({
            hasConfirm: !0,
            content: e,
            ok: function() {
                SQ.ajax({
                    url: window.config.deleteApi,
                    data: d,
                    autoReload: !0
                })
            }
        }) : console.log("acTable: Cannot find del param"))) : void console.log("acTable: Cannot find del api")
    }))
} (),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        i.text(b).show()
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        i.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1)
    }
    function d(a) {
        0 == v ? (a.attr("disabled", !1), a.text("获取验证码"), v = 60) : (a.attr("disabled", !0), a.text("重新发送(" + v + ")"), v--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e() {
        var a = SQ.form.getFormValue(g, !0);
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: t
        },
        a)
    }
    if ($("#agent-add-code-for-sub").length) {
        var f = /^[0-9]+$/g,
        g = $(".J_acXHRForm"),
        h = $(".need-verify"),
        i = $(".errorMsg"),
        j = $(".subCodeBalance"),
        k = $(".myCodeBalance"),
        l = $(".codeNum"),
        m = $("#confirmInfo"),
        n = $("#subCodeBalanceShow"),
        o = $("#myCodeBalanceShow"),
        p = $("#codeNumShow"),
        q = $("#slider"),
        r = $(".messageCode"),
        s = $(".getMessageCode"),
        t = "event.get.message.code";
        l.on("focus",
        function() {
            m.hide(),
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            if (f.lastIndex = 0, !f.test(d)) return void a(c, "加码数量格式不对！");
            var e = j.val(),
            g = k.val(),
            h = Number(e) + Number(d),
            i = g - d;
            return 0 > i ? void a(c, "加码数量超过我的库存！") : (p && p.text(d), n && n.text(h), o && o.text(i), m && m.show(), void b(c))
        });
        var u = new SliderUnlock("#slider", {
            successLabelTip: "验证成功！"
        },
        function() {
            var a = $("#slider");
            b(a)
        });
        u.init(),
        r.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var v = 60;
        s.on("click",
        function() {
            var c = $(this);
            "true" === q.parents(".form-group").find(".need-verify").attr("data-pass") ? (b(c), e(), d(s)) : a(q, "拖动滑块验证！")
        }),
        g.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(g, !0),
            d = window.config.register,
            e = "";
            h.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !0,
                success: function() {
                    window.location.href = window.config.redirectApi
                }
            })
        }),
        window.addXhrEventListener({
            eventName: t,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(s, c.data.msg)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        i.text(b).show()
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        i.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1)
    }
    function d(a) {
        0 == p ? (a.attr("disabled", !1), a.text("获取验证码"), p = 60) : (a.attr("disabled", !0), a.text("重新发送(" + p + ")"), p--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e(a) {
        var b = {
            phoneNum: a
        };
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: n
        },
        b)
    }
    if ($("#agent-bind-sub").length) {
        var f = /^1[34578]\d{9}$/g,
        g = $(".J_acXHRForm"),
        h = $(".need-verify"),
        i = $(".errorMsg"),
        j = $(".phoneNum"),
        k = $("#slider"),
        l = $(".messageCode"),
        m = $(".getMessageCode"),
        n = "event.get.message.code";
        j.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            f.lastIndex = 0,
            f.test(d) ? b(c) : a(c, "手机号格式不对！")
        });
        var o = new SliderUnlock("#slider", {
            successLabelTip: "验证成功！"
        },
        function() {
            var a = $("#slider");
            b(a)
        });
        o.init(),
        l.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var p = 60;
        m.on("click",
        function() {
            var c = $(this),
            g = j.val();
            f.lastIndex = 0,
            f.test(g) ? "true" === k.parents(".form-group").find(".need-verify").attr("data-pass") ? (b(c), e(g), d(m)) : a(k, "拖动滑块验证！") : a(j, "手机号格式不对！")
        }),
        g.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(g, !0),
            d = window.config.register,
            e = "";
            h.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !0,
                success: function() {
                    window.location.href = window.config.redirectApi
                }
            })
        }),
        window.addXhrEventListener({
            eventName: n,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(m, c.data.msg)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        i.text(b).show()
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        i.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1)
    }
    function d(a) {
        0 == n ? (a.attr("disabled", !1), a.text("获取验证码"), n = 60) : (a.attr("disabled", !0), a.text("重新发送(" + n + ")"), n--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e(a) {
        var b = {
            phoneNum: a
        };
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: m
        },
        b)
    }
    if ($("#agent-cost-free").length) {
        var f = /^1[34578]\d{9}(,1[34578]\d{9})*$/g,
        g = $(".J_acXHRForm"),
        h = $(".need-verify"),
        i = $(".errorMsg"),
        j = $(".phoneNum"),
        k = $(".messageCode"),
        l = $(".getMessageCode"),
        m = "event.get.message.code";
        j.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            f.lastIndex = 0,
            f.test(d) ? b(c) : a(c, "手机号格式不对！")
        }),
        k.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var n = 60;
        l.on("click",
        function() {
            var c = $(this),
            g = j.val();
            f.lastIndex = 0,
            f.test(g) ? (b(c), e(g), d(l)) : a(j, "手机号格式不对！")
        }),
        g.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(g, !0),
            d = window.config.costFreeApi,
            e = "";
            h.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !0,
                success: function() {
                    window.location.href = window.config.redirectApi
                }
            })
        }),
        window.addXhrEventListener({
            eventName: m,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(l, c.data.msg)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a) {
        var b = window.config.getCodeApi;
        SQ.ajax({
            url: b,
            data: {
                type: a
            },
            autoReload: !1,
            hasTips: !0,
            success: function() {
                window.location.href = window.config.redirectApi
            }
        })
    }
    if ($("#agent-retail").length) {
        var b, c = ($(".errorMsg"), $(".get-code-btn"));
        c.on("click",
        function() {
            var c = $(this),
            d = c.data("tip");
            b = c.data("code-type");
            var e = new SQ.Confirm({
                msg: d,
                ok: function() {
                    a(b)
                }
            });
            e.show()
        })
    }
} (),
function(a) {
    "use strict";
    function b(a) {
        var b = {
            domId: "#icon-upload",
            pics: a
        };
        SQ.form.showPicView(b),
        g.val(a[0].name)
    }
    function c() {
        function b(a) {
            a.each(function() {
                var a = $(this),
                b = a.attr("name"),
                d = a.val();
                $.trim(d).length && (c[b] = d)
            })
        }
        var c = {},
        g = f.find("input"),
        h = f.find("textarea"),
        i = f.find("select");
        b(g),
        b(h),
        b(i),
        a.postData({
            type: "POST",
            API: e,
            eventName: d
        },
        c)
    }
    if ($("#banner-mg").length) {
        var d = ".appMg.submit",
        e = a.config.submit,
        f = $(".ac-form"),
        g = (f.find("input"), f.find("select"), f.find("textarea"), $(".iconFilePath"));
        $("#icon-upload").uploadify({
            buttonText: "上传",
            swf: a.config.swf,
            uploader: a.config.uploadImg,
            removeCompleted: !0,
            fileTypeExts: "*.gif;*.jpg;*.png",
            multi: !1,
            onUploadSuccess: function(c, d) {
                var e;
                try {
                    e = "string" == typeof d ? JSON.parse(d) : d
                } catch(f) {
                    e = window.config.uploadDemo
                }
                200 === e.code ? b(e.data.entities) : a.cmAlert.setType("error").setTitle("错误").setContent(e.msg).show()
            }
        }),
        f.on("submit",
        function(a) {
            a.preventDefault(),
            c()
        }),
        a.addXhrEventListener({
            eventName: d,
            successFun: function() {}
        })
    }
} (window),
function() {
    "use strict";
    if ("common-config" === window.pageId) {
        var a = $(".J_acXHRForm"),
        b = ($("#commonConfigMgModal"), $("#commonConfigMgModalLabel")),
        c = $(".form-group"),
        d = $(".need-verify");
        $(".J_addNewData").on("click",
        function() {
            SQ.form.clearForm(a),
            b.text("新增配置项"),
            $("#commonConfigMgModal").modal(),
            c.removeClass("has-error").find(".tips").hide().text(""),
            c.find(".need-verify").attr("data-pass", ""),
            a.removeClass("isEdit"),
            SQ.form.setReadOnly(["configKey"], !1)
        }),
        $(".J_EditExistData").on("click",
        function() {
            SQ.form.clearForm(a),
            b.text("修改配置项");
            var e = $(this).parents("tr"),
            f = $.parseJSON(e.attr("data-userData"));
            SQ.form.setFormValue(f, a),
            c.removeClass("has-error").find(".tips").hide().text(""),
            c.find(".need-verify").attr("data-pass", ""),
            a.addClass("isEdit"),
            d.each(function() {
                $(this).attr("data-pass", "true")
            }),
            SQ.form.setReadOnly(["configKey"])
        }),
        a.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(a, !0),
            e = a.hasClass("isEdit") ? window.config.commonConfigUpdate: window.config.commonConfigCreate,
            f = "";
            d.each(function() {
                var a = $(this);
                "true" === a.attr("data-pass") ? f += "true,": (f += "false,", window.addErrorTip(a, "×"))
            }),
            -1 === f.indexOf("false") && c && SQ.ajax({
                url: e,
                data: c,
                autoReload: !0,
                success: function() {}
            })
        })
    }
} (),
function() {
    "use strict";
    var a = $(".sidebar"),
    b = location.href,
    c = b.lastIndexOf("/") + 1,
    d = b.indexOf(".html") + 5,
    e = b.slice(c, d);
    a.find(".nav-sidebar").length || a.load("side_nav.html #nav",
    function() {
        var b = a.find("a");
        b.each(function() {
            var a = $(this);
            a.attr("href") === e && a.parent().addClass("active")
        })
    })
} (),
function() {
    "use strict"; ! $("#example").length
} (window),
function() {
    "use strict";
    $("#mannual-invoke").length && $(".showTips").on("click",
    function(a) {
        a.preventDefault();
        var b = $(this),
        c = b.attr("tip-msg"),
        d = new SQ.Confirm({
            msg: c,
            ok: function() {
                b.parent().submit()
            }
        });
        d.show()
    })
} (window),
function(a) {
    "use strict";
    if ($("#merchandise-check").length) {
        var b = ".merchandise.check",
        c = $(".ac-form");
        c.on("submit",
        function(d) {
            d.preventDefault();
            var e = SQ.form.getFormValue(c, !0);
            window.postData({
                type: "POST",
                API: a.config.check,
                eventName: b
            },
            e)
        }),
        window.addXhrEventListener({
            eventName: b,
            successFun: function() {
                setTimeout(function() {
                    location.reload()
                },
                1e3)
            }
        })
    }
} (window),
function(a) {
    "use strict";
    function b(a) {
        g.each(function() {
            var b = $(this),
            c = b.attr("name");
            void 0 !== a[c] && b.val(a[c])
        }),
        h.each(function() {
            var b = $(this),
            c = b.attr("name");
            void 0 !== a[c] && b.val(a[c])
        }),
        i.each(function() {
            var b = $(this),
            c = b.attr("name");
            void 0 !== a[c] && b.val(a[c])
        })
    }
    if ($("#merchandise-mg").length) {
        {
            var c = ".merchandise.upload.submit",
            d = ".merchandise.batch",
            e = a.config.upload,
            f = $(".upload-form"),
            g = f.find("input"),
            h = f.find("select"),
            i = f.find("textarea");
            $(".copyInfo")
        }
        $("#file_upload").uploadify({
            buttonText: "上传",
            removeCompleted: !1,
            multi: !1,
            swf: a.config.swf,
            uploader: e,
            onUploadSuccess: function(a, c) {
                var d = $.parseJSON(c);
                200 === parseInt(d.code, 10) && (b(d.data), console.log("upload success"))
            }
        }); {
            var j = 62,
            k = 58;
            $(window).width()
        }
        $(".hover").hover(function() {
            $(this).find("img").stop(!0, !0);
            var a = $(this).find("img").attr("src");
            $("body").append("<div id='preview'><div><img class='hoverimg' src='" + a.replace(/100x100/, "480x480") + "' /></div></div>"),
            $("#preview").css({
                position: "absolute",
                padding: "1px",
                border: "1px solid #f3f3f3",
                backgroundColor: "#eeeeee",
                top: $(this).find("img").offset().top + k + "px",
                left: $(this).find("img").offset().left + j + "px",
                zIndex: 1e3
            }),
            $(".hoverimg").css({
                width: 280,
                height: 280
            })
        },
        function() {
            $("#preview").remove()
        }),
        a.addXhrEventListener({
            eventName: c
        }),
        $(".mBatchButton").on("click",
        function(a) {
            a.preventDefault();
            var b = $(this),
            c = "";
            if ($(".mCheck").each(function() {
                var a = $(this);
                a.prop("checked") && (c += a.data("mid") + ",")
            }), !c) return ! 1;
            c = c.substr(0, c.length - 1);
            var e = b.attr("href"),
            f = b.data("method");
            if ("get" == f) return e += "?mIds=" + c,
            b.href = e,
            console.log(e),
            !0;
            var g = b.data("param");
            g ? g.mIds = c: g = {
                mIds: c
            },
            window.postData({
                type: "POST",
                API: e,
                eventName: d
            },
            g)
        }),
        window.addXhrEventListener({
            eventName: d,
            successFun: function() {
                setTimeout(function() {
                    location.reload()
                },
                1e3)
            }
        }),
        $(".mCheckAll").on("change",
        function(a) {
            a.preventDefault();
            var b = $(this);
            console.log(b.prop("checked")),
            b.prop("checked") ? (console.log("check"), $(".mCheck").prop("checked", "checked")) : (console.log("uncheck"), $(".mCheck").prop("checked", ""))
        }),
        $(".mBatchCopy").zclip({
            path: a.config.swf,
            copy: function() {
                var a = "";
                return $(".mCheck").each(function() {
                    var b = $(this);
                    if (b.prop("checked")) {
                        var c = b.parents("tr");
                        a += c.attr("data-copyInfo")
                    }
                }),
                a
            },
            afterCopy: function() {
                a.cmAlert.setType("ok").setTitle("成功").setContent("复制商品信息成功！").show()
            }
        }),
        $(".mCopy").each(function() {
            var b = $(this);
            b.zclip({
                path: a.config.swf,
                copy: function() {
                    var a = b.parents("tr"),
                    c = a.attr("data-copyInfo");
                    return c
                },
                afterCopy: function() {
                    a.cmAlert.setType("ok").setTitle("成功").setContent("复制商品信息成功！").show()
                }
            })
        })
    }
} (window),
function() {
    "use strict";
    if ($("#right-mg").length) {
        var a = $(".level-1").find("input[type=checkbox]"); !
        function() {
            a.on("change",
            function() {
                var a = $(this),
                b = a.parents(".level-1-name").length > 0 ? !0 : !1,
                c = a.parents(".level-2-name").length > 0 ? !0 : !1,
                d = a.parents(".level-2-wrap").length > 0 ? !0 : !1,
                e = a.parents(".level-1").find(".level-1-name input"),
                f = a.parents(".level-1").find(".level-2-name input"),
                g = a.parents(".level-2").find(".level-2-name input"),
                h = a.parents(".level-1").find(".level-2-wrap input"),
                i = a.parents(".level-2").find(".level-2-wrap input");
                b && (a.is(":checked") || (f.prop("checked", !1), h.prop("checked", !1))),
                c && (a.is(":checked") || i.prop("checked", !1), a.is(":checked") && e.prop("checked", !0)),
                d && a.is(":checked") && (g.prop("checked", !0), e.prop("checked", !0))
            })
        } ()
    }
} (window),
function() {
    "use strict"; ! $("#setting").length
} (window),
function(a) {
    "use strict";
    function b(a) {
        var b = {
            domId: "#icon-upload",
            pics: a
        };
        SQ.form.showPicView(b),
        j.val(a[0].name)
    }
    function c(a) {
        var b = {
            domId: "#qr-upload",
            pics: a
        };
        SQ.form.showPicView(b),
        k.val(a[0].name)
    }
    if ($("#setup").length) {
        var d = /^[0-9a-zA-Z]*$/g,
        e = $(".ac-form"),
        f = $(".need-verify"),
        g = $(".website"),
        h = $(".websiteLink"),
        i = $(".domain"),
        j = $(".iconUrl"),
        k = $(".customerServiceQr");
        i.on("focus",
        function() {
            resetVerify($(this))
        }).on("blur",
        function() {
            var b = $(this),
            c = b.val(),
            e = c.length;
            if (e >= 5 && 14 >= e) if (d.lastIndex = 0, d.test(c)) {
                setVerifyPass(b);
                var f = c + a.config.baseDomain;
                g.val(f),
                h.text(f),
                h.attr("href", "http://" + f)
            } else addErrorTip(b, "只能输入字母或数字！");
            else addErrorTip(b, "请输入5-14位字母或数字！")
        }),
        $("#icon-upload").uploadify({
            buttonText: "上传",
            swf: a.config.swf,
            uploader: a.config.uploadImg,
            removeCompleted: !0,
            fileTypeExts: "*.gif;*.jpg;*.png",
            multi: !1,
            onUploadSuccess: function(c, d) {
                var e;
                try {
                    e = "string" == typeof d ? JSON.parse(d) : d
                } catch(f) {
                    e = window.config.uploadDemo
                }
                200 === e.code ? b(e.data.entities) : a.cmAlert.setType("error").setTitle("错误").setContent(e.msg).show()
            }
        }),
        $("#qr-upload").uploadify({
            buttonText: "上传",
            swf: a.config.swf,
            uploader: a.config.uploadImg,
            removeCompleted: !0,
            fileTypeExts: "*.gif;*.jpg;*.png",
            multi: !1,
            onUploadSuccess: function(b, d) {
                var e;
                try {
                    e = "string" == typeof d ? JSON.parse(d) : d
                } catch(f) {
                    e = window.config.uploadDemo
                }
                200 === e.code ? c(e.data.entities) : a.cmAlert.setType("error").setTitle("错误").setContent(e.msg).show()
            }
        }),
        e.on("submit",
        function(a) {
            a.preventDefault();
            var b = SQ.form.getFormValue(e, !0),
            c = window.config.submit,
            d = "";
            f.each(function() {
                var a = $(this);
                "true" === a.attr("data-pass") ? d += "true,": (d += "false,", addErrorTip(a, "×"))
            }),
            -1 === d.indexOf("false") && b && SQ.ajax({
                url: c,
                data: b,
                autoReload: !1,
                hasTips: !0,
                success: function(a) {
                    "object" == typeof a ? a: $.parseJSON(a)
                }
            })
        })
    }
} (window),
function() {
    "use strict";
    if ($("#cash-financial").length) {
        var a = ".cash.financial.pay.batch",
        b = $(".return-form"),
        c = $(".J_acTbReturn");
        $(".mBatchButton").on("click",
        function(b) {
            b.preventDefault();
            var c = $(this),
            d = "";
            if ($(".mCheck").each(function() {
                var a = $(this);
                a.prop("checked") && (d += a.data("mid") + ",")
            }), !d) return ! 1;
            d = d.substr(0, d.length - 1);
            var e = c.attr("href"),
            f = c.data("method");
            if ("get" == f) return e += "?mIds=" + d,
            c.href = e,
            console.log(e),
            !0;
            var g = c.data("param");
            g ? g.mIds = d: g = {
                mIds: d
            },
            window.postData({
                type: "POST",
                API: e,
                eventName: a
            },
            g)
        }),
        window.addXhrEventListener({
            eventName: a,
            successFun: function(a) {
                var b = "object" == typeof a ? a: $.parseJSON(a),
                c = b.data.redirectApi;
                window.location.href = c
            }
        }),
        $(".mCheckAll").on("change",
        function(a) {
            a.preventDefault();
            var b = $(this);
            console.log(b.prop("checked")),
            b.prop("checked") ? (console.log("check"), $(".mCheck").prop("checked", "checked")) : (console.log("uncheck"), $(".mCheck").prop("checked", ""))
        }),
        c.on("click",
        function() {
            SQ.form.clearForm(b);
            var a = $(this).parents("tr"),
            c = $.parseJSON(a.attr("data-userData"));
            SQ.form.setFormValue(c, b)
        }),
        b.on("submit",
        function(a) {
            a.preventDefault();
            var c = SQ.form.getFormValue(b, !0),
            d = window.config.returnApi;
            c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !0,
                success: function() {}
            })
        })
    }
} (window),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        i.text(b).show()
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        i.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1),
        i.text("").hide()
    }
    function d(a) {
        0 == n ? (a.attr("disabled", !1), a.text("获取验证码"), n = 60) : (a.attr("disabled", !0), a.text("重新发送(" + n + ")"), n--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e() {
        var a = {};
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: m
        },
        a)
    }
    if ($("#cash").length) {
        var f = /^([1-9][0-9]*)$/,
        g = $(".J_acXHRForm"),
        h = $(".need-verify"),
        i = $(".errorMsg"),
        j = $(".amount"),
        k = $(".messageCode"),
        l = $(".getMessageCode"),
        m = "event.get.message.code";
        j.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            if (f.lastIndex = 0, f.test(d)) {
                var e = c.data("minimum");
                if (e > d) return void a(c, "提现最低限额" + e + "！");
                var g = c.data("balance");
                if (d > g) return void a(c, "提现金额不能大于账户余额！");
                b(c)
            } else a(c, "提现金额格式不对！")
        }),
        k.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var n = 60;
        l.on("click",
        function() {
            $(this);
            e(),
            d(l)
        }),
        g.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(g, !0),
            d = window.config.cashApi,
            e = "";
            h.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !0,
                success: function(a) {
                    var b = "object" == typeof a ? a: $.parseJSON(a);
                    if (b.data && b.data.msg) i.text(b.data.msg).show();
                    else {
                        var c = window.config.redirectApi;
                        b.data && b.data.e && (c += "?e=" + b.data.e),
                        window.location.href = c
                    }
                }
            })
        }),
        window.addXhrEventListener({
            eventName: m,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(l, c.data.msg)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a) {
        var d = a.val();
        e.lastIndex = 0,
        e.test(d) ? c(a) : b(a, "手机号格式不对！")
    }
    function b(a, b) {
        var c = a.parents(".form-item");
        c.addClass("has-error"),
        h.text(b).show()
    }
    function c(a) {
        var b = a.parents(".form-item");
        b.removeClass("has-error"),
        h.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function d(a) {
        var b = a.parents(".form-item");
        b.find(".need-verify").attr("data-pass", !1),
        h.text("").hide()
    }
    if ($("#pay").length) {
        var e = /^1[34578]\d{9}$/g,
        f = $(".J_acXHRForm"),
        g = $(".need-verify"),
        h = $(".errorMsg"),
        i = $(".phoneNum");
        i.val() && a(i),
        i.on("focus",
        function() {
            d($(this))
        }).on("blur",
        function() {
            var b = $(this);
            a(b)
        }),
        f.on("submit",
        function(a) {
            a.preventDefault();
            var c = SQ.form.getFormValue(f, !0),
            d = window.config.payApi,
            e = "";
            g.each(function() {
                var a = $(this);
                "true" === a.attr("data-pass") ? e += "true,": (e += "false,", b(a, "请输入正确的数据！"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !1,
                success: function(a) {
                    var b = "object" == typeof a ? a: $.parseJSON(a);
                    if (b.data && b.data.msg) h.text(b.data.msg).show();
                    else {
                        var c = b.data.payForm;
                        $("#pay").html(c)
                    }
                }
            })
        })
    }
} (),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        i.text(b).show(),
        setTimeout(function() {
            i.text("").hide()
        },
        2e3)
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        i.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1)
    }
    function d(a) {
        0 == p ? (a.attr("disabled", !1), a.text("获取验证码"), p = 60) : (a.attr("disabled", !0), a.text("重新发送(" + p + ")"), p--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e(a) {
        var b = {
            phoneNum: a
        };
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: o
        },
        b)
    }
    if ($("#regist-v2").length) {
        var f = /^1[34578]\d{9}$/g,
        g = $(".J_acXHRForm"),
        h = $(".need-verify"),
        i = $(".errorMsg"),
        j = $(".phoneNum"),
        k = $(".password"),
        l = $(".re-password"),
        m = $(".messageCode"),
        n = $(".getMessageCode"),
        o = "event.get.message.code";
        j.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            f.lastIndex = 0,
            f.test(d) ? b(c) : a(c, "手机号格式不对！")
        }),
        k.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val(),
            e = d.length;
            e >= 6 && 14 >= e ? b(c) : a(c, "请输入6-14位密码！")
        }),
        l.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = k.val(),
            e = c.val();
            d == e ? b(c) : a(c, "密码不一致！")
        }),
        m.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var p = 60;
        n.on("click",
        function() {
            var c = $(this),
            g = j.val();
            f.lastIndex = 0,
            f.test(g) ? (b(c), e(g), d(n)) : a(j, "手机号格式不对！")
        }),
        g.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(g, !0),
            d = window.config.register,
            e = "";
            h.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !0,
                success: function(a) {
                    var b = "object" == typeof a ? a: $.parseJSON(a);
                    if (b.data && b.data.msg) i.text(b.data.msg).show();
                    else {
                        var c = window.config.redirectApi;
                        b.data && b.data.e && (c += "?e=" + b.data.e),
                        window.location.href = c
                    }
                }
            })
        }),
        window.addXhrEventListener({
            eventName: o,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(n, c.data.msg)
            }
        })
    }
} (),
function() {
    "use strict";
    function a(a, b) {
        var c = a.parents(".form-group");
        c.addClass("has-error"),
        j.text(b).show()
    }
    function b(a) {
        var b = a.parents(".form-group");
        b.removeClass("has-error"),
        j.text("").hide(),
        b.find(".need-verify").attr("data-pass", !0)
    }
    function c(a) {
        var b = a.parents(".form-group");
        b.find(".need-verify").attr("data-pass", !1)
    }
    function d(a) {
        0 == t ? (a.attr("disabled", !1), a.text("获取验证码"), t = 60) : (a.attr("disabled", !0), a.text("重新发送(" + t + ")"), t--, setTimeout(function() {
            d(a)
        },
        1e3))
    }
    function e(a) {
        var b = {
            phoneNum: a
        };
        window.postData({
            type: "POST",
            API: window.config.getMessageCode,
            eventName: r
        },
        b)
    }
    if ($("#regist").length) {
        var f = /^1[34578]\d{9}$/g,
        g = /^[1-9][0-9]{4,9}$/g,
        h = $(".J_acXHRForm"),
        i = $(".need-verify"),
        j = $(".errorMsg"),
        k = $(".phoneNum"),
        l = $(".password"),
        m = $(".re-password"),
        n = $(".qqNum"),
        o = $("#slider"),
        p = $(".messageCode"),
        q = $(".getMessageCode"),
        r = "event.get.message.code";
        k.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            f.lastIndex = 0,
            f.test(d) ? b(c) : a(c, "手机号格式不对！")
        }),
        l.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val(),
            e = d.length;
            e >= 6 && 14 >= e ? b(c) : a(c, "请输入6-14位密码！")
        }),
        m.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = l.val(),
            e = c.val();
            d == e ? b(c) : a(c, "密码不一致！")
        }),
        n.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            g.lastIndex = 0,
            g.test(d) ? b(c) : a(c, "QQ号格式不对！")
        });
        var s = new SliderUnlock("#slider", {
            successLabelTip: "验证成功！"
        },
        function() {
            var a = $("#slider");
            b(a)
        });
        s.init(),
        p.on("focus",
        function() {
            c($(this))
        }).on("blur",
        function() {
            var c = $(this),
            d = c.val();
            d.length > 1 ? b(c) : a(c, "短信验证码错误！")
        });
        var t = 60;
        q.on("click",
        function() {
            var c = $(this),
            g = k.val();
            f.lastIndex = 0,
            f.test(g) ? "true" === o.parents(".form-group").find(".need-verify").attr("data-pass") ? (b(c), e(g), d(q)) : a(o, "拖动滑块验证！") : a(k, "手机号格式不对！")
        }),
        h.on("submit",
        function(b) {
            b.preventDefault();
            var c = SQ.form.getFormValue(h, !0),
            d = window.config.register,
            e = "";
            i.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? e += "true,": (e += "false,", a(b, "×"))
            }),
            -1 === e.indexOf("false") && c && SQ.ajax({
                url: d,
                data: c,
                autoReload: !1,
                hasTips: !1,
                success: function(a) {
                    var b = "object" == typeof a ? a: $.parseJSON(a);
                    b.data.msg ? j.text(b.data.msg).show() : window.location.href = window.config.redirectApi
                }
            })
        }),
        window.addXhrEventListener({
            eventName: r,
            showTips: !1,
            successFun: function(b) {
                var c = "object" == typeof b ? b: $.parseJSON(b);
                c.data.msg && a(q, c.data.msg)
            }
        })
    }
} (),
function(a) {
    "use strict";
    function b() {
        m.each(function() {
            var a = $(this);
            "checkbox" === a.attr("type") ? a.prop("checked", !1) : a.val("")
        }),
        l.removeClass("has-error").find(".tips").hide().text(""),
        l.find(".need-verify").attr("data-pass", "true")
    }
    function c() {
        var b = {},
        c = [];
        k.find("input").each(function() {
            var a = $(this),
            d = a.attr("name"),
            e = a.val();
            $.trim(e).length && ("checkbox" !== a.attr("type") && (b[d] = e), "checkbox" === a.attr("type") && "arrRoleId" === a.attr("name") && a.prop("checked") && (c.push(e), b[d] = c))
        }),
        k.find("select").each(function() {
            var a = $(this),
            c = a.attr("name"),
            d = parseInt(a.val(), 10);
            b[c] = d
        }),
        n.each(function() {
            var a = $(this),
            c = a.attr("name"),
            d = a.attr("data-val");
            a.prop("checked") && (b[c] = d)
        }),
        a.postData({
            type: "POST",
            API: d,
            eventName: e
        },
        b)
    }
    if ($("#user-mg").length) {
        var d, e, f = a.config.userCreate,
        g = a.config.userUpdate,
        h = "userMg.create",
        i = "userMg.update",
        j = $("#userModal"),
        k = ($(".J_addUser"), $(".J_userEdit"), $(".J_acXHRForm")),
        l = $(".form-group"),
        m = j.find("input"),
        n = k.find("input[type=radio]"),
        o = j.find("input[name=id]"),
        p = j.find(".userName"),
        q = j.find(".password"),
        r = j.find(".re-password"),
        s = (j.find("select[name=userType]"), $(".need-verify"));
        o = o.val(),
        d = o ? g: f,
        e = o ? i: h,
        b(),
        p.on("focus",
        function() {
            a.resetVerify($(this))
        }).on("blur",
        function() {
            var b = $(this),
            c = b.val(),
            d = a.verifyName(c);
            a.verifyForm(d, b)
        }),
        q.on("focus",
        function() {
            a.resetVerify($(this))
        }).on("blur",
        function() {
            var b = $(this),
            c = b.val(),
            d = a.verifyPassword(c);
            a.verifyForm(d, b)
        }),
        r.on("focus",
        function() {
            a.resetVerify($(this))
        }).on("blur",
        function() {
            var b = $(this),
            c = q.val(),
            d = b.val();
            return c !== d ? void a.addErrorTip(b, "密码不一致") : void a.setVerifyPass(b)
        }),
        k.on("submit",
        function(b) {
            b.preventDefault();
            var d = "";
            s.each(function() {
                var b = $(this);
                "true" === b.attr("data-pass") ? d += "true,": (d += "false,", a.addErrorTip(b, "×"))
            }),
            -1 === d.indexOf("false") && c()
        }),
        a.addXhrEventListener({
            eventName: h
        }),
        a.addXhrEventListener({
            eventName: i
        })
    }
} (window),
function() {
    "use strict";
    function a(a) {
        var b = a.find(".state").attr("data-state"),
        c = $(".dropdown-menu").find("li");
        c.each(function() {
            var a = $(this);
            a.show(),
            a.hasClass(b) && a.hide()
        })
    }
    function b(a, b) {
        var c = {
            id: a,
            onlineStatus: b
        };
        window.postData({
            type: "POST",
            API: f,
            eventName: g
        },
        c)
    }
    var c = $(".online").find("a"),
    d = $(".offline").find("a"),
    e = $(".J_edit"),
    f = void 0 === window.config ? void 0 : window.config.updateOnlineStatus,
    g = "common.state";
    if (0 !== c.length || 0 !== d.length) {
        if (!f) return void console.log("common.updateOnlineStatus:stateAPI is undefined");
        c.on("click",
        function(a) {
            a.preventDefault();
            var c = parseInt($(this).attr("data-id"), 10);
            c ? b(c, "1") : console.log("common.updateOnlineStatus:id is null")
        }),
        d.on("click",
        function(a) {
            a.preventDefault();
            var c = parseInt($(this).attr("data-id"), 10);
            c ? b(c, "0") : console.log("common.updateOnlineStatus:id is null")
        }),
        e.on("click",
        function() {
            var b = $(this).parents("tr");
            a(b)
        }),
        window.addXhrEventListener({
            eventName: g,
            successFun: function() {
                setTimeout(function() {
                    location.reload()
                },
                1e3)
            }
        })
    }
} ();