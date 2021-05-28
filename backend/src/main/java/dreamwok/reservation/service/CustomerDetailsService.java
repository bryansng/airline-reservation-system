package dreamwok.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dreamwok.reservation.model.Customer;
import dreamwok.reservation.repository.CustomerRepository;

import java.util.Optional;

@Service
public class CustomerDetailsService implements UserDetailsService {
  @Autowired
  CustomerRepository customerRepository;

  @Override
  public UserDetails loadUserByUsername(String customerId) throws UsernameNotFoundException {
    Optional<Customer> customer = customerRepository.findById(Long.parseLong(customerId));

    if (customer == null) {
      throw new UsernameNotFoundException("Not found: " + customerId);
    }

    return toUserDetails(customer.get());
  }

  public UserDetails toUserDetails(Customer customer) {
    return User.withUsername(customer.getId().toString()).password(customer.getAuth().getHash())
        .roles(customer.getRoles()).build();
  }
}