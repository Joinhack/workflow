package cn.workflow.core;

public class Prop implements IProp {

	private static final long serialVersionUID = 5603574513015744880L;

	private String name = null;
	
	private String value = null;
	
	private String type = null;
	
	private String displayValue = null;

	public String getDisplayValue() {
		return displayValue;
	}

	public void setDisplayValue(String displayValue) {
		this.displayValue = displayValue;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public int hashCode() {
		if(getName() != null)
			return getName().hashCode();
		return super.hashCode();
	}

	@Override
	public String toString() {
		return getValue();
	}
}
