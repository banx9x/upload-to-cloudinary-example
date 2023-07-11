import dotenv from "dotenv";
import express from "express";
import multer from "multer";
dotenv.config();

import uploadToCloudinary from "./utils/cloudinary";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1,
    },
});

const app = express()
    .use(express.urlencoded({ extended: true }))
    .use(express.json());

app.get("/", (req, res, next) => {
    return res.json({ message: "Hello!" });
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const result = await uploadToCloudinary(req.file);

        return res.status(201).json({
            url: result.url,
        });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
