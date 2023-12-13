import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
//const correctPassword = "superdev";

export default defineEventHandler(async (req) => {
  const { inputPassword, project } = await readBody(req);
  const { data } = await $fetch(
    `http://localhost:1337/api/lock-projects?fields[0]&filters[title][$eq]=${project._value}&filters[password][$eq]=${inputPassword._value}`,
    { method: "get" }
  );

  if (data.length > 0) {
    const id = data[0].id;
    const secretKey = "secret_lock_token";
    const generateId = uuidv4();
    const token = jwt.sign(generateId, secretKey);
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    $fetch(`http://localhost:1337/api/lock-tokens/${id}`, {
      method: "put",
      body: {
        data: {
          token: token,
          expiration: expiryDate,
        },
      },
    });

    return { loggedIn: true, token };
  } else {
    return { loggedIn: false, message: "Invalid password!!!!!" };
  }
});
