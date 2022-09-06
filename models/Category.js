import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

class Category extends Model {}

Category.init({
  img_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Category',
})

export default Category