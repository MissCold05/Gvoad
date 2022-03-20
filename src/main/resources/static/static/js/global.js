/**
 * Created by nichenhao on 2021/05/22.
 * All Rights Reserved.
 */

/**
 * 对外方法
 */
// 用于多个js文件决定一个onload内容
function addLoad(func) {
    let oldLoad = window.onload;
    window.onload = function() {
        oldLoad();
        func();
    }
}
// 空事件
function emptyEvent() {
    window.returnValue = true;
    return false;
}
// 默认事件
function defaultEvent() {
    window.returnValue = true;
    return true;
}
// 生成[a,b)随机整数
function rand(a, b) {
    return Math.floor(Math.random() * 10000) % (b - a) + a;
}
// 页面跳转
function newPage(symbol, type) {
    if (type === "this") {
        window.location.href = symbol;
    } else if (type === "new") {
        window.open(symbol);
    }
}
// http_get请求
function httpGet(urlStr, paramMap, successFunc, failFunc) {
    axios.get(urlStr, { params: paramMap }).then(successFunc).catch(failFunc);
}
// http_post请求
function httpPost(urlStr, paramMap, successFunc, failFunc) {
    let params = new FormData();
    for (let [key, value] of Object.entries(paramMap)) {
        params.set(key, String(value));
    }
    axios.post(urlStr, params).then(successFunc).catch(failFunc);
}
// 写缓存
function setCookie(name, value, expireHour) {
    if (expireHour === "") {
        document.cookie = name + "=" + value + ";SameSite=Lax";
    } else {
        let time = new Date();
        time.setTime(time.getTime() + expireHour * 3600000);
        document.cookie = name + "=" + value + ";expires=" + time.toGMTString() + ";SameSite=Lax";
    }
}
// 读缓存
function getCookie(name, defaultValue = "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; ++i) {
        let cookie = cookies[i].split("=");
        if (cookie[0].trim() === name) {
            return cookie[1];
        }
    }
    return defaultValue;
}
// 写存储
function setStorage(name, value, expireHour = 365 * 24) {
    let time = new Date();
    time.setTime(time.getTime() + expireHour * 3600000);
    window.localStorage.setItem(name, JSON.stringify({ val: value, exp: time.getTime() }));
}
// 读存储
function getStorage(name, defaultValue = "") {
    let item = window.localStorage.getItem(name);
    if (item == null) {
        return defaultValue;
    }
    let itemJson = JSON.parse(item);
    if (new Date().getTime() > itemJson.exp || itemJson.val === "") {
        return defaultValue;
    } else {
        return itemJson.val;
    }
}