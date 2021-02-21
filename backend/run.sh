#!/bin/bash

if [ "$1" == "docker" ]; then
	docker run -it users:latest
elif [ "$1" == "reinstall" ]; then
	mvn clean
  mvn install
elif [ "$1" == "fromscratch" ]; then
	mvn clean
  mvn install
  docker run -it reservation:latest
elif [ "$1" == "spring" ]; then
  mvn spring-boot:run
else
  # docker run -it reservation:latest
  mvn spring-boot:run
fi
