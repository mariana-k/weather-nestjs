import { Controller, Post, Get, Body, Param, ConflictException } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';

@Controller('api/subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
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
  async confirmSubscription(@Param('token') token: string) {
    await this.subscriptionService.confirmSubscription(token);
    return { message: 'Subscription confirmed successfully' };
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    await this.subscriptionService.unsubscribe(token);
    return { message: 'Unsubscribed successfully' };
  }
} 