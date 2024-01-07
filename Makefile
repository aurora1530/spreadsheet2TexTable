include .env
filename := $(shell date "+%Y_%m_%d_%H_%M_%S").log

log:
	@touch logs/$(filename)

version:
	@clasp versions

build:log
	@node builder.js | tee -a logs/$(filename)

push:build
	@clasp push | tee -a logs/$(filename)

newDeploy:
	@clasp deploy --deploymentId $(DEPLOYMENT_ID) | tee -a logs/$(filename)

update:push newDeploy
	@echo "Done!"

