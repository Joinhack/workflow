package cn.workflow.web;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.workflow.comm.SysConf;

public class WorkflowGet extends  HttpServlet{

	private static final long serialVersionUID = 6126224586003948584L;
	
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		String fileName = request.getParameter("fileName");
		String fileContent = request.getParameter("fileContent");
		String path = SysConf.getSysConf().getString("workflow.template.savepath");
		String name = null;
		if(fileName != null) {
			name = path + File.separator + fileName + ".xml";
			File file = new File(name);
			if(!file.exists()) {
				throw new FileNotFoundException("file not exists");
			}
		}
		InputStream in = null;
		OutputStream out = null;
		try{
			if(name != null)
				in = new FileInputStream(name);
			else 
				in = new ByteArrayInputStream(fileContent.getBytes());
			out = response.getOutputStream();
			byte[] buff = new byte[1024];
			int c = 0;
			response.setContentType("text/xml; charset=GBK");
			while((c = in.read(buff)) > 0) {
				out.write(buff, 0, c);
			}
		}finally {
			try{
				if(out != null)
					out.close();
			}catch (Exception e) {
			}
			try {
				if(in != null)
				in.close();
			} catch (Exception e) {
			}
		}
		
	}
}
