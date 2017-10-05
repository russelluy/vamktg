# Virgin America 3.0 - Magnolia CMS Template

* * * *

## Todo List

- Import airports on combos

- Include "garbage icon" on the modules to remove values from templates

- Make a script to copy files from the TC to the Assemble:

    - CSS Folders:
    web3-ui/src/styles/base     -->  assemble/src/styles/base
    web3-ui/src/styles/modules  -->  assemble/src/styles/modules

    - Javascript Folders:
    web3-ui/src/app/common      -->  assemble/src/app/common
    web3-ui/src/app/core        -->  assemble/src/app/core
    web3-ui/src/app/success     -->  assemble/src/app/success

- Files that need a script to change the content:

    - CSS Files:
    assemble\src\styles\main.scss
    assemble\src\styles\main-ie8.scss

    - HTML Files:
    web3-ui/src/index.html      -->  assemble\src\templates\layouts\default.hbs
    src\app\common\templates\modals\footer.tpl.html     -->  assemble\src\app\common\templates\modals\footer.tpl.html

    - Javascript Files:
    assemble\src\app\cms\vx-cms-app.js
    assemble\src\app\cms\directives\header.js
    assemble\src\app\cms\directives\footer.js
    assemble\src\app\cms\services\persistence.js