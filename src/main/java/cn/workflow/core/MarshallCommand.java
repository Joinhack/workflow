package cn.workflow.core;

public class MarshallCommand implements ICommand {
	
	private IFlow flow = null;

	public IFlow getFlow() {
		return flow;
	}

	public void setFlow(IFlow flow) {
		this.flow = flow;
	}

	public void execute() {
		IMarshaller marshaler = SerializeFactory.getInstance().getIMarshaller();
		marshaler.serialize(flow);
	}

	public void rollback() {
		
	}

}
