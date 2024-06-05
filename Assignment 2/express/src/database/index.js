const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models with timestamps.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.reply = require("./models/reply.js")(db.sequelize, DataTypes);


//cart associations
db.cart.belongsTo(db.product, { foreignKey: "name", allowNull: false, onDelete: 'CASCADE' });

//review associations
db.review.belongsTo(db.user, { foreignKey: "email", allowNull: false, onDelete: 'CASCADE' });
db.review.belongsTo(db.product, { foreignKey: "product_name", allowNull: false, onDelete: 'CASCADE' });

//reply accociations
db.reply.belongsTo(db.review, {foreignKey: "description", allowNull: false, onDelete: 'CASCADE'});
db.reply.belongsTo(db.user, { foreignKey: "email", allowNull: false, onDelete: 'CASCADE' });


// Sync database schema and seed data.
db.sync = async () => {
  // Sync schema with Sequelize's built-in sync function.
  await db.sequelize.sync();

  // Seed data if necessary.
  await seedData();
  await productseedData();
  await reviewseedData();
};

// Seed data function.
async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  // Hash passwords.
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  // Create user with seed data.
  await db.user.create({ email: "mbolger@gmail.com", password_hash: hash, name: "Matthew" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "shekhar@gmail.com", password_hash: hash, name: "Shekhar" });
}

async function productseedData() {
  const product_count = await db.product.count();
  if (product_count === 0) {
    await db.product.bulkCreate([
      {
        name: 'Organic Apples',
        description: 'Fresh and delicious organic apples.',
        price: 9.99,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Spinach',
        description: 'Nutrient-rich organic spinach leaves.',
        price: 12.99,
        inSpecial: "No"
      },
      {
        name: "Kiwi",
        description: "Organic kiwi with zero use of pesticides",
        price: 13.95,
        inSpecial: "Yes"
      },
      {
        name: 'Natural Honey',
        description: 'Pure and healthy natural honey.',
        price: 7.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Bananas',
        description: 'Sweet and ripe organic bananas.',
        price: 8.99,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Carrots',
        description: 'Crunchy and fresh organic carrots.',
        price: 6.49,
        inSpecial: "Yes"
      },
      {
        name: 'Almond Milk',
        description: 'Smooth and nutritious almond milk.',
        price: 3.99,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Bell Peppers',
        description: 'Colorful and crisp organic bell peppers.',
        price: 6.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Tomatoes',
        description: 'Juicy and flavorful organic tomatoes.',
        price: 4.29,
        inSpecial: "No"
      },
      {
        name: 'Organic Cucumbers',
        description: 'Fresh and crunchy organic cucumbers.',
        price: 2.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Kale',
        description: 'Nutritious organic kale leaves.',
        price: 3.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Grapes',
        description: 'Sweet and seedless organic grapes.',
        price: 7.99,
        inSpecial: "No"
      }
    ]);
  }
}

async function reviewseedData() {
  const reviews_count = await db.review.count();
  if (reviews_count === 0){
    await db.review.create({
    description: "This is a sample review for Organic Apples.",
    rating: 5 ,
    email: 'shekhar@gmail.com',
    product_name: 'Organic Apples'
  });
}
}

module.exports = db;
