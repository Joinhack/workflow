package cn.workflow.core;

public class BasicMethodInfo implements IMethodInfo {
	
	private String methodName = null;
	
	private String usage = null;
	
	public BasicMethodInfo(String name,String usage) {
		setMethodName(name);
		setUsage(usage);
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}
	
}
