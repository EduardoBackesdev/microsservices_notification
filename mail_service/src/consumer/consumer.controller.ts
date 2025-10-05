import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageDto } from 'src/dto/message.dto';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

 

  @MessagePattern('')
  async handleConsume(@Payload() mess: any){
    const data: MessageDto = {
      event: mess?.event,
      email: mess?.email,
      message: mess?.event
    }
    
    if (data.event === 'user-created'){
      this.consumerService.sendEmail(data)
    }

  }
}
