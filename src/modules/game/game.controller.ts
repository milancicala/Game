// dependencies
import { Controller, Get } from '@nestjs/common';
// services
import { GameService } from './game.service';
// interfaces
import { IGame } from './interfaces/game.interface';

@Controller('games')
export class GameController {

  constructor(
    private readonly gameService: GameService,
  ) {}

  @Get('/')
  /**
   * List of all games with ever cheaper price
   *
   *
   * @returns Array || Error
   * @author MC
   */
  async getGameInfo() {
    const listOfGames = [];

    try {
      const Games = await this.gameService.getGames();

      for (const GameInfo of Games) {
          const GameDetail = await this.gameService.getGameDetail(GameInfo.gameID);

          const data: IGame = {
              name:          GameInfo.title,
              salePrice:     parseFloat(GameInfo.salePrice),
              cheapestPrice: parseFloat(GameDetail.cheapestPriceEver.price),
              releaseDate:   new Date(GameInfo.releaseDate),
          };

          listOfGames.push(data);
      }

      return listOfGames;
    } catch (e) {
      throw Error(e);
    }
  }
}
