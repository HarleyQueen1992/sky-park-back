import { IsNumber } from 'class-validator'

export class TicketDto {
	@IsNumber()
	id: number

	@IsNumber()
	count: number
}
