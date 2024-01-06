include .env

version:
	clasp versions

build:
	node builder.js

push:
	clasp push

newDeploy:
	clasp deploy --deploymentId $(DEPLOYMENT_ID)

update:build push newDeploy
	@echo "Done!"