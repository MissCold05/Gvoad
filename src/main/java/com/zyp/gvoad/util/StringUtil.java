package com.zyp.gvoad.util;

/**
 * Created by YipengZhang on 2022/02/19.
 */
public class StringUtil {

    public static Boolean isEmpty(String str) {
        return str == null || str.trim().length() == 0;
    }

    public static Boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

}