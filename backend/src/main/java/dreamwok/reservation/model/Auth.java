package dreamwok.reservation.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "auth")
public class Auth {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String email;

	@NotEmpty
	@Size(min = 4)
	private String hash;

	@OneToOne(mappedBy = "auth", fetch = FetchType.LAZY)
	private Customer customer;

	public void setAll(String email, String hash) {
		setEmail(email);
		setHash(hash);
	}

	@JsonIgnore
	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String toStringWithCustomer() {
		String buf = " - ";
		return email + buf + hash + "\n" + customer.toString();
	}
}