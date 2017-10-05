{
  [#assign aDateTime = .now]
  "currentDate": "${aDateTime?iso("UTC")}",
  "vx-template": "1.2.4-SNAPSHOT",
  [#assign updates = cmsfn.search("website" "select * from mgnl:content order by mgnl:lastModified desc" "sql" "mgnl:content") /]
  [#assign update = updates[0] ]
  [#if update.hasProperty('mgnl:lastModified') ]
  "contentLastModified":"${update.getProperty('mgnl:lastModified').getString()}"
  [/#if]
}