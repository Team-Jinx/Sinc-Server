import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';

import { Public } from '../../common';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  @Public()
  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1')]);
  }
}
