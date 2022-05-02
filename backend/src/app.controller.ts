import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pokemons')
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'Page number',
    required: false,
  })
  getPokemons(@Query('page') page?: number) {
    return this.appService.getPokemonLists(page);
  }

  @Get('/pokemon/:id')
  findOne(@Param() params: { id: number }) {
    return this.appService.getPokemonFromId(params.id);
  }
}
