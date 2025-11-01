import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user.service";
import { AuthRequest } from "@/src/types/expressRequest.interface";
import { verify } from "jsonwebtoken";
import { UserEntity } from "../user.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService: UserService){
        
    }

    async use(req: AuthRequest, res: Response, next: NextFunction) {
        // console.log("Headers: ",req.headers);
        if(!req.headers.authorization){
            req.user = new UserEntity();
            next();
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decoded = verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            const user = await this.userService.findUserById(decoded.id);
            req.user = user;
            next();
        }catch(e){
            req.user = new UserEntity();
            next();
        }
    }
}