package com.zyp.gvoad.util;

/**
 * Created by YipengZhang on 2022/02/19.
 */
public class ExceptionUtil {

    public static String getCause(Exception e) {
        return e != null && e.getCause() != null ? e.getCause().getMessage() : "empty exception";
    }

}