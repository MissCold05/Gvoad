package com.zyp.gvoad.mapper;

import com.zyp.gvoad.dao.AffiliationPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by YipengZhang on 2022/02/28
 */

@Mapper
public interface AffiliationMapper {

    AffiliationPO selectById(@Param("id") Long id);

    List<AffiliationPO> selectNormal();

    List<AffiliationPO> selectIdAndLatAndLng();

    List<AffiliationPO> selectIdAndCountry();

    List<AffiliationPO> selectIdAndLatAndLngByCountry(@Param("country") String country);

    List<AffiliationPO> selectLatAndLngByIdList(@Param("idList") List<Long> idList);

}
