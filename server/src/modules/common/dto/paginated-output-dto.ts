import { Meta } from './meta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedOutput {
  @ApiProperty()
  meta: Meta;
}
