import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Event } from './Event'
import { BookingToTickets } from './BookingToTickets'

@Entity({ name: 'ticket' })
export class Ticket {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'title' })
	title: string

	@Column({ name: 'sub_title' })
	sub_title: string

	@Column({ name: 'descript', type: 'text' })
	descript: string

	@ManyToOne(() => Event, event => event.tickets, {
		onDelete: 'CASCADE'
	})
	event: Event

	@Column({ name: 'price' })
	price: number

	@OneToMany(
		() => BookingToTickets,
		bookingToTickets => bookingToTickets.ticket
	)
	bookingToTickets: BookingToTickets[]
}
