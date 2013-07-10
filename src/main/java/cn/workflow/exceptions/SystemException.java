package cn.workflow.exceptions;

public class SystemException extends CommException {

	private static final long serialVersionUID = -7879657634769862086L;

	public SystemException(String s) {
		super(s);
	}
	
	public SystemException(Throwable t) {
		super(t);
	}
}
