package cn.workflow.core;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.workflow.core.annotation.Usage;
import cn.workflow.exceptions.SystemException;

public class BasicClassInfo implements IClassInfo {
	
	private String className = null;
	
	private String usage = null;
	
	private Class<?> clazz = null;
	
	private Map<String,IMethodInfo> methodInfos = new HashMap<String,IMethodInfo>();
	
	public BasicClassInfo(String clazzName,Class<?> clazz) {
		if(clazzName == null || clazz == null)
			throw new SystemException("className or class can't be null");
		setClassName(clazzName);
		setClazz(clazz);
		setUsage();
	}
	
	private void setUsage() {
		Usage usgae = clazz.getAnnotation(Usage.class);
		if(usgae != null) {
			this.usage = usgae.value();
		}
		usgae = null;
		Method[] methods = clazz.getMethods();
		for(Method method : methods) {
			Usage methodUsgae = method.getAnnotation(Usage.class);
			if(methodUsgae != null) {
				methodInfos.put(method.getName(), new BasicMethodInfo(method.getName(),methodUsgae.value()));
			}
		}
	}

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Class<?> getClazz() {
		return clazz;
	}

	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
	}

	@Override
	public int hashCode() {
		if(className != null) 
			return className.hashCode();
		return super.hashCode();
	}

	@Override
	public String toString() {
		if(className != null) 
			return className;
		return super.toString();
	}

	public IMethodInfo getMethodInfo(String methodName) {
		return methodInfos.get(methodName);
	}
	
	public List<String> getMethodNames() {
		List<String> list = new ArrayList<String>();
		list.addAll(methodInfos.keySet());
		return list;
	}

	public List<IMethodInfo> getMethodInfos() {
		List<IMethodInfo> list = new ArrayList<IMethodInfo>();
		list.addAll(methodInfos.values());
		return list;
	}
}
