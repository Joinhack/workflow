package cn.workflow.exceptions;

public class LogicException extends CommException {

	private static final long serialVersionUID = 7031581068010507917L;

	public LogicException(String s) {
		super(s);
	}
	
	public LogicException(Throwable t) {
		super(t);
	}
}
