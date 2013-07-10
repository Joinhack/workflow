package cn.workflow.core;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import cn.workflow.exceptions.SystemException;

@SuppressWarnings("unchecked")
public class Serialize2Flow implements IUnmarshaller {
	
	private static Log log = LogFactory.getLog(Serialize2Flow.class);
	
	private IFlowSerializeManager manager = FlowSerializeManagerFactory.getFlowSerializeManager();
	
	public Serialize2Flow() {
	}
	
	private IFlow getIFlow(Document doc) {
		FlowInstance flow = null;
		flow = new FlowInstance();
		List<INode> list = serialNodes(doc.getRootElement());
		flow.setTemplateId(doc.getRootElement().elementText("id"));
		flow.setName(doc.getRootElement().elementText("name"));
		flow.setDescription(doc.getRootElement().elementText("description"));
		flow.setNodes(list);
		flow.setProps(serialProps(doc.getRootElement()));
		return flow;
	}
	
	public IFlow serializeFromTemplate(InputStream input) {
		try {
			Document doc = new SAXReader().read(input);
			return getIFlow(doc);
		} catch (DocumentException e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	public IFlow serializeFromTemplate(Document doc) {
		return getIFlow(doc);
	}
	
	public IFlow serializeFromTemplate(String templatePath) {
		try {
			Document doc = new SAXReader().read(new File(templatePath));
			return getIFlow(doc);
		} catch (DocumentException e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	protected byte[] getInstanceContent(String id) {
		String path = manager.getFlowInstancePath(id);
		InputStream inputStream = null;
		byte [] values = null;
		try {
			inputStream = new FileInputStream(path);
			values = new byte[inputStream.available()];
		} catch(Exception e) {
			values = null;
			log.error(e);
			throw new SystemException(e);
		} finally {
			if(inputStream != null)
				try {
					inputStream.close();
				} catch (IOException e) {
				}
		}
		return values;
	}
	
	public IFlow serializeFromInstance(String id) {
		FlowInstance flow = null;
		InputStream inputStream = null;
		try {
			flow = new FlowInstance();
			inputStream = new ByteArrayInputStream(getInstanceContent(id));
			Document doc = new SAXReader().read(inputStream);
			List<INode> list = serialNodes(doc.getRootElement());
			Element elem = doc.getRootElement();
			flow.setId(elem.elementText("id"));
			flow.setName(elem.elementText("name"));
			flow.setDescription(doc.getRootElement().elementText("description"));
			flow.setTemplateId(elem.elementText("templateId"));
			flow.setTemplateVersion(elem.elementText("templateVersion"));
			flow.setProps(serialProps(doc.getRootElement()));
			flow.setNodes(list);
		} catch (DocumentException e) {
			log.error(e);
			throw new SystemException(e);
		} finally {
			if(inputStream != null)
				try {
					inputStream.close();
				} catch (IOException e) {
				}
		}
		return flow;
	}
	
	private List<INode> serialNodes(Element element) {
		List<INode> list = new ArrayList<INode>();
		Element propsElem = element.element("nodes");
		Iterator<Element> iter = propsElem.elementIterator("node");
		while(iter.hasNext()) {
			list.add(serialNode(iter.next()));
		}
		return list;
	}
	
	private INode serialNode(Element element) {
		Node node = new Node();
		node.setName(element.attributeValue("text"));
		node.setType(element.attributeValue("type"));
		node.setFromNodeId((element.attributeValue("fromnode")));
		node.setId(element.element("id").getStringValue());
		node.setDescription(element.element("description").getStringValue());
		node.setProps(serialProps(element));
		node.setPreFuncs(serialFuncs(element,"prefuncs"));
		node.setConditionFuncs(serialFuncs(element,"conditionfuncs"));
		node.setActions(serialActions(element));
		String status = element.attributeValue("status");
		if(status != null && !"".equals(status))
			node.setStatus(status);
		return node;
	}
	
	private List<IProp> serialProps(Element element) {
		List<IProp> list = new ArrayList<IProp>();
		Element propsElem = element.element("props");
		Iterator<Element> iter = propsElem.elementIterator("prop");
		while(iter.hasNext()) {
			IProp prop = serialProp(iter.next());
			list.add(prop);
		}
		return list;
	}
	
	private List<IFunc> serialFuncs(Element element,String sub) {
		List<IFunc> list = new ArrayList<IFunc>();
		Element propsElem = element.element("functions");
		Element elem = propsElem.element(sub);
		Iterator<Element> iter = elem.elementIterator("function");
		while(iter.hasNext()) {
			list.add(serialFunc(iter.next()));
		}
		return list;
	}
	
	private List<IAction> serialActions(Element element) {
		List<IAction> list = new ArrayList<IAction>();
		Element propsElem = element.element("actions");
		Iterator<Element> iter = propsElem.elementIterator("action");
		while(iter.hasNext()) {
			list.add(serialAction(iter.next()));
		}
		return list;
	}
	
	private IAction serialAction(Element element) {
		Action action = new Action();
		action.setToNodeId(element.attributeValue("tonode"));
		action.setCondition(element.attributeValue("condition"));
		action.setProps(serialProps(element));
		action.setFuncs(serialFuncs(element, "prefuncs"));
		return action;
	}
	
	private IFunc serialFunc(Element element) {
		ClassFunc func = new ClassFunc();
		func.setClzName(element.attributeValue("clzname"));
		func.setMethodName(element.attributeValue("methodname"));
		func.setType(element.attributeValue("type"));
		return func;
	}
	
	private IProp serialProp(Element element) {
		Prop prop = new Prop();
		prop.setName(element.attributeValue("name"));
		prop.setValue(element.attributeValue("value"));
		prop.setType(element.attributeValue("type"));
		prop.setDisplayValue(element.attributeValue("displayval"));
		return prop;
	}
}
