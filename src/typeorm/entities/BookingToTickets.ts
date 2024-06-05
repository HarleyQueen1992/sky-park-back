import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Ticket } from './Ticket'
import { Booking } from './Booking'

@Entity({ name: 'booking_to_tickets' })
export class BookingToTickets {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	ticketId: number

	@Column()
	bookingId: number

	@Column()
	count: number

	@ManyToOne(() => Booking, booking => booking.bookingToTickets)
	booking: Booking

	@ManyToOne(() => Ticket, ticket => ticket.bookingToTickets)
	ticket: Ticket
}
