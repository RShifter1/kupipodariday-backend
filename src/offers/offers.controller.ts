import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createOfferDto: CreateOfferDto) {
    const userId = req.user?.id;
    return this.offersService.create(userId, createOfferDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne({ id: +id });
  }

  @Get()
  findMany(@Request() req) {
    return this.offersService.findMany(req.query);
  }
}
