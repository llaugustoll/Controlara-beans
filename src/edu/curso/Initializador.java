package edu.curso;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Initializador implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletCtx) throws ServletException {
		AnnotationConfigWebApplicationContext
		springCxt= new AnnotationConfigWebApplicationContext();
		springCxt.register(Config.class);
		springCxt.setServletContext(servletCtx);
		Dynamic servlet =  servletCtx.addServlet("dispatcher", new  DispatcherServlet(springCxt));
		servlet.addMapping("/");
		servlet.setLoadOnStartup(1);
	}

}

