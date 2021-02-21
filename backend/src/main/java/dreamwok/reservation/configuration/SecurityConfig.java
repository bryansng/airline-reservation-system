package dreamwok.reservation.configuration;

import dreamwok.reservation.model.Auth;
import dreamwok.reservation.service.CustomerDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	AuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	public SecurityConfig(AuthenticationSuccessHandler authenticationSuccessHandler) {
		this.authenticationSuccessHandler = authenticationSuccessHandler;
	}

	AuthenticationManager authenticationManager;

	@Autowired
	AuthenticationManagerBuilder authBuilder;

	@Autowired
	CustomerDetailsService customerDetailsService;

	public void configAuth(Auth auth, AuthenticationManagerBuilder authBuilder, String role) {
		try {
			authBuilder.inMemoryAuthentication().withUser(auth.getEmail()).password(auth.getHash()).roles(role);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public AuthenticationManagerBuilder getAuth() {
		return authBuilder;
	}

	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customerDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**").permitAll().antMatchers("/admin/**")
				.hasRole("ADMIN").antMatchers("/member/reserve").permitAll().antMatchers("/member/**")
				.hasAnyRole("USER", "ADMIN").antMatchers("/").permitAll().antMatchers("/h2-console/**").permitAll().and()
				.logout().logoutSuccessUrl("/");
		// http.authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**").permitAll().antMatchers("/admin/**")
		// 		.hasRole("ADMIN").antMatchers("/member/**").hasAnyRole("USER", "ADMIN").antMatchers("/").permitAll()
		// 		.antMatchers("/h2-console/**").permitAll().and().formLogin().loginPage("/").loginProcessingUrl("/login")
		// 		.successHandler(authenticationSuccessHandler).usernameParameter("email").passwordParameter("password").and()
		// 		.logout().logoutSuccessUrl("/");

		http.csrf().disable();
		http.headers().frameOptions().disable();
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}