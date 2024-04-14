install:
	npm ci

clean:
	rm -rf build & make -C server clean

clean-full:
	rm -rf node_modules; rm -rf build

build:
	npm run build

start:
	npm start

start-feature:
	make -C server run-server & make start