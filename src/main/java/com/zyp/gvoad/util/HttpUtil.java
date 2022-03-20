package com.zyp.gvoad.util;

import com.alibaba.fastjson.JSONObject;

public class HttpUtil {

    public static JSONObject responseGenerate(Boolean error, Object data, String message) {
        JSONObject response = new JSONObject();
        response.put("error", error);
        response.put("data", data);
        response.put("message", message);
        return response;
    }

}
