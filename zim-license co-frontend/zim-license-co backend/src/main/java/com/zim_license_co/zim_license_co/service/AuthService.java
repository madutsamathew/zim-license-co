package com.zim_license_co.zim_license_co.service;

import com.zim_license_co.zim_license_co.config.JwtUtil;
import com.zim_license_co.zim_license_co.domain.User;
import com.zim_license_co.zim_license_co.dto.AuthResponse;
import com.zim_license_co.zim_license_co.dto.LoginRequest;
import com.zim_license_co.zim_license_co.dto.RegisterRequest;
import com.zim_license_co.zim_license_co.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(request.getRole());
        user.setCompanyName(request.getCompanyName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setIsActive(true);

        user = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getFullName(),
                user.getRole().name(),
                user.getId(),
                user.getCompanyName()
        );
    }

    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Get user details
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

            if (!user.getIsActive()) {
                throw new BadCredentialsException("Account is deactivated");
            }

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

            return new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole().name(),
                    user.getId(),
                    user.getCompanyName()
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}

