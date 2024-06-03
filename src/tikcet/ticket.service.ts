import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { Event } from 'src/typeorm/entities/Event'
import { TicketDto } from './dto/ticket.dto'
import { TicketUpdateDto } from './dto/ticket-update.dto'

@Injectable()
export class TicketService {
	constructor(
		@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
		@InjectRepository(Event) private eventRepository: Repository<Event>
	) {}
	async findAll() {
		return await this.ticketRepository.find({
			relations: ['event']
		})
	}

	async findById(id: number) {
		return await this.ticketRepository.find({
			where: { id },
			relations: ['event']
		})
	}
	async findByEventId(id: number) {
		return await this.ticketRepository.find({
			where: { event: { id } }
		})
	}
	async createTicket(id: number, dto: TicketDto) {
		const event = await this.eventRepository.findOneBy({ id })

		if (!event) throw new BadRequestException('Event not found')

		const ticket = this.ticketRepository.create({
			...dto,
			event
		})
		return await this.ticketRepository.save(ticket)
	}
	async updateTicketById(id: number, dto: TicketUpdateDto) {
		return await this.ticketRepository.update(id, { ...dto })
	}
	async deleteTicketById(id: number) {
		await this.ticketRepository.delete({ id })
	}
}
