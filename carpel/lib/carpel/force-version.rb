require 'json'
require 'fileutils'
require 'xmlsimple'

module Carpel

  class VersionEngine

    def initialize(options = {})
      @module_name               = options['name']
      @pom_path                  = options['pom-path']
      @base_version_path         = options['base-version-file-path']
      @version_path              = options['version-file-path']
    end

    def page_status
      print_status(1, "Processing version page '#{@version_path}'")
      out = []
      if File.exist?( @pom_path ) && File.exist?( @version_path ) then
        print_status(2, "Loading file '#{@version_path}'")
        pom_file = File.read( @pom_path )
        version_file = File.read( @base_version_path )
        data = XmlSimple.xml_in(pom_file)
        puts = version_file.gsub('###module###', @module_name).gsub('###version###', data['version'][0])
        File.open(@version_path, "w") {|file| file.write( puts )}
      end
      out
    end

    def generate
      print_status(0, "Starting generation of the version file")
      page_status
    end

    def print_status(level, msg)
      puts "#{'  ' * level}* #{msg}"
    end

  end

end