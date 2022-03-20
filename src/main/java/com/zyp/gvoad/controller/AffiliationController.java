package com.zyp.gvoad.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.zyp.gvoad.domain.Affiliation;
import com.zyp.gvoad.domain.ArticleCountry;
import com.zyp.gvoad.json.Most20Journal;
import com.zyp.gvoad.service.AffiliationService;
import com.zyp.gvoad.util.HttpUtil;
import com.zyp.gvoad.util.JSONUtil;
import com.zyp.gvoad.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class AffiliationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AffiliationController.class);
    private static final Boolean JSON_SWITCH = Boolean.TRUE;

    @Resource
    private AffiliationService affiliationService;

    @GetMapping("getExample")
    public JSONObject getExample(String articleName) {
        if (StringUtil.isEmpty(articleName)) {
            return HttpUtil.responseGenerate(true, "", "文章名称不能为空");
        }

        Affiliation affiliation = affiliationService.queryAffiliation();

        return HttpUtil.responseGenerate(false, affiliation, "查询成功");
    }

    @GetMapping("queryMostArticleOf10Country")
    public JSONObject queryMostArticleOf10Country() {
        List<ArticleCountry> articleCountryList = null;
        if (JSON_SWITCH) {
            String jsonString = Most20Journal.getMost20Journal();
            articleCountryList = JSONUtil.convertJsonToObjectList(jsonString, ArticleCountry.class);
        } else {
            articleCountryList = affiliationService.queryMost10ArticleCountry();
        }
        return HttpUtil.responseGenerate(false, articleCountryList, "查询成功");
    }

}
