import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Ticket } from './Ticket'
import { BookingToTickets } from './BookingToTickets'

@Entity({ name: 'booking' })
export class Booking {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'fio' })
	fio: string

	@Column({ name: 'email' })
	email: string

	@Column({ name: 'phone' })
	phone: string

	// @ManyToMany(() => Ticket, {
	// 	onDelete: 'CASCADE'
	// })
	// @JoinTable()
	// tickets: Ticket[]
	@OneToMany(
		() => BookingToTickets,
		bookingToTickets => bookingToTickets.booking
	)
	bookingToTickets: BookingToTickets[]
}
