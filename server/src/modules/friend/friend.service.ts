import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
import { FriendStatus } from "@prisma/client";

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async sendRequest(userId: string, dto: CreateFriendDto) {
    if (userId === dto.friendId) {
      throw new ForbiddenException("Cannot friend yourself");
    }

    const existing = await this.prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId: dto.friendId },
          { userId: dto.friendId, friendId: userId },
        ],
      },
    });

    if (existing) {
      throw new ForbiddenException("Friend request already exists");
    }

    return this.prisma.friend.create({
      data: {
        userId,
        friendId: dto.friendId,
        status: FriendStatus.pending,
      },
    });
  }

  async acceptRequest(userId: string, friendId: string) {
    const friend = await this.prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId: friendId,
          friendId: userId,
        },
      },
    });

    if (!friend) throw new NotFoundException("Friend request not found");

    return this.prisma.friend.update({
      where: { userId_friendId: { userId: friendId, friendId: userId } },
      data: { status: FriendStatus.accepted },
    });
  }

  async removeFriend(userId: string, friendId: string) {
    await this.prisma.friend.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
  }

  async getFriends(userId: string) {
    const sent = await this.prisma.friend.findMany({
      where: {
        userId,
        status: FriendStatus.accepted,
      },
      include: { friend: true },
    });

    const received = await this.prisma.friend.findMany({
      where: {
        friendId: userId,
        status: FriendStatus.accepted,
      },
      include: { user: true },
    });

    return [...sent.map((f) => f.friend), ...received.map((f) => f.user)];
  }

  async getFriendsOfUser(userId: string) {
    const relations = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: FriendStatus.accepted },
          { friendId: userId, status: FriendStatus.accepted },
        ],
      },
      include: {
        user: true,
        friend: true,
      },
    });

    return relations.map((rel) =>
      rel.userId === userId ? rel.friend : rel.user
    );
  }

  async getPendingRequests(userId: string) {
    return this.prisma.friend.findMany({
      where: {
        friendId: userId,
        status: FriendStatus.pending,
      },
      include: { user: true },
    });
  }

  async cancelRequest(userId: string, friendId: string) {
    const request = await this.prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId,
          friendId,
        },
      },
    });

    if (!request || request.status !== FriendStatus.pending) {
      throw new NotFoundException("No pending friend request found");
    }

    return this.prisma.friend.delete({
      where: {
        userId_friendId: {
          userId,
          friendId,
        },
      },
    });
  }
}
