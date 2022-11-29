import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from "../../middleware/auth";
import config from "../../config/index";
const { JWT_SECRET } = config;

// Model
import User from "../../models/user";

const router = express.Router();

// @routes  POST api/auth
// @desc    Auth user
// @access  public

router.post('/', (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if(!email || !password) {
    return res.status(400).json({msg: "모든 필드를 채워주세요"})
  }

  User.findOne({email}).then((user) => {
    if (!user) return res.status(400).json({msg: "유저가 존재하지 않습니다"})

    bcrypt.compare(password, user.password).then((isMatch) => {
      if(!isMatch) return res.status(400).json({msg: "비밀번호가 일치하지 않습니다."});
      jwt.sign({id:user.id}, JWT_SECRET, {expiresIn: "2 days"}, (err, token) => {
        if(err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      });
    });
  });
});

// 로그아웃은 브라우저에서 할 것이기 때문에 딱히 처리할 것이 없다
router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

export default router;