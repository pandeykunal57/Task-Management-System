import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const getAnalytics = async (req, res) => {
  try {
    // Count total tasks
    const totalTasks = await Task.countDocuments();

    // Count completed and pending tasks
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: { $ne: 'completed' } });

    // Tasks per day (last 7 days)
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const tasksPerDay = await Task.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top task creators (top 5 users by task count)
    const topUsers = await Task.aggregate([
      {
        $group: {
          _id: '$createdBy',
          taskCount: { $sum: 1 }
        }
      },
      { $sort: { taskCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo'
      },
      {
        $project: {
          email: '$userInfo.email',
          taskCount: 1
        }
      }
    ]);

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      tasksPerDay,
      topUsers
    });

  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};
