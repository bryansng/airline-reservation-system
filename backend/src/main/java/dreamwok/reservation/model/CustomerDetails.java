package dreamwok.reservation.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomerDetails implements UserDetails {
  private static final long serialVersionUID = 4499475949758200792L;

  private String username;
  private String password;
  private boolean active;
  private List<GrantedAuthority> authorities;

  public CustomerDetails(Customer customer) {
    this.username = customer.getEmail();
    this.password = customer.getAuth().getHash();
    this.active = true;
    // this.active = customer.isActive();
    this.authorities = Arrays.stream(customer.getRoles().split(",")).map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return active;
  }
}
