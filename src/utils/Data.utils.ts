const bcrypt = require('bcrypt');


// to hash the password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
}

// to compare the password
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}


