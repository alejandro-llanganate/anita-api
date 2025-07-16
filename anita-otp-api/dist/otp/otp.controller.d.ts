import { OtpService } from './otp.service';
declare class ValidateOtpDto {
    code: string;
}
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    generateOtp(): {
        otp: string;
    };
    validateOtp(body: ValidateOtpDto): {
        valid: boolean;
    };
}
export {};
