package com.zyp.gvoad.controller;

import com.alibaba.fastjson.JSONObject;
import com.zyp.gvoad.domain.JournalData;
import com.zyp.gvoad.domain.Position;
import com.zyp.gvoad.json.JournalPosList;
import com.zyp.gvoad.json.Most20Journal;
import com.zyp.gvoad.service.JournalService;
import com.zyp.gvoad.util.HttpUtil;
import com.zyp.gvoad.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class JournalController {

    private static final Logger LOGGER = LoggerFactory.getLogger(JournalController.class);
    private static final Boolean JSON_SWITCH = Boolean.FALSE;

    @Resource
    private JournalService journalService;

    @GetMapping("queryMostJournalOf20Affiliation")
    public JSONObject queryMostJournalOf20Affiliation() {
        List<JournalData> journalDataList = null;
        if (JSON_SWITCH) {
            String jsonString = Most20Journal.getMost20Journal();
            journalDataList = JSONUtil.convertJsonToObjectList(jsonString, JournalData.class);
        } else {
            journalDataList = journalService.queryMost20JournalData();
        }
        return HttpUtil.responseGenerate(false, journalDataList, "查询成功");
    }

    @GetMapping("queryPositionListByJournal")
    public JSONObject queryPositionListByJournal(String journal) {
        List<Position> positionList = null;
        if (JSON_SWITCH) {
            String jsonString = JournalPosList.getJournalPosList(journal);
            positionList = JSONUtil.convertJsonToObjectList(jsonString, Position.class);
        } else {
            positionList = journalService.queryPositionListByJournal(journal);
        }
        return HttpUtil.responseGenerate(false, positionList, "查询成功");
    }

}
