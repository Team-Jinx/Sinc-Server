import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common';
import { PrismaModule } from 'src/prisma';

import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';

@Module({
  imports: [PrismaModule],
  providers: [ArtistsResolver, ArtistsService, DateScalar],
})
export class ArtistsModule {}
