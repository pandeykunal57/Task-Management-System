import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who performed the action
      required: true,
    },
    action: {
      type: String,
      required: true, // E.g., 'CREATE_TASK', 'UPDATE_TASK'
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
