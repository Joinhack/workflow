package cn.workflow.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.exceptions.LogicException;

public class BasicClassBuilder implements IClassBuilder {
	
	private static Log log = LogFactory.getLog(BasicClassBuilder.class);
	
	private Map<String,IClassInfo> map = new HashMap<String, IClassInfo>();
	
	private ReentrantLock lock = new ReentrantLock();
	
	protected BasicClassBuilder() {
	}

	@SuppressWarnings("unchecked")
	public <T> T newInstance(String name) {
		if(name == null)
			return null;
		lock.lock();
		T retVal = null;
		try{
			IClassInfo classInfo = map.get(name);
			
			Class<?> clazz = null;
			if(classInfo == null) {
				clazz = loadClass(name);
				classInfo = new BasicClassInfo(name,clazz);
				map.put(name, classInfo);
			}
			clazz = classInfo.getClazz();
			if(clazz == null) {
				throw new LogicException("can't load class");
			}
			retVal = (T)newInstance(clazz);
		} finally {
			lock.unlock();
		}
		return retVal;
	}
	
	@SuppressWarnings("unchecked")
	protected <T> T newInstance(Class<?> clazz) {
		T retVal;
		try {
			retVal = (T)clazz.newInstance();
		} catch (Exception e) {
			log.error(e);
			throw new LogicException(e);
		}
		return retVal;
	}
	
	protected Class<?> loadClass(String name) {
		return ClassUtils.loadClass(name);
	}

	public List<IClassInfo> getClassInfos() {
		List<IClassInfo> list = new ArrayList<IClassInfo>();
		list.addAll(map.values());
		return list;
	}

	public void addClass(Class<?> clazz) {
		map.put(clazz.getName(), new BasicClassInfo(clazz.getName(),clazz));
	}

	public IClassInfo getClassInfo(String className) {
		return map.get(className);
	}
}
