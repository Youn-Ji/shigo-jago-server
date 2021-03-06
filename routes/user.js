const express = require('express')
const router = express.Router()
const { userController } = require("../controllers")

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/kakao", userController.kakao)
router.post("/google", userController.google)

module.exports = router