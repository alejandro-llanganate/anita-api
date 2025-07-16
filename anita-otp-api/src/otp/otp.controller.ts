import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

class ValidateOtpDto {
  code: string;
}

@ApiTags('otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Genera un código OTP de 6 dígitos' })
  @ApiResponse({ status: 201, description: 'OTP generado correctamente', schema: { example: { otp: '123456' } } })
  generateOtp() {
    const otp = this.otpService.generateOtp();
    return { otp };
  }

  @Post('validate')
  @ApiOperation({ summary: 'Valida un código OTP de 6 dígitos' })
  @ApiBody({ type: ValidateOtpDto, examples: { ejemplo: { value: { code: '123456' } } } })
  @ApiResponse({ status: 200, description: 'OTP válido', schema: { example: { valid: true } } })
  @ApiResponse({ status: 400, description: 'OTP inválido', schema: { example: { valid: false } } })
  validateOtp(@Body() body: ValidateOtpDto) {
    const valid = this.otpService.validateOtp(body.code);
    return { valid };
  }
}
