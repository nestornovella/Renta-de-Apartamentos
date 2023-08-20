const { Router } = require('express');
const { getAllUsers, postUser, putUser, getUserById, deleteUser } = require('../controllers/userController');
//const {validateUserInput} = require('../middleware/userMiddleware');

const router = Router();

router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.post('/', postUser);
router.put('/:id', putUser); 
router.delete('/:id', deleteUser); 
//router.put('/:id/admin', assignAdminRole);

module.exports = router;
