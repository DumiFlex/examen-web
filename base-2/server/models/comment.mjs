/**
 * Defines the 'comment' entity in the database.
 *
 * @param {object} sequelize - The Sequelize instance used to define the model.
 * @param {object} DataTypes - A collection of data types supported by Sequelize.
 * @returns {object} A Sequelize model representing the 'task' entity.
 *
 * @property {string} title - The title of the comment. This field is required.
 * @property {string} description - A detailed description of the comment. This field is required.
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('comment', {
    title: {
      type:
      DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
}
