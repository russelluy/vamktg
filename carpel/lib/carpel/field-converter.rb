module Carpel

  class FieldConverter

    FIELDS = {
      :TEXT_FIELD => 'info.magnolia.ui.form.field.definition.TextFieldDefinition',
      :CHECKBOX_FIELD => 'info.magnolia.ui.form.field.definition.CheckboxFieldDefinition',
      :STATIC => 'info.magnolia.ui.form.field.definition.StaticFieldDefinition',
      :SWITCHABLE => 'info.magnolia.ui.form.field.definition.SwitchableFieldDefinition',
      :RICH_TEXT_FIELD => 'info.magnolia.ui.form.field.definition.RichTextFieldDefinition',
      :SELECT_FIELD => 'info.magnolia.ui.form.field.definition.SelectFieldDefinition',
      :MULTIPLE_FIELD => 'info.magnolia.ui.form.field.definition.OptionGroupFieldDefinition',
      :DATE_FIELD => 'info.magnolia.ui.form.field.definition.DateFieldDefinition',
      :MULTI_FIELD => 'info.magnolia.ui.form.field.definition.MultiValueFieldDefinition',
      :DAM_UPLOAD => 'info.magnolia.dam.asset.field.definition.DamUploadFieldDefinition',
      :IMAGE => 'info.magnolia.ui.form.field.definition.LinkFieldDefinition',
      :VANITY_DEFAULT => 'info.magnolia.cms.beans.config.DefaultVirtualURIMapping',
	    :VANITY_REGEXP => 'info.magnolia.cms.beans.config.RegexpVirtualURIMapping',
      :LINK => 'info.magnolia.ui.form.field.definition.LinkFieldDefinition',
    }

    def self.class(key)
      FIELDS[key.to_sym]
    end

  end

end