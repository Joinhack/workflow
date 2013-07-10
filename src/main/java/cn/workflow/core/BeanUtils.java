package cn.workflow.core;

import java.util.Date;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.exceptions.SystemException;

public class BeanUtils {

	private static BeanUtils self = null;
	
	private static Log log = LogFactory.getLog(BeanUtils.class);
	
	private BeanUtils() {
	}
	
	private static void registerConverts() {
		ConvertUtils.register(new RefConvert(), Raw.class);
		ConvertUtils.register(new DateConvert(), Date.class);
		//ConvertUtils.register(new PropsConvert(), IProp.class);
	}
	
	public static BeanUtils getInstance() {
		if(self == null) {
			registerConverts();
			self = new BeanUtils();
		}
		return self;
	}
	
	public void copyProperty(Object dest,String pName,Object src) throws SystemException {
		try {
			BeanUtilsBean.getInstance().copyProperty(dest,pName,src);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	public void copyProperties(Object dest,Object src) throws SystemException {
		try {
			BeanUtilsBean.getInstance().copyProperties(dest, src);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	public void populate(Object dest,Map<String,Object> src) throws SystemException {
		try {
			BeanUtilsBean.getInstance().populate(dest, src);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		} 
	}
	
	@SuppressWarnings("unchecked")
	public Map<String,Object> propertyDescribe(Object src) throws SystemException {
		try {
			return PropertyUtils.describe(src);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public Map<String,Object> describe(Object src) throws SystemException {
		try {
			return BeanUtilsBean.getInstance().describe(src);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
	}
	
	public boolean populate(Object dest,ICallParam param) {
		if(param == null || !(param instanceof BasicCallParam)) {
			return false;
		}
		try {
			populate(dest,((BasicCallParam)param).getMap());
		} catch (Exception e) {
			log.error(e);
			return false;
		}
		return true;
	}
}
