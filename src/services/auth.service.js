const authRepository = require("../repositories/auth.repository");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const { generateToken } = require("../utils/generateToken");
var generator = require("generate-password");
const ApiError = require("../utils/ApiError");

const generateTokenAndExpiry = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
  return { token, tokenExpiry };
};

const saveUser = async (userDetails, isUpdate = false) => {
  const { email, username, password, token, tokenExpiry } = userDetails;

  const userPayload = {
    username,
    email,
    password,
    emailVerificationToken: token,
    emailVerificationExpiry: tokenExpiry,
    isVerified: false,
  };

  if (isUpdate) {
    const user = await authRepository.findByEmail(userPayload.email);

    return await user.update(userPayload);
  } else {
    return await authRepository.createUser(userPayload);
  }
};

const registerUser = async (req) => {
  const { username, email, password } = req.body;
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    if (existingUser.isEmailVerified) {
      throw new ApiError(400, "Email already existss");
    } else {
      const { token, tokenExpiry } = generateTokenAndExpiry();
      const updatedUser = await saveUser(
        {
          email,
          username,
          password,
          token,
          tokenExpiry,
        },
        true
      ); //  isUpdate is true

      // const verificationUrl = `${req.protocol}://${req.get(
      //     "host"
      //   )}/api/v1/auth/verify-email/${token}`;

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

      const message = `Hello ${username},\n\nPlease click on the following link to verify your email:\n${verificationUrl}`;

      await sendEmail(
        {
          email,
          subject: "LUX CAR Email Verification",
          message,
        },
        "text"
      );

      return updatedUser;
    }
  } else {
    const { token, tokenExpiry } = generateTokenAndExpiry();

    const newUser = await saveUser({
      email,
      username,
      password,
      token,
      tokenExpiry,
    }); //  isUpdate is false by default

    // const verificationUrl = `${req.protocol}://${req.get(
    //     "host"
    //   )}/api/v1/auth/verify-email/${token}`;

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const message = `Hello ${username},\n\nPlease click on the following link to verify your email:\n${verificationUrl}`;

    await sendEmail(
      {
        email,
        subject: "LUX CAR Email Verification",
        message,
      },
      "text"
    );

    return;
  }
};

const verifyEmail = async (req) => {
  const user = await authRepository.findByVerificationToken(req.params.token);

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token ");
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is Already verified");
  }

  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;
  user.isEmailVerified = true;
  await user.save();

  const message = `Hello ${user.username},\n\nYour email has been verified successfully.`;
  await sendEmail(
    { email: user.email, subject: "Email Verified", message },
    "text"
  );

  return {
    statusCode: 200,
    message: "Email verification successful. You can now login.",
  };
};

const requestNewVerificationEmail = async (req) => {
  const existingUser = await authRepository.findByEmail(req.body.email);
  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  if (existingUser.isEmailVerified) {
    throw new ApiError(400, "Email is Already verified");
  }

  const { token, tokenExpiry } = generateTokenAndExpiry();
  existingUser.emailVerificationToken = token;
  existingUser.emailVerificationExpiry = tokenExpiry;
  await existingUser.save();

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/verify-email/${existingUser.emailVerificationToken}`;
  const message = `Hello ${existingUser.username},\n\nPlease click on the following link to verify your email:\n${verificationUrl}`;

  await sendEmail(
    {
      email: existingUser.email,
      subject: "LUX CAR Email Verification",
      message,
    },
    "text"
  );
};
const loginUser = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
      throw new ApiError(400, 'please enter email and password');
  }

  const user = await authRepository.findByEmail(email, true) ;
  
  console.log("awla check may agyaa", user)

  if (!user) {
      throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isEmailVerified) {
      throw new ApiError(401, 'Email is not verified. Please verify your email to log in.');
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
      throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user);
     // Exclude the password from the final user object
     const { password: _, ...userWithoutPassword } = user.toJSON();
     console.log(userWithoutPassword)
     return { user: userWithoutPassword, token };

};


const forgotPassword = async (req) => {
  const user = await authRepository.findByEmail(req.body.email);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(
      401,
      "Email is not verified. Please verify your email to log in"
    );
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validate: false });

  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/auth/reset-password/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail(
      {
        email: user.email,
        subject: "LUX CAR Password Recovery",
        message,
      },
      "text"
    );
    return user.email;
  } catch (error) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save({ validate: false });
    throw new ApiError(500, error.message);
  }
};

const resetPassword = async (req) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await authRepository.findByResetToken(resetPasswordToken);

  if (!user) {
    throw new ApiError(400, "Reset Password Token is invalid or has expired");
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ApiError(400, "Password does not match");
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();
  return;
};

const registerAdmin = async (req) => {
  const { username, email } = req.body;
  const existingUser = await authRepository.findAdminByEmail(email);

  if (existingUser) {
    throw new ApiError(400, "Email already existss");
  } else {
    const password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
    });

    await authRepository.createAdmin({
      email,
      username,
      password,
      role: "super-admin",
    });

    const message = `Hello ${username},\n\nThese are your LUX CARS Admin Cradentials\n\nUser Name: ${username}\nEmail: ${email}\nPassword: ${password}`;

    await sendEmail(
      {
        email,
        subject: "LUX CAR Admin Cradentials",
        message,
      },
      "text"
    );

    return;
  }
};

const loginAdmin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "please enter email and password");
  }

  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(401, "You are not allowed to access this route");
  }

  const isPasswordMatch = await admin.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(admin);
  return { admin, token };
};

const forgotPasswordAdmin = async (req) => {
  const admin = await authRepository.findAdminByEmail(req.body.email);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const userName = admin.username;

  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
  });

  admin.password = password;
  await admin.save();

  const message = `Hello ${userName},\n\nYour New LUX CARS Admin Panel Password is:\nPassword: ${password}`;

  await sendEmail(
    {
      email: admin.email,
      subject: "LUX CAR Admin New Password",
      message,
    },
    "text"
  );
};

module.exports = {
  registerUser,
  verifyEmail,
  requestNewVerificationEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
};
