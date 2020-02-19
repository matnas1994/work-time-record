const express = require('express');
const {check} = require('express-validator');

const employeesControllers = require('../controllers/employees');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.use(checkAuth);
router.get('', employeesControllers.getEmployees);
router.get('/:eid', employeesControllers.getEmployee);
router.post('', [
    check('name').not().isEmpty(),
    check('surname').not().isEmpty(),
    check('position').not().isEmpty()
],employeesControllers.createEmployee);
router.patch('/:eid',[
    check('name').not().isEmpty(),
    check('surname').not().isEmpty(),
    check('position').not().isEmpty()
],employeesControllers.updateEmployee);
router.delete('/:eid', employeesControllers.deleteEmployee);

module.exports = router;
