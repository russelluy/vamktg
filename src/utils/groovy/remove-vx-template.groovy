session = ctx.getJCRSession('config')
root = session.getNode('/modules/')
root.getNode('vx-template').remove()
root.save()

session = ctx.getJCRSession('templates')
session.getNode('/vx-template').remove()
session.save()

session = ctx.getJCRSession('resources')
session.getNode('/vx-template').remove()
session.save()
