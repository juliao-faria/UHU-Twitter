"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = void 0;
const mongoose = require("mongoose");
exports.UsersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
//# sourceMappingURL=users.model.js.map