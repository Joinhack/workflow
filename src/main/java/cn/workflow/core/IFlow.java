package cn.workflow.core;

import java.io.Serializable;
import java.util.List;

public interface IFlow extends Serializable {
	
	public String getTemplateId();
	
	public String getTemplateVersion();
	
	public void setTemplateVersion(String version);
	
	public String getName();
	
	public String getId();
	
	public void setId(String id);
	
	public List<INode> getNodes();
	
	public List<IProp> getProps();

	public void setProps(List<IProp> props);
	
	public String getDescription();
}
