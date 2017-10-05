require 'json'
require 'fileutils'

module Carpel

  class UICreator


    def self.class( base_path, ui_path )

      resource_path = "/cms/.resources/vx-template/"

      if File.exist?(ui_path) then

        Dir.mkdir("#{base_path}/resources/") unless File.exists?("#{base_path}/resources/")
        Dir.mkdir("#{base_path}/resources/scripts/") unless File.exists?("#{base_path}/resources/scripts/")
        Dir.mkdir("#{base_path}/resources/styles/") unless File.exists?("#{base_path}/resources/styles/")
        Dir.mkdir("#{base_path}/resources/images/") unless File.exists?("#{base_path}/resources/images/")
        Dir.mkdir("#{base_path}/resources/app_templates/") unless File.exists?("#{base_path}/resources/app_templates/")
        Dir.mkdir("#{base_path}/resources/bower_components/") unless File.exists?("#{base_path}/resources/bower_components/")

        scripts_path = File.expand_path("#{base_path}/resources/scripts/")
        FileUtils.rm_rf(scripts_path)
        Dir.mkdir(scripts_path) unless File.exists?(scripts_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/scripts/*"), scripts_path)

        bower_path = File.expand_path("#{base_path}/resources/bower_components/")
        FileUtils.rm_rf(bower_path)
        Dir.mkdir(bower_path) unless File.exists?(bower_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/bower_components/*"), bower_path)

        styles_path = File.expand_path("#{base_path}/resources/styles/")
        FileUtils.rm_rf(styles_path)
        Dir.mkdir(styles_path) unless File.exists?(styles_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/styles/*"), styles_path)

        images_path = File.expand_path("#{base_path}/resources/images/")
        FileUtils.rm_rf(images_path)
        Dir.mkdir(images_path) unless File.exists?(images_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/images/*"), images_path)

        success_path = File.expand_path("#{base_path}/resources/app_templates/")
        FileUtils.rm_rf(success_path)
        Dir.mkdir(success_path) unless File.exists?(success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/success/templates/*"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/common/directives/*.html"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/routes/directives/*.html"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/routes/templates/*.html"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/common/templates/modals/*.html"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/common/templates/*.html"), success_path)
        FileUtils.cp_r(Dir.glob("#{ui_path}/../src/app/elevate/directives/*.html"), success_path)

        default_path = "#{base_path}/templates/pages/default.ftl"
        FileUtils.cp_r(Dir.glob("#{ui_path}/default.html"), "#{base_path}/templates/pages/")
        File.rename("#{base_path}/templates/pages/default.html", default_path)

        if File.exist?(default_path) then

          tagging = '' +"\n"
          tagging = tagging + '<!-- build: Tagging -->' +"\n"
          tagging = tagging + '<script language="javascript">' +"\n"
          tagging = tagging + '// Data Layer' +"\n"
          tagging = tagging + 'var pageSlug = "${content.pageSlug!}";' +"\n"
          tagging = tagging + 'var webData ={' +"\n"
          tagging = tagging + '[#if content.pageSlug??]pageName: "cms: " + pageSlug // Page Name (Page slug variable assumed)[/#if]' +"\n"
          tagging = tagging + '[#list content?children as to]' +"\n"
          tagging = tagging + '[#if to.name = "pairValues"]' +"\n"
          tagging = tagging + '[#list to.getNodes() as to_pair]' +"\n"
          tagging = tagging + ',${to_pair.getProperty(\'n\').string!}: "${to_pair.getProperty(\'v\').string!}"' +"\n"
          tagging = tagging + '[/#list]' +"\n"
          tagging = tagging + '[/#if]' +"\n"
          tagging = tagging + '[/#list]' +"\n"
          tagging = tagging + '[#if content.siteArea??],siteSection: "${content.siteArea!}" // Site Area (page groupings still to be confirmed / entered on page)[/#if]' +"\n"
          tagging = tagging + '};' +"\n"
          tagging = tagging + '// TagMan Container' +"\n"
          tagging = tagging + 'window.tmParam = {};' +"\n"
          tagging = tagging + '(function(d,s){' +"\n"
          tagging = tagging + "var client = 'virginamerica';" +"\n"
          tagging = tagging + 'var siteId = 20;' +"\n"
          tagging = tagging + '//  do not edit' +"\n"
          tagging = tagging + 'var a=d.createElement(s),b=d.getElementsByTagName(s)[0];' +"\n"
          tagging = tagging + "a.async=true;a.type='text/javascript';" +"\n"
          tagging = tagging + "a.src='//sec.levexis.com/clients/'+client+'/'+siteId+'.js';" +"\n"
          tagging = tagging + "a.tagman='st='+(+new Date())+'&c='+client+'&sid='+siteId;" +"\n"
          tagging = tagging + 'b.parentNode.insertBefore(a,b);' +"\n"
          tagging = tagging + "})(document,'script');" +"\n"
          tagging = tagging + '</script>' +"\n"
          tagging = tagging + '<!-- endbuild -->' +"\n"

          mgnl = '' + "\n"
          mgnl = mgnl + '<!-- build: Carpel/Magnolia -->' + "\n"
          mgnl = mgnl + '[@cms.init /]' + "\n"
  #        mgnl = mgnl + '<meta charset="utf-8">' + "\n"
  #        mgnl = mgnl + '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">' + "\n"
          mgnl = mgnl + '<meta http-equiv=\'cache-control\' content=\'no-cache\'>' + "\n"
          mgnl = mgnl + '<meta http-equiv=\'expires\' content=\'0\'>' + "\n"
          mgnl = mgnl + '<meta http-equiv=\'pragma\' content=\'no-cache\'>' + "\n"
          mgnl = mgnl + '<link rel="canonical" href="${content.canonical!state.originalBrowserURL?replace(".html","")}"/>' + "\n"
          mgnl = mgnl + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>' + "\n"
          mgnl = mgnl + '<meta name="keywords" content="${content.keywords!content.title!content.@name}" />' + "\n"
          mgnl = mgnl + '<meta name="description" content="${content.description!content.abstract!}" />' + "\n"
          mgnl = mgnl + '<!-- FACEBOOK SOCIAL MEDIA SHARE -->' + "\n"
          mgnl = mgnl + '<meta property="og:title" content="${content.face_title!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:url" content="${content.face_url!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:site_name" content="${content.face_site_name!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:admins" content="${content.face_admins!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:description" content="${content.face_description!content.description!content.abstract!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:type" content="${content.face_type!}"/>' + "\n"
          mgnl = mgnl + '<meta property="og:image" content="${content.face_image!}"/>' + "\n"
          mgnl = mgnl + '<!-- END FACEBOOK -->' + "\n"
          mgnl = mgnl + '<!-- TWITTER -->' + "\n"
          mgnl = mgnl + '<meta name="twitter:site" content="@VirginAmerica" />' + "\n"
          mgnl = mgnl + '<meta name="twitter:card" content="${content.twitter_summary!}" />' + "\n"
          mgnl = mgnl + '<!-- END TWITTER -->' + "\n"
          mgnl = mgnl + '<meta name="author" content="${content.author!}" />' + "\n"
          mgnl = mgnl + '<meta name="robots" content="${content.robots!\'all\'}" />' + "\n"
          mgnl = mgnl + '[#assign pageModel = model.root!]' + "\n"
          mgnl = mgnl + '[#assign contentPageTitle = content.windowTitle!content.title!content.@name]' + "\n"
          mgnl = mgnl + '<title>${contentPageTitle} | Virgin America</title>' + "\n"
          mgnl = mgnl + '<!-- endbuild -->' + "\n"

          text = File.open(default_path).read

          text = text.gsub( "</head>", tagging + mgnl + "</head>" )
          text = text.gsub( "<title> | Virgin America</title>", "")
          text = text.gsub( "h1", "h3")

          text = text.gsub( 'href="styles/', 'href="' + resource_path + "styles/")
          text = text.gsub( 'href="/styles/', 'href="' + resource_path + "styles/")
          text = text.gsub( 'href="scripts/', 'href="' + resource_path + "scripts/")
          text = text.gsub( 'href="/scripts/', 'href="' + resource_path + "scripts/")
          text = text.gsub( 'src="scripts', 'src="' + resource_path + "scripts")
          text = text.gsub( 'href="bower_components/', 'href="' + resource_path + "bower_components/")
          text = text.gsub( 'href="images/', 'href="' + resource_path + "images/")
          text = text.gsub( 'href="/images/', 'href="' + resource_path + "images/")

          text = "[#macro page content model]" + "\n" + text + "\n" + "[/#macro]"

          fonts = ""
          fonts = fonts + "[#assign domain = state.originalBrowserURL?replace('http://','')?replace('https://','')?split('/')[0]]"
          fonts = fonts + "[#if domain == 'rogerioworkco:8080' || domain == 'magnolia.work.co']"
          fonts = fonts + "<link rel='stylesheet' type='text/css' href='" + resource_path + "images/fonts.css" + "'>"
          fonts = fonts + "[#else]"
          fonts = fonts + "<link rel='stylesheet' type='text/css' href='//cloud.typography.com/6612472/695864/css/fonts.css'>"
          fonts = fonts + "[/#if]"

          text = text.gsub( '<link rel="stylesheet" type="text/css" href="//cloud.typography.com/6612472/695864/css/fonts.css">', fonts)

          default = File.open(default_path, 'w')
          default.puts text
          default.close

        end

        grunticon_path = "#{base_path}/resources/scripts/vx-cms-head.min.js"
        if File.exist?(grunticon_path) then
          text = File.open(grunticon_path).read
          text = text.gsub( "images/icons/icons.data.svg.css", resource_path + "images/icons/icons.data.svg.css")
          text = text.gsub( "images/icons/icons.data.png.css", resource_path + "images/icons/icons.data.png.css")
          text = text.gsub( "images/icons/icons.fallback.css", resource_path + "images/icons/icons.fallback.css")
          text = text.gsub( "../", resource_path + "/")
          grunticon = File.open(grunticon_path, 'w')
          grunticon.puts text
          grunticon.close
        end

        bootstrap_path = "#{base_path}/resources/scripts/vx-cms.min.js"
        if File.exist?(bootstrap_path) then
          text = File.open(bootstrap_path).read
          text = text.gsub( "../", resource_path + "/")

          text = text.gsub( "/app/common/directives/", resource_path + "app_templates/")
          text = text.gsub( "/app/common/templates/modals/", resource_path + "app_templates/")
          text = text.gsub( "/app/common/templates/", resource_path + "app_templates/")
          text = text.gsub( "/app/routes/templates/", resource_path + "app_templates/")
          text = text.gsub( "/app/routes/directives/", resource_path + "app_templates/")
          text = text.gsub( "/app/elevate/directives/", resource_path + "app_templates/")
          text = text.gsub( "/app/success/templates/", resource_path + "app_templates/")
          text = text.gsub( "/images/cities/", resource_path + "images/cities/")

          bootstrap = File.open(bootstrap_path, 'w')
          bootstrap.puts text
          bootstrap.close
        end
        
      end
    end

  end

end
