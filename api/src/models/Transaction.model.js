const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const date = new Date()
  const Transaction = sequelize.define("Transaction", {
   
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    paypalToken: {
      type: DataTypes.STRING
    },
    payerID:{
      type: DataTypes.STRING,
    },
    date: { 
      type: DataTypes.DATEONLY,
      defaultValue: date
    },
    amount: { 
      type: DataTypes.JSON()
    },
    status:{
      type: DataTypes.ENUM('success'),
      defaultValue:'success'
    },
    servicesAmount:{
      type: DataTypes.FLOAT,
      defaultValue : 0.00
    }
   
  }, { timestamps: false });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Rent)
    Transaction.belongsTo(models.Sale)
    Transaction.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Transaction;
}