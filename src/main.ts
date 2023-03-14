import { NestFactory } from '@nestjs/core'
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
}

start()