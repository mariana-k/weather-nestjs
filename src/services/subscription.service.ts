import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SubscriptionService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async subscribe(email: string, city: string, frequency: 'hourly' | 'daily'): Promise<void> {
    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { email, city },
    });

    if (existingSubscription) {
      throw new ConflictException('Email already subscribed');
    }

    const confirmationToken = uuidv4();
    const unsubscribeToken = uuidv4();

    const subscription = this.subscriptionRepository.create({
      email,
      city,
      frequency,
      confirmationToken,
      unsubscribeToken,
    });

    await this.subscriptionRepository.save(subscription);

    await this.sendConfirmationEmail(email, confirmationToken);
  }

  async confirmSubscription(token: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { confirmationToken: token },
    });

    if (!subscription) {
      throw new NotFoundException('Token not found');
    }

    subscription.confirmed = true;
    subscription.confirmationToken = null;
    await this.subscriptionRepository.save(subscription);
  }

  async unsubscribe(token: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { unsubscribeToken: token },
    });

    if (!subscription) {
      throw new NotFoundException('Token not found');
    }

    await this.subscriptionRepository.remove(subscription);
  }

  private async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmUrl = `${process.env.APP_URL}/api/confirm/${token}`;
    const unsubscribeUrl = `${process.env.APP_URL}/api/unsubscribe/${token}`;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Confirm your weather subscription',
      html: `
        <h1>Welcome to Weather Updates!</h1>
        <p>Please confirm your subscription by clicking the link below:</p>
        <a href="${confirmUrl}">Confirm Subscription</a>
        <p>To unsubscribe, click here: <a href="${unsubscribeUrl}">Unsubscribe</a></p>
      `,
    });
  }
} 