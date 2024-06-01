import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class TicketUpdateDto {
	@IsString()
	@MaxLength(200)
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	sub_title?: string

	@IsString()
	@IsOptional()
	descript?: string

	@IsNumber()
	@IsOptional()
	price?: number
}
