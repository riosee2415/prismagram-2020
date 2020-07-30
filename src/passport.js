import { prisma } from "../generated/prisma-client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

// Jwt Strategy를 생성하기 위한 옵션을 저장한다.
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// JwtStrategy의 콜백함수
// Token에서 User를 찾은 경우 payload에 정보를 담아 호출한다.
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });

    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);

// JwtOption를 사용하여 새로운 JwtStrategy를 생성하고 콜백함수를 호출한다.
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
