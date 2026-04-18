.PHONY: install up build test deploy screenshot-all

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

screenshot-all:
	npm run screenshot:all
