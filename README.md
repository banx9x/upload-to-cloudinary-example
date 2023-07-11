# Upload Image to Cloudinary with Node.js, Express, and Multer

This is an example application that demonstrates how to upload images to [Cloudinary](https://cloudinary.com/) using Node.js, Express, and Multer.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Cloudinary account (sign up at https://cloudinary.com/ if you don't have one)

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/banx9x/upload-to-cloudinary-example.git
cd upload-to-cloudinary-example
```

2. Install the dependencies:

```shell
npm install
```

3. Set up Cloudinary credentials:

   - Create a `.env` file in the root of the project.
   - Add the following lines to the `.env` file:

     ```
     CLOUDINARY_URL=YOUR_CLOUDINARY_URL
     ```

   - Replace `YOUR_CLOUDINARY_URL` with your actual Cloudinary credentials. You can find these credentials in your Cloudinary account dashboard.

4. Start the application:

```shell
npm run dev
```

5. Open your web browser and navigate to `http://localhost:8080`.

6. Use Postman to upload an image file. The uploaded image will be stored in your Cloudinary account.

## Additional Information

- The application uses the [Multer](https://www.npmjs.com/package/multer) middleware for handling file uploads.
- Uploaded images are stored in memory using Multer's `memoryStorage` and then uploaded to Cloudinary using the [cloudinary](https://www.npmjs.com/package/cloudinary) package.
- The uploaded image URL is returned after successful upload.

## License

This project is licensed under the [MIT License](LICENSE).