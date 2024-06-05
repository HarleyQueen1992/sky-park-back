import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Booking } from 'src/typeorm/entities/Booking'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { Repository } from 'typeorm'
import { BookingDto } from './dto/booking.dto'
import { BookingToTickets } from 'src/typeorm/entities/BookingToTickets'

@Injectable()
export class BookingService {
	constructor(
		@InjectRepository(Booking) private bookingRepository: Repository<Booking>,
		@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
		@InjectRepository(BookingToTickets)
		private bookingToTicketsRepository: Repository<BookingToTickets>
	) {}

	async findBookingById(id: number) {
		return await this.bookingRepository.findOne({
			where: {
				id: id
			},
			relations: ['bookingToTickets', 'bookingToTickets.ticket']
		})
	}
	async createBooking(dto: BookingDto) {
		const order = {
			fio: dto.fio,
			email: dto.email,
			phone: dto.phone
		}
		const booking = this.bookingRepository.create({
			...order
		})
		const bookingId = (await this.bookingRepository.save(booking)).id
		for (const el of dto.tickets) {
			const bookingToTickets = this.bookingToTicketsRepository.create({
				ticket: await this.ticketRepository.findOneBy({
					id: el.id
				}),
				count: el.count,
				bookingId: bookingId
			})
			await this.bookingToTicketsRepository.save(bookingToTickets)
		}

		// for (let i = 0; i < dto.tickets.length; i++) {
		// 	// const id = dto.tickets[i].id
		// 	const count = dto.tickets[i].count
		// 	for (let j = 1; j < count; j++) {
		// 		tickets.push(tickets[i])
		// 	}
		// }
		// console.log('tickets', tickets)
		return bookingId
	}
}
