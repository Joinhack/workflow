package cn.workflow.core;

public interface IExecuteContext {
	
	public IFunc getFunc();
	
	public void setFunc(IFunc func);
	
	public ICallParam getCallParam();
	
	public void add2CallParam(ICallParam param);
	
	public void setCallParam(ICallParam param);
	
	public ICallParam getNodePropParam();
	
	public void setNodePropParam(ICallParam param);
	
	public ICallParam getExecuteResult();
	
	public void setExecuteResult(ICallParam result);
	
	public void addInstance2Cache(String clzName,Object instance);
	
	public Object getInstanceFromCache(String clzName);
	
}
