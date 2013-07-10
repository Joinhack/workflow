package cn.workflow.web;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import cn.workflow.comm.SysConf;
import cn.workflow.core.BasicFlowCheck;
import cn.workflow.core.BasicWorkflowContext;
import cn.workflow.core.FlowSerializeManagerFactory;
import cn.workflow.core.IFlow;
import cn.workflow.core.IFlowSerializeManager;
import cn.workflow.core.IProp;
import cn.workflow.core.IWorkflowTemplateSaveListener;
import cn.workflow.core.SerializeFactory;
import cn.workflow.exceptions.CommException;


public class WorkflowSave extends  HttpServlet{

	private static final long serialVersionUID = 6126224586003948584L;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");
	
	private static Log log = LogFactory.getLog(WorkflowSave.class);
	
	private IFlowSerializeManager manager = FlowSerializeManagerFactory.getFlowSerializeManager();
	
	private Map<String,String> getPropsMap(List<IProp> list) {
		Map<String,String> map = new HashMap<String,String>();
		for(IProp p:list)
			map.put(p.getName(), p.getValue());
		return map;
	}
	
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		String workflow = request.getParameter("workflow");
		
		if(workflow == null) {
			request.setAttribute("json", "{\"code\":-1}");
			request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
			return;
		}
		int i = 0;
		//fireofx will send namespace ,so I will cut it.
		String ns = "xmlns=\"http://www.w3.org/1999/xhtml\"";
		if((i = workflow.indexOf(ns)) > 0) {
			String n = workflow.substring(0,i);
			n += workflow.substring(n.length() + ns.length(),workflow.length());
			workflow = n;
		}
		SAXReader reader = new SAXReader();
		Document doc = null;
		IFlow flow = null;
		ByteArrayInputStream input = null;
		try {
			input = new ByteArrayInputStream(workflow.getBytes("UTF-8"));
			doc = reader.read(input);
			flow = SerializeFactory.getInstance().getIUnmarshaler().serializeFromTemplate(doc);
			BasicFlowCheck check = new BasicFlowCheck();
			check.checkflow(flow);
			input.close();
		} catch (CommException e) {
			log.error(e);
			request.setAttribute("json", "{\"code\":-3,\"msg\":\"" + e.getMessage() + "\"}");
			request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
			return;
		} catch (Exception e) {
			log.error(e);
			request.setAttribute("json", "{\"code\":-2}");
			request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
			return;
		} finally {
			try{
				if(input != null)
					input.close();
			}catch (Exception e) {
			}
		}
		OutputFormat format = OutputFormat.createPrettyPrint();
		format.setEncoding("utf-8");
		
		IWorkflowTemplateSaveListener listener = BasicWorkflowContext.getInstance().getTemplateSaveListener();
		String fileName = null;
		Map<String,String> map = getPropsMap(flow.getProps());
		String version = map.get("version");
		if(version == null) {
			request.setAttribute("json", "{\"code\":-2,\"msg\":\"please set workflow property version\"}");
			request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
			return;
		}
		fileName = manager.getTemplateFileName(flow.getTemplateId(), version);
		if(listener != null) {
			try {
				listener.templateSave(flow.getName(), flow.getTemplateId(),map);
			} catch (CommException e) {
				log.error(e);
				request.setAttribute("json", "{\"code\":-2,\"msg\":\"" + e.getMessage() + "\"}");
				request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
				return;
			}
		}
		String path = SysConf.getSysConf().getString("workflow.template.savepath");
		FileOutputStream output = null;
		XMLWriter writer = null;
		try {
			output = new FileOutputStream(path + File.separator + fileName);
			writer = new XMLWriter(output, format);
			writer.write(doc);
		}finally {
			try{
				if(writer!=null)
					writer.close();
			}catch (Exception e) {
			}
			try{
				if(output!=null) {
					output.close();
					output = null;
				}
			}catch (Exception e) {
			}
		}
		request.setAttribute("json", "{\"code\":0}");
		request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
		return;
	}
}
