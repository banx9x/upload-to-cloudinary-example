import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import session from "express-session";
import flash from "connect-flash";
import { engine } from "express-handlebars";

dotenv.config();

import uploadToCloudinary from "./utils/cloudinary";
import path from "path";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1,
    },
});

const app = express()
    .engine(
        "hbs",
        engine({
            extname: ".hbs",
            defaultLayout: "main",
            layoutsDir: path.join(__dirname, "views/layouts"),
            partialsDir: path.join(__dirname, "views/partials"),
        })
    )
    .set("view engine", "hbs")
    .set("public", express.static("/public"))
    .set("views", path.join(__dirname, "views"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
        session({
            secret: process.env.SESSION_SECRET_KEY!,
            cookie: { maxAge: 3600000 * 24 * 7 },
            resave: false,
            saveUninitialized: false,
        })
    )
    .use(flash());

app.get("/", (req, res, next) => {
    // return res.json({ message: "Hello!" });

    return res.render("home", {
        result: req.flash("result"),
        error: req.flash("error"),
    });
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
    if (!req.file) {
        // return res.status(400).json({ error: "No file uploaded" });
        
        req.flash("error", "No file uploaded");
        return res.redirect("/");
    }

    try {
        const result = await uploadToCloudinary(req.file);

        // return res.status(201).json({ result })

        req.flash("result", JSON.stringify(result, null, 2));
        return res.redirect("/");
    } catch (err) {
        // return res.status(500).json({ error: (err as Error).message });

        req.flash("error", (err as Error).message);
        return res.redirect("/");
    }
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
