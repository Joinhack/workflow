package cn.workflow.core;

import java.util.ArrayList;
import java.util.List;

public class Node implements INode {

	private static final long serialVersionUID = -2869699483678848837L;

	private String id = null;
	
	private String fromNodeId = null;
	
	private String name = null;
	
	private String type = null;
	
	private String description = null;
	
	private String status = STATUS_UNACTIVE;
	
	private List<IProp> props = new ArrayList<IProp>();
	
	private List<IFunc> preFuncs = new ArrayList<IFunc>();
	
	private List<IFunc> conditionFuncs = new ArrayList<IFunc>();
	
	private List<IAction> actions = new ArrayList<IAction>();
	
	public List<IAction> getActions() {
		return actions;
	}

	public void setActions(List<IAction> actions) {
		this.actions = actions;
	}

	public String getStatus() {
		return status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void addProp(IProp p) {
		this.props.add(p);
	}
	
	public void removeProp(IProp p) {
		this.props.remove(p);
	}

	public List<IProp> getProps() {
		return props;
	}

	public void setProps(List<IProp> props) {
		this.props = props;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<IFunc> getPreFuncs() {
		return preFuncs;
	}

	public void setPreFuncs(List<IFunc> preFuncs) {
		this.preFuncs = preFuncs;
	}

	public List<IFunc> getConditionFuncs() {
		return conditionFuncs;
	}

	public void setConditionFuncs(List<IFunc> conditionFuncs) {
		this.conditionFuncs = conditionFuncs;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFromNodeId() {
		return fromNodeId;
	}

	public void setFromNodeId(String fromNodeId) {
		this.fromNodeId = fromNodeId;
	}
}
