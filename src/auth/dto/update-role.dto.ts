import { PartialType } from "@nestjs/mapped-types";
import { SignUpDto } from "./signup.dto";
import { IsEmpty } from "class-validator";
import { User } from "../schemas/user.schema";

export class UpdateRoleDto extends PartialType(SignUpDto){

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User;

}