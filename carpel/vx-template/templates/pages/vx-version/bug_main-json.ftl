{
  [#assign aDateTime = .now]
  "currentDate": "${aDateTime?iso("UTC")}",
  [#assign modules = cmsfn.search("config" "select * from mgnl:content where jcr:path like '/modules/%'" "sql" "mgnl:content") /]
  [#list modules as module]
  [#if module.hasProperty('version') && ( module.name = "core" || module.name = "vx-template") ]
  "${module.name}":"${module.getProperty('version').getString()}",
  [/#if]
  [/#list]
  [#assign updates = cmsfn.search("website" "select * from mgnl:content order by mgnl:lastModified desc" "sql" "mgnl:content") /]
  [#assign update = updates[0] ]
  [#if update.hasProperty('mgnl:lastModified') ]
  "contentLastModified":"${update.getProperty('mgnl:lastModified').getString()}"
  [/#if]
}