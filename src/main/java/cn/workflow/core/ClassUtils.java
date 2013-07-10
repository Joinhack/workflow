package cn.workflow.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.exceptions.LogicException;

public class ClassUtils {
	
	private static Log log = LogFactory.getLog(BasicClassBuilder.class);
	
	public static Class<?> loadClass(String name) {
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		if(loader == null)
			loader = ClassUtils.class.getClassLoader();
		Class<?> clazz = null;
		try {
			clazz = loader.loadClass(name);
		} catch (ClassNotFoundException e) {
			log.error(e);
			throw new LogicException(e);
		}
		return clazz;
	}
}
