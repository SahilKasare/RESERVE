const User = require('../models/User.js');
const Manager = require('../models/Manager.js');
const Transaction =require('../models/Transaction.js')

// export const getAdmin=async(req,res)=>{
//     try{
//      const {id}=req.params;
//      const user=await Admin.findById(id);
//      res.status(200).json(user)
//     }catch(error){
//         res.status(404),json({message:error.message});
//     }
// }

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

// exports.getTodaysUsers = async (req, res) => {
//     // try {
//     //     const users = await User.find({ createdAt: { $gte: new Date() } });
//     //     res.status(200).json(users);
//     // } catch (error) {
//     //     res.status(404).json({ message: error.message });
//     // }
//     try {
//         // Get the start and end of today
//         const currentDate = new Date();
//         const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
//         // const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

//         // Query users joined today
//         const users = await User.find();

//         let usersJoinedToday = 0;

//         // Loop through users and count those who joined today
//         users.forEach(user => {
//             if (isSameDay(user.registrationDate, startOfDay)) {
//                 usersJoinedToday++;
//             }
//         });

//         return usersJoinedToday;
//     } catch (error) {
//         console.error('Error fetching total users joined today:', error);
//         res.status(500).send('Internal server error');
//     }
// }

exports.getTodaysUsers = async () => {
    try {
        // Get the start of today
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        // Query users joined today
        const users = await User.find({ registrationDate: { $gte: startOfDay } });

        return users.length; // Return the count of users joined today
    } catch (error) {
        console.error('Error fetching total users joined today:', error);
        throw error; // Rethrow the error to be caught in the route handler
    }
};
exports.getTodaysManagers = async () => {
    try {
        // Get the start of today
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        // Query users joined today
        const managers = await Manager.find({ registrationDate: { $gte: startOfDay } });

        return managers.length; // Return the count of users joined today
    } catch (error) {
        console.error('Error fetching total users joined today:', error);
        throw error; // Rethrow the error to be caught in the route handler
    }
};


exports.getTodaysProfit = async () => {
    try {
        // Get the start of today
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        // Query transactions for today with incoming_admin true
        const transactions = await Transaction.find({
            registration_date: { $gte: startOfDay },
            incoming_admin: true
        });

        // Calculate total revenue from these transactions
        let totalRevenue = 0;
        transactions.forEach(transaction => {
            totalRevenue += transaction.amount;
        });

        return totalRevenue;
    } catch (error) {
        console.error('Error calculating admin revenue for today:', error);
        throw error; // Rethrow the error to be caught where this function is called
    }
};