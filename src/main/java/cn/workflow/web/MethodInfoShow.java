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
import cn.workflow.core.IMethodInfo;

public class MethodInfoShow  extends  HttpServlet {

	private static final long serialVersionUID = 3158159899818962804L;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");
	
	public void service(ServletRequest arg0, ServletResponse arg1)
		throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		StringBuffer buffer = new StringBuffer();
		String className = request.getParameter("className");
		String methodName = request.getParameter("methodName");
		buffer.append("{");
		if(className != null && methodName != null) {
			IClassBuilder classBuilder = ClassBuilderFactory.getInstance().getClazzBuilder();
			IClassInfo info = classBuilder.getClassInfo(className);
			if(info != null) {
				IMethodInfo methodInfo = info.getMethodInfo(methodName);
				if(methodInfo != null) {
					buffer.append("\"name\":\"" + methodInfo.getMethodName() + "\",");
					buffer.append("\"usage\":\"" + methodInfo.getUsage() + "\"");
				}
			}
		}
		buffer.append("}");
		request.setAttribute("json", buffer.toString());
		request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
	}
}
