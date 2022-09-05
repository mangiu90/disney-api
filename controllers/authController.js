import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";


const register = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        const error = new Error("the email address is already used");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = User.build({ username, email });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateJWT(user.id),
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error("User does not exist");
        return res.status(404).json({ msg: error.message });
    }

    if (await bcrypt.compare(password, user.password)) {
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateJWT(user.id),
        });
    } else {
        const error = new Error("The Password is Incorrect");
        return res.status(403).json({ msg: error.message });
    }
}


export {
    register,
    login,
};