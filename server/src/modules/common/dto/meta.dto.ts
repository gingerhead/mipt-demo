import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty({ type: Number, nullable: true })
  prev: number | null;

  @ApiProperty({ type: Number, nullable: true })
  next: number | null;
}
