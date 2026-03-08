// lib/qweather.ts
import { SignJWT, importPKCS8 } from 'jose';

export async function generateQWeatherJWT() {
  const privateKeyCustom = process.env.QWEATHER_PRIVATE_KEY!;
  const kid = process.env.QWEATHER_KID!;

  // 将字符串私钥转换为算法可用的对象
  const ecPrivateKey = await importPKCS8(privateKeyCustom, 'EdDSA');

  const customHeader = {
    alg: 'EdDSA',
    kid: kid,
  };

  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 900;
  const customPayload = {
    sub: '2F87M7K5WF',
    iat: iat,
    exp: exp,
  };

  const jwt = await new SignJWT(customPayload).setProtectedHeader(customHeader).sign(ecPrivateKey);
  return jwt;
}
