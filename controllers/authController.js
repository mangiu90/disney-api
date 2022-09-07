import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";
import sendEmail from "../helpers/email.js";


const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            const error = new Error("the email address is already used");
            return res.status(400).json({ msg: error.message });
        }

        const user = User.build({ username, email });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        await sendEmail(user.email);

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateJWT(user.id),
        });
    } catch (error) {
        if (error.errors) {
            const errObj = {};
            error.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(400).json({ errors: errObj });
        }
        return res.status(400).json({ msj: 'user register error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        const error = new Error("email is required");
        return res.status(404).json({ msg: error.message });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error("User does not exist");
        return res.status(404).json({ msg: error.message });
    }

    if (await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
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