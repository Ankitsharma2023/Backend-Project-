const asyncHandler = (requestHandler) =>{
    (req, res, next) =>
    {
        Promise.resolve(requestHandler()).catch((err)=> 
            next(err));

    }
};

export { asyncHandler};







// TRY CATCH METHOD 

// const asyncHandler = (fn) =>( req, res, next) => {
//     try
//     {
//       await fn(req, res, next);
//     }
//     catch(error)
//     {
//         res.status(error.code || 500) .json({
//             success : false,
//             message : error.message});
//     }
// };