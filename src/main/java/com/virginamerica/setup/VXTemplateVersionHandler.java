package com.virginamerica.setup;

import info.magnolia.module.DefaultModuleVersionHandler;
import info.magnolia.cms.beans.config.ContentRepository;
import info.magnolia.module.InstallContext;
import info.magnolia.module.delta.Task;
import info.magnolia.module.delta.RemoveNodeTask;
import info.magnolia.module.delta.BootstrapSingleModuleResource;
import info.magnolia.module.delta.Delta;
import info.magnolia.module.delta.DeltaBuilder;
import info.magnolia.module.model.Version;
import info.magnolia.module.resources.setup.InstallResourcesTask;
import info.magnolia.module.inplacetemplating.setup.TemplatesInstallTask;
import info.magnolia.module.delta.NodeExistsDelegateTask;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class is optional and lets you manager the versions of your module,
 * by registering "deltas" to maintain the module's configuration, or other type of content.
 * If you don't need this, simply remove the reference to this class in the module descriptor xml.
 */
public class VXTemplateVersionHandler extends DefaultModuleVersionHandler {
/*
  private final List installOrUpdateTasks = new ArrayList();
  public VXTemplateVersionHandler() {
      // remove older version of the template
      installOrUpdateTasks.add( new RemoveNodeTask("RemoveVxTemplate", "Remove older vx-template module version", ContentRepository.CONFIG, "/modules/vx-template") );
      final Delta forVxTemplate = DeltaBuilder.update("new", "").addTasks(installOrUpdateTasks);
      register(forVxTemplate);
  }
*/
  @Override
  protected List<Task> getExtraInstallTasks(InstallContext ctx) {
      final List<Task> tasks = new ArrayList<Task>();
      tasks.addAll(super.getExtraInstallTasks(ctx));
      tasks.add(new TemplatesInstallTask("/vx-template/.*\\.ftl", true));
      tasks.add(new InstallResourcesTask("/vx-template/js/.*.", "resources:js", false, true));
      tasks.add(new InstallResourcesTask("/vx-template/img/.*.", "resources:binary", true));
      return tasks;
  }

  @Override
  protected List<Task> getDefaultUpdateTasks(Version forVersion) {
      final List<Task> tasks = new ArrayList<Task>();
      tasks.addAll(super.getDefaultUpdateTasks(forVersion));
      tasks.add(new TemplatesInstallTask("/vx-template/.*\\.ftl", true));
      tasks.add(new InstallResourcesTask("/vx-template/js/.*.", "resources:js", false, true));
      tasks.add(new InstallResourcesTask("/vx-template/img/.*.", "resources:binary", true));
      return tasks;
  }
}