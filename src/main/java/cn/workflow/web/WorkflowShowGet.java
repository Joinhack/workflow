package cn.workflow.web;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import cn.workflow.comm.SysConf;
import cn.workflow.core.FlowSerializeManagerFactory;
import cn.workflow.core.IFlow;
import cn.workflow.core.IFlowSerializeManager;
import cn.workflow.core.INode;
import cn.workflow.core.IUnmarshaller;
import cn.workflow.core.SerializeFactory;

public class WorkflowShowGet extends  HttpServlet{

	private static final long serialVersionUID = 6126224586003948584L;
	
	private static Log log = LogFactory.getLog(WorkflowShowGet.class);
	
	private IFlowSerializeManager manager = FlowSerializeManagerFactory.getFlowSerializeManager();
	
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		String id = request.getParameter("id");
		IUnmarshaller unmarshaller = SerializeFactory.getInstance().getIUnmarshaler();
		IFlow flow = unmarshaller.serializeFromInstance(id);
		String path = SysConf.getSysConf().getString("workflow.template.savepath");
		String version = flow.getTemplateVersion();
		String name = path + File.separator + manager.getTemplateFileName(flow.getTemplateId(), version);
		File file = new File(name);
		if(!file.exists()) {
			throw new FileNotFoundException("file not exists");
		}
		SAXReader reader = new SAXReader();
		Document doc = null;
		try {
			doc = reader.read(name);
			for(INode node:flow.getNodes()) {
				Element elem = (Element)doc.selectSingleNode("/workflow/nodes/node[id=" + node.getId() + "]");
				elem.addAttribute("status", node.getStatus());
			}
		} catch (Exception e) {
			log.error(e);
			return;
		}
		response.setContentType("text/xml; charset=GBK");
		OutputFormat format = OutputFormat.createPrettyPrint();
		format.setEncoding("GB2312");
		OutputStream out = response.getOutputStream();
		XMLWriter writer = new XMLWriter(out, format);
		writer.write(doc);
		out.close();
	}
}
