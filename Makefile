include .env

version:
	clasp versions

push:
	clasp push

deploy:
	clasp deploy --deploymentId $(DEPLOYMENT_ID)

update: push deploy
