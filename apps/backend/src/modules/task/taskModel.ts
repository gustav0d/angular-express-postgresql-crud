import { DataTypes } from 'sequelize';
import sequelize from '../../database.ts';
import { User } from '../auth/userModel.ts';

export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  isDone?: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
  },
);

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

export default Task;
