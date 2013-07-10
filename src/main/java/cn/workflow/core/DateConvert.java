package cn.workflow.core;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.beanutils.Converter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateConvert implements Converter {
	
	private static SimpleDateFormat df =  new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	
	private static Log log = LogFactory.getLog(DateConvert.class);

	@SuppressWarnings("unchecked")
	public Object convert(Class arg0, Object arg1) {
		if(arg1 instanceof java.sql.Date)
			return new Date(((java.sql.Date) arg1).getTime());
		if(arg1 instanceof Date)
			return new Date(((Date) arg1).getTime());
		try {
			return df.parse((String) arg1.toString());
		} catch (ParseException e) {
			log.error(e);
			return new Date();
		}
	}

}
