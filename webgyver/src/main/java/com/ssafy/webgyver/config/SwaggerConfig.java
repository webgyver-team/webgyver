//package com.ssafy.webgyver.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//
//import java.util.List;
//
//import static com.google.common.collect.Lists.newArrayList;
//
///**
// * API 문서 관련 swagger2 설정 정의.
// */
//@Configuration
//public class SwaggerConfig {
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2).useDefaultResponseMessages(false)
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.ant("/api/**"))
//                .build()
//                .securityContexts(newArrayList(securityContext()))
//                .securitySchemes(newArrayList(apiKey()))
//                ;
//    }
//
//    private ApiKey apiKey() {
//        return new ApiKey(SECURITY_SCHEMA_NAME, "Authorization", "header");
//    }
//
//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }
//
//    public static final String SECURITY_SCHEMA_NAME = "JWT";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL = "global";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL_DESC = "accessEverything";
//
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope authorizationScope = new AuthorizationScope(AUTHORIZATION_SCOPE_GLOBAL, AUTHORIZATION_SCOPE_GLOBAL_DESC);
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return newArrayList(new SecurityReference(SECURITY_SCHEMA_NAME, authorizationScopes));
//    }
//
//    @Bean
//    UiConfiguration uiConfig() {
//        return UiConfigurationBuilder.builder()
////                .supportedSubmitMethods(newArrayList("get").toArray(new String[0])) // try it 기능 활성화 범위
////                .operationsSorter(METHOD)
//                .build();
//    }
//}