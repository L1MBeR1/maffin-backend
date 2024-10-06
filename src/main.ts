import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();
console.log('Front URL:', process.env.FRONT_URL);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(cookieParser());

	app.enableCors({
		origin: process.env.FRONT_URL,
		credentials: true,
		exposedHeaders: ['set-cookie'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
	});

	await app.listen(4200);
}

bootstrap();
