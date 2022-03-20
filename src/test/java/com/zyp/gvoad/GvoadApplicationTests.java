package com.zyp.gvoad;

import com.zyp.gvoad.mapper.AffiliationMapper;
import com.zyp.gvoad.service.JournalService;
import com.zyp.gvoad.util.JSONUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class GvoadApplicationTests {

    @Resource
    private JournalService journalService;

    @Test
    void contextLoads() {
        System.out.println(JSONUtil.convertObjectToJson(journalService.queryMost20JournalData()));
    }

}
