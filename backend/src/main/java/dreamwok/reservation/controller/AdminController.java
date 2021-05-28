package dreamwok.reservation.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dreamwok.reservation.core.auth.request.TestRequest;

@RestController
@CrossOrigin
public class AdminController {
  @RequestMapping(value = "/admin/test", method = RequestMethod.GET)
  public ResponseEntity<TestRequest> loginCustomer(HttpServletRequest request) {
    // System.out.println("allowed admin access");
    return new ResponseEntity<>(new TestRequest("Testing"), HttpStatus.OK);
  }
}
