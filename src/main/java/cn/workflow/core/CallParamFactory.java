package cn.workflow.core;

public class CallParamFactory {
	
	private static CallParamFactory self = null;
	
	public static CallParamFactory getInstance() {
		if(self == null)
			self = new CallParamFactory();
		return self;
	}
	
	private CallParamFactory() {
	}
	
	public ICallParam createICallParam() {
		return new BasicCallParam();
	}
}
