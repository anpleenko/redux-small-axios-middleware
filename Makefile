prepublish:
	rm -rf ./dist
	# rm -rf ./index.js
	# touch index.js
	# ./node_modules/.bin/gulp build
	# babel index.js --out-dir .
	babel src --out-dir ./dist
	# rm -rf dist/*.jsx
