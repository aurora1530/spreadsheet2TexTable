include .env

version:
	clasp versions

push:
	clasp push

newDeploy:
	clasp deploy --deploymentId $(DEPLOYMENT_ID)

update: push newDeploy
