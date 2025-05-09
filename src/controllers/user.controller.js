import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudnary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => { 
    const { fullname, email, username, password } = req.body;
    console.log("email", email);

    if ([fullname, email, username, password].some((value) => value?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser =  User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(400, "User with this email or username already exists");
    }

    const avatarLocalPath= req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath || !coverImageLocalPath){
        throw new ApiError(400, "Avatar and cover image are required");
    }
   
    const avatar = await  uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   
   if(!avatar || !coverImage){
         throw new ApiError(500, "Failed to upload image");
    } 

   const user = await  User.create({
        fullname,
        email,
        username :username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url||"",
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
   
    if(!createdUser){
        throw new ApiError(500, "Failed to register user");
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
    );
});

export { registerUser };
