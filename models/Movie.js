import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

class Movie extends Model {}

Movie.init({
  img_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  score: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,
      min: 0,
      max: 5
    }
  },
}, {
  sequelize,
  modelName: 'Movie',
})

export default Movie