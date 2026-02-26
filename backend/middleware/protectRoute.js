import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// console.log('Cookies:', req.cookies)
		// const token = req.cookies.jwt;
		// // console.log('Token from cookies:', token);

// Check if the Authorization header is present and starts with 'Bearer'
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer ')) {
	return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
  }

   // Extract the token from the Authorization header
   const token = authHeader.split(' ')[1];
   
   console.log("token from backend ",token) 

		// if (!token) {
		// 	return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		// }

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;

























// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		// const token = req.cookies.jwt;

// 		 // Get token from Authorization header
// 		 const authHeader = req.headers.authorization;
// 		//  console.log('Authorization Header:', authHeader);
		
// 		 const token = authHeader && authHeader.split(' ')[1]; // Get token part after "Bearer"
// 		//  console.log('Extracted Token:', token); 				

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// export default protectRoute;



// import jwt from 'jsonwebtoken'
// import User from '../models/user.model.js';
// const protectRoute = async(req, res, next) => {
//     try {
//         // const token =req.cookies.jwt;
//          const authHeader = req.headers.authorization;
//         const token = authHeader && JSON.parse(authHeader.split(' ')[1]).token;
//         // const token = authHeader && authHeader.split(' ')[1];


//         // console.log(token) 

//         if(!token)
//         {
//             return res.status(401).json({error:"unauthorized - no token provided"})
//         }

//         const decoded = jwt.verify(token,process.env.JWT_SECRET);

//         if(!decoded)
//         {
//             return res.status(401).json({error:"unauthorized - invalid token "}) 
//         }
           
//           const user = await User.findById(decoded.userId).select("-password");

         
//           if(!user)
//           {
//             return res.status(401).json({error:"User not found"})
//           }

//           req.user=user;

//           next();

//     } catch (error) {
//         console.log("error in protectRoute middleware:", error.message)
//         res.status(500).json({ error: "internal server error" });
//     }


// };

// export default protectRoute;