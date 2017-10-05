# Virgin America 3.0 - Magnolia CMS Template Module

* * * *

## Templates vs. Content vs. Assets

There are three important and separe concepts when working with Magnolia: templates, content and assets.

*Templates* structure how the data will be presented. They describe where and how the data should be displayed. This module provides essentially just the templates for Virgin's CMS.

Example: number of columns and their relative position that will ultimately render a particular page.

*Content* is the data itself. This data is to be provided by authors and will be combined with the templates above in order to be shown on pages.

Example: the title of a page is "DFW Travel Advisory" and the text content is "Due to winter storms in the Dallas-Fort Worth area, Cancelations and delays are expected at Dallas-Fort Worth International Airport (DFW) during the next 2 days."

*Assets* are the images that are to be displayed in connection with the content. These are also provided by authors.

Example: The features images on the homepage.

### Managing Templates

The first thing to be done is to define the visual and logical structure of each page. In practice, deciding where the final content will be shown.

The same structure can be reused for different types of pages.

Templates must be developed in modules within Magnolia and using the methods explained below.

These structures must change rarely, and hardly should there be new structures. Always prioritize the use of existing options.

When the pack of templates is defined, then a package is generated and must be installed on all public and author instances.

New content can only be produced after this process is completed.

For more information regarding Magnolia templates, refer to Magnolia's templating documentation: [http://documentation.magnolia-cms.com/display/DOCS/Templates](http://documentation.magnolia-cms.com/display/DOCS/Templates)

For more information regarding the module packaging, refer to Magnolia's module management documentation: [http://dev.magnolia-cms.com/~gjoseph/dont-configure-magnolia-let-your-projects-configure-it](http://dev.magnolia-cms.com/~gjoseph/dont-configure-magnolia-let-your-projects-configure-it)

### Managing Content

Once the templates are ready and installed, it is possible to start adding and managing content. This is divided into two parts: content creation per se and publishing process.

*Content creation:*

The user must access the instance author, choose the page she wants to insert content to (or create a new page), and select a respective template. The user will then be able to add, edit and remove content as defined within the constraints of the template.

*Publishing process*

After the content is inserted and properly accept, the user can publish it to the outside world. In order to do this it is necessary to choose the page and click the "Publish" option in the side menu. Once this process is done, the content will be displayed in public instances.

**Note**: Content can be created and changed as many times as authors want. The only limitation is structural, defined by templates.

### Managing Assets

Sometimes during content creation, one or more images might be needed. In these cases, authors have to upload such images to Magnolia. This is known as an asset system.

Just as with content, it is also diveded in two parts: importing the image and publishing process.

*Importing images*

To import a new image click on "Assets" and then choose the folder where it will be stored. Then click on "Upload Asset". The image will be importedIt is possible also import a zip with all images needed.

*Publishing process*

As with content, the author needs to publish assets for public viewing. In order to do so, select the asset (or a whole folder) and click on the side menu option "Publish"

### Important Note:

This module provides only Virgin's Magnolia templates.

All the content and assets data should be provided by authors utilizing Magnolia itself. This module is required on all instances prior to adding or editing any content.

* * * *

## Magnolia's Templating Details

### The templating system

Templates control the structure of the content to be show in a page.

They are dived in page, area and component.

*Pages* are used to render the content, agregating all the data. It also can keep the hierarquical navigation with children and parent pages.

*Areas* serve to structure a specific portion of a page and adapt the content to be shown within the page.

*Components* are where the author will edit the data per se, controling all the content.

For more information about templates:
[http://documentation.magnolia-cms.com/display/DOCS/My+first+template](http://documentation.magnolia-cms.com/display/DOCS/My+first+template)

### The module system

Modules are used to aggregate templates for specific use cases and they are also a good way to deploy strutural parts into Magnolia.

They are independent, so you can use the templates between modules, when producing content.

Modules are packaged in JAR files, to be deployed on the WEB-INF/lib folder of the server's Magnolia instance.

Magnolia has several built-in modules that can be used or extended. The STK Module (Standard Template Kit) is one of the examples.

More about modules:
[http://documentation.magnolia-cms.com/display/DOCS/Introduction+to+modules](http://documentation.magnolia-cms.com/display/DOCS/Introduction+to+modules)

### Building a packaged module

Modules need to be packaged in JAR file. Describing the Magnolia module packaging in details is beyond the scope of this document but as a high-level, creating such JAR file depends on:

* Maven script: allows maven to run and create the JAR file
* Bootstrapping files: containing all the templates and templates' assets (CSS, images, etc)
* Controlling Java classes: used to help on the bootstrapping process (i.e. configuring Magnolia)
* Module metadata: collection of XML files that describe how the module work

For more information regarding the module packaging, refer to Magnolia's module management documentation: [http://dev.magnolia-cms.com/~gjoseph/dont-configure-magnolia-let-your-projects-configure-it](http://dev.magnolia-cms.com/~gjoseph/dont-configure-magnolia-let-your-projects-configure-it)

* * * *

## The Carpel Concept

In order to create templates one normally works directly within Magnolia following the steps below:

1. Template creation
2. Template testing
3. Template exporting
4. Module package generation

The template creation itself is a very involving step including several hundred micro steps and settings which are all very much time consuming.

This is where the Carpel concept was born: a simplified meta-language tool that generates the required Magnolia template metadata.

More details about Carpel and how to set it up will follow shortly.

* * * *

## Installing and Building the Project Locally

### Build Requirements

- Ruby 2.0
- SimpleXML (gem install xml-simple)
- Bundle (gem install bundle + bundle install on the carpel folder)

- JDK 1.6+
- Apache-Tomcat 7.0.4
- Magnolia CMS 5.1.1
- CATALINA_HOME Environment Variable defined
- The author instance on magnolia should be named "author"
- The public instance on magnolia should be named "cms"

### Building Assemble (Angular + CSS + HTML)

On assemble folder, run:

    npm install
    grunt install
    grunt build

### Running Carpel

On carpel folder, run:

    ruby bin/carpel

### Building the vx-template Module

Simply run:

    mvn clean install

Directory 'target' should contain the 'vx-template-<version>.jar' file.

### Building by grunt

For the whole build, you can also run:

    grunt build

### Detailed instructions for installing and running Magnolia locally

Clone the repo

```sh
git clone git@github.com:virginam/Web3-CMS.git
```

Set global variable CATALINA_HOME

On mac:
```sh
vi ~/.bash_profile
```

Insert:
```sh
export CATALINA_HOME=/Users/path/to/magnolia/instance/magnolia-5.3.1/apache-tomcat-7.0.47
```

Save and quit
```sh
source ~/.bash_profile
```

Download Magnolia (Community Edition) from http://www.magnolia-cms.com/product/try/download.html

Unzip downloaded zip file, location doesn't matter

```sh
cd path/to/magnolia-5.3.1/apache-tomcat-7.0.47/bin/
magnolia_control.sh start
```

In browser, go to: http://localhost:8080/magnoliaAuthor
- click 'Start Install'

Go to: http://localhost:8080/magnoliaPublic
- click 'Start Install'

Go to: http://localhost:8080/magnoliaAuthor/
- login
- u: superuser
- p: superuser
- Setup > Configuration
- expand: Server > Activation > Subscribers > magnoliaPublic8080
- edit URL to: http://localhost:8080/cms

Back to the console
```sh
magnolia_control.sh stop

cd path/to/magnolia-5.3.1/apache-tomcat-7.0.47/webapps
```

- Rename the directory magnoliaAuthor -> author
- Rename the directory magnoliaPublic -> cms

Restart magnolia
```sh
cd path/to/magnolia-5.3.1/apache-tomcat-7.0.47/bin/
magnolia_control.sh start
```

Test all working by visiting http://localhost:8080/cms/.magnolia/admincentral and http://localhost:8080/cms/demo-project.html in your browser

Simples.


#### Get the repo up and running

```sh
cd path/to/Web3-CMS/
npm install

cd carpel/
ruby bin/carpel

cd ../assemble
npm install
grunt server
# this is a test. if it runs without errors we are golden

cd ..
mvn clean install

# now cross those fingers and pray to baby jesus that everything is ready for...
grunt deploy
```

If deploy runs without errors, then magnolia is now running

Test:
```sh
ps -ax | egrep java
```
You should see the magnolia task listed

To stop:
```sh
magnolia-5.3.1/apache-tomcat-7.0.47/bin/shutdown.sh
```

#### Get the CMS content

Login at http://localhost:8080/author
- superuser/superuser
- (there may be a second install step here. complete install and then login)

Now we need to access the work.co environment and export the pages
- go to http://magnolia.work.co/author
- superuser/superuser

- Tools > Export

> repository: website

> base path: /

> compression: Xml

And again for

> repository: dam

> base path: /

> compression: Xml

You should now have 2 xml files, website.xml and dam.xml

Now back at http://localhost:8080/author/

Let's import the files

- Tools > Import

> repository: website

> base path: /

> file: website.xml

> UUIDS: Remove existing nodes with same id

And

> repository: dam

> base path: /

> file: dam.xml

> UUIDS: Remove existing nodes with same id

Go back to magnolia home

- Edit > Pages

- Select each page individually (FML)

- click 'Publish' / 'Publish incl. subpages' in the right hand menu

Now restart the magnolia instance
```sh
grunt stop
grunt start
```

Check for vx-template
- go to http://localhost:8080/author/
- you should be prompted to install. do it. this installs the new templates.
- setup > configuration
- under modules, look for vx-template

Go to http://localhost:8080/author/components or any other page as required.

And it's over.

* * * *

## Carpel Documentation

### Configuring Carpel

Carpel is configured with a file called `carpel.json` residing under the `carpel` folder:

    {
      "module": {
        "name": "vx-template",
        "src-path": "vx-template",
        "mgnl-resources-path": "../src/main/resources",
        "mgnl-fast-deploy": "~/magnolia-5.1.1/apache-tomcat-7.0.40/webapps/magnoliaAuthor"
      }
    }

These are the nodes:

* `name`: how the module will be named
* `src-path`: which folder within carpel's folder contains the metadata files to be parsed
* `mgnl-resources-path`: points to the folder where the bootstrap files will reside within the JAR package
* `mgnl-fast-deploy`: points to the folder where magnolia is installed. This is used for fast deployment during development process.

### Directory Structure

The Module folder (`vx-template`) is structured like this:

`defs`
+ `components`
+ `dialogs`
+ `pages`
+ `vanity`
`resources`
+ `img`
+ `js`
`templates`
+ `components`
+ `pages`

The `defs` folder groups and the files and folders that define how the template will work. It is where most of the metadata resides. Pages and their respective areas are defined withing the `components` folder; components stay within `components` while dialogs that specify how to to interact with the content reside in `dialogs`. Vanity URLs are set within the `vanity` folder.

The `resources` folder is where the files that compose the templates (except the templates themselves) reside. Images stay in `img` while javascript scripts go to `js`.

The `templates` folder group all the templates of the system in the Freemaker scripting language. Components have their own folder at `components` and pages reside in `pages`.

### Naming Conventions

All carpel files are named using the dashed convention but the name of the components they refer to is camel-cased. I.e. a component definition file named `vx-airport-entry.json` defines the component named `vxAirportEntry`

Templates are organized either under `components` or `pages` folders. Each component or page must reside in its own page and the template file must be called `main.ftl`. If either page or component is broken down in smaller areas, an `areas` subfolder is required.

For components, pages and areas if the template file has a `-json` in its name structure, it is assumed that a json variant of that page is required. I.e. the components `main.ftl` file is in the folder side by side with a `main-json.ftl`.

### Enabling Authoring via Calper

Dialog definitions can be specified in components' definitions. These dialogs will allow authors to edit content that is specific to that content.

Example: the `vx-airport-entry.json` describes a component that controls a single airport entry on the view:

    {
      "title": "[VX] Airport Entry",
      "dialog": "vxAirportEntryProperties"
    }

The `dialog` property points to a dialog called `vxAirportEntryProperties` which should be found in the `def/dialogs` folder under the name of `vx-airport-entry-properties.json`.

In fact, such file contains:

    {
      "title": "Airport Entry",

      "tabs": {
        "entry": {

          "code": {
            "label": "Code",
            "type": "TEXT_FIELD"
          },

          "name": {
            "label": "Name",
            "type": "TEXT_FIELD"
          },

          "state": {
            "label": "State",
            "type": "TEXT_FIELD"
          },

          "country": {
            "label": "Country",
            "type": "TEXT_FIELD",
            "default": "USA"
          },

          "international": {
            "label": "International?",
            "type": "SELECT_FIELD",
            "options": {
              "false": "False",
              "true": "True"
            },
            "default": "false"
          },

          "destinationMsg": {
            "label": "Destination Message",
            "type": "TEXT_FIELD",
            "default": "Ok! Let's go!"
          }

        }
      }
    }

Each dialog is broken down in multiple tabs (see `tabs` node). Each tab node contains multiple fields. I.e. the definition above says that one of the fields within the entry tab is `name` and it should be a text field:

    "name": {
      "label": "Name",
      "type": "TEXT_FIELD"
    }

* * * *

## Deployment

### Generic steps

- Delete module from magnolia author instance
- Delete module from magnolia public instance
- Deploy JAR file to author instance
- Deploy JAR file to public instance
- Stop Magnolia on both instances
- Remove JAR Files from both instances on WEB-INF folder
- Copy new JAR file to both instances on WEB-INF folder
- Start Magnolia on both instances
- Access author instance and install the new modules
- Access public instance and install the new modules
- On Author instance, import xml data files and publish them

### Details for running on localhost

- Simply run:

    grunt deploy

### Details for W&C's EC2 instance

- SFTP JAR files to `/home/ubuntu` on `ubuntu@magnolia.work.co`
- Stop Magnolia: `sudo /etc/init.d/apache-tomcat.sh stop`
- Remove JAR Files from Author WEB-INF folder: `sudo rm /opt/apache-tomcat-7.0.47/webapps/author/WEB-INF/lib/vx-template*.jar`
- Copy JAR files from ubuntu to Author WEB-INF folder: `sudo cp /home/ubuntu/vx-template-1.2.4-SNAPSHOT.jar /opt/apache-tomcat-7.0.47/webapps/author/WEB-INF/lib`
- Remove JAR Files from Public WEB-INF folder: `sudo rm /opt/apache-tomcat-7.0.47/webapps/cms/WEB-INF/lib/vx-template*.jar`
- Copy JAR files from ubuntu to Public WEB-INF folder: `sudo cp /home/ubuntu/vx-template-1.2.4-SNAPSHOT.jar /opt/apache-tomcat-7.0.47/webapps/cms/WEB-INF/lib`
- Start Magnolia: `sudo /etc/init.d/apache-tomcat.sh start`
- Access Author instance and install the new modules: `http://magnolia.work.co/author`
- Access Public instance and install the new modules: `http://magnolia.work.co/cms`
- On Author instance, import xml data files and publish them

### Creating New Tomcat Instance on W&C's EC2

- Unzip `/home/ubuntu/magnoliaPublic.zip` to `/opt/apache-tomcat-7.0.47/webapps` then:

    cd /opt/apache-tomcat-7.0.47/webapps
    sudo unzip /home/ubuntu/magnoliaPublic.zip

- Rename the instance:

    sudo mv magnoliaPublic NEW_INSTANCE

### Deploy to Dev's VX Server

- In a shell on the bitnami server, run the command:

    scp -r -i /home/bitnami/.ssh/id_dsa vx-template-1.2.4-SNAPSHOT.jar workco.ci@sftp.virginamerica.com:dev/jar/

### Deploy to QA's VX Server

- In a shell on the bitnami server, run the command:

    scp -r -i /home/bitnami/.ssh/id_dsa vx-template-1.2.4-SNAPSHOT.jar workco.ci@sftp.virginamerica.com:qa/jar/
