package cn.workflow.core;

import java.io.Serializable;

public interface IProp extends Serializable,Raw {
	
	public String getName();
	
	public String getValue();
	
	public String getType();
	
	public String getDisplayValue();
	
}
