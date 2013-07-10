package cn.workflow.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import cn.workflow.comm.SysConf;

public class WorkflowShow extends  HttpServlet{

	private static final long serialVersionUID = -8974466680020001383L;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");
	
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
		throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		String id = request.getParameter("id");
		if(id != null) {
			request.setAttribute("id", id);
		}
		request.getRequestDispatcher(rootPath + "workflowShow.jsp").forward(arg0, arg1);
	}
}
