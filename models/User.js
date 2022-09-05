import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

export default User