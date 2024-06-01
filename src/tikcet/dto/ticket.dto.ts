import { IsNumber, IsString, MaxLength } from 'class-validator'

export class TicketDto {
	@IsString()
	@MaxLength(200)
	title: string

	@IsString()
	sub_title: string

	@IsString()
	descript: string

	@IsNumber()
	price: number
}
