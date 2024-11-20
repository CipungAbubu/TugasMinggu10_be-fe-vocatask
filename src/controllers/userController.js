const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
    async register(req, res) {
        try {
            const { name, email, password, photo_url } = req.body;

            if (!name || !email || !password) {
                return ResponseAPI.error(res, 'All fields are required', 400);
            }
        
            const existingUser = await User.findOne({ email });
            if (existingUser) {
            return ResponseAPI.error(res, 'Email already registered', 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                photo_url
            });

            ResponseAPI.success(res, {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                photo_url: newUser.photo_url
            }, 'User registered successfully', 201);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const token = generateToken(user._id);

            ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    photo_url: user.photo_url,
                },
            }, 'Login successful');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async getProfile(req, res) {
        try {

            const user = await User.findById(req.user._id).select('-password');
            if (!user) {
                return ResponseAPI.notFound(res, 'User not found');
            }

            ResponseAPI.success(res, user);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async updateProfile(req, res) {
        try {
            const { name, email, photo_url, password } = req.body;

            const user = await User.findById(req.user._id);
            if (!user) {
                return ResponseAPI.notFound(res, 'User not found');
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (photo_url) user.photo_url = photo_url;
            if (password) user.password = password;

            await user.save();

            ResponseAPI.success(res, {
                id: user._id,
                name: user.name,
                email: user.email,
                photo_url: user.photo_url,
            }, 'Profile updated successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },
};

module.exports = userController;