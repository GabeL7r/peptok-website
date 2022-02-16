deploy:
	@npm run build
	@git checkout gh-pages
	@cp -r build/* .
	@rm -rf build
	@git add .
	@git commit -m "Update: $$(date '+%Y-%m-%d %H:%M:%S')"
	@git push --set-upstream origin gh-pages
	@git checkout main