package cn.workflow.core;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class BasicCallParam implements ICallParam {
	
	private Map<String,Object> map = new HashMap<String,Object>();

	public Map<String, Object> getMap() {
		return map;
	}
	
	public Iterator<String> keyIterator() {
		return map.keySet().iterator();
	}
	
	public void addParam(String key,Object value) {
		if(value == null || key == null)
			return;
		map.put(key, value);
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	
	public Object getParam(String key) {
		return map.get(key);
	}

	public void addParams(Map<String, Object> map) {
		if(map != null)
			this.map.putAll(map);
	}

	public void addParams(ICallParam param) {
		Iterator<String> iter = param.keyIterator();
		while(iter.hasNext()) {
			String key = iter.next();
			this.addParam(key, param.getParam(key));
		}
	}

	public void removeParam(String key) {
		map.remove(key);
	}
	
}
