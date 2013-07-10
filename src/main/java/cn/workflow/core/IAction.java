package cn.workflow.core;

import java.io.Serializable;
import java.util.List;

public interface IAction extends Serializable {
	
	public String getToNodeId();
	
	public String getCondition();
	
	public List<IProp> getProps();
	
	public List<IFunc> getFuncs();
	
}
