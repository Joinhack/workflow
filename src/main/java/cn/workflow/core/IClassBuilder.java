package cn.workflow.core;

import java.util.List;

public interface IClassBuilder {
	
	public <T> T newInstance(String name);
	
	public List<IClassInfo> getClassInfos();
	
	public IClassInfo getClassInfo(String className);
	
	public void addClass(Class<?> clazz);
	
}
