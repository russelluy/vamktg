require 'xmlsimple'

class Hash
  
  ATTRIBUTES = [:name, :type, :multiple]
  
  def add_mgnl_base_content!(node_type)
    if node_type == :node then
      self[:properties] ||= []
      if self[:properties].select{|i| i[:name] == 'jcr:primaryType'}.size == 0
        self[:properties].push(
          { :name => 'jcr:primaryType', :type => 'Name', :value => 'mgnl:contentNode' }
        )
      end
    end
  end
  
  def to_mgnl(depth = 0, node_type = nil)
    
    data = {}
    
    if depth == 0 or node_type == :node then
      self.add_mgnl_base_content!(:node)
    end

    self.keys.select{|k| k == :properties}.each do |key|
      data['sv:property'] = self[key].to_mgnl(depth + 1, :property)
    end

    self.keys.select{|k| k == :children}.each do |key|
      data['sv:node'] = self[key].to_mgnl(depth + 1, :node)
    end

    self.keys.select{|k| k != :children && k != :properties}.each do |key|
      attr_marker = (ATTRIBUTES.include?(key.to_sym)) ? '@' : ''
      data["#{attr_marker}sv:#{key.to_s}"] = self[key]
    end
    
    if depth == 0
      data['@xmlns:sv']  = "http://www.jcp.org/jcr/sv/1.0"
      data['@xmlns:xsi'] = "http://www.w3.org/2001/XMLSchema-instance"
      doc = REXML::Document.new XmlSimple.xml_out(data, :AttrPrefix => true, :RootName => "sv:node")
      out = ''
      doc.write(out)
      out
    else
      data
    end
    
  end
  
end

class Array
  
  def to_mgnl(depth, node_type = nil)
    self.map {|i| i.to_mgnl(depth, node_type)}
  end
  
end

class String
  
  def dashed
    out = ''
    last_caps = nil
    self.chars.each do |d| 
      if last_caps
        out += '-' + last_caps.downcase
        last_caps = nil
      end
      if d.upcase == d and d != '-' then
        last_caps = d
      else
        out += d.downcase
      end
    end
    out
  end
  
  def camelcased
    out = ''
    last_dashed = false
    self.chars.each do |d| 
      if last_dashed
        last_dashed = false
        out += d.upcase
      else
        if '-' == d then
          last_dashed = true
        else
          out += d.downcase unless d == d.upcase
          out += d if d == d.upcase
        end
      end
    end
    out
  end
  
end