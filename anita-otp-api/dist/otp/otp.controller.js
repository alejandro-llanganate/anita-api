"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const swagger_1 = require("@nestjs/swagger");
class ValidateOtpDto {
    code;
}
let OtpController = class OtpController {
    otpService;
    constructor(otpService) {
        this.otpService = otpService;
    }
    generateOtp() {
        const otp = this.otpService.generateOtp();
        return { otp };
    }
    validateOtp(body) {
        const valid = this.otpService.validateOtp(body.code);
        return { valid };
    }
};
exports.OtpController = OtpController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Genera un código OTP de 6 dígitos' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'OTP generado correctamente', schema: { example: { otp: '123456' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "generateOtp", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Valida un código OTP de 6 dígitos' }),
    (0, swagger_1.ApiBody)({ type: ValidateOtpDto, examples: { ejemplo: { value: { code: '123456' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP válido', schema: { example: { valid: true } } }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'OTP inválido', schema: { example: { valid: false } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ValidateOtpDto]),
    __metadata("design:returntype", void 0)
], OtpController.prototype, "validateOtp", null);
exports.OtpController = OtpController = __decorate([
    (0, swagger_1.ApiTags)('otp'),
    (0, common_1.Controller)('otp'),
    __metadata("design:paramtypes", [otp_service_1.OtpService])
], OtpController);
//# sourceMappingURL=otp.controller.js.map