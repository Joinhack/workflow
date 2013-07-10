package cn.workflow.core;

public class ClassFunc implements IFunc {
	
	private static final long serialVersionUID = 6802125230295961934L;

	private String clzName = null;
	
	private String methodName = null;
	
	private String type = null;

	public String getClzName() {
		return clzName;
	}

	public void setClzName(String clzName) {
		this.clzName = clzName;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
