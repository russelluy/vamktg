import info.magnolia.jcr.predicate.NodeTypePredicate;;;;;;;;
import info.magnolia.importexport.DataTransporter
 
repository = "website"
nodeType = "mgnl:content"
 
session = ctx.getJCRSession(repository)
collection = NodeUtil.collectAllChildren(session.getRootNode(), new NodeTypePredicate(nodeType))
collection.each { node->
  try {
      node.setPrimaryType("mgnl:contentNode")
      node.save()
  } catch (Exception e) {
    println "can't export node: " + node.path
  }
}