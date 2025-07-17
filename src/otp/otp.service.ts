import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as process from 'process';

@Injectable()
export class OtpService implements OnModuleInit {
  private readonly validOtps: Set<string>;
  private supabase: SupabaseClient;

  constructor() {
    // Lista quemada de 100 códigos únicos de 6 dígitos
    this.validOtps = new Set([
      '123456', '234567', '345678', '456789', '567890',
      '678901', '789012', '890123', '901234', '112233',
      '223344', '334455', '445566', '556677', '667788',
      '778899', '889900', '990011', '101112', '121314',
      '131415', '141516', '151617', '161718', '171819',
      '181920', '192021', '202122', '212223', '222324',
      '232425', '242526', '252627', '262728', '272829',
      '282930', '293031', '303132', '313233', '323334',
      '333435', '343536', '353637', '363738', '373839',
      '383940', '394041', '404142', '414243', '424344',
      '434445', '444546', '454647', '464748', '474849',
      '484950', '495051', '505152', '515253', '525354',
      '535455', '545556', '555657', '565758', '575859',
      '585960', '596061', '606162', '616263', '626364',
      '636465', '646566', '656667', '666768', '676869',
      '686970', '697071', '707172', '717273', '727374',
      '737475', '747576', '757677', '767778', '777879',
      '787980', '798081', '808182', '818283', '828384',
      '838485', '848586', '858687', '868788', '878889',
      '888990', '899091', '909192', '919293', '929394',
      '939495', '949596', '959697', '969798', '979899'
    ]);
    // Supabase se inicializa en onModuleInit
  }

  async onModuleInit() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error('Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
      throw new Error('Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    }
    this.supabase = createClient(url, key);
  }

  generateOtp(): string {
    // Devuelve un OTP disponible (no lo elimina)
    const [otp] = this.validOtps;
    if (!otp) throw new Error('No hay OTPs disponibles');
    return otp;
  }

  validateOtp(code: string): boolean {
    // Si el código existe, lo elimina y retorna true (solo puede usarse una vez)
    if (this.validOtps.has(code)) {
      this.validOtps.delete(code);
      return true;
    }
    return false;
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    // Buscar el usuario por email
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    if (userError || !user) {
      throw new Error('Usuario no encontrado');
    }
    // Actualizar solo la contraseña
    const { error: updateError } = await this.supabase.auth.admin.updateUserById(user.id, {
      password: newPassword
    });
    if (updateError) {
      throw new Error('Error actualizando usuario: ' + updateError.message);
    }
  }
}
