package cn.workflow.comm;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class SysConf {
	
	public static Properties props = null;
	
	public static SysConf self = null;
	
	public static void loadProps() {
		InputStream stream = SysConf.class.getResourceAsStream("/workflow.properties");
		props = new Properties();
		try {
			props.load(stream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if(stream != null) {
			try {
				stream.close();
			} catch (IOException e) {
			}
		}
	}
	
	static {
		loadProps();
	}
	
	public static SysConf getSysConf() {
		if(self == null) {
			self = new SysConf();
		}
		return self;
	}
	
	private SysConf() {
	}
	
	public String getString(String key) {
		return props.getProperty(key);
	}
}