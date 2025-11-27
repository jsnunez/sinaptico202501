import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crci_2024', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function verUsers() {
  try {
    const [users] = await sequelize.query('DESCRIBE users');
    console.log('Columnas de users:');
    users.forEach(c => console.log(`  - ${c.Field}: ${c.Type}`));
    
    const [sample] = await sequelize.query('SELECT * FROM users LIMIT 1');
    if (sample.length > 0) {
      console.log('\nEjemplo de usuario:');
      console.log(sample[0]);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  await sequelize.close();
}

verUsers();