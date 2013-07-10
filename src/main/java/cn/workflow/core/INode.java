package cn.workflow.core;

import java.io.Serializable;
import java.util.List;

public interface INode extends Serializable,Raw {
	
	public static String STATUS_FINISH  = "finish";
	
	public static String STATUS_ACTIVE  = "active";
	
	public static String STATUS_UNACTIVE  = "unactive";
	
	public String getId();
	
	public String getName();
	
	public String getType();
	
	public void setStatus(String status);
	
	public String getStatus();
	
	public List<IProp> getProps();
	
	public List<IFunc> getPreFuncs();
	
	public List<IFunc> getConditionFuncs();
	
	public List<IAction> getActions();
	
	public String getDescription();
	
	public String getFromNodeId();
	
	public void setFromNodeId(String nodeId);
}
