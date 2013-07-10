package cn.workflow.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import cn.workflow.comm.SysConf;
import cn.workflow.core.ClassBuilderFactory;
import cn.workflow.core.IClassBuilder;
import cn.workflow.core.IClassInfo;

public class ClassInfoShow  extends  HttpServlet {

	private static final long serialVersionUID = 3158159899818962804L;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");
	
	public void service(ServletRequest arg0, ServletResponse arg1)
		throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		
		IClassBuilder classBuilder = ClassBuilderFactory.getInstance().getClazzBuilder();
		StringBuffer buffer = new StringBuffer();
		String value = request.getParameter("value");
		buffer.append("{");
		if(value != null) {
			IClassInfo info = classBuilder.getClassInfo(value);
			if(info != null) {
				buffer.append("\"name\":\"" + info.getClassName() + "\",");
				buffer.append("\"usage\":\"" + info.getUsage() + "\"");
			}
		}
		buffer.append("}");
		request.setAttribute("json", buffer.toString());
		request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
	}
}
