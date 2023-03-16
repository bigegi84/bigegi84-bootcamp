docker ps -a
docker images
docker build . -t jurusan-service
docker run -p 3000:3000 -d jurusan-service
docker rm 620dbadf0b70
docker rmi jurusan-service