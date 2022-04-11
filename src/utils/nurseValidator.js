import { check, validationResult } from "express-validator";

const NurseRules = (url) => {
  switch (url) {
    case "new":
      {
        return [
          check("name").isLength({ min: 2 }),
          check("password").isLength({ min: 8, max: 30 }),
          check("cpf").isLength({ min: 11, max: 11 }),
        ];
      }
      break;
    case "edit":
      {
        return [
          check("name").isLength({ min: 2 }),
          check("cpf").isLength({ min: 11, max: 11 }),
        ];
      }
      break;
    case "restore-password":
      {
        return [
          check("current").isLength({ min: 8, max: 30 }),
          check("new").isLength({ min: 8, max: 30 }),
          check("new-repeat").isLength({ min: 8, max: 30 }),
        ];
      }
      break;
    case "login":
      {
        return [
          check("cpf").isLength({ min: 11, max: 11 }),
          check("password").isLength({ min: 8, max: 30 }),
        ];
      }
      break;
    case "delete":
      {
        return [check("cpf").isLength({ min: 11, max: 11 })];
      }
      break;
  }
};

const NurseValidation = (request, response, next) => {
  const errorRules = validationResult(request);
  if (!errorRules.isEmpty())
    return response.send("<h2>Failed to process request</h2>").status(422);

  next();
};

export { NurseRules, NurseValidation };