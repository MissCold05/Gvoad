package com.zyp.gvoad.mapper;

import com.zyp.gvoad.dao.ArticlePO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by YipengZhang on 2022/02/28
 */

@Mapper
public interface ArticleMapper {

    List<ArticlePO> selectJournalAndAffId();

    List<ArticlePO> selectAffIdByJournal(@Param("journal") String journal);

    Long countArticleByAffId(@Param("idList") List<Long> idList);
}
