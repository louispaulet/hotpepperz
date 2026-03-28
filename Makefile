.PHONY: install up build test deploy

install:
	npm install

up:
	npm run dev -- --host

build:
	npm run build

test:
	npm run test

deploy:
	npm run deploy
