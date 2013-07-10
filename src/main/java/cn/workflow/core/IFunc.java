package cn.workflow.core;

import java.io.Serializable;

public interface IFunc extends Serializable {
	
	public static String FUNCTYPE_CLASSFUNC = "class";
	
	public String getType();
}
