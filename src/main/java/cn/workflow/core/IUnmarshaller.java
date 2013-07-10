package cn.workflow.core;

import java.io.InputStream;

import org.dom4j.Document;

public interface IUnmarshaller {
	public IFlow serializeFromTemplate(String templatePath);
	
	public IFlow serializeFromInstance(String id);
	
	public IFlow serializeFromTemplate(InputStream input);
	
	public IFlow serializeFromTemplate(Document doc);
}
