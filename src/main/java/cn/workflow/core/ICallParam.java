package cn.workflow.core;

import java.util.Iterator;
import java.util.Map;

public interface ICallParam extends Raw {
	
	public void addParam(String key,Object value);
	
	public Object getParam(String key);
	
	public void removeParam(String key);
	
	public void addParams(Map<String,Object> map);
	
	public Iterator<String> keyIterator();
	
	public void addParams(ICallParam param);
	
}
