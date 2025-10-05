import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageDto } from 'src/dto/message.dto';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

 

  @MessagePattern('user.created')
  async handleConsume(@Payload() mess: any){
    const data: MessageDto = {
      email: mess?.email,
      message: mess?.message
    }
    this.consumerService.sendEmail(data)
  }
}
