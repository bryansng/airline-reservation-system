package dreamwok.reservation.service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import org.springframework.stereotype.Service;

// https://www.baeldung.com/spring-security-block-brute-force-authentication-attempts
@Service
public class LoginIPAttemptService {
  private final int MAX_ATTEMPT = 3;
  private LoadingCache<String, Integer> attemptsCache; // ip:numAttempts key:value pair.

  public LoginIPAttemptService() {
    super();
    attemptsCache = CacheBuilder.newBuilder().expireAfterWrite(20, TimeUnit.MINUTES)
        .build(new CacheLoader<String, Integer>() {
          public Integer load(String key) {
            return 0;
          }
        });
  }

  public void loginSucceeded(String key) {
    attemptsCache.invalidate(key);
  }

  public void loginFailed(String key) {
    int attempts;
    try {
      attempts = attemptsCache.get(key);
    } catch (ExecutionException e) {
      attempts = 0;
    }
    attempts++;
    attemptsCache.put(key, attempts);
  }

  public boolean isBlocked(String key) {
    try {
      return attemptsCache.get(key) >= MAX_ATTEMPT;
    } catch (ExecutionException e) {
      return false;
    }
  }

  // https://stackoverflow.com/questions/29910074/how-to-get-client-ip-address-in-java-httpservletrequest
  public String getClientIP(HttpServletRequest request) {
    String xfHeader = request.getHeader("X-Forwarded-For");
    // System.out.println("xfHeader: " + xfHeader);
    if (xfHeader == null) {
      // System.out.println("getRemoteAddr: " + request.getRemoteAddr());

      // if localhost, the below returns localhost's ipv6.
      return request.getRemoteAddr();
    }
    return xfHeader.split(",")[0];
  }
}
