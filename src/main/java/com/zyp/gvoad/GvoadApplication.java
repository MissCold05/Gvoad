package com.zyp.gvoad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Created by YipengZhang on 2022/02/18.
 */
@SpringBootApplication
public class GvoadApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder builder) {
        return builder.sources(GvoadApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(GvoadApplication.class, args);
    }

}
