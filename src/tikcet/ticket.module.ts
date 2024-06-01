import { Module } from '@nestjs/common'
import { TicketService } from './ticket.service'
import { TicketController } from './ticket.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { Event } from 'src/typeorm/entities/Event'

@Module({
	imports: [TypeOrmModule.forFeature([Ticket, Event])],
	controllers: [TicketController],
	providers: [TicketService]
})
export class TicketModule {}
