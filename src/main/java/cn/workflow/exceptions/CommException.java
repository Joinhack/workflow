package cn.workflow.exceptions;

public class CommException extends RuntimeException {

	private static final long serialVersionUID = -5134268501822151109L;

	public CommException(String s) {
		super(s);
	}
	
	public CommException(Throwable e) {
		super(e);
	}
}
