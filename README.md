#Хуинитум

Web kit for easy start

##Features
- Used build system — [Gulp](http://gulpjs.com/);

- Templating with [gulp-html-tag-include](https://www.npmjs.com/package/gulp-html-tag-include);

- Run a webserver on 8000 with [gulp-connect](https://www.npmjs.com/package/gulp-connect);

- Could be used CSS4 features, because of [PostCSS](https://github.com/postcss/postcss) and [PostCSS-cssnext](https://github.com/MoOx/postcss-cssnext);

##How to start
```bash
    $ npm install
    $ gulp start
```
##Directory & file structure
```
project
│   README.md
│   .csscomb.json
│   .jscsrc
│   gulpfile.js
│   package.json
│
└───build
│   │   index.html
│   │   script.js
│   │   style.css
│   │   vendors.js
│   │   vendors.css
│   │
│   └───img
│   │       kitty.png
│   │
│   └───fonts
│           myfont.otf
│
└───static
    │
    └───postcss
    │       style.postcss
    │       header.postcss
    │       content.postcss
    │       footer.postcss
    │
    └───js
    │       script.js
    │
    └───vendors
    │   │   plugin1.js
    │   │
    │   └───plugin
    │          plugin2.css
    │          plugin2.js
    └───img
    │       kitty.png
    │
    └───fonts
    │       myfont.otf
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
