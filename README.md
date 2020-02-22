#Хуинитум

Web kit for easy start

##Features
- Used build system — [Gulp 4](http://gulpjs.com/);

- Templating with [gulp-html-tag-include](https://www.npmjs.com/package/gulp-html-tag-include);

- Run a webserver on 8000 with [gulp-connect](https://www.npmjs.com/package/gulp-connect);

##How to start
```bash
    $ npm install
    $ gulp
```
##Directory & file structure
```
project
│   README.md
│   .gitiignore
│   gulpfile.js
│   package.json
│
└───build
│   │   index.html
│   │   script.js
│   │   style.css
│   │
│   └───img
│          kitty.png
│
└───static
    │
    └───css
    │       style.css
    │
    └───js
    │       script.js
    │
    └───img
    │       kitty.png
    │
    └───templates
        │   index.html
        │
        └───blocks
                head.html
                main.html
                scripts.html
```

Inspired by [Straykov's Initium](https://github.com/straykov/initium)
