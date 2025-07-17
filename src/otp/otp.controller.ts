import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

class ValidateOtpDto {
  code: string;
}

class ResetPasswordDto {
  email: string;
  newPassword: string;
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

  /**
   * Reset de contraseña de usuario usando Supabase.
   *
   * Este endpoint permite cambiar la contraseña de un usuario registrado en Supabase.
   *
   * Ejemplo de request:
   * {
   *   "email": "usuario@email.com",
   *   "newPassword": "nueva123"
   * }
   *
   * Respuestas:
   * 200: { success: true }
   * 400: { success: false, error: "Usuario no encontrado" }
   * 400: { success: false, error: "Error actualizando usuario: ..." }
   */
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset de contraseña de usuario usando Supabase' })
  @ApiBody({ type: ResetPasswordDto, examples: { ejemplo: { value: { email: 'user@email.com', newPassword: 'nueva123' } } } })
  @ApiResponse({ status: 200, description: 'Contraseña reseteada correctamente', schema: { example: { success: true } } })
  @ApiResponse({ status: 400, description: 'Error al resetear contraseña', schema: { example: { success: false, error: 'Mensaje de error' } } })
  async resetPassword(@Body() body: ResetPasswordDto) {
    try {
      await this.otpService.resetPassword(body.email, body.newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
