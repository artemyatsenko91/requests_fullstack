import { Body, Controller, Post } from '@nestjs/common';

@Controller('/')
export class AppController {

  @Post('/api')
  async handleRequest(@Body() body: { index: number }): Promise<{
    index: number;
  }> {
    const delay = Math.floor(Math.random() * 1000) + 1;
    await new Promise((res) => setTimeout(res, delay));

    return { index: body.index };
  }
}
