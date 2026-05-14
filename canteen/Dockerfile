# ============================================================================
# Stage 1: Build the JAR using Maven wrapper (no local Maven needed)
# ============================================================================
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper + pom first (layer caching for dependencies)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Make mvnw executable and download dependencies (cached layer)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build (skip tests for faster build)
COPY src/ src/
RUN ./mvnw package -DskipTests -B

# ============================================================================
# Stage 2: Lightweight runtime image
# ============================================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default port (Render/Railway inject PORT at runtime)
EXPOSE 8080

# Run the application
# --server.port=${PORT:8080} ensures the app binds to the PORT env var
# that Render/Railway inject, falling back to 8080 if not set.
# -Djava.security.egd improves startup time on Linux containers.
ENTRYPOINT ["sh", "-c", "java -Djava.security.egd=file:/dev/./urandom -jar app.jar --server.port=${PORT:-8080}"]
