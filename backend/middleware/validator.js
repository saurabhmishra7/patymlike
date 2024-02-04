import zod from "zod";
export const validateUserSignUpDetails =  function validateUserDetails(req, res, next) {
  try {
    const signupBody = zod.object({
      username: zod.string().email(),
      firstName: zod.string(),
      lastName: zod.string(),
      password: zod.string()
    });
  
    const { success } = signupBody.safeParse(req.body);
    if (success) {
      next();
    } else {
      throw new Error("Validation Failed");
    }
  } catch (error) {
     next(error);
  }
}

export const validateUserSignInDetails = function validateUserSignInDetails(req, res, next) {
  try {
    const signupBody = zod.object({
      username: zod.string().email(),
      password: zod.string()
    });
  
    const { success } = signupBody.safeParse(req.body);
    if (success) {
      next();
    } else {
      throw new Error("Validation Failed");
    }
  } catch (error) {
     next(error);
  }
}