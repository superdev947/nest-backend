import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configEnvs } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpliration: false,
      secretOrKey: configEnvs.jwt,
    });
  }

  async validate(payload: any) {
    return {
      userID: payload.sub,
      username: payload.username,
    };
  }
}
