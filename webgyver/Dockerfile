FROM openjdk:8
EXPOSE 9000
ARG JAR_FILE=build/libs/webgyver-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "-Dspring-boot.run.arguments=--spring.datasource.url=${properties.file.url}, --spring.datasource.hikari.username=${properties.file.username}, --spring.datasource.hikari.password=${properties.file.password}, --jwt.secret=${properties.file.jwt.secret}", "app.jar"]