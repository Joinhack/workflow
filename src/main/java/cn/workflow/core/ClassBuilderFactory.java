package cn.workflow.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.comm.SysConf;
import cn.workflow.exceptions.SystemException;

public class ClassBuilderFactory {

	private static ClassBuilderFactory self = null;
	
	private IClassBuilder clazzBuilder = null;
	
	private static Log log = LogFactory.getLog(ClassBuilderFactory.class);
	
	private ClassBuilderFactory() {
		
	}
	
	public static ClassBuilderFactory getInstance() {
		if(self == null)
			self = new ClassBuilderFactory();
		return self;
	}
	
	public IClassBuilder getClazzBuilder() {
		if(clazzBuilder == null) {
			String classBuilder = SysConf.getSysConf().getString("workflow.class.builder");
			if(classBuilder == null)
				classBuilder = BasicClassBuilder.class.getName();
			try {
				clazzBuilder = (IClassBuilder) ClassUtils.loadClass(classBuilder).newInstance();
			} catch (Exception e) {
				log.error(e);
				throw new SystemException(e);
			}
		}
		return clazzBuilder;
	}
}
