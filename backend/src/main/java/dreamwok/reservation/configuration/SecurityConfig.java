package dreamwok.reservation.configuration;

import dreamwok.reservation.model.Auth;
import dreamwok.reservation.service.CustomerDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	AuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private CustomerDetailsService customerDetailsService;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	public SecurityConfig(AuthenticationSuccessHandler authenticationSuccessHandler) {
		this.authenticationSuccessHandler = authenticationSuccessHandler;
	}

	AuthenticationManager authenticationManager;

	@Autowired
	AuthenticationManagerBuilder authBuilder;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// configure AuthenticationManager so that it knows from where to load user for matching credentials.
		// Use BCryptPasswordEncoder.
		auth.userDetailsService(customerDetailsService).passwordEncoder(getPasswordEncoder());
	}

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

	@Bean
	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customerDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// http.cors().and().authorizeRequests().antMatchers("/**").permitAll();
		// http.cors().and().authorizeRequests().antMatchers("/admin/**").hasRole("ADMIN").antMatchers("/").permitAll().and()
		// 		.httpBasic().and().logout().logoutSuccessUrl("/");

		// http.cors().and().authorizeRequests().antMatchers(HttpMethod.GET, "/image/**").permitAll()
		//     .antMatchers(HttpMethod.PUT, "/image/increment/**").permitAll().antMatchers(HttpMethod.POST, "/image/**")
		//     .authenticated().antMatchers(HttpMethod.PUT, "/image/**").authenticated()
		//     .antMatchers(HttpMethod.DELETE, "/image/**").authenticated();

		// cors needed to allow Authoriztation header.
		http.cors().and().authorizeRequests()
				.antMatchers("/login/**", "/register", "/reservation/**", "/reservation/cancel/**", "/flight/**", "/search/**")
				.permitAll().antMatchers("/admin/**").hasRole("ADMIN").antMatchers("/customer/**").authenticated().and()
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// http.authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**").permitAll().antMatchers("/admin/**")
		// 		.hasRole("ADMIN").antMatchers("/member/reserve").permitAll().antMatchers("/member/**")
		// 		.hasAnyRole("USER", "ADMIN").antMatchers("/").permitAll().antMatchers("/h2-console/**").permitAll().and()
		// 		.logout().logoutSuccessUrl("/");

		// http.authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**").permitAll().antMatchers("/admin/**")
		// 		.hasRole("ADMIN").antMatchers("/member/**").hasAnyRole("USER", "ADMIN").antMatchers("/").permitAll()
		// 		.antMatchers("/h2-console/**").permitAll().and().formLogin().loginPage("/").loginProcessingUrl("/login")
		// 		.successHandler(authenticationSuccessHandler).usernameParameter("email").passwordParameter("password").and()
		// 		.logout().logoutSuccessUrl("/");

		// Add a filter to validate the tokens with every request
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		http.csrf().disable();
		http.headers().frameOptions().disable();
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}