#/bin/bash
docker stop $(docker ps -a -q)
cd DB-GUI-F21
docker-compose build
docker-compose up -d
exit