const User = require("../models/usersModel")
const bcrypt = require("bcrypt")
const streamifier = require('streamifier');
const
    cloudinary = require("../services/cloudinary");

const addUser = async (req, res) => {
    let Result; // Declare Result variable outside of the try block
    try {
        console.log(req.body);
        const {
            firstName,
            lastName,
            mobile,
            email,
            gender,
            location,
            role = "user",
            status = "active",
            profilePicture = "example.jpg"
        } = req.body;

        if (!firstName || !lastName || !mobile || !email || !gender || !location) {
            console.log("All fields are required");
            return res.status(400).json({
                msg: 'Please enter all fields'
            });
        }

        // Create new user

        const newUser = new User({
            firstName,
            lastName,
            mobile,
            email,
            role,
            status,
            gender,
            location,
            profilePicture
        });


        //  if role is admin then only we need to hash password
        if (req.body.role == "Admin") {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                newUser.password = hash;
            } catch (error) {
                console.error("Error hashing password:", error);
                return res.status(500).json({
                    error: "Error hashing password"
                });
            }
        }


        if (req.file) {
            try {
                console.log("Uploading image to Cloudinary");

                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({
                        folder: "userModuleUploads"
                    }, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });

                    // Convert buffer to stream
                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
                Result = result;
                newUser.profilePicture = result.secure_url;

            } catch (error) {
                console.log("Error uploading image to Cloudinary: " + error);
                await cloudinary.uploader.destroy(Result.public_id);
                return res.status(500).json({
                    error: 'Error uploading image to Cloudinary'
                });
            }
        }

        await newUser.save();
        console.log("newUser Added")
        res.status(201).json({
            msg:"Success adding User"
        });
    } catch (error) {
        if (error.code === 11000 && Result) {
            await cloudinary.uploader.destroy(Result.public_id);
            // Duplicate email error
            res.status(400).json({
                msg: 'Email already exists'
            });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({
                msg: 'Server error'
            });
        }
    }
};



const getUser = async (req, res) => {
    try {
        const {
            firstName,
            email,
            gender
        } = req.query;

        if (firstName) {
            // Find user by firstName
            const user = await User.find({
                firstName: {
                    $regex: new RegExp(`^${firstName}$`, 'i')
                }
            });
            if (!user) {
                return res.status(404).json({
                    msg: "User not found"
                });
            }
            return res.json(user);
        } else if (email) {
            const user = await User.find({
                email: {
                    $regex: new RegExp(`^${email}$`, 'i')
                }
            });
            if (!user) {
                return res.status(404).json({
                    msg: "User not found"
                });
            }
            return res.json(user);
        } else if (gender) {
            const user = await User.find({
                gender: {
                    $regex: new RegExp(`^${gender}$`, 'i')
                }
            });
            if (!user) {
                return res.status(404).json({
                    msg: "User not found"
                });
            }
            return res.json(user);
        }



        // If no firstName is provided, find all users
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.error('Error fetching user(s):', error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};



const getUsersSortedByCreationDate = async (req, res) => {
    try {

        const {
            page = 1, limit = 10, order = 'asc'
        } = req.query;

        // Set up pagination and sorting
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: {
                createdAt: order === 'desc' ? -1 : 1
            } // Sort by creation date in ascending or descending order
        };

        // Find users with pagination and sorting by creation date
        const users = await User.paginate({}, options);

        if (!users.docs || users.docs.length === 0) {
            return res.status(404).json({
                msg: "No users found"
            });
        }
        res.json(users);

    } catch (error) {
        console.error('Error fetching user(s):', error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

//Update Routes


const updateUser = async (req, res) => {
    console.log(req.query)
    const {
        userId,
        emailId
    } = req.query; // coming from frontend once user select a particular user from display
    if (!(userId || emailId)) {
        console.log("Please provide either the userId or the email in query")

        return res.status(400).json({
            message: 'Please provide either the userId or the email in query'
        });
    }
    const {
        firstName,
        lastName,
        mobile,
        email,
        role = "user",
        gender,
        location,
        profilePicture
    } = req.body;

    try {
        // Find the user by ID
        let user;


        if (userId) {
            user = await User.findById(userId);
        } else {
            user = await User.findOne({
                email: emailId
            });
        }

        // If user not found, return 404
        if (!user) {
            console.log('User not found')
            return res.status(404).json({

                message: 'User not found'
            });
        }

        // Update user details
        user.firstName = firstName;
        user.lastName = lastName;
        user.mobile = mobile;
        user.email = email;
        user.gender = gender;
        user.location = location;
        user.role = role;
        user.status = "active"


        // Update profile picture if provided
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }

        // Update the date of update
        user.updatedAt = new Date();

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}
const updateUserStatus = async (req, res) => {
    const {
        userId,
        emailId
    } = req.query; // coming from frontend once user select a particular user from display

    console.log(userId)
    console.log(emailId)
    if (!(emailId || userId)) {
        return res.status(400).json({
            message: 'Please provide either the userId or the email in query'
        });
    }

    const {
        status = "user"
    } = req.body;

    try {
        // Find the user by ID
        let user;
        if (userId) {
            user = await User.findById(userId);
        } else {
            user = await User.findOne({
                email: emailId
            });
        }

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Update user status
        user.status = status

        // Update the date of update
        user.updatedAt = new Date();

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}



//Deleting User
const deleteUser = async (req, res) => {
    const {
        userId,
        emailId
    } = req.query;
    if (!(userId || emailId)) {
        return res.status(400).json({
            message: 'Please provide either the userId or the email in query'
        });
    }
    try {
        let user;
        // Find the user by ID and delete
        if (userId) {
            user = await User.findByIdAndDelete(userId);
        } else {
            user = await User.findOneAndDelete({
                email: emailId
            });
        }
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = {
    updateUser,
    updateUserStatus,
    deleteUser,
    addUser,
    getUser,
    getUsersSortedByCreationDate
}