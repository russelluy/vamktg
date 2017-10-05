require 'json'
require 'fileutils'

module Carpel

  class AdapterEngine

    def initialize(options = {})
      @module_name               = options['name']
      @base_path                 = options['src-path']
      @ui_path                   = options['ui-path']
      @mgnl_resource_path        = options['mgnl-resources-path']
      @fast_deploy_path          = options['mgnl-fast-deploy']
      @mode                      = options['mode']
      @defs_path                 = "#{@base_path}/defs"
      @pages_path                = "#{@defs_path}/pages"
      @components_path           = "#{@defs_path}/components"
      @dialogs_path              = "#{@defs_path}/dialogs"
      @vanity_path               = "#{@defs_path}/vanity"
      @permissions_path          = "#{@defs_path}/permissions"
      @templates_path            = "#{@base_path}/templates"
      @resources_path            = "#{@base_path}/resources"
      @pages_templates_path      = "#{@templates_path}/pages"
      @components_templates_path = "#{@templates_path}/components"
    end

    def page_nodes
      print_status(1, "Processing pages defs from '#{@pages_path}'")
      out = []
      Dir.entries(@pages_path).each do |path|
        file_path = "#{@pages_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(main_model_node(File.basename(file_path, ".json"), def_model, :page))
        end
      end
      out
    end

    def config_nodes
      print_status(1, "Processing pages for config defs from '#{@pages_path}'")
      out = []
      Dir.entries(@pages_path).each do |path|
        file_path = "#{@pages_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(config_model_node(File.basename(file_path, ".json"), def_model, :page))
        end
      end
      out
    end

    def component_nodes
      print_status(1, "Processing components defs from '#{@components_path}'")
      out = []
      Dir.entries(@components_path).each do |path|
        file_path = "#{@components_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(main_model_node(File.basename(file_path, ".json"), def_model, :component))
        end
      end
      out
    end

    def vanity_nodes
      print_status(1, "Processing vanity defs from '#{@vanity_path}'")
      out = []
      Dir.entries(@vanity_path).each do |path|
        file_path = "#{@vanity_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(vanity_node(File.basename(file_path, ".json"), def_model))
        end
      end
      out
    end

    def permissions_nodes
      print_status(1, "Processing permissions defs from '#{@permissions_path}'")
      out = []
      Dir.entries(@permissions_path).each do |path|
        file_path = "#{@permissions_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(permission_node(File.basename(file_path, ".json"), def_model))
        end
      end
      out
    end

    def dialog_nodes
      print_status(1, "Processing dialogs defs from '#{@dialogs_path}'")
      out = []
      Dir.entries(@dialogs_path).each do |path|
        file_path = "#{@dialogs_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          out.push(dialog_node(File.basename(file_path, ".json"), def_model))
        end
      end
      out
    end

    def dialog_node(base_name, def_model)
      print_status(2, "Processing dialog model '#{base_name}' by title '#{def_model['title']}'")
      out =
      {
        :name => base_name.camelcased,
        :properties => [
          { :name => :title, :type => :String, :value => def_model['title'] },
          { :name => :label, :type => :String, :value => def_model['title'] },
        ],
        :children => default_dialog_actions + get_component_areas(base_name, def_model) +
         [
          {
            :name => :form,
            :children => [
              {
                :name => :tabs,
                :children => tabs_nodes(def_model['tabs'])
              }
            ]
          }
        ]
      }
      out
    end

    def get_component_areas (base_name, def_model)
      out = []
      if def_model['areas']
        base_name[''] = ''
        out = [
          {
              :name => :areas,
              :children => areas_nodes(base_name, def_model['areas'], :component)
            }
        ]
      end
      out
    end

    def vanity_node(base_name, vanity_model)
      print_status(2, "Processing vanity model '#{base_name}'")
      out =
      {
        :name => base_name.camelcased,
    :properties => [
          { :name => :fromURI, :type => :String, :value => vanity_model['fromURI'] },
          { :name => :toURI, :type => :String, :value => "#{vanity_model['method'].downcase}:#{vanity_model['toURI']}" },
          { :name => :class, :type => :String, :value => FieldConverter.class(vanity_model['type']) },
        ]
      }
      out
    end


    def permission_node(base_name, permission_model)
      print_status(2, "Processing permission model '#{base_name}'")
      out =
      {
        :name => base_name.camelcased,
        :properties => [
        ],
        :children => [
        ]
      }
      if permission_model['class']
        out[:properties].push(
          { :name => :class, :type => :String, :value => permission_model['class'] }
        )
      end
      if permission_model['not']
        out[:properties].push(
          { :name => :not, :type => :String, :value => permission_model['not'] }
        )
      end
      if permission_model['pattern']
        out[:properties].push(
          { :name => :pattern, :type => :String, :value => permission_model['pattern'] }
        )
      end
      if permission_model['rejected']
        out_rejected = [];
        out_rejected.push(
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' }
        )
        permission_model['rejected'].each do | contentRejected |
        out_rejected.push(
          { :name => contentRejected[0], :type => :String, :value => contentRejected[1] }
        )
        end
        out[:children].push(
          {
            :name => :rejected,
            :properties => out_rejected
          }
        )
      end
      out
    end


    def tabs_nodes(tabs_model)
      out = []
      tabs_model.each_pair do |tab_name, tab_model|
        out.push(tab_node(tab_name, tab_model))
      end
      out
    end

    def tab_node(tab_name, tab_model)
      print_status(3, "Processing tab '#{tab_name}'")
      out = {
        :name => tab_name,
        :children => [
          {
            :name => :fields,
            :children => fields_nodes(tab_model)
          }
        ],
        :properties => []
      }
      # Has label?
      if tab_model['label']
        out[:properties].push(
          { :name => :label, :type => :String, :value => tab_model['label'] }
        )
      end
      out
    end

    def fields_nodes(tab_model)
      out = []
      tab_model.each_pair do |field_name, field_model|
        if field_name != 'label'
          out.push(field_node(field_name, field_model))
        end
      end
      out
    end

    def field_node(field_name, field_model)
      print_status(4, "Processing field '#{field_name}' by label '#{field_model['label']}'")
      out = {
        :name => field_name,
        :properties => [
          { :name => :label, :type => :String, :value => field_model['label'] }
        ]
      }
      # Has type?
      if field_model['type']
        out[:properties].push(
          { :name => :class, :type => :String, :value => FieldConverter.class(field_model['type']) }
        )
      end
      # Has rows?
      if field_model['rows']
        out[:properties].push(
          { :name => :rows, :type => :String, :value => field_model['rows'] }
        )
      end
      # Has buttonLabel?
      if field_model['buttonLabel']
        out[:properties].push(
          { :name => :buttonLabel, :type => :String, :value => field_model['buttonLabel'] }
        )
      end
      # Has alignment?
      if field_model['alignment']
        out[:properties].push(
          { :name => :alignment, :type => :String, :value => field_model['alignment'] }
        )
      end
      # Has classes?
      if field_model['classes']
        out[:properties].push(
          { :name => :classes, :type => :String, :value => field_model['classes'] }
        )
      end
      # Has colors?
      if field_model['colors']
        out[:properties].push(
          { :name => :colors, :type => :String, :value => field_model['colors'] }
        )
      end
      # Has fonts?
      if field_model['fonts']
        out[:properties].push(
          { :name => :fonts, :type => :String, :value => field_model['fonts'] }
        )
      end
      # Has fontSizes?
      if field_model['fontSizes']
        out[:properties].push(
          { :name => :fontSizes, :type => :String, :value => field_model['fontSizes'] }
        )
      end
      # Has styles?
      if field_model['styles']
        out[:properties].push(
          { :name => :styles, :type => :String, :value => field_model['styles'] }
        )
      end
      # Has images?
      if field_model['images']
        out[:properties].push(
          { :name => :images, :type => :String, :value => field_model['images'] }
        )
      end
      # Has lists?
      if field_model['lists']
        out[:properties].push(
          { :name => :lists, :type => :String, :value => field_model['lists'] }
        )
      end
      # Has tables?
      if field_model['tables']
        out[:properties].push(
          { :name => :tables, :type => :String, :value => field_model['tables'] }
        )
      end
      # Has configJsFile?
      if field_model['configJsFile']
        out[:properties].push(
          { :name => :configJsFile, :type => :String, :value => field_model['configJsFile'] }
        )
      end
      # Has source?
      if field_model['source']
        out[:properties].push(
          { :name => :source, :type => :String, :value => field_model['source'] }
        )
      end
      # Has validationPattern?
      if field_model['validationPattern']
        out[:properties].push(
          { :name => :validationPattern, :type => :String, :value => field_model['validationPattern'] }
        )
      end
      # Has required?
      if field_model['required']
        out[:properties].push(
          { :name => :required, :type => :String, :value => field_model['required'] }
        )
      end
      # Has allowedMimeTypePattern?
      if field_model['allowedmime']
        out[:properties].push(
          { :name => :allowedMimeTypePattern, :type => :String, :value => field_model['allowedmime'] }
        )
      end
      # Has binaryNodeName?
      if field_model['nodename']
        out[:properties].push(
          { :name => :binaryNodeName, :type => :String, :value => field_model['nodename'] }
        )
      end

      # Has default?
      if field_model['default']
        out[:properties].push(
          { :name => :defaultValue, :type => :String, :value => field_model['default'] }
        )
      end

      # Has multiselect?
      if field_model['multiselect']
        out[:properties].push(
          { :name => :multiselect, :type => :String, :value => field_model['multiselect'] }
        )
      end

      # Has time?
      if field_model['time']
        out[:properties].push(
          { :name => :time, :type => :String, :value => field_model['time'] }
        )
      end

      # Has path?
      if field_model['path']
        out[:properties].push(
          { :name => :path, :type => :String, :value => field_model['path'] }
        )
      end
      # Has repository?
      if field_model['repository']
        out[:properties].push(
          { :name => :repository, :type => :String, :value => field_model['repository'] }
        )
      end
      # Has value?
      if field_model['value']
        out[:properties].push(
          { :name => :value, :type => :String, :value => field_model['value'] }
        )
      end
      # Has valueProperty?
      if field_model['valueProperty']
        out[:properties].push(
          { :name => :valueProperty, :type => :String, :value => field_model['valueProperty'] }
        )
      end
      # Has labelProperty?
      if field_model['labelProperty']
        out[:properties].push(
          { :name => :labelProperty, :type => :String, :value => field_model['labelProperty'] }
        )
      end

      # Has targetWorkspace?
      if field_model['targetWorkspace']
        out[:properties].push(
          { :name => :targetWorkspace, :type => :String, :value => field_model['targetWorkspace'] }
        )
      end

      # Has appname?
      if field_model['appName']
        out[:properties].push(
          { :name => :appName, :type => :String, :value => field_model['appName'] }
        )
      end

      # Has options?
      if field_model['options']
        out[:children] ||= []
        out[:children].push(
          {
            :name => :options,
            :children => field_model['options'].map do |o|
              {
                :name => o[0],
                :properties => [
                  { :name => :label, :type => :String, :value => o[1] },
                  { :name => :name, :type => :String, :value => o[0] },
                  { :name => :value, :type => :String, :value => o[0] },
                ]
              }
            end
          }
        )
      end

      # Has identifierToPathConverter?
      if field_model['identifierToPathConverter']
        out[:children] ||= []
        out[:children].push(
          {
            :name => :identifierToPathConverter,
            :properties => [
              { :name => :class, :type => :String, :value => field_model['identifierToPathConverter'] },
            ]
          }
        )
      end

      # Has contentPreviewDefinition?
      if field_model['contentPreviewDefinition']
        out[:children] ||= []
        out[:children].push(
          {
            :name => :contentPreviewDefinition,
            :properties => [
              { :name => :contentPreviewClass, :type => :String, :value => 'info.magnolia.dam.asset.field.DamFilePreviewComponent' },
            ]
          }
        )
      end

      # Has field?
      if field_model['field']
        out[:children] ||= []
        out[:children].push(
          {
            :name => :field,
            :properties => [
              { :name => :label, :type => :String, :value => '' },
              { :name => :name, :type => :String, :value => field_model['field']['name'] },
              { :name => :class, :type => :String, :value => FieldConverter.class( field_model['field']['type'] ) },
            ]
          }
        )
      end

      # Has fields?
      if field_model['fields']

        out[:properties].push(
          { :name => 'transformerClass', :type => :String, :value => 'info.magnolia.ui.form.field.transformer.multi.MultiValueSubChildrenNodePropertiesTransformer' }
        )

        out[:children] ||= []
        out[:children].push(
          {
            :name => 'field',
            :properties => [
                  { :name => :label, :type => :String, :value => '' },
                  { :name => :class, :type => :String, :value => 'info.magnolia.ui.form.field.definition.CompositeFieldDefinition' },
                  { :name => :transformerClass, :type => :String, :value => 'info.magnolia.ui.form.field.transformer.composite.NoOpCompositeTransformer' },
		    ],
            :children =>{
		    :name => :fields,
		    :children => field_model['fields'].map do |o|
		      {
				:name => o['name'],
				:properties => [
				  { :name => :label, :type => :String, :value => o['label'] },
				  { :name => :name, :type => :String, :value => o['name'] },
          { :name => :class, :type => :String, :value => FieldConverter.class( o['type']) },
          { :name => :rows, :type => :String, :value => (o['rows'])?o['rows']:"" },

          { :name => :targetWorkspace, :type => :String, :value => (o['targetWorkspace'])?o['targetWorkspace']:"" },
          { :name => :appName, :type => :String, :value => (o['appName'])?o['appName']:"" },
#         Fixing error on images inside multifield
#         { :name => :identifierToPathConverter, :type => :String, :value => (o['identifierToPathConverter'])?o['identifierToPathConverter']:"" },
#         { :name => :contentPreviewDefinition, :type => :String, :value => (o['contentPreviewDefinition'])?o['contentPreviewDefinition']:"" },
          { :name => :defaultValue, :type => :String, :value => (o['default'])?o['default']:"" },
				],

				:children => (o['options'].nil?)? {:name => :options}: {
					:name => :options,
					:children => o['options'].map do |oo|
					  {
						:name => oo[0],
						:properties => [
						  { :name => :label, :type => :String, :value => oo[1] },
						  { :name => :name, :type => :String, :value => oo[0] },
						  { :name => :value, :type => :String, :value => oo[0] },
						]
					  }
					end
				  }


		      }
		    end
		  }
          }
        )

      end

      out
    end

    def default_dialog_actions
      [
        {
          :name => :actions,
          :children => [
            {
              :name => :cancel,
              :properties => [
                { :name => :class, :type => :String, :value => 'info.magnolia.ui.admincentral.dialog.action.CancelDialogActionDefinition' },
                { :name => :label, :type => :String, :value => 'Cancel' },
                { :name => 'mgnl:activationStatus', :type => :Boolean, :value => 'false' },
              ]
            },
            {
              :name => :save,
              :properties => [
                { :name => :class, :type => :String, :value => 'info.magnolia.ui.admincentral.dialog.action.SaveDialogActionDefinition' },
                { :name => :label, :type => :String, :value => 'Save' },
                { :name => 'mgnl:activationStatus', :type => :Boolean, :value => 'false' },
              ]
            }

          ]
        }
      ]
    end

    def config_model_node(base_name, def_model, type)
      print_status(2, "Processing #{type.to_s} model '#{base_name}' by title '#{def_model['title']}'")
      out =
      {
        :name => base_name.camelcased,
        :properties => [
          { :name => :id, :type => :String, :value => "vx-template:pages/#{base_name.camelcased}" },
        ],
        :children => []
      }
      out
    end

    def main_model_node(base_name, def_model, type)
      print_status(2, "Processing #{type.to_s} model '#{base_name}' by title '#{def_model['title']}'")
      out =
      {
        :name => base_name.camelcased,
        :properties => [
          { :name => :title, :type => :String, :value => def_model['title'] },
          { :name => :label, :type => :String, :value => def_model['title'] },
          { :name => :visible, :type => :String, :value => :true },
        ],
        :children => []
      }

      # Has dialog?
      if !def_model['dialog'].nil? then
        _dialog = def_model['dialog']
        if !_dialog.include?":"
          _dialog = @module_name + ":" + def_model['dialog']
        end
        out[:properties].push(
          { :name => :dialog, :type => :String, :value => "#{_dialog}"}
        )
      end

      # Has label?
      if !def_model['label'].nil? then
        out[:properties].push(
          { :name => :label, :type => :String, :value => "#{def_model['label']}"}
        )
      end

      # Has category?
      if !def_model['category'].nil? then
        out[:properties].push(
          { :name => :category, :type => :String, :value => "#{def_model['category']}"}
        )
      end

      # Has subcategory?
      if !def_model['subcategory'].nil? then
        out[:properties].push(
          { :name => :subcategory, :type => :String, :value => "#{def_model['subcategory']}"}
        )
      end

      # Has extends?
      if !def_model['extends'].nil? then
        out[:properties].push(
          { :name => :extends, :type => :String, :value => "#{def_model['extends']}"}
        )
      end

      # Has template?
      template_add("#{base_name.dashed}/main.ftl", out, 3, type)

      # Has json template?
      json_template_add("#{base_name.dashed}/main-json.ftl", out, 3, type)

      # Has areas?
      if !def_model['areas'].nil? then
        out[:children].push(
          {
            :name => :areas,
            :children => areas_nodes(base_name, def_model['areas'], type)
          }
        )
      end

      out
    end

    def template_add(template_file, out, msg_level, type)
      template_path = "#{@pages_templates_path}/#{template_file}" if type == :page
      template_path = "#{@components_templates_path}/#{template_file}" if type == :component
      if File.exist?(template_path)
        print_status(msg_level, "Added template '#{template_file}'")
        out[:properties] ||= []
        out[:properties].push(
          ##{ :name => :renderType, :type => :String, :value => :freemarker },
          { :name => :renderType, :type => :String, :value => :stk },
          { :name => :templateScript, :type => :String, :value => "/#{@module_name}/#{type.to_s}s/#{template_file}" },
        )
      else
        print_status(msg_level, "Template '#{template_path}' does not exist. Ignoring it.")
      end
    end

    def json_template_add(json_template_file, out, msg_level, type)
      json_template_path = "#{@pages_templates_path}/#{json_template_file}" if type == :page
      json_template_path = "#{@components_templates_path}/#{json_template_file}" if type == :component
      if File.exist?(json_template_path)
        print_status(msg_level, "Added variant template '#{json_template_file}'")
        out[:children] ||= []
        out[:children].push(
          {
            :name => :variations,
            :children => [
              {
                :name => :json,
                :properties => [
                  ##{ :name => :renderType, :type => :String, :value => :freemarker },
                  { :name => :renderType, :type => :String, :value => :stk },
                  { :name => :templateScript, :type => :String, :value => "/#{@module_name}/#{type.to_s}s/#{json_template_file}" },
                ]
              }
            ]
          }
        )
      else
        print_status(msg_level, "Variant template '#{json_template_path}' does not exist. Ignoring it.")
      end
    end

    def areas_nodes(base_name, areas_model, type)
      print_status(3, "Processing areas for '#{base_name}'")
      out = []
      areas_model.each_pair do |name, area_model|
        out.push(area_node(base_name, name, area_model, type))
      end
      out
    end

    def area_node(base_name, area_name, area_model, type)
      print_status(4, "Processing area '#{area_name}'")
      out = {
        :name => area_name.camelcased,
        :properties => [
          { :name => :type, :type => :String, :value => area_model['type'] },
        ],
        :children => []
      }
      # Has template?
      template_add("#{base_name.dashed}/areas/#{area_name.dashed}.ftl", out, 5, type)

      # Has json template?
      json_template_add("#{base_name.dashed}/areas/#{area_name.dashed}-json.ftl", out, 5, type)

      # Has available components?
      out[:children].push({
        :name => :availableComponents,
        :children => available_component_nodes(area_model['components'])
      })

      out
    end

    def available_component_nodes(component_model)
      out = []
      component_model.each do |component_name|
        print_status(5, "Component '#{component_name}' added to area.")
        out.push({
          :name => component_name.camelcased,
          :properties => [
            { :name => :id, :type => :String, :value => "#{@module_name}:components/#{component_name.camelcased}" }
          ]
        })
      end
      out
    end

    def generate

      print_status(0, "Starting generation of module '#{@module_name}' from path '#{@base_path}'")

      print_status(1, "Creating UI from '#{@ui_path}'")
      UICreator.class( @base_path, @ui_path )

      base_path = clean_templates_path

      generate_and_save_config_extensions(base_path)

      generate_and_save_config_extensions_site(base_path)

      generate_and_save_templates(base_path)

      generate_and_save_dialogs(base_path)

      generate_and_save_vanity(base_path)

      generate_and_save_permissions(base_path)

      copy_templates

      print_status(1, "Running Custom Fixes")
      bootstrap_path = File.expand_path("#{@mgnl_resource_path}/mgnl-bootstrap/#{@module_name}/templates")
      Fixes.class( bootstrap_path )
    end

    def clean_templates_path
      base_path = File.expand_path("#{@mgnl_resource_path}/mgnl-bootstrap/#{@module_name}/templates")
      Dir.mkdir("#{@mgnl_resource_path}") unless File.exists?("#{@mgnl_resource_path}")
      Dir.mkdir("#{@mgnl_resource_path}/mgnl-bootstrap/") unless File.exists?("#{@mgnl_resource_path}/mgnl-bootstrap/")
      Dir.mkdir("#{@mgnl_resource_path}/mgnl-bootstrap/#{@module_name}/") unless File.exists?("#{@mgnl_resource_path}/mgnl-bootstrap/#{@module_name}/")
      FileUtils.rm_rf(base_path)
      Dir.mkdir(base_path) unless File.exists?(base_path)
      base_path
    end

    def generate_and_save_config_extensions(base_path)
      config_extensions = generate_config_extensions
      file = "config.modules.#{@module_name}.config.xml"
      File.open("#{base_path}/#{file}", 'w') {
        |file| file.write(config_extensions.to_mgnl)
      }
      print_status(0, "Saving Config Files for Extending templates '#{file}' at '#{base_path}'")
    end

    def generate_and_save_config_extensions_site(base_path)
      print_status(1, "Processing pages for config defs from '#{@pages_path}'")
      Dir.entries(@pages_path).each do |path|
        file_path = "#{@pages_path}/#{path}"
        if File.exist?(file_path) && File.extname(file_path) == ".json" then
          print_status(2, "Loading file '#{file_path}'")
          def_model = JSON.load(open(file_path))
          base_name = File.basename(file_path, ".json").camelcased
          out = config_model_node(File.basename(file_path, ".json"), def_model, :page)
          ## For local magnolia tests
          file = "config.modules.standard-templating-kit.config.site.templates.availability.templates.#{base_name}.xml"
          File.open("#{base_path}/#{file}", 'w') {
            |file| file.write(out.to_mgnl)
          }
          ## For VX magnolia servers
          file = "config.modules.multisite.config.sites.default.templates.availability.templates.#{base_name}.xml"
          File.open("#{base_path}/#{file}", 'w') {
            |file| file.write(out.to_mgnl)
          }
          print_status(0, "Saving Config Files for Extending templates '#{file}' at '#{base_path}'")
        end
      end
    end

    def generate_and_save_vanity(base_path)
      vanity = generate_vanity
      file = "config.modules.#{@module_name}.virtualURIMapping.xml"
      File.open("#{base_path}/#{file}", 'w') {
        |file| file.write(vanity.to_mgnl)
      }
      print_status(0, "Saving Vanity URLs '#{file}' at '#{base_path}'")
    end


    def generate_and_save_permissions(base_path)
      permissions = generate_permissions
      file = "config.modules.dam.config.contentDisposition.xml"
      File.open("#{base_path}/#{file}", 'w') {
        |file| file.write(permissions.to_mgnl)
      }
      print_status(0, "Saving Permissions '#{file}' at '#{base_path}'")
    end





    def generate_and_save_templates(base_path)
      templates = generate_templates
      file = "config.modules.#{@module_name}.templates.xml"
      File.open("#{base_path}/#{file}", 'w') {
	      |file| file.write(templates.to_mgnl)
      }
      print_status(0, "Saving pages/components '#{file}' at '#{base_path}'")
    end

    def generate_and_save_dialogs(base_path)
      dialogs = generate_dialogs
      file = "config.modules.#{@module_name}.dialogs.xml"
      File.open("#{base_path}/#{file}", 'w') { |file| file.write(dialogs.to_mgnl) }
      print_status(0, "Saving dialogs '#{file}' at '#{base_path}'")
    end

    def copy_templates
      base_path = File.expand_path("#{@mgnl_resource_path}/#{@module_name}") if @mode == :package
      base_path = File.expand_path("#{@fast_deploy_path}/#{@module_name}") if @mode == :fast
      FileUtils.rm_rf(base_path)
      Dir.mkdir(base_path) unless File.exists?(base_path)
      print_status(0, "Copying templates to '#{base_path}'")
      FileUtils.cp_r(Dir.glob("#{@templates_path}/*"), base_path)

      ress_path = File.expand_path("#{@mgnl_resource_path}/mgnl-resources/#{@module_name}")
      print_status(0, "Copying resources to '#{ress_path}'")
      Dir.mkdir("#{@mgnl_resource_path}") unless File.exists?("#{@mgnl_resource_path}")
      Dir.mkdir("#{@mgnl_resource_path}/mgnl-resources") unless File.exists?("#{@mgnl_resource_path}/mgnl-resources")
      Dir.mkdir(ress_path) unless File.exists?(ress_path)
      FileUtils.cp_r(Dir.glob("#{@resources_path}/*"), ress_path)

    end

    def generate_config_extensions
      print_status(0, "Generating config extensions")
      {
        :name => 'config',
        :properties => [
          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
        ],

        :children => [
          {
            :name => 'site',
            :properties => [
              { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
              { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' }
            ],
            :children => [
                      {
                        :name => 'templates',
                        :properties => [
                          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
                          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' }
                        ],
                        :children => [
                                  {
                                    :name => 'availability',
                                    :properties => [
                                      { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
                                      { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' },
                                      { :name => 'class', :type => 'String', :value => 'info.magnolia.module.templatingkit.sites.TemplateAvailability' }
                                    ],

                                    :children => [
                                              {
                                                :name => 'templates',
                                                :properties => [
                                                  { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
                                                  { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' }
                                                ],
                                                :children => config_nodes
                                              }
                                            ]

                                  }
                                ]
                      }
                    ]
          }
        ]
      }
    end

    def generate_templates
      print_status(0, "Generating templates")
      {
        :name => 'templates',

        :properties => [
          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
        ],

        :children => [
          {
            :name => 'pages',

            :properties => [
              { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
              { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
            ],

            :children => page_nodes
          },
          {
            :name => 'components',

            :properties => [
              { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
              { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
            ],

            :children => component_nodes
          }
        ]
      }
    end

    def generate_dialogs
      print_status(0, "Generating dialogs")
      {
        :name => 'dialogs',

        :properties => [
          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
        ],

        :children => dialog_nodes
      }
    end

	def generate_vanity
      print_status(0, "Generating Vanity URLs")
      {
        :name => 'virtualURIMapping',

        :properties => [
          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:content' }
        ],

        :children => vanity_nodes
      }
    end


  def generate_permissions
      print_status(0, "Generating Permissions")
      {
        :name => 'contentDisposition',

        :properties => [
          { :name => 'jcr:mixinTypes', :type => 'Name', :multiple => true, :value => 'mix:lockable' },
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' },
          { :name => 'class', :type => 'String', :value => 'info.magnolia.voting.voters.VoterSet' }
        ],
        :children => permissions_nodes
      }
    end

    def print_status(level, msg)
      puts "#{'  ' * level}* #{msg}"
    end

  end

end