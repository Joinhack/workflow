package cn.workflow.core;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.dom.DOMElement;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import cn.workflow.exceptions.SystemException;

public class Serialize2Xml implements IMarshaller {
	
	private static Log log = LogFactory.getLog(Serialize2Xml.class);
	
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	
	private IFlowSerializeManager manager = FlowSerializeManagerFactory.getFlowSerializeManager();
	
	public Serialize2Xml() {
		
	}
	
	public void serialize(IFlow flow) {
		ByteArrayOutputStream output = null;
		try {
			Element root = new DOMElement("workflow");
			root.addElement("id").setText(flow.getId());
			root.addElement("activeTime").setText(sdf.format(new Date()));
			root.addElement("name").setText(flow.getName());
			root.addElement("description").setText(flow.getDescription());
			root.addElement("templateId").setText(flow.getTemplateId());
			root.addElement("templateVersion").setText(flow.getTemplateVersion());
			root.add(serialProps(flow.getProps()));
			root.add(serialNodes(flow.getNodes()));
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("GB2312");
			output =  new ByteArrayOutputStream();
			XMLWriter writer = new XMLWriter(output,format);
			writer.write(DocumentHelper.createDocument(root));
			writeBytes(flow.getId(),output.toByteArray());
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		} finally {
			if(output != null) {
				try {
					output.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
	protected void writeBytes(String id,byte [] bits) {
		File file = new File(manager.getFlowInstancePath(id));
		FileOutputStream output = null;
		try {
			output = new FileOutputStream(file);
			output.write(bits);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		} finally {
			if(output != null) {
				try {
					output.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
	private Element serialNodes(List<INode> list) {
		DOMElement element = new DOMElement("nodes");
		for(INode node:list) {
			element.add(serialNode(node));
		}
		return element;
	}
	
	private Element serialNode(INode node) {
		DOMElement element = new DOMElement("node");
		element.addAttribute("text", node.getName());
		element.addAttribute("type", node.getType());
		element.addAttribute("status",node.getStatus());
		element.addAttribute("fromnode",node.getFromNodeId());
		element.addElement("id").setText(node.getId());
		element.addElement("description").setText(node.getDescription());
		element.add(serialProps(node.getProps()));
		element.add(serialFuncs(node.getPreFuncs(),node.getConditionFuncs()));
		element.add(serialActions(node.getActions()));
		return element;
	}
	
	private Element serialActions(List<IAction> list) {
		DOMElement element = new DOMElement("actions");
		for(IAction action:list) {
			element.add(serialAction(action));
		}
		return element;
	}
	
	private Element serialAction(IAction action) {
		DOMElement element = new DOMElement("action");
		element.addAttribute("tonode", action.getToNodeId());
		element.addAttribute("condition", action.getCondition());
		element.add(serialProps(action.getProps()));
		element.add(serialActionFuncs(action.getFuncs()));
		return element;
	}
	
	private Element serialActionFuncs(List<IFunc> prefuncs) {
		DOMElement element = new DOMElement("functions");
		DOMElement xmlPrefuncs = new DOMElement("prefuncs");
		element.add(xmlPrefuncs);
		for(IFunc func:prefuncs) {
			xmlPrefuncs.add(serialFunc(func));
		}
		return element;
	}
	
	private Element serialFuncs(List<IFunc> prefuncs,List<IFunc> condfuncs) {
		DOMElement element = new DOMElement("functions");
		DOMElement xmlPrefuncs = new DOMElement("prefuncs");
		element.add(xmlPrefuncs);
		for(IFunc func:prefuncs) {
			xmlPrefuncs.add(serialFunc(func));
		}
		DOMElement xmlConditionfuncs = new DOMElement("conditionfuncs");
		element.add(xmlConditionfuncs);
		for(IFunc func:condfuncs) {
			xmlConditionfuncs.add(serialFunc(func));
		}
		return element;
	}
	
	private Element serialFunc(IFunc ifunc) {
		if(ifunc instanceof ClassFunc) {
			ClassFunc func = (ClassFunc)ifunc;
			DOMElement element = new DOMElement("function");
			element.addAttribute("clzname", func.getClzName());
			element.addAttribute("methodname", func.getMethodName());
			element.addAttribute("type", func.getType());
			return element;
		}
		return null;
	}
	
	private Element serialProps(List<IProp> list) {
		DOMElement element = new DOMElement("props");
		for(IProp prop:list) {
			element.add(serialProp(prop));
		}
		return element;
	}
	
	private Element serialProp(IProp prop) {
		DOMElement element = new DOMElement("prop");
		element.addAttribute("name", prop.getName());
		element.addAttribute("value", prop.getValue());
		element.addAttribute("type", prop.getType());
		element.addAttribute("displayval", prop.getDisplayValue());
		return element;
	}
	
}
