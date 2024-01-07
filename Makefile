include .env

version:
	clasp versions

build:
	node builder.js

push:build
	clasp push

newDeploy:
	clasp deploy --deploymentId $(DEPLOYMENT_ID)

update:push newDeploy
	@echo "Done!"