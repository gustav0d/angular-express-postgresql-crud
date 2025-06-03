import { DataTypes } from 'sequelize';
import sequelize from '../../database.ts';

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ['password'], // exclude password by default
      },
    },
    scopes: {
      withPassword: {
        // include password when explicitly requested
        attributes: { include: ['password'] },
      },
    },
  },
);
