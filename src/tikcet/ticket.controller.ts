import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	ValidationPipe
} from '@nestjs/common'
import { TicketService } from './ticket.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TicketDto } from './dto/ticket.dto'
import { TicketUpdateDto } from './dto/ticket-update.dto'

@Controller('ticket')
export class TicketController {
	constructor(private readonly ticketsService: TicketService) {}

	@Get()
	findAll() {
		return this.ticketsService.findAll()
	}

	@Get(':id')
	findById(@Param('id') id: number) {
		return this.ticketsService.findById(id)
	}

	@Get('/event/:id')
	findByEventId(@Param('id') id: number) {
		return this.ticketsService.findByEventId(id)
	}

	@Post(':id')
	@Auth()
	createTicket(
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: TicketDto
	) {
		return this.ticketsService.createTicket(id, dto)
	}

	@Put(':id')
	@Auth()
	updateEventById(
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: TicketUpdateDto
	) {
		return this.ticketsService.updateTicketById(id, dto)
	}
	@Delete(':id')
	@HttpCode(204)
	@Auth()
	deleteEventById(@Param('id') id: number) {
		return this.ticketsService.deleteTicketById(id)
	}
}
