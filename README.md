#Хуинитум

Web kit for easy start

- Used build system — [Gulp](http://gulpjs.com/);

- Templating with [gulp-html-tag-include](https://www.npmjs.com/package/gulp-html-tag-include);

- Could be used CSS4 features, because of [PostCSS](https://github.com/postcss/postcss) and [PostCSS-cssnext](https://github.com/MoOx/postcss-cssnext);

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
│          kitty.png
│
└───static
│   │
│   └───css
│   │      style.css
│   │
│   └───js
│   │      script.js
│   │
│   └───vendors
│   │   │   plugin1.js
│   │   │
│   │   └───plugin
│   │          plugin2.css
│   │          plugin2.js
│   └───img
│          kitty.png
│
└───templates
    │   index.html
    │
    └───blocks
           head.html
           main.html
           srcs.html
```

Inspired by [Straykov's Initium](https://github.com/straykov/initium)
