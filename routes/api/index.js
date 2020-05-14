const express = require('express');

const router = express.Router();

router.use(require('./user'));
router.use(require('./recipe'));
router.use(require('./list'));
router.use(require('./plan'));
router.use(require('./upload'));

module.exports = router;
