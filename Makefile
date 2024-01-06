include .env

version:
	clasp versions

build:
	node build.js

push:
	clasp push

newDeploy:
	clasp deploy --deploymentId $(DEPLOYMENT_ID)

update: build push newDeploy
