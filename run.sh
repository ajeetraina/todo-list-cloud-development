docker-compose down

# Stop all running containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Remove all networks
docker network rm $(docker network ls -q)

# Prune everything including volumes
docker system prune -a --volumes

# (Optional) Clear Docker build cache
docker builder prune

# Rebuild and restart Docker containers
docker-compose up --build -d

# Check the status of the containers
docker ps
