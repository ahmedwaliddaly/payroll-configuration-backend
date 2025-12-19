import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConfigStatus, PolicyType } from './enums/payroll-configuration-enums';
import { PayrollConfigurationService } from './payroll-configuration.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  CreatePayTypeDto,
  UpdatePayTypeDto,
} from './dto/pay-type';
import {
  CreatePayrollPolicyDto,
  UpdatePayrollPolicyDto,
} from './dto/payroll-policy';
import {
  CreatePayGradeDto,
  UpdatePayGradeDto,
} from './dto/pay-grade';
import {
  ApproveConfigDto,
  RejectConfigDto,
} from './dto/approval.dto';

interface CreateAllowanceDto {
  name: string;
  amount: number;
  createdBy?: string;
}

interface UpdateAllowanceDto extends Partial<CreateAllowanceDto> { }

interface ApprovalDto {
  status: ConfigStatus.APPROVED | ConfigStatus.REJECTED;
  approverId?: string;
}

interface CompanySettingsDto {
  payDate: Date;
  timeZone: string;
  currency?: string;
}

interface CreateInsuranceDto {
  name: string;
  amount: number;
  minSalary: number;
  maxSalary: number;
  employeeRate: number;
  employerRate: number;
  createdBy?: string;
}

interface UpdateInsuranceDto extends Partial<CreateInsuranceDto> { }

@Controller('payroll-configuration')
export class PayrollConfigurationController {
  constructor(
    private readonly payrollConfigurationService: PayrollConfigurationService,
  ) { }

  @Get('health')
  healthCheck() {
    return { status: 'ok', message: 'Payroll Configuration API is running' };
  }

  /* -------------------------------------------------------------------------- */
  /*                               Signing Bonus API                            */
  /* -------------------------------------------------------------------------- */

  @Post('signing-bonus')
  createSigningBonus(@Body() dto: any) {
    return this.payrollConfigurationService.createSigningBonus(dto);
  }

  @Patch('signing-bonus/:id')
  updateSigningBonus(@Param('id') id: string, @Body() dto: any) {
    return this.payrollConfigurationService.updateSigningBonus(id, dto);
  }

  @Get('signing-bonus')
  getAllSigningBonus() {
    return this.payrollConfigurationService.getAllSigningBonus();
  }

  @Get('signing-bonus/:id')
  getOneSigningBonus(@Param('id') id: string) {
    return this.payrollConfigurationService.getOneSigningBonus(id);
  }

  @Delete('signing-bonus/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSigningBonus(@Param('id') id: string): Promise<void> {
    return this.payrollConfigurationService.deleteSigningBonus(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Tax Rules API                                */
  /* -------------------------------------------------------------------------- */

  @Post('tax-rule')
  createTaxRule(@Body() dto: any) {
    return this.payrollConfigurationService.createTaxRule(dto);
  }

  @Patch('tax-rule/:id')
  updateTaxRule(@Param('id') id: string, @Body() dto: any) {
    return this.payrollConfigurationService.updateTaxRule(id, dto);
  }

  @Get('tax-rule')
  getAllTaxRules() {
    return this.payrollConfigurationService.getAllTaxRules();
  }

  @Get('tax-rule/:id')
  getOneTaxRule(@Param('id') id: string) {
    return this.payrollConfigurationService.getOneTaxRule(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                          Termination Benefits API                          */
  /* -------------------------------------------------------------------------- */

  @Post('termination-benefit')
  createTerminationBenefit(@Body() dto: any) {
    return this.payrollConfigurationService.createTerminationBenefit(dto);
  }

  @Patch('termination-benefit/:id')
  updateTerminationBenefit(@Param('id') id: string, @Body() dto: any) {
    return this.payrollConfigurationService.updateTerminationBenefit(id, dto);
  }

  @Get('termination-benefit')
  getAllTerminationBenefits() {
    return this.payrollConfigurationService.getAllTerminationBenefits();
  }

  @Get('termination-benefit/:id')
  getOneTerminationBenefit(@Param('id') id: string) {
    return this.payrollConfigurationService.getOneTerminationBenefit(id);
  }

  @Delete('termination-benefit/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTerminationBenefit(@Param('id') id: string): Promise<void> {
    return this.payrollConfigurationService.deleteTerminationBenefit(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Pay Types API                                */
  /* -------------------------------------------------------------------------- */

  @Post('pay-types')
  async createPayType(@Body() createDto: CreatePayTypeDto) {
    return this.payrollConfigurationService.createPayType(createDto);
  }

  @Get('pay-types')
  async getAllPayTypes(@Query('status') status?: string) {
    return this.payrollConfigurationService.getAllPayTypes(status as ConfigStatus);
  }

  @Get('pay-types/:id')
  async getPayTypeById(@Param('id') id: string) {
    return this.payrollConfigurationService.getPayTypeById(id);
  }

  @Patch('pay-types/:id')
  async updatePayType(
    @Param('id') id: string,
    @Body() updateDto: UpdatePayTypeDto,
  ) {
    return this.payrollConfigurationService.updatePayType(id, updateDto);
  }

  @Delete('pay-types/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayType(@Param('id') id: string): Promise<void> {
    await this.payrollConfigurationService.deletePayType(id);
  }

  @Post('pay-types/:id/approve')
  @HttpCode(HttpStatus.OK)
  async approvePayType(
    @Param('id') id: string,
    @Body() approveDto: ApproveConfigDto,
  ) {
    return this.payrollConfigurationService.approvePayType(
      id,
      approveDto.approvedBy,
    );
  }

  @Post('pay-types/:id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectPayType(
    @Param('id') id: string,
    @Body() rejectDto: RejectConfigDto,
  ) {
    return this.payrollConfigurationService.rejectPayType(
      id,
      rejectDto.rejectedBy,
      rejectDto.reason,
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Payroll Policies API                            */
  /* -------------------------------------------------------------------------- */

  @Post('payroll-policies')
  async createPayrollPolicy(@Body() createDto: CreatePayrollPolicyDto) {
    return this.payrollConfigurationService.createPayrollPolicy(createDto);
  }

  @Get('payroll-policies')
  async getAllPayrollPolicies(
    @Query('policyType') policyType?: PolicyType,
    @Query('status') status?: ConfigStatus,
  ) {
    return this.payrollConfigurationService.getAllPayrollPolicies(
      policyType,
      status,
    );
  }

  @Get('payroll-policies/:id')
  async getPayrollPolicyById(@Param('id') id: string) {
    return this.payrollConfigurationService.getPayrollPolicyById(id);
  }

  @Patch('payroll-policies/:id')
  async updatePayrollPolicy(
    @Param('id') id: string,
    @Body() updateDto: UpdatePayrollPolicyDto,
  ) {
    return this.payrollConfigurationService.updatePayrollPolicy(id, updateDto);
  }

  @Delete('payroll-policies/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayrollPolicy(@Param('id') id: string): Promise<void> {
    await this.payrollConfigurationService.deletePayrollPolicy(id);
  }

  @Post('payroll-policies/:id/approve')
  @HttpCode(HttpStatus.OK)
  async approvePayrollPolicy(
    @Param('id') id: string,
    @Body() approveDto: ApproveConfigDto,
  ) {
    return this.payrollConfigurationService.approvePayrollPolicy(
      id,
      approveDto.approvedBy,
    );
  }

  @Post('payroll-policies/:id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectPayrollPolicy(
    @Param('id') id: string,
    @Body() rejectDto: RejectConfigDto,
  ) {
    return this.payrollConfigurationService.rejectPayrollPolicy(
      id,
      rejectDto.rejectedBy,
      rejectDto.reason,
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               Pay Grades API                               */
  /* -------------------------------------------------------------------------- */

  @Post('pay-grades')
  async createPayGrade(@Body() createDto: CreatePayGradeDto) {
    return this.payrollConfigurationService.createPayGrade(createDto);
  }

  @Get('pay-grades')
  async getAllPayGrades(@Query('status') status?: ConfigStatus) {
    return this.payrollConfigurationService.getAllPayGrades(status);
  }

  @Get('pay-grades/:id')
  async getPayGradeById(@Param('id') id: string) {
    return this.payrollConfigurationService.getPayGradeById(id);
  }

  @Patch('pay-grades/:id')
  async updatePayGrade(
    @Param('id') id: string,
    @Body() updateDto: UpdatePayGradeDto,
  ) {
    return this.payrollConfigurationService.updatePayGrade(id, updateDto);
  }

  @Delete('pay-grades/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayGrade(@Param('id') id: string): Promise<void> {
    await this.payrollConfigurationService.deletePayGrade(id);
  }

  @Post('pay-grades/:id/approve')
  @HttpCode(HttpStatus.OK)
  async approvePayGrade(
    @Param('id') id: string,
    @Body() approveDto: ApproveConfigDto,
  ) {
    return this.payrollConfigurationService.approvePayGrade(
      id,
      approveDto.approvedBy,
    );
  }

  @Post('pay-grades/:id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectPayGrade(
    @Param('id') id: string,
    @Body() rejectDto: RejectConfigDto,
  ) {
    return this.payrollConfigurationService.rejectPayGrade(
      id,
      rejectDto.rejectedBy,
      rejectDto.reason,
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               Allowances API                               */
  /* -------------------------------------------------------------------------- */

  @Post('allowances')
  createAllowance(@Body() body: CreateAllowanceDto) {
    return this.payrollConfigurationService.createAllowance(body);
  }

  @Get('allowances')
  listAllowances(@Query('status') status?: ConfigStatus) {
    return this.payrollConfigurationService.listAllowances(status);
  }

  @Get('allowances/:id')
  getAllowance(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.payrollConfigurationService.getAllowance(id.toString());
  }

  @Patch('allowances/:id')
  updateAllowance(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateAllowanceDto,
  ) {
    return this.payrollConfigurationService.updateAllowance(
      id.toString(),
      body,
    );
  }

  @Patch('allowances/:id/status')
  approveAllowance(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: ApprovalDto,
  ) {
    return this.payrollConfigurationService.setAllowanceStatus(
      id.toString(),
      body,
    );
  }

  @Delete('allowances/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAllowance(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<void> {
    return this.payrollConfigurationService.deleteAllowance(id.toString());
  }

  /* -------------------------------------------------------------------------- */
  /*                          Company-wide settings API                         */
  /* -------------------------------------------------------------------------- */

  @Post('company-settings')
  upsertCompanySettings(@Body() body: CompanySettingsDto) {
    return this.payrollConfigurationService.upsertCompanyWideSettings(body);
  }

  @Get('company-settings')
  getCompanySettings() {
    return this.payrollConfigurationService.getCompanyWideSettings();
  }

  @Patch('company-settings/:id')
  updateCompanySettings(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: CompanySettingsDto,
  ) {
    return this.payrollConfigurationService.updateCompanyWideSettings(
      id.toString(),
      body,
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Insurance brackets API                           */
  /* -------------------------------------------------------------------------- */

  @Post('insurance-brackets')
  createInsurance(@Body() body: CreateInsuranceDto) {
    return this.payrollConfigurationService.createInsuranceBracket(body);
  }

  @Get('insurance-brackets')
  listInsurance(@Query('status') status?: ConfigStatus) {
    return this.payrollConfigurationService.listInsuranceBrackets(status);
  }

  @Get('insurance-brackets/:id')
  getInsurance(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.payrollConfigurationService.getInsuranceBracket(id.toString());
  }

  @Patch('insurance-brackets/:id')
  updateInsurance(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateInsuranceDto,
  ) {
    return this.payrollConfigurationService.updateInsuranceBracket(
      id.toString(),
      body,
    );
  }

  @Patch('insurance-brackets/:id/status')
  approveInsurance(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: ApprovalDto,
  ) {
    return this.payrollConfigurationService.setInsuranceBracketStatus(
      id.toString(),
      body,
    );
  }

  @Delete('insurance-brackets/:id')
  deleteInsurance(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.payrollConfigurationService.deleteInsuranceBracket(
      id.toString(),
    );
  }
}
