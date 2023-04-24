import { config } from 'dotenv';
import { executeDriverCrudOperations} from './driverCrud.js';
import { executeBusCrudOperations } from './busCrud.js'

config();
await executeDriverCrudOperations();
// await executeBusCrudOperations();