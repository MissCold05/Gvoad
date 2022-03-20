package com.zyp.gvoad.controller;

import com.alibaba.fastjson.JSONObject;
import com.zyp.gvoad.domain.CountryData;
import com.zyp.gvoad.domain.Position;
import com.zyp.gvoad.json.JournalPosList;
import com.zyp.gvoad.json.Most20Country;
import com.zyp.gvoad.service.CountryService;
import com.zyp.gvoad.util.HttpUtil;
import com.zyp.gvoad.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);
    private static final Boolean JSON_SWITCH = Boolean.TRUE;

    @Resource
    private CountryService countryService;

    @GetMapping("queryMost20CountryData")
    public JSONObject queryMost20CountryData() {
        List<CountryData> countryDataList = null;
        if (JSON_SWITCH) {
            String jsonString = Most20Country.getMost20Country();
            countryDataList = JSONUtil.convertJsonToObjectList(jsonString, CountryData.class);
        } else {
            countryDataList = countryService.queryMost20CountryData();
        }
        return HttpUtil.responseGenerate(false, countryDataList, "查询成功");
    }

    @GetMapping("queryPositionListByCountry")
    public JSONObject queryPositionListByCountry(String country) {
        List<Position> positionList = null;
        if (JSON_SWITCH) {
            String countryString = JournalPosList.getJournalPosList(country);
            positionList = JSONUtil.convertJsonToObjectList(countryString, Position.class);
        } else {
            positionList = countryService.queryPositionListByCountry(country);
        }
        return HttpUtil.responseGenerate(false, positionList, "查询成功");
    }

}
