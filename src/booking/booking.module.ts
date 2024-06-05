import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingController } from './booking.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from 'src/typeorm/entities/Booking'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { BookingToTickets } from 'src/typeorm/entities/BookingToTickets'

@Module({
	imports: [TypeOrmModule.forFeature([Booking, Ticket, BookingToTickets])],
	controllers: [BookingController],
	providers: [BookingService]
})
export class BookingModule {}
