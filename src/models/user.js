const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [40, "First name cannot exceed 40 characters"],
        validate(value) {
            value = value.trim();

            if (!/^[A-Za-z\s\-]+$/.test(value)) {
                throw new Error("First name can only contain letters, spaces, or hyphens");
            }

            if (!value.trim()) {
                throw new Error("First name cannot be empty or just spaces");
            }
        },
        set(value) {
            value = value.trim();
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    },
    lastName: {
        type: String,
        trim: true,
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [40, "Last name cannot exceed 40 characters"],
        validate(value) {
            if (!value) return;

            if (!/^[A-Za-z\s\-]+$/.test(value)) {
                throw new Error("Last name can only contain letters, spaces, or hyphens");
            }

            if (!value.trim()) {
                throw new Error("Last name cannot be just spaces");
            }
        },
        set(value) {
            if (!value) return value;
            value = value.trim();
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    }
    ,
    age: {
        type: Number,
        min: 18,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password");
            }
        }
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is ot valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo  url " + value);
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am using devTinder",
        validate(value) {
            if (value.length > 100) {
                throw new Error("About section cannot exceed 100 characters");
            }

            if (!/[a-zA-Z]/.test(value)) {
                throw new Error("About section must contain at least one alphabetic character");
            }

            if (!/[a-zA-Z]/.test(value) && /^[0-9!@#$%^&*(),.?":{}|<> ]+$/.test(value)) {
                throw new Error("About section cannot contain only numbers or special characters");
            }
            if (!value.trim()) {
                throw new Error("About section cannot be empty or whitespace");
            }
        }
    }
    ,
    skills: {
        type: [String],
        validate(value) {
            // 1️⃣ Limit total number of skills
            if (value.length > 50) {
                throw new Error("Skills cannot exceed 50 skills");
            }

            // 2️⃣ Clean + validate each skill
            value.forEach((skill) => {
                if (!skill || !skill.trim()) {
                    throw new Error("Skill cannot be empty or just spaces");
                }

                // Remove leading/trailing spaces
                skill = skill.trim();

                // Reject if it's only numbers or only special symbols
                if (!/[a-zA-Z]/.test(skill)) {
                    throw new Error(`Invalid skill "${skill}". Skill must contain letters`);
                }

                // Reject overly long skill names
                if (skill.length > 30) {
                    throw new Error(`Skill "${skill}" is too long (max 30 characters)`);
                }
            });

            // 3️⃣ Normalize (capitalize first letter)
            const formattedSkills = value.map((skill) => {
                skill = skill.trim();
                return skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
            });

            // 4️⃣ Check for duplicates (case-insensitive)
            const uniqueSkills = new Set(formattedSkills.map((s) => s.toLowerCase()));
            if (uniqueSkills.size !== formattedSkills.length) {
                throw new Error("Duplicate skills are not allowed");
            }

            // 5️⃣ Update array with formatted values
            for (let i = 0; i < value.length; i++) {
                value[i] = formattedSkills[i];
            }
        }
    }

}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
};

module.exports = mongoose.model('User', userSchema);