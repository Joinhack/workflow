package cn.workflow.core;

import java.util.ArrayList;
import java.util.List;

public class Action implements IAction {

	private static final long serialVersionUID = -481456245816034660L;
	
	private String toNodeId = null;
	
	private String condition = null;
	
	private List<IProp> props = new ArrayList<IProp>();
	
	private List<IFunc> funcs = new ArrayList<IFunc>();

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getToNodeId() {
		return toNodeId;
	}

	public void setToNodeId(String toNodeId) {
		this.toNodeId = toNodeId;
	}

	public List<IProp> getProps() {
		return props;
	}

	public void setProps(List<IProp> props) {
		this.props = props;
	}

	public List<IFunc> getFuncs() {
		return funcs;
	}

	public void setFuncs(List<IFunc> funcs) {
		this.funcs = funcs;
	}
}
