package cn.workflow.core;

import java.util.List;

public interface IClassInfo {
	
	public String getClassName();

	public String getUsage();

	public Class<?> getClazz();
	
	public IMethodInfo getMethodInfo(String methodName);
	
	public List<String> getMethodNames();
	
	public List<IMethodInfo> getMethodInfos();
	
}
