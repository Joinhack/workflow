package cn.workflow.core;

public interface IFlowSerializeManager {
	
	public String getFlowInstancePath(String instanceId);
	
	public String createFlowInstancePath(String templateId,String version,String instanceId);
	
	public String genFlowInstanceId(String templateId);
	
	public String getTemplateFileName(String templateId,String version);
	
}
