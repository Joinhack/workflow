package cn.workflow.core;

import java.util.HashMap;
import java.util.Map;

public class BasicExecuteContext implements IExecuteContext {
	
	private IFunc func = null;
	
	private ICallParam callParam = CallParamFactory.getInstance().createICallParam();
	
	private ICallParam nodePropParam = CallParamFactory.getInstance().createICallParam();
	
	private ICallParam executeResult = CallParamFactory.getInstance().createICallParam();
	
	private Map<String,Object> instanceCache = new HashMap<String,Object>();

	public ICallParam getNodePropParam() {
		return nodePropParam;
	}

	public void setNodePropParam(ICallParam param) {
		this.nodePropParam = param;
	}

	public IFunc getFunc() {
		return func;
	}

	public void setFunc(IFunc func) {
		this.func = func;
	}

	public ICallParam getCallParam() {
		return callParam;
	}

	public void setCallParam(ICallParam callParam) {
		this.callParam = callParam;
	}

	public void addInstance2Cache(String clzName,Object instance) {
		instanceCache.put(clzName, instance);
	}

	public Object getInstanceFromCache(String clzName) {
		return instanceCache.get(clzName);
	}

	public ICallParam getExecuteResult() {
		return executeResult;
	}

	public void setExecuteResult(ICallParam result) {
		this.executeResult = result;
	}

	public void add2CallParam(ICallParam param) {
		callParam.addParams(param);
	}
}
