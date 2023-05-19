import { BadRequestException } from '@nestjs/common'

const dtoNonEmpty = (anydto: any) => {
  if (!Object.keys(anydto).length) {
    throw new BadRequestException('载荷为空', 'payload is empty')
  }
}

export default dtoNonEmpty
