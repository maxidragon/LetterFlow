import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { LetterModule } from './letter/letter.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
        defaults: {
          from: `LetterFlow <${process.env.SMTP_USER}>`,
        },
      }),
    }),
    LetterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
