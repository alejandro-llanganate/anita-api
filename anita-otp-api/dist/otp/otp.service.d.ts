export declare class OtpService {
    private readonly validOtps;
    constructor();
    generateOtp(): string;
    validateOtp(code: string): boolean;
}
