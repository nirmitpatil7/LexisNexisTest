const testUsers = {
  validUser: {
    email: "testuser@example.com",
    password: "ValidPassword123!",
    firstName: "Test",
    lastName: "User",
  },

  invalidUser: {
    email: "invalid@example.com",
    password: "WrongPassword123!",
  },

  newUser: {
    email: "newuser@example.com",
    password: "NewPassword123!",
    firstName: "New",
    lastName: "User",
  },

  invalidEmails: [
    "invalid-email",
    "invalid@",
    "@invalid.com",
    "spaces in@email.com",
    "",
  ],

  invalidPasswords: [
    "short",
    "12345678",
    "password",
    "PASSWORD",
    "Pass123",
    "",
  ],
};

const testMessages = {
  success: {
    login: ["Welcome", "Login successful", "Dashboard", "Home"],
    signup: ["Account created", "Registration successful", "Welcome"],
    forgotPassword: ["Password reset email sent", "Check your email"],
  },

  error: {
    invalidCredentials: [
      "Invalid credentials",
      "Login failed",
      "Wrong email or password",
    ],
    emailExists: ["Email already exists", "Account already exists"],
    weakPassword: ["Password too weak", "Password must contain"],
    invalidEmail: ["Invalid email", "Please enter a valid email"],
    requiredFields: [
      "Required field",
      "This field is required",
      "Please fill in all fields",
    ],
  },
};

module.exports = {
  testUsers,
  testMessages,
};
