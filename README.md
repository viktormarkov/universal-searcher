# Universal Searcher
Chrome extension for seaching selected text on any websites.

### About
1) Add url with "####". 4 hash symbols will be replaced by a selected text.
<img src="https://user-images.githubusercontent.com/10694206/98250062-0f70dc00-1f88-11eb-9abe-1dbbd859de15.png" width="400">

2) Select text and pick a source.
<img src="https://user-images.githubusercontent.com/10694206/98250114-1d266180-1f88-11eb-8658-9e0667700988.png" width="400">

3) https://www.imdb.com/q=pulp%20fiction will be opened in a new tab.

### Setup
1) Build extension with ```yarn build```
2) Go to [chrome://extensions/](chrome://extensions/)
3) Enable "Developer mode"
4) Click on "Load unpacked"
5) Select ```dist``` directory

### Other stuff
- ```yarn watch``` - watch and rebuild code on file changes
- ```yarn test``` - run tests
