const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Rent = sequelize.define("Rent", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    boldLink:{
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'expired', 'cancelled', 'pendingPayPal', 'pendingBold'),
      defaultValue: 'pending'
    },
    priceAtRent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }, 
    services:{
      type:DataTypes.JSON(), // {transport: 10.00, wifi: 20.00} Object.values() => [10.00, 20.00] transacction : 30.00
      defaultValue:{
        transport:0.00
      }
    }
  }, {timestamps: false});
  Rent.associate = (models) => {
    Rent.belongsTo(models.User, { foreignKey: 'userId' });
    Rent.belongsTo(models.Apartment, { foreignKey: 'apartmentId' });
    Rent.hasMany(models.Transaction, { onDelete: 'CASCADE' })
    Rent.belongsToMany(models.Exchange,{through: 'rent-exchange'}) 
  }
  
  return Rent;
};
