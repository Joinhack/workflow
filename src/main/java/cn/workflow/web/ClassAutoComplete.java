package cn.workflow.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import cn.workflow.comm.SysConf;
import cn.workflow.core.BasicWorkflowContext;
import cn.workflow.core.ClassBuilderFactory;
import cn.workflow.core.IClassInfo;

public class ClassAutoComplete extends  HttpServlet {

	private static final long serialVersionUID = -8595303999414072933L;
	
	private String rootPath = SysConf.getSysConf().getString("workflow.jsp.path");

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		BasicWorkflowContext.getInstance();
		HttpServletRequest request = (HttpServletRequest)arg0;
		StringBuffer buffer = new StringBuffer();
		String value = request.getParameter("value");
		buffer.append("[");
		List<IClassInfo> list =  ClassBuilderFactory.getInstance().getClazzBuilder().getClassInfos();
		List<IClassInfo> result = new ArrayList<IClassInfo>();  
		for(IClassInfo classInfo : list) {
			if(value == null || "".equals(value)) {
				result.add(classInfo);
			}
			else {
				if(classInfo.getClassName() != null && classInfo.getClassName().toUpperCase().indexOf(value.toUpperCase()) != -1) {
					result.add(classInfo);
				}
			}
		}
		for(int i = 0; i < result.size(); i++) {
			IClassInfo classInfo = result.get(i);
			String usage = classInfo.getUsage();
			if(usage == null)
				usage = "未定义使用说明";
			buffer.append("{\"data\":\"" + classInfo.getClassName() + "\",\"usage\":\"" + usage + "\"}");
			if(i != result.size() - 1) {
				buffer.append(",");
			}
		}
		buffer.append("]");
		request.setAttribute("json", buffer.toString());
		request.getRequestDispatcher(rootPath + "json.jsp").forward(arg0, arg1);
	}
}
