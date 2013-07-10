package cn.workflow.core;

public interface IWorkflowContext {
	
	public void setTemplateSaveListener(IWorkflowTemplateSaveListener saveListener);
	
	public IWorkflowTemplateSaveListener getTemplateSaveListener();
	
	public String getFlowSerializeManagerName();
	
	public IClassBuilder getClassBuilder();
	
	public void addExecuteFunc(Class<?> clazz);
}
