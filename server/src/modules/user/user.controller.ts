import { Controller, Get, Param, Patch, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (!user) throw new NotFoundException('User not found!');
        return user;
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
    ) {
        return this.userService.update(id, dto);
    }
}
