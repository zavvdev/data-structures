format:
	npx prettier . --write

run-node:
	node --trace-uncaught $(path)
