const bcrypt = require("bcrypt");
const db = require('../db/models');

const createUser = async (userBody) => {
    const { password } = userBody;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);    
    userBody.password = hash;
    const user = await db.Users.create(userBody);
    return user;
};

const updateUser = async (userId, userBody) => {
    const user = await db.Users.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const { password } = userBody;
    if(password && password.length > 0) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        userBody.password = hash;
    }

    const updatedUser = await user.update(userBody);
    return updatedUser;
}

const getUser = async (userId) => {
  const user = await db.Users.findByPk(userId);

    if(!user) {
        let userBody = {
            email: 'brandontreb@gmail.com',
            password: "tr4v15",            
            full_name: "Dade Murphy",
            username: "zerocool",
            about: "I am a software developer",
            image_url: "https://avatars0.githubusercontent.com/u/17098180?s=460&v=4",
            website: "http://localhost:3000"

        }
        return await createUser(userBody);
    }

  return user;
}

module.exports = {
    createUser,
    updateUser,
    getUser
}
