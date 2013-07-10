package cn.workflow.core;

public interface ICommand {
	
	public void execute();
	
	public void rollback();
	
}
