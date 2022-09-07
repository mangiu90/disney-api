import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'


class Character extends Model {}

Character.init({
  img_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  },
  weight: {
    type: DataTypes.FLOAT,
    validate: {
      isFloat: true
    }
  },
  history: {
    type: DataTypes.TEXT
  },
}, {
  sequelize,
  modelName: 'Character',
})

export default Character