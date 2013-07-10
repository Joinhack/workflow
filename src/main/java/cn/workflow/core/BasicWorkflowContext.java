package cn.workflow.core;

import cn.workflow.comm.SysConf;

public class BasicWorkflowContext implements IWorkflowContext {
	
	private static BasicWorkflowContext context = null;
	
	private IWorkflowTemplateSaveListener saveListener = null;
	
	private String flowSerializeManagerName = null;
	
	private BasicWorkflowContext () {
	}
	
	public void setTemplateSaveListener(IWorkflowTemplateSaveListener saveListener) {
		this.saveListener = saveListener;
	}
	
	public IWorkflowTemplateSaveListener getTemplateSaveListener() {
		if(this.saveListener != null)
			return this.saveListener;
		String lisntener = SysConf.getSysConf().getString("workflow.saveListener");
		if(lisntener != null)
			this.saveListener = ClassBuilderFactory.getInstance().getClazzBuilder().newInstance(lisntener);
		return this.saveListener;
	}
	
	public IClassBuilder getClassBuilder() {
		return ClassBuilderFactory.getInstance().getClazzBuilder();
	}
	
	public String getFlowSerializeManagerName() {
		if(flowSerializeManagerName == null) {
			flowSerializeManagerName = SysConf.getSysConf().getString("workflow.flowserializemanager");
			if(flowSerializeManagerName == null)
				flowSerializeManagerName = "cn.workflow.core.BasicFlowSerializeManager";
		}
		return flowSerializeManagerName;
	}

	public void setFlowSerializeManagerName(String flowSerializeManagerName) {
		this.flowSerializeManagerName = flowSerializeManagerName;
	}
	
	public void addExecuteFunc(Class<?> clazz) {
		ClassBuilderFactory.getInstance().getClazzBuilder().addClass(clazz);
	}

	public static IWorkflowContext getInstance() {
		if(context == null) {
			context = new BasicWorkflowContext();
		}
		return context;
	}
}
