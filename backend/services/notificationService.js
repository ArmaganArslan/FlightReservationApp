const Notification = require('../models/Notification');

const notificationService = {
  getAllNotifications: async (limit = 10) => {
    return await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  createNotification: async (notificationData) => {
    const notification = new Notification({
      ...notificationData,
      createdAt: new Date()
    });
    return await notification.save();
  },

  markAsRead: async (id) => {
    return await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
  }
};

module.exports = notificationService; 