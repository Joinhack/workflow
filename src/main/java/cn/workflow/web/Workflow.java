package cn.workflow.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import cn.workflow.comm.SysConf;

public class Workflow extends  HttpServlet{

	private static final long serialVersionUID = -6444332882992493352L;

	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");
	
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
		throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		String fileName = request.getParameter("fileName");
		if(fileName != null) {
			request.setAttribute("fileName", fileName);
		}
		request.getRequestDispatcher(rootPath + "workflow.jsp").forward(arg0, arg1);
	}
}
