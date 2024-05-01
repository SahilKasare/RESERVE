const Manager = require('../models/Manager.js');
const Transaction =require('../models/Transaction');
const Booking =require('../models/Booking');

exports.getManager=async(req,res)=>{
    try{
     const {id}=req.params;
     const user=await Manager.findById(id);
     res.status(200).json(user)
    }catch(error){
        res.status(404),json({message:error.message});
    }
}

exports.getUniqueLocations = async (req, res) => {
    try {
        const locations = await Manager.distinct('location');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateinfo = async (req, res) => {
    try {
        const manager = req.manager; 
              
              
              
                if (req.body.name !== undefined) {
                    manager.name = req.body.name;
                }
                if (req.body.email !== undefined) {
                    manager.email = req.body.email;
                }
                if (req.body.contact !== undefined) {
                    manager.contact = req.body.contact;
                }
                if (req.body.companyName !== undefined) {
                    manager.companyName = req.body.companyName;
                }
                if (req.body.address !== undefined) {
                    manager.address = req.body.address;
                }
                if (req.body.location !== undefined) {
                    manager.location = req.body.location;
                }
                if(req.body.price_wash !== undefined){
                    manager.services.cleaning.price_wash=req.body.price_wash;
                }
                if(req.body.parking_price !== undefined){
                    manager.services.parking.parking_price=req.body.parking_price;
                }
                if(req.body.parking_slots !== undefined){
                    manager.services.parking.parking_slots=req.body.parking_slots;
                }
                if(req.body.charging_price !== undefined){
                    manager.services.charging.charging_price=req.body.charging_price;
                }
                if(req.body.charging_slots !== undefined){
                    manager.services.charging.charging_slots=req.body.charging_slots;
                }
                if(req.body.inspection_price !== undefined){
                    manager.services.inspection.inspection_price=req.body.inspection_price;
                }
                if(req.body.painting_price !== undefined){
                    manager.services.painting.painting_price=req.body.painting_price;
                }
  manager.save();
  
       res.redirect('/managers/update')
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

exports.addmoney=async (req, res) => {
    try {
        const manager = req.manager;
        const amount = parseFloat(req.body.amount); 

      
        if (isNaN(amount)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        manager.wallet += amount;

        
        await manager.save();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getManagerBookings = (req, res) => {
    const managerId = req.user.id; // Assuming you have access to the manager's ID through authentication

    Booking.find({ managerId: managerId })
        .then(bookings => {
            res.render('bookings', { bookings: bookings });
        })
        .catch(err => {
            console.error('Error fetching bookings:', err);
            res.status(500).send('Internal Server Error');
        });
};


exports.calculateWeeklyProfit = async (managerId) => {
    try {
        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Query transactions for the given manager ID within the past 7 days
        const transactions = await Transaction.find({
            manager: managerId,
            registration_date: { $gte: sevenDaysAgo },
            incoming_manager: true
        });

        // Calculate the sum of profits from the transactions
        let weeklyProfit = 0;
        transactions.forEach(transaction => {
            weeklyProfit += transaction.amount;
        });

        return weeklyProfit;
    } catch (error) {
        console.error('Error calculating weekly profit:', error);
        throw error;
    }
}

exports.calculateDailyBookings = async (managerId) => {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

        // Query bookings for the given manager ID and today's date
        const bookings = await Booking.find({
            manager: managerId,
            registration_date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // End of the day
            }
        });

        // Initialize an object to store total bookings for each service
        const totalBookings = {
            'parking': 0,
            'ev charging': 0,
            'cleaning': 0,
            'inspection': 0,
            'painting': 0
        };

        // Calculate total bookings for each service
        bookings.forEach(booking => {
            totalBookings[booking.service]++;
        });

        return totalBookings;
    } catch (error) {
        console.error('Error calculating daily bookings:', error);
        throw error;
    }
}