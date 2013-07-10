package cn.workflow.core;

import java.io.Serializable;

public interface Workflow extends Serializable {
	
	public String start(String id,String version,String nodeId);
	
	public String start(String id,String version,String nodeId,ICallParam param);
	
	public String start(String id,String version);
	
	public String start(String id,String version,ICallParam param);
	
	public void init(String instanceId);
	
	public void next();
	
	public void next(ICallParam param);
	
	public void next(String cond,ICallParam param);
	
	public void next(String cond);
	
	public void back();
	
	public void end();
	
	public void end(ICallParam param);
	
	public void end(String endId,ICallParam param);
	
	public void end(boolean b,String endId,ICallParam param);
	
	public void back(boolean b);
	
	public void back(boolean b,ICallParam param);
	
	public void back(ICallParam param);
	
	public void back(boolean doPre,boolean doLeave,ICallParam param);
	
	public void go2Node(String nodeId);
	
	public void go2Node(String nodeId,ICallParam callParam);
	
	public void go2Node(boolean doPre,boolean doLeave,String nodeId,ICallParam callParam);
	
	public void resetNodeProp(String nodeId,String propName,String propValue,String displayValue);
	
	public void resetNodeProp(String nodeId, IProp prop);
	
	public void resetMagicNodeProp(String propName,String propValue,String displayValue);
	
	public void addNodeProp(String nodeId,IProp prop);
	
	public void addNodeProp(String nodeId,Integer index,IProp prop);
	
	public void removeNodePropByName(String nodeId, String name);
	
	public void removeNodePropByPropType(String nodeId, String propType);
	
	public void rollback();
	
}
