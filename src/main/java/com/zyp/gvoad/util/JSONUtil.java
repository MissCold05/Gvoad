package com.zyp.gvoad.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created by YipengZhang on 2022/02/19.
 */
public class JSONUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JSONUtil.class);

    public static <BearCat> String convertObjectToJson(BearCat bearCat) {
        return JSONObject.toJSONString(bearCat);
    }

    public static <BearCat> BearCat convertJsonToObject(String json, Class<BearCat> bearCat) {
        try {
            return JSONObject.parseObject(json, bearCat);
        } catch (Exception e) {
            LOGGER.warn("json转对象失败, json:{}, className:{}, e:{}", json, bearCat.getSimpleName(), ExceptionUtil.getCause(e));
            return null;
        }
    }

    public static <BearCat> List<BearCat> convertJsonToObjectList(String json, Class<BearCat> bearCat) {
        try {
            return JSONArray.parseArray(json, bearCat);
        } catch (Exception e) {
            LOGGER.warn("json转对象数组失败, json:{}, className:{}, e:{}", json, bearCat.getSimpleName(), ExceptionUtil.getCause(e));
            return null;
        }
    }

}