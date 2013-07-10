package cn.workflow.core;

import java.util.List;

public class FlowInstance implements IFlow {
	
	private static final long serialVersionUID = -3374293066138622783L;

	private String id = null;
	
	private String name = null;
	
	private String templateId = null;
	
	private String templateVersion = null;
	
	private List<IProp> props = null;
	
	public List<INode> nodes = null;
	
	public String description = null;

	public String getTemplateVersion() {
		return templateVersion;
	}

	public void setTemplateVersion(String templateVersion) {
		this.templateVersion = templateVersion;
	}

	public List<IProp> getProps() {
		return props;
	}

	public void setProps(List<IProp> props) {
		this.props = props;
	}

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<INode> getNodes() {
		return nodes;
	}

	public void setNodes(List<INode> nodes) {
		this.nodes = nodes;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
