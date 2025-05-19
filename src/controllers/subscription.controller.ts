import { Controller, Post, Get, Body, Param, ConflictException } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('subscription')
@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Subscribe to weather updates' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        city: { type: 'string' },
        frequency: { type: 'string', enum: ['hourly', 'daily'] }
      },
      required: ['email', 'city', 'frequency']
    }
  })
  @ApiResponse({ status: 200, description: 'Subscription successful' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Email already subscribed' })
  async subscribe(
    @Body('email') email: string,
    @Body('city') city: string,
    @Body('frequency') frequency: 'hourly' | 'daily',
  ) {
    try {
      await this.subscriptionService.subscribe(email, city, frequency);
      return { message: 'Subscription successful. Confirmation email sent.' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Invalid input');
    }
  }

  @Get('confirm/:token')
  @ApiOperation({ summary: 'Confirm email subscription' })
  @ApiResponse({ status: 200, description: 'Subscription confirmed' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Token not found' })
  async confirmSubscription(@Param('token') token: string) {
    await this.subscriptionService.confirmSubscription(token);
    return { message: 'Subscription confirmed successfully' };
  }

  @Get('unsubscribe/:token')
  @ApiOperation({ summary: 'Unsubscribe from weather updates' })
  @ApiResponse({ status: 200, description: 'Unsubscribed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Token not found' })
  async unsubscribe(@Param('token') token: string) {
    await this.subscriptionService.unsubscribe(token);
    return { message: 'Unsubscribed successfully' };
  }
} 