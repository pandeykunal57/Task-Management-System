import Task from '../models/task.model.js';

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    // Create a new task with the current user as creator
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user._id, // populated from authenticateUser middleware
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create task' });
  }
};

/**
 * @desc    Get all tasks for the logged-in user
 * @route   GET /api/tasks
 * @access  Private
 */
export const getAllTasks = async (req, res) => {
  try {
    // Fetch tasks either created by or assigned to the current user
    const tasks = await Task.find({
      $or: [{ createdBy: req.user._id }, { assignedTo: req.user._id }],
    }).sort({ dueDate: 1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
};

/**
 * @desc    Get a specific task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check task existence and access rights
    if (!task || (task.createdBy.toString() !== req.user._id.toString() &&
                  task.assignedTo?.toString() !== req.user._id.toString())) {
      return res.status(404).json({ success: false, message: 'Task not found or access denied' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('Get Task Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch task' });
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Only the creator can update
    if (!task || task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
    }

    // Update fields
    const updatedFields = req.body;
    Object.assign(task, updatedFields);

    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update task' });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Only the creator can delete
    if (!task || task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
};
