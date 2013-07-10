package cn.workflow.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import cn.workflow.comm.SysConf;


public class IncludeJS extends  HttpServlet{

	private static final long serialVersionUID = 6126224586003948584L;
	
	private String ctx = null;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		ctx = request.getContextPath();
		request.setAttribute("ctx", ctx);
		request.setAttribute("jspPath", rootPath);
		request.getRequestDispatcher(rootPath + "includeJs.jsp").forward(arg0, arg1);
	}
}
