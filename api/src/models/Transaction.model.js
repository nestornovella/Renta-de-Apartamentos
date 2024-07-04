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
    date: { //fecha en la que se genera la transaccion!
      type: DataTypes.DATEONLY,
      defaultValue: date
    },
    amount: { //monto de la transaccion
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