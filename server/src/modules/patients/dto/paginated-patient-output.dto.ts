import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Patient as PatientEntity } from '../patient.entity';
import { PaginatedOutput } from '../../common/dto/paginated-output-dto';

@ApiSchema({ name: 'PaginatedPatientOutput' })
export class PaginatedPatientOutput extends PaginatedOutput {
  @ApiProperty({ type: () => [PatientEntity] })
  data: PatientEntity[];
}
