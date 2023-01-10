"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    console.log(process.env.PORT);
    await app.listen(process.env.PORT || 9876);
}
bootstrap();
//# sourceMappingURL=main.js.map