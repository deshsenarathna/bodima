# Use official OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Install Maven
RUN apk add --no-cache maven bash

# Set working directory
WORKDIR /app

# Copy pom.xml first
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the app
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
